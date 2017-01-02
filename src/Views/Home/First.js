/**
 * Created by chalresbao on 16/12/22.
 */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import {connect} from 'react-redux'

import { Wrapper } from '../../Components/FlexBox'
import Carousel from '../../Components/Carousel'
import PopupTab from '../../Components/PopupTab'
import MissionList from '../../Components/MissionList'
import ScrollListWithRefresh from '../../Components/ScrollListWithRefresh'
import QueryAction from '../../Actions/QueryActions'

import ACTION_TYPE from '../../Constants/ActionType'
import CONSTANTS from '../../Constants'

class First extends Component {

    render(){
        const [topFilter,subFilter] = this.props.filterIndex;
        return (
            <Wrapper>
                <Paper>
                    <Carousel onSearchBarTap={this.searchBarTapHandle.bind(this)} />
                    <PopupTab topFilter={topFilter}
                              subFilter={subFilter}
                              onPopupTap={this.onPopupTapHandle.bind(this)} />
                </Paper>

                <ScrollListWithRefresh ref="scroll"
                                       startY={this.props.missionListScrollTop}
                                       initFresh={this.props.initFresh}
                                       loadMore={this.loadMoreHandle.bind(this)}
                                       onRefresh={this.refreshHandle.bind(this)}
                                       style={{top:document.body.clientWidth/2 + 32,bottom:56}}>
                    <MissionList list={this.props.missionArray} onListTap={this.onListTapHandle.bind(this)}/>
                </ScrollListWithRefresh>
            </Wrapper>
        )
    }

    refreshHandle(callback) {
        this.props.queryMissions(this.props.loadedMissionPage,this.props.filterIndex,callback)
    }

    loadMoreHandle(callback) {
        this.props.queryMissions(this.props.loadedMissionPage + 1,this.props.filterIndex,callback)
    }
    onPopupTapHandle(topFilter,subFilter){
        this.props.setMissionListScrollTop(this.refs.scroll.getScrollTop())
        this.props.setFilterIndex(topFilter,subFilter)
    }

    onListTapHandle(currentMission){
        this.props.setMissionListScrollTop(this.refs.scroll.getScrollTop())
        this.props.setCurrentMission(currentMission)
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL)
    }

    searchBarTapHandle(){
        this.props.setMissionListScrollTop(this.refs.scroll.getScrollTop())
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.SEARCH)
    }
}

First.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

const mapState = (state)=>{
    const filterIndex = state.StateReducer.filterIndex;
    const filterKey = filterIndex.toString();

    let scrollTop = 0;
    let missionArray = [];
    let missionPage = 1;
    let init = true;

    if(state.MissionReducer.missionDict.hasOwnProperty(filterKey)){
        const dict = state.MissionReducer.missionDict[filterKey];
        scrollTop = state.StateReducer.missionListScrollTop[filterKey];
        missionArray = dict.array;
        missionPage = dict.page;
        init = false
    }
    return {
        missionArray:missionArray,
        filterIndex:filterIndex,
        initFresh: init,
        loadedMissionPage:missionPage,
        missionListScrollTop:scrollTop
    }
};

const mapDispatch = (dispatch)=>({
    queryMissions:(page,filterIndex,callback)=>{
        QueryAction.queryMissions(page,filterIndex,(missions)=>{
            dispatch({
                type:ACTION_TYPE.MISSION_ACTIONS.QUERY_MISSION,
                missionArray:missions,
                page:page,
                filterKey:filterIndex
            });
            callback()
        })
    },
    setCurrentMission:(currentMission)=>{
        dispatch({
            type:ACTION_TYPE.MISSION_ACTIONS.SET_CURRENT_MISSION,
            currentMission:currentMission
        })
    },
    setMissionListScrollTop:(scrollTop)=>{
        dispatch({
            type:ACTION_TYPE.STATE_ACTIONS.SET_MISSION_LIST_SCROLL_TOP,
            data:scrollTop
        })
    },
    setFilterIndex:(topFilter,subFilter)=>{
        dispatch({
            type:ACTION_TYPE.STATE_ACTIONS.SET_FILTER_INDEX,
            data:[topFilter,subFilter]
        })
    },
});

export default connect(mapState,mapDispatch)(First);