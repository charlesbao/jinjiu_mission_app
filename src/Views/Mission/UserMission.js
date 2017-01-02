/**
 * Created by chalresbao on 16/12/6.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';

import DeleteAlertDialog from '../../Components/DeleteAlertDialog'
import AlertDialog from '../../Components/AlertDialog'

import LoadingMask from '../../Components/LoadingMask'
import UserMissionList from '../../Components/UserMissionList'
import ContainerWithBackBar from '../../Views/ContainerWithBackBar'
import ScrollView from '../../Components/ScrollView'

import CONSTANTS from '../../Constants'
import ActionType from'../../Constants/ActionType';
import PostAction from '../../Actions/PostActions'

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

    constructor(props) {
        super(props);

        this.state = {
            loading:false,
            alert:'',
            deleteId:-1
        };
    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            this.setState({
                loading:false,
                alert:'',
                deleteId:-1
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render(){

        const props = {
            userMissionList: this.props.userMissionArray,
            currentIndex: this.props.currentUserMissionIndex,
            comment: this.onCommentHandle.bind(this),
            onListTap: this.onTapHandle.bind(this),
            knowMore: this.onKnowMoreHandle.bind(this),
            rePost: this.onRePostHandle.bind(this)
        };

        return (
            <ContainerWithBackBar title="我的任务">
                <LoadingMask show={this.state.loading} />
                <AlertDialog open={this.state.alert != ""}
                             close={()=>this.setState({alert:""})}
                             content={this.state.alert}/>
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

    onCommentHandle(currentUserMissionId,currentMission){
        this.props.setCurrentUserMissionId(currentUserMissionId);
        this.props.setCurrentMission(currentMission);
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.COMMENT)
    }

    onKnowMoreHandle(commentBack){
        this.setState({
            alert:"【原因】"+commentBack
        })
    }

    onRePostHandle(currentUserMissionId,currentMission){
        this.props.setCurrentUserMissionId(currentUserMissionId);
        this.props.setCurrentMission(currentMission);
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_POST)
    }

    handleChange(index){
        this.props.setCurrentUserMissionIndex(index)
    };

    onTapHandle(currentMission){
        this.props.setCurrentMission(currentMission)
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL)
    }
}


MissionSection.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

MissionSection.propTypes = {
    userMissionArray: React.PropTypes.array,
    currentUserMissionIndex: React.PropTypes.number
}

const mapState = (state)=>{
    const userMissionArray = state.UserReducer.userMission;
    return {
        currentUserMissionIndex: state.StateReducer.currentUserMissionIndex,
        userMissionArray:userMissionArray
    }
}

const mapDispatch = (dispatch)=>{
    return {
        setCurrentUserMissionId:(currentUserMissionId)=>{
            dispatch({
                type:ActionType.USER_ACTIONS.SET_CURRENT_USER_MISSION_ID,
                currentUserMissionId:currentUserMissionId
            })
        },
        setCurrentMission:(currentMission)=>{
            dispatch({
                type:ActionType.MISSION_ACTIONS.SET_CURRENT_MISSION,
                currentMission:currentMission
            })
        },
        setCurrentUserMissionIndex:(route)=>{
            dispatch({
                type:ActionType.STATE_ACTIONS.SET_CURRENT_USER_MISSION_INDEX,
                data:route
            })
        }
    }
}
export default connect(mapState,mapDispatch)(MissionSection);