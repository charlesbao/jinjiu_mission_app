import Constant from '../Constants'

const AV = require("leancloud-storage");
const moment = require('moment');
//用户登录
const userLogin = exports.userLogin = function(username,password,callback){
    AV.User.logIn(username, password).then(function (currentUser) {
        callback(currentUser)
    },function (error) {
        callback(null)
    });
};

//创建用户
const userRegister = exports.userRegister = function(username,password,callback){
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.set('avatar',null);
    user.set('nickname',username);
    user.set('alipay',null);
    user.set('mobile',"");
    user.signUp().then(function (currentUser) {
        callback(currentUser);
    }, function (error) {
        callback(null)
    });
};

const updateUserInfo = exports.updateUserInfo = function(currentUser,newData,callback){
    for(let key in newData){
        currentUser.set(key,newData[key])
    }
    currentUser.save().then(function (currentUser){
        callback(currentUser)
    }, function(){
        callback(null)
    })
}

const insideQueryMission = function(query,page,callback){
    query.limit(5*page);
    query.descending('updatedAt');
    query.greaterThanOrEqualTo('dueDate',new Date());
    query.find().then(function (missions) {
        let arr = [];
        missions.map(function(mission){
            arr.push(getMissionDict(mission))
        })
        callback(arr)
    },function(err){
        callback(null)
    })
}

const queryMissionsByDate = exports.queryMissionsByDate = function(page,callback){
    const query = new AV.Query('mission');
    insideQueryMission(query,page,callback)
}

const queryMissionsByPrice = exports.queryMissionsByPrice = function(page,priceIndex,callback){
    const query = new AV.Query('mission');
    switch (priceIndex){
        case 0:
            query.lessThanOrEqualTo('price',3);
            break;
        case 1:
            query.greaterThan('price',3);
            query.lessThanOrEqualTo('price',15);
            break;
        case 2:
            query.greaterThan('price',15);
            break;
    }
    insideQueryMission(query,page,callback)
}

const queryMissionsByAttribute = exports.queryMissionsByAttribute = function(page,attribute,callback){
    const query = new AV.Query('mission');
    query.equalTo("attribute",attribute);
    insideQueryMission(query,page,callback)
}


const queryUserMissions = exports.queryUserMissions = function(currentUser,callback){
    const query = new AV.Query('userMission');
    query.equalTo('user',currentUser);
    query.include('mission')
    query.find().then(function(missions){
        let arr = [];
        missions.map(function(result){
            let dict = {
                userId:currentUser.id,
                id:result.id,
                mission:getMissionDict(result.get('mission')),
                commentBack: result.get('commentBack'),
                favor:result.get('favor'),
                process:result.get('process'),
                missionCreatedAt: result.get('missionCreatedAt')
            };
            if(dict['process'] == Constant.MISSION_CONDITION.ON_PROGRESS){
                if(moment(dict['missionCreatedAt']).isBefore(moment().subtract(3,'h'))){
                    dict['process'] = Constant.MISSION_CONDITION.ON_DESTROY
                }
            }
            arr.push(dict)
        });
        callback(arr)
    },function(){
        callback(null)
    })
}

const queryMissionById = exports.queryMissionById = function(missionId,callback){
    const query = new AV.Query('mission');
    query.get(missionId).then(function (mission) {
        console.log(mission)

        callback(getMissionDict(mission))
    });
}

const requestVerifyNumber = exports.requestVerifyNumber = function(mobilePhoneNumber,callback){
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber: mobilePhoneNumber,
        name: '绑定手机号码',
        ttl: 10
    }).then(function(){
        callback(true)
    }, function(err){
        callback(false)
    });
};

const verifySmsNumber = exports.verifySmsNumber = function(smsNumber,mobilePhoneNumber,callback){
    AV.Cloud.verifySmsCode(smsNumber, mobilePhoneNumber).then(function(){
        callback(true)
    }, function(err){
        callback(false)
    });
};

const createOrUpdateComment = exports.createOrUpdateComment = function (commentId, currentUser, missionId, content,callback) {
    let missionComment;
    if(commentId!=null){
        missionComment = new AV.Object.createWithoutData("missionComment",commentId);
    }else{
        missionComment = new AV.Object("missionComment");
    }
    const mission = AV.Object.createWithoutData('mission', missionId);
    missionComment.set('user',currentUser)
    missionComment.set('content',content)
    missionComment.set('targetMission',mission)
    missionComment.save().then(function(comment){
        const dict = {
            id: comment.id,
            userId:currentUser.id,
            content:comment.get('content'),
            nickname:currentUser.get('nickname'),
            avatar:currentUser.get('avatar'),
            createAt:comment.createdAt
        }
        callback(dict)
    },function(error){
        callback(null)
    })
};

