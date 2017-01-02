/**
 * Created by chalresbao on 16/12/25.
 */
import ActionType from '../Constants/ActionType'

const ACTIONS = ActionType.STATE_ACTIONS;
const initialState = {
    homeSectionIndex:0,
    userMissionIndex:0,
    filterIndex:[0,0],
    searchValue:'',
    currentUserMissionIndex:0,
    initFetchMission:true,
    missionListScrollTop:{}
};

export default (state = initialState, action)=>{
    switch (action.type){
        case ACTIONS.SET_HOME_SECTION_INDEX:
            return Object.assign({},state,{
                homeSectionIndex: action.data
            });

        case ACTIONS.SET_USER_MISSION_INDEX:
            return Object.assign({},state,{
                userMissionIndex: action.data
            });

        case ACTIONS.SET_FILTER_INDEX:
            return Object.assign({},state,{
                filterIndex: action.data
            });

        case ACTIONS.SET_SEARCH_VALUE:
            return Object.assign({},state,{
                searchValue: action.data
            });

        case ACTIONS.SET_CURRENT_USER_MISSION_INDEX:
            return Object.assign({},state,{
                currentUserMissionIndex: action.data
            });

        case ACTIONS.SET_INIT_FETCH_MISSION:
            return Object.assign({},state,{
                initFetchMission: action.data
            });

        case ACTIONS.SET_MISSION_LIST_SCROLL_TOP:
            let tmpDict = {};
            tmpDict[state.filterIndex.toString()] = action.data;
            return Object.assign({},state,{
                missionListScrollTop: Object.assign({},state.missionListScrollTop,tmpDict)
            });

        case ACTIONS.CLEAR:
            return Object.assign({},state,initialState);

        default:
            return state
    }
}
