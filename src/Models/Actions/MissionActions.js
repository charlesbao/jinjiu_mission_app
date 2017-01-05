/**
 * Created by chalresbao on 17/1/3.
 */
import ActionType from '../../Constants/ActionType'
import WebAPI from '../../Actions/WebAPI'

const ACTIONS = ActionType.MISSION_ACTIONS;
const defaultCallback = ()=>false;

export const queryMissions = (page,filterIndex,callback=defaultCallback) => (dispatch) => {
    const [topFilter,subFilter] = filterIndex;
    const insideCallback = (missions) => {
        if(missions === null)return callback("任务列表获取失败");
        dispatch({
            type:ACTIONS.QUERY_MISSIONS,
            payload:{
                missionArray: missions,
                page: page,
                filterKey: filterIndex + ''
            }
        });
        callback(null)
    };
    switch (topFilter) {
        case 0:
        default:
            WebAPI.queryMissionsByDate(page, insideCallback);
            break;
        case 1:
            WebAPI.queryMissionsByPrice(page, subFilter,insideCallback);
            break;
        case 2:
            WebAPI.queryMissionsByAttribute(page, subFilter, insideCallback);
            break;
    }
};

export const queryMissionBySearch = (searchValue,callback)=> dispatch => {
    WebAPI.queryMissionBySearch(searchValue,(missionSearchArray)=>{
        if(missionSearchArray === null)return callback('获取搜索列表失败');
        dispatch({
            type:ACTIONS.QUERY_MISSION_BY_SEARCH,
            payload:{
                missionSearchArray
            }
        })
        callback(null)
    })
}

export const queryCurrentMissionComments = (missionId,callback)=> dispatch => {
    WebAPI.queryCurrentMissionComments(missionId,(currentMissionComments)=>{
        if(currentMissionComments === null)return callback("获取评论失败");
        dispatch({
            type:ACTIONS.QUERY_CURRENT_MISSION_COMMENTS,
            payload:{
                currentMissionComments
            }
        })
        callback(null)
    })
}

export const queryRelatedMissions = (missionId,attribute,callback) => dispatch => {
    WebAPI.queryRelatedMissions(missionId,attribute,(relatedMissions)=>{
        if(relatedMissions === null)return callback('获取推荐任务失败')
        dispatch({
            type:ACTIONS.QUERY_RELATED_MISSIONS,
            payload:{
                relatedMissions
            }
        })
        callback(null)
    })
}

export const setCurrentMission = (currentMission) => (dispatch) => {
    dispatch({
        type: ACTIONS.SET_CURRENT_MISSION,
        payload: {
            currentMission
        }
    })
};