/**
 * Created by chalresbao on 16/12/6.
 */
import React, {Component} from 'react'
import Measure from 'react-measure'
import {createSelector} from 'reselect'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List';

import {Box} from '../../Components/FlexBox'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'

import LoadingMask from '../../Components/LoadingMask'
import DeleteAlertDialog from '../../Components/DeleteAlertDialog'
import Alert from '../../Components/AlertDialog'

import First from './MissionDetail/First'
import Second from './MissionDetail/Second'
import Third from './MissionDetail/Third'
import { MissionBottomNavBar,MissionHeader,MissionIcon,MissionDetailButtonGroup } from './MissionDetail/Components'

import CONSTANTS from '../../Constants'

import Dispatcher from '../../Models/Dispatcher'
import { postRestartCurrentMission, postUpdateUserMission, setCurrentUserMissionId } from '../../Models/Actions/UserActions';
import { queryRelatedMissions, queryCurrentMissionComments, setCurrentMission } from '../../Models/Actions/MissionActions'

import "../../Styles/MissionDetail.css"

class MissionDetailSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alert:null,
            loading:false,
            showDelete:false,
            currentDetail:CONSTANTS.DETAIL_TABS.DETAIL,
            top:185
        }
    }

    componentDidMount(){
        this.setState({loading: true});
        this.props.actions.queryCurrentMissionComments(this.props.currentMission['id'], (error) => {
            this.setState({alert:error});
            this.props.actions.queryRelatedMissions(this.props.currentMission['id'],this.props.currentMission['attribute'], (error) => {
                this.setState({loading: false, alert: error});
            })
        })

    }

    render() {
        const {currentMission,currentProcess,currentFavor} = this.props;
        return (
            <ContainerWithBackBar title="任务详情">
                <Alert open={this.state.alert !== null}
                       close={()=>this.setState({alert:null})}
                       content={this.state.alert}/>
                <LoadingMask show={this.state.loading}/>
                <DeleteAlertDialog open={this.state.showDelete}
                                   deleteClose={this.handleDelete.bind(this)}
                                   close={()=>this.setState({showDelete:false})}
                                   label="任务已超出三小时未提交，请重新开始任务"/>
                <Measure onMeasure={(dimensions) => this.setState({top:dimensions['bottom']})}>
                    <div>
                        <Box className="mission-detail--wrapper">
                            <MissionIcon attribute={currentMission['attribute']}/>
                            <MissionHeader missionDetail={currentMission} />
                        </Box>
                        <MissionDetailButtonGroup currentDetail={this.state.currentDetail}
                                                  onTap={this.buttonGroupTapHandle.bind(this)}/>
                    </div>
                </Measure>
                <ScrollView scrollbarShow={true} style={{top:this.state.top,bottom:55,paddingTop:15}}>{ this.renderView() }</ScrollView>

                <MissionBottomNavBar canBeRepeat={currentMission['canBeRepeat']}
                                     isEnd={currentMission['isEnd']}
                                     missionButtonType={currentProcess}
                                     hasFavour={currentFavor}
                                     favourTap={this.favourTapHandle.bind(this)}
                                     missionTap={this.missionTapHandle.bind(this)} />
            </ContainerWithBackBar>
        )
    }
    renderView(){
        const {currentMission,currentMissionComments,relatedMissions} = this.props;
        switch (this.state.currentDetail){
            case CONSTANTS.DETAIL_TABS.DETAIL:
            default:
                return <First instruction={currentMission['instruction']}
                              tutorial={currentMission['tutorial']} />;

            case CONSTANTS.DETAIL_TABS.EVALUATE:
                return <Second list={currentMissionComments}/>

            case CONSTANTS.DETAIL_TABS.RECOMMEND:
                return <Third list={relatedMissions}
                              onTap={this.linkToOtherMission.bind(this)}/>

        }
    }

    handleDelete(){
        this.setState({loading:true});
        const {currentUserMissionId} = this.props;
        this.props.actions.postRestartCurrentMission(currentUserMissionId,(error)=>{
            this.setState({loading:false, showDelete:false, alert:error});
        });
    }

    buttonGroupTapHandle(event){
        if(this.state.currentDetail !== event) this.setState({currentDetail:event})
    }

    favourTapHandle(){
        this.setState({loading:true});
        const {currentMission,currentUserMissionId,currentFavor,currentProcess} = this.props;
        this.props.actions.postUpdateUserMission(currentUserMissionId,currentMission['id'],!currentFavor,currentProcess,false,(error)=>{
            this.setState({loading:false, alert:error});
        });
    }
    missionTapHandle(){
        const {currentMission,currentUserMissionId,currentFavor,currentProcess} = this.props;
        switch (currentProcess){
            case CONSTANTS.MISSION_CONDITION.ON_PREPARE:
            default:
                this.setState({loading:true});
                this.props.actions.postUpdateUserMission(currentUserMissionId,currentMission['id'],currentFavor,CONSTANTS.MISSION_CONDITION.ON_PROGRESS,true,(error)=>{
                    this.setState({loading:false, alert:error})
                });
                break;
            case CONSTANTS.MISSION_CONDITION.ON_PROGRESS:
                this.props.actions.setCurrentUserMissionId(currentUserMissionId)
                this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_POST);
                break;
            case CONSTANTS.MISSION_CONDITION.ON_DESTROY:
                this.setState({showDelete:true});
                break;
        }
    }

    linkToOtherMission(currentMission){
        setTimeout(()=>{
            this.setState({currentDetail:CONSTANTS.DETAIL_TABS.DETAIL});
            this.props.actions.setCurrentMission(currentMission)
        },200)
    }
}

MissionDetailSection.contextTypes = {
    router: React.PropTypes.object
};

MissionDetailSection.propTyes = {
    currentMission:React.PropTypes.object,
    currentUserMissionId: React.PropTypes.string,
    currentFavor: React.PropTypes.bool,
    currentProcess: React.PropTypes.number
};

export default connect(createSelector(
    state => state.MissionReducer.currentMissionComments,
    state => state.MissionReducer.relatedMissions,
    state => state.MissionReducer.currentMission,
    state => state.UserReducer.userMission,
    (currentMissionComments,relatedMissions,currentMission,userMission) => {
        let userMissionId = null;
        let favor = false;
        let process = 0;
        for(let i in userMission){
            if(userMission[i]['mission']['id'] == currentMission['id']){
                userMissionId = userMission[i]['id']
                favor = userMission[i]['favor']
                process = userMission[i]['process']
                break;
            }
        }
        return {
            currentMissionComments: currentMissionComments,
            relatedMissions: relatedMissions,
            currentMission:currentMission,
            currentUserMissionId:userMissionId,
            currentFavor:favor,
            currentProcess:process
        }
    }
),Dispatcher({
    postRestartCurrentMission,
    postUpdateUserMission,
    setCurrentUserMissionId,
    setCurrentMission,
    queryCurrentMissionComments,
    queryRelatedMissions
}))(MissionDetailSection)