/**
 * Created by chalresbao on 16/12/22.
 */
import React, { Component } from 'react';
import Measure from 'react-measure'
import { createSelector } from 'reselect';
import Paper from 'material-ui/Paper'
import {connect} from 'react-redux'

import { Wrapper } from '../../Components/FlexBox'
import Carousel from '../../Components/Carousel'
import PopupTab from '../../Components/PopupTab'
import MissionList from '../../Components/MissionList'
import ScrollListWithRefresh from '../../Components/ScrollListWithRefresh'
import CONSTANTS from '../../Constants'
import Dispatcher from '../../Models/Dispatcher'
import {queryMissions,setCurrentMission} from '../../Models/Actions/MissionActions'
import {setFilterIndex,setMissionListScrollTop} from '../../Models/Actions/StateActions'
class First extends Component {

    constructor(props){
        super(props)

        this.state = {
            top:-1
        }
    }

    render(){
        const [topFilter,subFilter] = this.props.filterIndex;
        return (
            <Wrapper>
                <Measure onMeasure={(dimensions) => this.setState({top:dimensions['bottom']})}>
                    <Paper>
                        <Carousel onSearchBarTap={this.searchBarTapHandle.bind(this)} />
                        <PopupTab topFilter={topFilter}
                                  subFilter={subFilter}
                                  onPopupTap={this.onPopupTapHandle.bind(this)} />
                    </Paper>
                </Measure>
                <ScrollListWithRefresh ref="scroll"
                                       startY={this.props.missionListScrollTop}
                                       initFresh={this.props.initFresh}
                                       loadMore={this.loadMoreHandle.bind(this)}
                                       onRefresh={this.refreshHandle.bind(this)}
                                       style={{top:this.state.top,bottom:56}}>
                    <MissionList list={this.props.missionArray} onListTap={this.onListTapHandle.bind(this)}/>
                </ScrollListWithRefresh>
            </Wrapper>
        )
    }

    refreshHandle(callback) {
        this.props.actions.queryMissions(this.props.loadedMissionPage,this.props.filterIndex)
        callback()
    }

    loadMoreHandle(callback) {
        this.props.actions.queryMissions(this.props.loadedMissionPage + 1,this.props.filterIndex)
        callback()
    }
    onPopupTapHandle(topFilter,subFilter){
        this.props.actions.setMissionListScrollTop(this.refs.scroll.getScrollTop())
        this.props.actions.setFilterIndex(topFilter,subFilter)
    }

    onListTapHandle(currentMission){
        this.props.actions.setMissionListScrollTop(this.refs.scroll.getScrollTop())
        this.props.actions.setCurrentMission(currentMission)
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL)
    }

    searchBarTapHandle(){
        this.props.actions.setMissionListScrollTop(this.refs.scroll.getScrollTop())
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.SEARCH)
    }
}

First.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

export default connect(createSelector(
    state => state.MissionReducer.missionDict,
    state => state.StateReducer.filterIndex,
    state => state.StateReducer.missionListScrollTop,
    (missionDict,filterIndex,missionListScrollTop) => {
        const filterKey = filterIndex+'';

        let scrollTop = 0;
        let missionArray = [];
        let loadedMissionPage = 1;
        let initFresh = true;

        if(missionDict.hasOwnProperty(filterKey)){
            const {array,page} = missionDict[filterKey];
            scrollTop = missionListScrollTop[filterKey];
            missionArray = array;
            loadedMissionPage = page;
            initFresh = false
        }
        return {
            filterIndex,
            scrollTop,
            missionArray,
            loadedMissionPage,
            initFresh
        }
    }
),Dispatcher({
    queryMissions,
    setCurrentMission,
    setFilterIndex,
    setMissionListScrollTop
}))(First);
