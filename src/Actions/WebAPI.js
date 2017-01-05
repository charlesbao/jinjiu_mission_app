import Constant from '../Constants'

const AV = require("leancloud-storage");
const moment = require('moment');
//用户登录
const postUserLogin = exports.postUserLogin = function(username,password,callback){
    AV.User.logIn(username, password).then(function (currentUser) {
        callback(currentUser)
    },function (error) {
        callback(null)
    });
};

//创建用户
const postUserRegister = exports.postUserRegister = function(username,password,callback){
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

const postUpdateUser = exports.postUpdateUser = function(newData,callback){
    const currentUser = AV.User.current()
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
    query.limit(10*page);
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


const queryUserMissions = exports.queryUserMissions = function(callback){
    const currentUser = AV.User.current();
    const query = new AV.Query('userMission');
    query.equalTo('user',currentUser);
    query.addAscending('process');
    query.addAscending('hasComment');
    query.addDescending('missionCreatedAt');
    query.include('mission');
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
                hasComment:result.get('hasComment'),
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

const queryMissionBySearch = exports.queryMissionBySearch = function(searchValue,callback) {
    const titleQuery = new AV.Query('mission');
    titleQuery.contains('title', searchValue);
    const instructionQuery = new AV.Query('mission');
    instructionQuery.contains('instruction', searchValue);
    const query = AV.Query.or(titleQuery, instructionQuery);
    query.addDescending('createdAt');
    query.limit(50);
    query.greaterThanOrEqualTo('dueDate',new Date());
    query.find().then(function (results) {
        let arr = [];
        results.map(function(mission){
            arr.push(getMissionDict(mission))
        });
        callback(arr)
    },function(){
        callback(null)
    })
}

const postRequestVerifyNumber = exports.postRequestVerifyNumber = function(mobilePhoneNumber,callback){
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

const postVerifySmsNumber = exports.postVerifySmsNumber = function(smsNumber,mobilePhoneNumber,callback){
    AV.Cloud.verifySmsCode(smsNumber, mobilePhoneNumber).then(function(){
        callback(true)
    }, function(err){
        callback(false)
    });
};

const postMissionComment = exports.postMissionComment = function (userMissionId, missionId, content,callback) {
    const currentUser = AV.User.current()

    const missionComment = new AV.Object("missionComment");
    const mission = AV.Object.createWithoutData('mission', missionId);
    missionComment.set('user',currentUser);
    missionComment.set('content',content);
    missionComment.set('targetMission',mission);
    missionComment.save().then(function(){
        const userMission = AV.Object.createWithoutData('userMission', userMissionId);
        userMission.set('hasComment',true);
        userMission.save().then(function(){
            queryUserMissions(function(result){
                callback(result)
            })
        });
    },function(error){
        callback(null)
    })
};

const queryCurrentMissionComments = exports.queryCurrentMissionComments = function(missionId,callback){
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
const createOrUpdateUserMission = exports.createOrUpdateUserMission = function(userMissionId,missionId,favour,process,startMission,callback){
    const currentUser = AV.User.current()

    function insideCreateUpdateMission(userMission,callback){
        //如果没有存在的mission，则创建
        const mission = AV.Object.createWithoutData('mission', missionId);
        userMission.set('mission',mission);
        userMission.set('user',currentUser);
        userMission.set('process',process);
        userMission.set('favor',favour);
        if(startMission){
            userMission.set('missionCreatedAt',new Date())
        }else{
            userMission.set('favorCreatedAt',new Date())
        }
        userMission.save().then(function(){
            queryUserMissions(function(result){
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
                queryUserMissions(function(result){
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

const postUserRemoveDestroyMission = exports.postUserRemoveDestroyMission = function(userMissionId,callback){
    const userMission = AV.Object.createWithoutData('userMission', userMissionId);
    userMission.destroy().then(function(){
        queryUserMissions(function(result){
            callback(result)
        })
    })
}

const postMissionPost = exports.postMissionPost = function(currentUserMissionId,currentMissionId,pics,comment,callback){

    function insideMissionPost(){
        missionPost.set('userMission',userMission);
        missionPost.set('mission',mission);
        missionPost.set('user',currentUser);
        missionPost.set('comment',comment);

        missionPost.save().then(function() {
            userMission.set('process',Constant.MISSION_CONDITION.ON_CHECKING);
            userMission.set('commentBack',"");
            userMission.save().then(function() {
                queryUserMissions(function (result) {
                    callback(result)
                })
            },function(){
                callback(null)
            })
        },function(){
            callback(null)
        })

    }

    const missionPost = AV.Object('missionPost')
    const userMission = AV.Object.createWithoutData('userMission', currentUserMissionId);
    const mission = AV.Object.createWithoutData('mission', currentMissionId);
    const currentUser = AV.User.current();
    let fileArr = [];

    if(pics.length === 0){
        insideMissionPost()
    }else{
        pics.map(function(item,i){
            const file = new AV.File(currentUserMissionId+"_"+item.name, item);
            file.save().then(function(result){
                fileArr.push(result)
                if(fileArr.length === pics.length){
                    missionPost.set('pics',fileArr);
                    insideMissionPost()
                }
            });
        });
    }
};

const postRestartCurrentMission = exports.postRestartCurrentMission = function(currentUserMissionId,callback){
    const userMission = AV.Object.createWithoutData('userMission', currentUserMissionId);
    userMission.set('missionCreatedAt',new Date())
    userMission.set('process',Constant.MISSION_CONDITION.ON_PROGRESS)
    userMission.save().then(function(){
        queryUserMissions(function (result) {
            callback(result)
        })
    },function(){
        callback(null)
    })
};

const postUploadAvatar = exports.postUploadAvatar = function(base64File,callback){
    function insideUploadAvatar(){
        const avatarName = currentUser.get('username')+'_avatar.png';
        const data = { base64: base64File };
        const file = new AV.File(avatarName, data);
        file.save().then(function(avatar){
            callback(avatar)
        },function(){
            callback(null)
        })
    }
    const currentUser = AV.User.current();
    if(currentUser.get('avatar')){
        const {name} = currentUser.get('avatar').attributes;
        const query = new AV.Query("_File");
        query.equalTo('name',name);
        query.first().then(function(file){
            const oldAvatar = AV.File.createWithoutData(file.id);
            oldAvatar.destroy().then(function () {
                insideUploadAvatar()
            }, function (error) {
                callback(null)
            });
        },function(){
            callback(null)
        })
    }else{
        insideUploadAvatar()
    }
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