/**
 * Created by chalresbao on 16/12/25.
 */
import ActionType from '../Constants/ActionType'
import StorageUtil from '../Utils/StorageUtil'
import Constants from '../Constants'

const ACTIONS = ActionType.MISSION_ACTIONS;

let initialState = {
    currentMission:{},
    currentMissionComments:[],
    relatedMissions:[],
    missionDict:{},
    missionSearchArray:[],
    loadedMissionPage: 1
};

export default (state = initialState, action)=>{
    switch (action.type){

        case ACTIONS.QUERY_MISSION:
            if(action.missionArray != null){
                let tmpDict = {};
                tmpDict[action.filterKey.toString()] = {
                    array:action.missionArray,
                    page:action.page
                };
                return Object.assign({},state,{
                    missionDict: Object.assign({},state.missionDict,tmpDict),
                });
            }else{
                return state;
            }

        case ACTIONS.QUERY_MISSION_BY_SEARCH:
            if(action.missionSearchArray != null){
                return Object.assign({},state,{
                    missionSearchArray: action.missionSearchArray
                });
            }else{
                return state;
            }

        case ACTIONS.SET_CURRENT_MISSION:
            return Object.assign({},state,{
                currentMission: action.currentMission,
                currentMissionComments:[]
            });

        case ACTIONS.QUERY_CURRENT_MISSION_COMMENTS:
            return Object.assign({},state,{
                currentMissionComments:action.currentMissionComments
            });

        case ACTIONS.QUERY_RELATED_MISSIONS:
            return Object.assign({},state,{
                relatedMissions:action.relatedMissions
            });
        case ACTIONS.CLEAR_CURRENT_RELATED_MISSIONS:
            return Object.assign({},state,{
                relatedMissions:[]
            });

        case ACTIONS.CLEAR:
            return Object.assign({},state,{
                currentMission:{},
                missionSearchArray:[],
            });
        default:
            return state
    }
}

