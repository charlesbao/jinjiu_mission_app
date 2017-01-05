/**
 * Created by chalresbao on 17/1/3.
 */
import ActionType from '../../Constants/ActionType'
import WebAPI from '../../Actions/WebAPI'

const ACTIONS = ActionType.STATE_ACTIONS;

export const setHomeSectionIndex = (homeSectionIndex) => dispatch => {
    dispatch({
        type:ACTIONS.SET_HOME_SECTION_INDEX,
        payload:{
            homeSectionIndex
        }
    })
};
export const setMissionListScrollTop = (missionListScrollTop) => dispatch => {
    dispatch({
        type:ACTIONS.SET_MISSION_LIST_SCROLL_TOP,
        payload:{
            missionListScrollTop
        }
    })
};
export const setFilterIndex = (topFilter,subFilter) => dispatch => {
    dispatch({
        type:ACTIONS.SET_FILTER_INDEX,
        payload:{
            filterIndex:[topFilter,subFilter]
        }
    })
};

export const setCurrentUserMissionIndex = (currentUserMissionIndex) => dispatch => {
    dispatch({
        type:ACTIONS.SET_CURRENT_USER_MISSION_INDEX,
        payload:{
            currentUserMissionIndex
        }
    })
}

export const setSearchValue = (searchValue)=> dispatch => {
    dispatch({
        type:ACTIONS.SET_SEARCH_VALUE,
        payload:{
            searchValue
        }
    })
}

export const setMissionSearchScrollTop = (missionSearchScrollTop) => dispatch => {
    dispatch({
        type:ACTIONS.SET_MISSION_SEARCH_SCROLL_TOP,
        payload:{
            missionSearchScrollTop
        }
    })
}