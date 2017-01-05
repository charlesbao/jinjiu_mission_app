/**
 * Created by chalresbao on 16/12/25.
 */
import {handleActions} from 'redux-actions'
import ActionType from '../../Constants/ActionType'

const ACTIONS = ActionType.MISSION_ACTIONS;

let initialState = {
    currentMission:{},
    currentMissionComments:[],
    relatedMissions:[],
    missionDict:{},
    missionSearchArray:[],
};

export default handleActions({
    //获取Mission
    [ACTIONS.QUERY_MISSIONS]:(state,{payload})=>({
        ...state,
        missionDict:{
            ...state.missionDict,
            [payload.filterKey]: {
                array: payload.missionArray,
                page: payload.page
            }
        }
    }),

    [ACTIONS.QUERY_MISSION_BY_SEARCH]:(state,{payload})=>({
        ...state,
        missionSearchArray: payload.missionSearchArray
    }),

    [ACTIONS.SET_CURRENT_MISSION]:(state,{payload})=>({
        ...state,
        currentMission: payload.currentMission,
        currentMissionComments:[],
        relatedMissions:[]
    }),

    [ACTIONS.QUERY_CURRENT_MISSION_COMMENTS]:(state,{payload})=>({
        ...state,
        currentMissionComments:payload.currentMissionComments
    }),

    [ACTIONS.QUERY_RELATED_MISSIONS]:(state,{payload})=>({
        ...state,
        relatedMissions:payload.relatedMissions
    }),

    [ACTIONS.CLEAR]:(state)=>({
        ...state,
        initialState
    })
},initialState)

