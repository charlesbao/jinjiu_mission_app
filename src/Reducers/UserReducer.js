/**
 * Created by chalresbao on 16/12/25.
 */
import ActionType from '../Constants/ActionType'
import StorageUtil from '../Utils/StorageUtil'
import Constants from '../Constants'
import AV from 'leancloud-storage'

const ACTIONS = ActionType.USER_ACTIONS;

AV.init({
    appId: 'YitbzMUWqKx3KxKiUhMUBatH-gzGzoHsz',
    appKey: 'r2seCku7Orti5Dbs5WBtY5LW'
});

let initialState = {
    user: AV.User.current(),
    userMission: null,
    currentUserMissionId: null,
    error:null
};

export default (state = initialState, action)=>{
    switch (action.type){

        case ACTIONS.POST_USER_LOGIN:
        case ACTIONS.POST_USER_REGISTER:
        case ACTIONS.POST_UPDATE_USER_INFO:

            if(action.user!=null) {
                return Object.assign({}, state, {
                    user: action.user,
                    error:null
                });
            }else{
                return Object.assign({},state,{
                    error:Constants.ERROR.LOGIN_OR_REGISTER_USER_FAILED
                });
            }

        case ACTIONS.POST_REQUEST_VERIFY_NUMBER:
            if(action.result){
                return Object.assign({},state,{
                    error:Constants.ERROR.REQUEST_PHONE_SUCCESS
                });
            }else{
                return Object.assign({},state,{
                    error:Constants.ERROR.REQUEST_PHONE_FAILED
                });
            }


        case ACTIONS.POST_VERIFY_SMS_NUMBER:
            if(action.result){
                return Object.assign({},state,{
                    error:Constants.ERROR.VERIFY_SMS_SUCCESS
                });
            }else{
                return Object.assign({},state,{
                    error:Constants.ERROR.VERIFY_SMS_FAILED
                });
            }

        case ACTIONS.POST_USER_CHANGE_PHONE_NUMBER:
            return Object.assign({},state,{
                user:action.user,
                error: null,
            });

        case ACTIONS.POST_UPDATE_USER_MISSION:
        case ACTIONS.QUERY_USER_MISSION:
            return Object.assign({},state,{
                userMission:action.userMission,
                error: null,
            });

        case ACTIONS.SET_CURRENT_USER_MISSION_ID:
            return Object.assign({},state,{
                currentUserMissionId:action.currentUserMissionId,
            });

        case ACTIONS.CLEAR:
        case ACTIONS.USER_CLEAR:
            AV.User.logOut();
            StorageUtil.clear();
            return Object.assign({},state,{
                user:null,
                userMission: null,
                error:null
            });
        default:
            return state
    }
}

