/**
 * Created by chalresbao on 17/1/1.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import ContainerWithBackBar from '../../Views/ContainerWithBackBar'
import ScrollView from '../../Components/ScrollView'
import LoadingMask from '../../Components/LoadingMask'
import PostAction from '../../Actions/PostActions'
import ACTION_TYPE from '../../Constants/ActionType'
import CONSTANTS from '../../Constants'

import '../../Styles/MissionPost.css'
class MissionPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading:false,
            pics:[],
            comment:""
        };
    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            this.setState({
                loading:false
            })
            this.context.router.goBack()
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }
    render(){
        const missionTutorial = this.props.currentMission['tutorial']
        return (
            <ContainerWithBackBar title="提交任务">
                <LoadingMask show={this.state.loading} />
                <div className="mission-post-first--title">
                    <i className="mission-post-first--icon" />
                    <span>步骤说明</span>
                </div>
                <ScrollView style={{top:90,height:100}}>
                    <div className="mission-post--tutorial">
                        { missionTutorial }
                    </div>
                </ScrollView>
                <div className="mission-post--wrapper">
                    <div className="mission-post-first--title">
                        <i className="mission-post-first--icon" />
                        <span>任务反馈</span>
                    </div>
                    <div className="mission-post--picsLabel">反馈截图</div>
                    <div className="mission-post--picsWrapper">
                        <RaisedButton
                            style={{minWidth:60,height:55}}
                            onTouchTap={this.addPic.bind(this)}
                            icon={<FontIcon className="ion-plus" />}
                        />
                    </div>
                    <div className="mission-post--commentWrapper">
                        <TextField
                            fullWidth={true}
                            floatingLabelText="反馈备注"
                            floatingLabelFixed={true}
                            hintText="填写相关任务反馈备注信息"
                            value={this.state.comment}
                            onChange={this.handleChange.bind(this,'comment')}
                            multiLine={true}
                            rows={2}
                            rowsMax={2}/>
                    </div>
                    <div className="mission-post--buttonGroup">
                        <RaisedButton label="确认提交"
                                      secondary={true}
                                      onTouchTap={this.tapHandle.bind(this)}
                                      fullWidth={true}/>
                    </div>
                </div>
            </ContainerWithBackBar>
        )
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    addPic(){

    }
    tapHandle(){
        const {currentUserMissionId,currentMission} = this.props;
        const {pics,comment} = this.state
        this.props.postMissionPost(currentUserMissionId,currentMission['id'],pics,comment)
        this.setState({
            loading:true
        })
    }
}

MissionPost.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

const mapState = (state)=>{
    return {
        currentMission: state.MissionReducer.currentMission,
        currentUserMissionId: state.UserReducer.currentUserMissionId
    }
};

const mapDispatch = (dispatch)=>{
    return {
        postMissionPost:(currentUserMissionId,currentMissionId,pics,comment)=>{
            PostAction.postMissionPost(currentUserMissionId,currentMissionId,pics,comment,(userMission)=>{
                dispatch({
                    type:ACTION_TYPE.USER_ACTIONS.POST_UPDATE_USER_MISSION,
                    userMission:userMission
                })
            })
        }
    }
}

export default connect(mapState,mapDispatch)(MissionPost)