const queryComments = exports.queryComments = function(missionId,callback){
    const mission = AV.Object.createWithoutData('mission', missionId);
    const query = new AV.Query('missionComment');
    query.equalTo('targetMission', mission);
    query.include('user');
    query.include('content');
    query.find().then(function (results) {
        let arr = [];
        results.map(function(comment){
            const user = comment.get('user');
            arr.push({
                id: comment.id,
                userId:user.id,
                nickname:user.get('nickname'),
                content:comment.get('content'),
                avatar:user.get('avatar'),
                createAt:comment.createdAt
            })
        });
        callback(arr)
    }, function (error) {
        callback(null)
    });
};

const queryRelatedMissions = exports.queryRelatedMissions = function(missionId,attribute,callback){
    const query = new AV.Query('mission');

    query.limit(5);
    query.notEqualTo('objectId',missionId);
    query.equalTo('attribute',attribute)
    query.greaterThanOrEqualTo('dueDate',new Date());
    query.descending('updatedAt');

    query.find().then(function(results){
        let arr = [];
        results.map(function(mission){
            arr.push(getMissionDict(mission))
        });
        callback(arr)
    }, function (error) {
        callback(null)
    });
};

//添加userMission
const createOrUpdateUserMission = exports.createOrUpdateUserMission = function(userMissionId,currentUser,missionId,favour,process,missionCreatedAt,callback){

    function insideCreateUpdateMission(userMission,callback){
        //如果没有存在的mission，则创建
        const mission = AV.Object.createWithoutData('mission', missionId);
        userMission.set('mission',mission);
        userMission.set('user',currentUser);
        userMission.set('process',process);
        userMission.set('favor',favour);
        if(missionCreatedAt != null){
            userMission.set('missionCreatedAt',missionCreatedAt)
        }
        userMission.save().then(function(){
            queryUserMissions(currentUser,function(result){
                callback(result)
            })
        },function(error){
            callback(null)
        })
    }

    if(userMissionId!=null){
        const userMission = AV.Object.createWithoutData('userMission',userMissionId)
        if(process == 0 && favour == false){
            // 如果收藏、进度都为初始值，则删除此条记录
            userMission.destroy().then(function(){
                queryUserMissions(currentUser,function(result){
                    callback(result)
                })
            })
        }else{
            insideCreateUpdateMission(userMission,function(result){
                callback(result)
            })
        }
    }else{
        const userMission = AV.Object('userMission')
        insideCreateUpdateMission(userMission,function(result){
            callback(result)
        })
    }
};

const postUserRemoveDestroyMission = exports.postUserRemoveDestroyMission = function(userMissionId,currentUser,callback){
    const userMission = AV.Object.createWithoutData('userMission', userMissionId);
    userMission.destroy().then(function(){
        queryUserMissions(currentUser,function(result){
            callback(result)
        })
    })
}

const postMissionPost = exports.postMissionPost = function(currentUserMissionId,currentMissionId,currentUser,pics,comment,callback){
    const missionPost = AV.Object('missionPost')
    const userMission = AV.Object.createWithoutData('userMission', currentUserMissionId);
    const mission = AV.Object.createWithoutData('mission', currentMissionId);
    missionPost.set('userMission',userMission);
    missionPost.set('mission',mission);
    missionPost.set('user',currentUser);
    missionPost.set('comment',comment);
    missionPost.set('pics',pics);

    missionPost.save().then(function() {
        userMission.set('process',Constant.MISSION_CONDITION.ON_CHECKING);
        userMission.set('commentBack',"");
        userMission.save().then(function() {
            queryUserMissions(currentUser, function (result) {
                callback(result)
            })
        })
    })
};

const postRestartCurrentMission = exports.postRestartCurrentMission = function(currentUserMissionId,currentUser,callback){
    const userMission = AV.Object.createWithoutData('userMission', currentUserMissionId);
    userMission.set('missionCreatedAt',new Date())
    userMission.set('process',Constant.MISSION_CONDITION.ON_PROGRESS)
    userMission.save().then(function(){
        queryUserMissions(currentUser, function (result) {
            callback(result)
        })
    })
};

const getMissionDict = function(mission){
    return {
        id: mission.id,
        title: mission.get('title'),
        description: mission.get('description'), //简单描述
        instruction: mission.get('instruction'), //任务说明
        tutorial: mission.get('tutorial'), //任务步骤
        dueDate: mission.get('dueDate'), //截止日期
        checkCycle: mission.get('checkCycle'), //审核周期 [小时]
        canBeRepeat: mission.get('canBeRepeat'), //是否可以重复执行
        count: mission.get('count'), //剩余
        price: mission.get('price'), //任务价格
        attribute: mission.get('attribute'),
        createdAt: mission.createdAt,
        updatedAt: mission.updatedAt,
        isEnd: moment(mission.get('dueDate')).isBefore(moment())
    }
}

//
// AV.init({
//     appId: 'YitbzMUWqKx3KxKiUhMUBatH-gzGzoHsz',
//     appKey: 'r2seCku7Orti5Dbs5WBtY5LW'
// });
//
// userLogin('charlesbao','123123',function(currentUser){
//     queryUserMissions(currentUser,function(){
//     })
// })