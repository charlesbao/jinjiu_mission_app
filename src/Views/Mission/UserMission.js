/**
 * Created by chalresbao on 16/12/6.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Tabs, Tab} from 'material-ui/Tabs';
import UserMissionList from '../../Components/UserMissionList'
import ContainerWithBackBar from '../../Views/ContainerWithBackBar'
import ScrollView from '../../Components/ScrollView'

import CONSTANTS from '../../Constants'

import Dispatcher from '../../Models/Dispatcher'
import {setCurrentUserMissionId} from '../../Models/Actions/UserActions'
import {setCurrentMission} from '../../Models/Actions/MissionActions'
import {setCurrentUserMissionIndex} from '../../Models/Actions/StateActions'

const styles = {
    tabsStyle: {
        backgroundColor:"white",
        boxShadow:"0 1px 2px rgba(0,0,0,0.2)"
    },
    tabStyle: {
        color:"black",
    },
    inkBarStyle: {
        backgroundColor:"rgb(0, 188, 212)"
    },
    missionLabel: {
        fontSize: 14,
        position: "absolute",
        right: 50
    }
};

class MissionSection extends Component {

    render(){

        const props = {
            userMissionList: this.props.userMission,
            currentIndex: this.props.currentUserMissionIndex,
            comment: this.onCommentHandle.bind(this),
            onListTap: this.onTapHandle.bind(this),
            knowMore: this.onKnowMoreHandle.bind(this),
            rePost: this.onRePostHandle.bind(this)
        };

        return (
            <ContainerWithBackBar title="我的任务">
                <Tabs value={this.props.currentUserMissionIndex}
                      onChange={this.handleChange.bind(this)}
                      tabItemContainerStyle={styles.tabsStyle}
                      inkBarStyle={styles.inkBarStyle}>
                    <Tab label="进行中" value={CONSTANTS.MISSION_CONDITION.ON_PROGRESS} style={styles.tabStyle} />
                    <Tab label="审核中" value={CONSTANTS.MISSION_CONDITION.ON_CHECKING} style={styles.tabStyle} />
                    <Tab label="已结束" value={CONSTANTS.MISSION_CONDITION.ON_FINISH} style={styles.tabStyle} />
                </Tabs>
                <ScrollView style={{top:96}}>
                    <UserMissionList {...props} />
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    onKnowMoreHandle(commentBack){
        this.setState({
            alert:"【原因】"+commentBack
        })
    }

    onCommentHandle(currentUserMissionId,currentMission){
        this.props.actions.setCurrentUserMissionId(currentUserMissionId);
        this.props.actions.setCurrentMission(currentMission);
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.COMMENT)
    }

    onRePostHandle(currentUserMissionId,currentMission){
        this.props.actions.setCurrentUserMissionId(currentUserMissionId);
        this.props.actions.setCurrentMission(currentMission);
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_POST)
    }

    handleChange(index){
        this.props.actions.setCurrentUserMissionIndex(index)
    };

    onTapHandle(currentMission){
        this.props.actions.setCurrentMission(currentMission)
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL)
    }
}


MissionSection.contextTypes = {
    router: React.PropTypes.object
};


export default connect(createSelector(
    state => state.UserReducer.userMission,
    state => state.StateReducer.currentUserMissionIndex,
    (userMission,currentUserMissionIndex) => ({
        userMission,
        currentUserMissionIndex
    })
),Dispatcher({
    setCurrentUserMissionId,
    setCurrentMission,
    setCurrentUserMissionIndex
}))(MissionSection);