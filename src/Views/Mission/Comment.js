/**
 * Created by chalresbao on 17/1/2.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import ContainerWithBackBar from '../ContainerWithBackBar'
import AlertDialog from '../../Components/AlertDialog'
import LoadingMask from '../../Components/LoadingMask'
import ScrollView from '../../Components/ScrollView'
import PostAction from '../../Actions/PostActions'
import ACTION_TYPE from '../../Constants/ActionType'
import CONSTANTS from '../../Constants'


import '../../Styles/MissionComment.css'
class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading:false,
            comment:""
        };
    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            this.setState({
                loading:false,
                comment:""
            })
        })
    }
    componentWillUnmount(){
        this.unsubscribe()
    }
    render() {
        return (
            <ContainerWithBackBar title="评论">
                <LoadingMask show={this.state.loading}/>
                <div className="mission-comment-first--title">
                    <i className="mission-comment-first--icon" />
                    <span>任务标题</span>
                </div>
                <div className="mission-comment-title">{this.props.currentMission['title']}</div>
                <div className="mission-comment-first--title">
                    <i className="mission-comment-first--icon" />
                    <span>任务金额</span>
                </div>
                <div className="mission-comment-price">{this.props.currentMission['price'].toFixed(2)}<span className="mission-comment-price--label">元</span></div>
                <div className="mission-comment-wrapper">
                    <TextField
                        fullWidth={true}
                        floatingLabelText="评论此任务"
                        floatingLabelFixed={true}
                        hintText="填写此任务相关评论"
                        value={this.state.comment}
                        onChange={this.handleChange.bind(this,'comment')}
                        multiLine={true}
                        rows={2}
                        rowsMax={2}/>
                    <RaisedButton label="提交评论"
                                  style={{marginTop:15}}
                                  secondary={true}
                                  fullWidth={true}
                                  onTouchTap={this.onPostComment.bind(this)}/>
                </div>
            </ContainerWithBackBar>
        )
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    onPostComment(){
        const {currentMission} = this.props;
        const {comment} = this.state
        this.props.postComment(currentMission['id'],comment)
    }
}

Comment.contextTypes = {
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
        postComment:(missionId,comment)=>{
            PostAction.postComment(missionId,comment,(userMission)=>{
                dispatch({
                    type:ACTION_TYPE.USER_ACTIONS.POST_UPDATE_USER_MISSION,
                    userMission:userMission
                })
            })
        }
    }
}

export default connect(mapState,mapDispatch)(Comment)