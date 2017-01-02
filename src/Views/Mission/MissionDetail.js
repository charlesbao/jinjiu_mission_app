/**
 * Created by chalresbao on 16/12/6.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List';

import {Box} from '../../Components/FlexBox'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'
import LoadingMask from '../../Components/LoadingMask'
import DeleteAlertDialog from '../../Components/DeleteAlertDialog'

import First from './MissionDetail/First'
import Second from './MissionDetail/Second'
import Third from './MissionDetail/Third'
import { MissionBottomNavBar,MissionHeader,MissionIcon,MissionDetailButtonGroup } from './MissionDetail/Components'

import PostActions from '../../Actions/PostActions'
import ACTION_TYPE from '../../Constants/ActionType'
import CONSTANTS from '../../Constants'

import "../../Styles/MissionDetail.css"

class MissionDetailSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading:false,
            showDelete:false,
            currentDetail:CONSTANTS.DETAIL_TABS.DETAIL,
            top:185
        }
    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            this.setState({
                loading:false,
                showDelete:false
            })
        });
        this.setState({
            top:118 + document.getElementById('mission--wrapper').offsetHeight
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render() {
        const {currentMission,currentProcess,currentFavour} = this.props;
        return (
            <ContainerWithBackBar title="任务详情">
                <LoadingMask show={this.state.loading}/>
                <DeleteAlertDialog open={this.state.showDelete}
                                   deleteClose={this.handleDelete.bind(this)}
                                   close={this.handleClose.bind(this)}
                                   label="任务已超出三小时未提交，请重新开始任务"/>
                <Box className="mission-detail--wrapper">
                    <MissionIcon attribute={currentMission['attribute']}/>
                    <MissionHeader missionDetail={currentMission} />
                </Box>
                <MissionDetailButtonGroup currentDetail={this.state.currentDetail}
                                          onTap={this.buttonGroupTapHandle.bind(this)}/>

                <ScrollView style={{top:this.state.top,bottom:55,paddingTop:15}}>{ this.renderView() }</ScrollView>

                <MissionBottomNavBar isEnd={currentMission['isEnd']}
                                     missionButtonType={currentProcess}
                                     hasFavour={currentFavour}
                                     favourTap={this.favourTapHandle.bind(this)}
                                     missionTap={this.missionTapHandle.bind(this)} />
            </ContainerWithBackBar>
        )
    }
    renderView(){
        const {currentMission} = this.props;
        switch (this.state.currentDetail){
            case CONSTANTS.DETAIL_TABS.DETAIL:
            default:
                return <First instruction={currentMission['instruction']}
                              tutorial={currentMission['tutorial']} />;

            case CONSTANTS.DETAIL_TABS.EVALUATE:
                return <Second missionId={currentMission['id']} />

            case CONSTANTS.DETAIL_TABS.RECOMMEND:
                return <Third attribute={currentMission['attribute']}
                              missionId={currentMission['id']}
                              onTap={this.linkToOtherMission.bind(this)}/>

        }
    }

    handleClose(){
        this.setState({
            showDelete:false,
        })
    }

    handleDelete(){
        const {currentUserMissionId} = this.props;
        this.props.restartCurrentMission(currentUserMissionId);
        this.setState({
            loading:true
        })
    }

    buttonGroupTapHandle(event){
        if(this.state.currentDetail !== event)
            this.setState({
                currentDetail:event
            })
    }

    favourTapHandle(){
        const {currentMission,currentUserMissionId,currentFavour,currentProcess} = this.props;
        this.props.postUpdateUserMission(currentUserMissionId,currentMission['id'],!currentFavour,currentProcess,null);
        this.setState({
            loading:true
        });
    }
    missionTapHandle(){
        const {currentMission,currentUserMissionId,currentFavour,currentProcess} = this.props;
        switch (currentProcess){
            case CONSTANTS.MISSION_CONDITION.ON_PREPARE:
            default:
                this.props.postUpdateUserMission(currentUserMissionId,currentMission['id'],currentFavour,CONSTANTS.MISSION_CONDITION.ON_PROGRESS,new Date());
                this.setState({
                    loading:true
                });
                break;
            case CONSTANTS.MISSION_CONDITION.ON_PROGRESS:
                this.props.setCurrentUserMissionId(currentUserMissionId)
                this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_POST);
                break;
            case CONSTANTS.MISSION_CONDITION.ON_DESTROY:
                this.setState({
                    showDelete:true
                })

        }
    }

    linkToOtherMission(currentMission){
        setTimeout(()=>{
            this.setState({
                currentDetail:CONSTANTS.DETAIL_TABS.DETAIL
            });
            this.props.setCurrentMission(currentMission)
        },200)
    }
}

MissionDetailSection.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

MissionDetailSection.propTyes = {
    currentMission:React.PropTypes.object,
    currentUserMissionId: React.PropTypes.string,
    currentFavour: React.PropTypes.bool,
    currentProcess: React.PropTypes.number
};

const mapState = (state)=>{
    const currentMission = state.MissionReducer.currentMission;
    const userMission = state.UserReducer.userMission;

    let userMissionId = null;
    let favour = false;
    let process = 0;
    for(let i in userMission){
        if(userMission[i]['mission']['id'] == currentMission['id']){
            userMissionId = userMission[i]['id']
            favour = userMission[i]['favor']
            process = userMission[i]['process']
            break;
        }
    }
    return {
        currentMission:currentMission,
        currentUserMissionId:userMissionId,
        currentFavour:favour,
        currentProcess:process
    }
}

const mapDispatch = (dispatch)=>{
    return {
        restartCurrentMission:(currentUserMissionId)=>{
            PostActions.postRestartCurrentMission(currentUserMissionId,(userMission)=>{
                dispatch({
                    type:ACTION_TYPE.USER_ACTIONS.POST_UPDATE_USER_MISSION,
                    userMission:userMission
                })
            })
        },
        setCurrentUserMissionId:(currentUserMissionId)=>{
            dispatch({
                type:ACTION_TYPE.USER_ACTIONS.SET_CURRENT_USER_MISSION_ID,
                currentUserMissionId:currentUserMissionId
            })
        },
        setCurrentMission:(currentMission)=>{
            dispatch({
                type:ACTION_TYPE.MISSION_ACTIONS.SET_CURRENT_MISSION,
                currentMission:currentMission
            })
        },
        postUpdateUserMission:(userMissionId,missionId,favour,process,missionCreatedAt)=>{
            PostActions.postUpdateUserMission(userMissionId,missionId,favour,process,missionCreatedAt,(userMission)=>{
                dispatch({
                    type:ACTION_TYPE.USER_ACTIONS.POST_UPDATE_USER_MISSION,
                    userMission:userMission
                })
            })
        }
    }
}

export default connect(mapState,mapDispatch)(MissionDetailSection)