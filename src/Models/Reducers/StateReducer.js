/**
 * Created by chalresbao on 16/12/25.
 */
import {handleActions} from 'redux-actions'
import ActionType from '../../Constants/ActionType'

const ACTIONS = ActionType.STATE_ACTIONS;

const initialState = {
    homeSectionIndex:0,
    userMissionIndex:0,
    filterIndex:[0,0],
    searchValue:'',
    currentUserMissionIndex:0,
    initFetchMission:true,
    missionListScrollTop:{},
    missionSearchScrollTop:0
};

export default handleActions({
    [ACTIONS.SET_HOME_SECTION_INDEX]:(state,{payload})=>({
        ...state,
        homeSectionIndex: payload.homeSectionIndex
    }),
    [ACTIONS.SET_USER_MISSION_INDEX]:(state,{payload})=>({
        ...state,
        userMissionIndex: payload.userMissionIndex
    }),
    [ACTIONS.SET_FILTER_INDEX]:(state,{payload})=>({
        ...state,
        filterIndex: payload.filterIndex
    }),
    [ACTIONS.SET_SEARCH_VALUE]:(state,{payload})=>({
        ...state,
        searchValue: payload.searchValue
    }),
    [ACTIONS.SET_CURRENT_USER_MISSION_INDEX]:(state,{payload})=>({
        ...state,
        currentUserMissionIndex: payload.currentUserMissionIndex
    }),
    [ACTIONS.SET_INIT_FETCH_MISSION]:(state,{payload})=>({
        ...state,
        initFetchMission: payload.initFetchMission
    }),
    [ACTIONS.SET_MISSION_LIST_SCROLL_TOP]:(state,{payload})=>({
        ...state,
        missionListScrollTop: {
            ...state.missionListScrollTop,
            [state.filterIndex+'']:payload.missionListScrollTop
        }
    }),
    [ACTIONS.CLEAR]:(state,{payload})=>({
        ...state,
        initialState
    }),
},initialState)