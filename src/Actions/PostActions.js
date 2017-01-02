/**
 * Created by chalresbao on 16/11/24.
 */
import WebAPI from './WebAPI'
import AV from 'leancloud-storage'
export default {
    postUpdateUserMission(userMissionId,missionId,favour,process,missionCreatedAt,callback){
        WebAPI.createOrUpdateUserMission(userMissionId,AV.User.current(),missionId,favour,process,missionCreatedAt,function(userMission){
            callback(userMission)
        })
    },
    postUserRemoveDestroyMission(userMissionId,callback){
        WebAPI.postUserRemoveDestroyMission(userMissionId,AV.User.current(),function(result){
            callback(result)
        })
    },

    postMissionPost(currentUserMissionId,currentMissionId,pics,comment,callback){
        WebAPI.postMissionPost(currentUserMissionId,currentMissionId,AV.User.current(),pics,comment,function(result){
            callback(result)
        })
    },

    postComment(missionId,comment,callback){
        WebAPI.createOrUpdateComment(null,AV.User.current(),missionId,comment,function(result){
            callback(result)
        })
    },

    postUserRegister(username,password,callback){
        WebAPI.userRegister(username,password,function (currentUser) {
            callback(currentUser)
        });
    },
    postUserLogin(username,password,callback){
        WebAPI.userLogin(username,password,function (currentUser) {
            callback(currentUser)
        });
    },
    postUpdateUserInfo(newData,callback){
        WebAPI.updateUserInfo(AV.User.current(),newData,function(currentUser){
            callback(currentUser)
        })
    },
    postUpdatePassword(username,password,newPassword,callback){
        WebAPI.userLogin(username,password,function (currentUser) {
            if(currentUser != null){
                WebAPI.updateUserInfo(currentUser,{password:newPassword},function(currentUser){
                    callback(currentUser)
                })
            }else{
                callback(null)
            }
        });
    },
    postRequestVerifyNumber(mobilePhoneNumber,callback){
        WebAPI.requestVerifyNumber(mobilePhoneNumber,function(result){
            callback(result)
        })
    },
    postVerifySmsNumber(smsNumber, mobilePhoneNumber,callback){
        WebAPI.verifySmsNumber(smsNumber, mobilePhoneNumber,function(result){
            callback(result)
        })
    }
};

