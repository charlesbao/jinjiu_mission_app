/**
 * Created by chalresbao on 17/1/3.
 */
import ActionType from '../../Constants/ActionType'
import WebAPI from '../../Actions/WebAPI'

const ACTIONS = ActionType.USER_ACTIONS;

const defaultCallback = ()=>false;

export const queryUserMissions = (callback=defaultCallback) => dispatch => {
    WebAPI.queryUserMissions((userMission)=> {
        if(userMission === null)return callback('用户信息获取失败');
        dispatch({
            type:ACTIONS.QUERY_USER_MISSION,
            payload:{
                userMission
            }
        })
        callback(null)
    })
};

export const postUserLogin = (username,password,callback=defaultCallback) => dispatch => {
    WebAPI.postUserLogin(username,password,(user) => {
        if(user === null) return callback('用户名或密码错误');
        WebAPI.queryUserMissions((userMission) => {
            dispatch({
                type: ACTIONS.POST_USER_LOGIN,
                payload:{
                    user,
                    userMission
                }
            })
            callback(null)
        })
    })
}

export const postUserRegister = (username,password,re_password,callback=defaultCallback)=> dispatch => {
    if(!/^[A-Za-z0-9]{6,20}$/.test(username))return callback("请输入6-20位字母数字组合的用户名")
    if(!/^[A-Za-z0-9]{6,20}$/.test(password))return callback("请输入6-20位字母数字组合密码")
    if(password !== re_password)return callback("密码不一致");
    WebAPI.postUserRegister(username,password,(user)=>{
        if(user === null)return callback('用户获取失败');
        WebAPI.queryUserMissions((userMission)=>{
            if(userMission === null)return callback('用户信息获取失败');
            dispatch({
                type: ACTIONS.POST_USER_REGISTER,
                payload:{
                    user,
                    userMission
                }
            })
            callback(null)
        })
    })
}

export const postRequestVerifyNumber = (mobilePhoneNumber,callback=defaultCallback) => dispatch => {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobilePhoneNumber)))return callback('手机号码格式错误')
    WebAPI.postRequestVerifyNumber(mobilePhoneNumber,(result)=>{
        if(result === false){
            callback('发送错误')
        }else{
            callback(null)
        }
    })
}

export const postVerifySmsNumber = (smsNumber,mobilePhoneNumber,callback=defaultCallback) => dispatch => {
    if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobilePhoneNumber))return callback('手机号码格式错误')
    if(!/[0-9]{6}/.test(smsNumber))return callback('验证码格式错误');
    WebAPI.postVerifySmsNumber(smsNumber,mobilePhoneNumber,(result)=>{
        if(result === false)return callback('验证错误');
        WebAPI.postUpdateUser({mobilePhoneNumber:mobilePhoneNumber},(user)=>{
            if(user === null)return callback('未知错误');
            dispatch({
                type:ACTIONS.POST_USER_CHANGE_PHONE_NUMBER,
                payload:{
                    user
                }
            });
            callback(null)
        })
    })
}

export const postUpdatePassword = (username,password,new_password,re_password,callback) => dispatch => {
    if(/^[A-Za-z0-9]{6,20}$/.test(new_password))return callback("请输入6-20位字母数字组合密码")
    if(new_password !== re_password)return callback("密码不一致");
    WebAPI.userLogin(username,password,function (currentUser) {
        if(currentUser === null)return callback("密码错误");
        WebAPI.updateUserInfo(currentUser,{password:new_password},function(user){
            if(user === null)return callback('修改失败')
            dispatch({
                type:ACTIONS.POST_UPDATE_USER_INFO,
                payload:{
                    user
                }
            })
            callback(null)
        })
    });
}

export const postUpdateUser = (newData,callback=defaultCallback)=> dispatch => {
    WebAPI.postUpdateUser(newData,(user)=>{
        if(user === null)return callback('未知错误');
        dispatch({
            type:ACTIONS.POST_UPDATE_USER_INFO,
            payload:{
                user
            }
        });
        callback(null)
    })
}

export const postRestartCurrentMission = (currentUserMissionId,callback=defaultCallback) => dispatch => {
    WebAPI.postRestartCurrentMission(currentUserMissionId,function(userMission){
        if(userMission === null)return callback('未知错误');
        dispatch({
            type:ACTIONS.POST_UPDATE_USER_MISSION,
            payload:{
                userMission
            }
        })
        callback(null)
    })
}

export const postUpdateUserMission = (userMissionId,missionId,favour,process,startMission,callback=defaultCallback) => dispatch => {
    WebAPI.createOrUpdateUserMission(userMissionId,missionId,favour,process,startMission,(userMission)=>{
        if(userMission === null)return callback('未知错误')
        dispatch({
            type:ACTIONS.POST_UPDATE_USER_MISSION,
            payload:{
                userMission
            }
        })
        callback(null)
    })
}


export const postMissionComment = (currentUserMissionId,missionId,comment,callback)=> dispatch => {
    WebAPI.postMissionComment(currentUserMissionId,missionId,comment,(userMission)=>{
        if(userMission === null)return callback('未知错误');
        dispatch({
            type:ACTIONS.POST_UPDATE_USER_MISSION,
            payload:{
                userMission
            }
        });
        callback(null)
    })
}

export const postMissionPost = (currentUserMissionId,currentMissionId,pics,comment,callback)=> dispatch => {
    WebAPI.postMissionPost(currentUserMissionId,currentMissionId,pics,comment,(userMission)=>{
        if(userMission === null)return callback('未知错误');
        dispatch({
            type:ACTIONS.POST_UPDATE_USER_MISSION,
            payload:{
                userMission
            }
        })
        callback(null)
    })
};

export const postChangeAvatar = (base64File,callback) => dispatch => {
    WebAPI.postUploadAvatar(base64File,(avatar)=>{
        if(avatar === null)return callback('上传错误');
        WebAPI.postUpdateUser({avatar:avatar},(user)=>{
            if(user === null)return callback('未知错误');
            console.log(user)
            dispatch({
                type:ACTIONS.POST_UPDATE_USER_INFO,
                payload:{
                    user
                }
            });
            callback(null)
        })
    })
}

export const setCurrentUserMissionId = (currentUserMissionId) => dispatch => {
    dispatch({
        type:ACTIONS.SET_CURRENT_USER_MISSION_ID,
        payload:{
            currentUserMissionId
        }
    })
}