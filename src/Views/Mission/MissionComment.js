/**
 * Created by chalresbao on 17/1/2.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import ContainerWithBackBar from '../ContainerWithBackBar'
import LoadingMask from '../../Components/LoadingMask'
import Alert from '../../Components/AlertDialog'
import ScrollView from '../../Components/ScrollView'

import Dispatcher from '../../Models/Dispatcher'
import { postMissionComment } from '../../Models/Actions/UserActions';

import '../../Styles/MissionComment.css'
class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert:null,
            loading:false,
            comment:""
        };
    }

    render() {
        return (

            <ContainerWithBackBar title="评论">
                <Alert open={this.state.alert !== null}
                       close={this.handleChange.bind(this)}
                       content={this.state.alert}/>
                <LoadingMask show={this.state.loading}/>
                <ScrollView style={{top:45}}>
                    <div className="mission-comment-first--title">
                        <i className="mission-comment-first--icon" />
                        <span>任务标题</span>
                    </div>
                    <div className="mission-comment-title">{this.props.currentMission['title']}</div>
                    <div className="mission-comment-wrapper">
                        <TextField
                            fullWidth={true}
                            floatingLabelText="评论此任务"
                            floatingLabelFixed={true}
                            hintText="填写此任务相关评论"
                            value={this.state.comment}
                            onChange={this.handleChange.bind(this,'comment')}
                            multiLine={true}
                            rows={1}
                            rowsMax={5}/>
                        <RaisedButton label="提交评论"
                                      style={{marginTop:15}}
                                      secondary={true}
                                      fullWidth={true}
                                      onTouchTap={this.onPostComment.bind(this)}/>
                    </div>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleClose(){
        if(this.state.alert === "评论成功!")setTimeout(()=>this.context.router.goBack(),500)
        this.setState({alert:null});
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    onPostComment(){
        this.setState({loading:true});
        const {currentMission,currentUserMissionId} = this.props;
        this.props.actions.postMissionComment(currentUserMissionId,currentMission['id'],this.state.comment,(error)=>{
            if(error !== null){
                this.setState({loading:false, alert:error})
            }else{
                this.setState({loading:false, alert:'评论成功!'})
            }
        })
    }
}

Comment.contextTypes = {
    router: React.PropTypes.object
};

export default connect((state)=>({
    currentMission: state.MissionReducer.currentMission,
    currentUserMissionId: state.UserReducer.currentUserMissionId
}),Dispatcher({
    postMissionComment
}))(Comment)