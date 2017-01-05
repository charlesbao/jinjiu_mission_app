/**
 * Created by chalresbao on 16/12/25.
 */
import AV from 'leancloud-storage'
import {handleActions,combineActions} from 'redux-actions'
import ActionType from '../../Constants/ActionType'
import Constants from '../../Constants'

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

export default handleActions({
    [combineActions(ACTIONS.POST_USER_LOGIN, ACTIONS.POST_USER_REGISTER)]:(state,{payload})=>({
        ...state,
        user: payload.user,
        userMission: payload.userMission,
    }),
    [combineActions(ACTIONS.POST_UPDATE_USER_INFO,ACTIONS.POST_USER_CHANGE_PHONE_NUMBER)]:(state,{payload})=>({
        ...state,
        user:payload.user,
    }),
    [combineActions(ACTIONS.POST_UPDATE_USER_MISSION,ACTIONS.QUERY_USER_MISSION)]:(state,{payload})=>({
        ...state,
        userMission:payload.userMission,
    }),
    [ACTIONS.SET_CURRENT_USER_MISSION_ID]:(state,{payload})=>({
        ...state,
        currentUserMissionId:payload.currentUserMissionId
    }),
    [ACTIONS.CLEAR]:(state)=>{
        AV.User.logOut();
        window.localStorage.clear();
        return {
            ...state,
            initialState
        }
    }
},initialState)

