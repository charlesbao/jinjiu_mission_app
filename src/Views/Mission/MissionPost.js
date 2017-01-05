/**
 * Created by chalresbao on 17/1/1.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux'
import DropZone from 'react-dropzone'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import ContainerWithBackBar from '../../Views/ContainerWithBackBar'
import ScrollView from '../../Components/ScrollView'
import ScrollViewX from '../../Components/ScrollViewX'
import LoadingMask from '../../Components/LoadingMask'
import Alert from '../../Components/AlertDialog'
import Dispatcher from '../../Models/Dispatcher'
import { postMissionPost } from '../../Models/Actions/UserActions';

import '../../Styles/MissionPost.css'

class MissionPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert:null,
            loading:false,
            pics:[],
            comment:""
        };
    }

    onDrop (files) {
        if(files.length === 0){
            this.setState({
                alert:"图片大小不大于2MB"
            })
        }else{
            // let pics = this.state.pics.slice(0);
            // files.map((item)=>{
            //     pics.push(item.preview)
            // });
            this.setState({
                pics:files
            });
        }
    }

    onSelect(){
        this.refs.dropzone.open()
    }

    render(){
        const missionTutorial = this.props.currentMission['tutorial']
        return (
            <ContainerWithBackBar title="提交任务">
                <Alert open={this.state.alert !== null}
                       close={this.handleClose.bind(this)}
                       content={this.state.alert}/>
                <LoadingMask show={this.state.loading} />
                <DropZone ref="dropzone"
                          style={{display:'hidden'}}
                          maxSize={1024*1024*2}
                          accept={'image/*'}
                          onDrop={this.onDrop.bind(this)} />
                <ScrollView style={{top:45,bottom:0}}>
                    <div className="mission-post--scrollView">
                        <div className="mission-post-first--title">
                            <i className="mission-post-first--icon" />
                            <span>步骤说明</span>
                        </div>
                        <div className="mission-post--tutorial">
                            { missionTutorial }
                        </div>

                        <div className="mission-post--wrapper">
                            <div className="mission-post--picsLabel">反馈截图</div>
                            <div className="mission-post--picsWrapper">
                                {this.state.pics.length !== 0 && this.state.pics.map((item,i)=>{
                                    return <img key={i} style={{margin:"0px 10px 10px 0",float:'left',height:55,width:55}} src={item.preview} />
                                })}
                                <RaisedButton
                                    style={{minWidth:55,height:55}}
                                    onClick={this.onSelect.bind(this)}
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
                                    rows={1}
                                    rowsMax={5}/>
                            </div>
                            <div className="mission-post--buttonGroup">
                                <RaisedButton label="确认提交"
                                              secondary={true}
                                              onTouchTap={this.tapHandle.bind(this)}
                                              fullWidth={true}/>
                            </div>
                        </div>
                    </div>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleClose(){
        if(this.state.alert === "任务提交成功!")setTimeout(()=>this.context.router.goBack(),500)
        this.setState({alert:null});
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    tapHandle(){
        this.setState({loading:true});
        const {currentUserMissionId,currentMission} = this.props;
        const {pics,comment} = this.state;
        this.props.actions.postMissionPost(currentUserMissionId,currentMission['id'],pics,comment,(error)=>{
            if(error === null){
                this.setState({loading:false, alert:'任务提交成功!'});
            }else{
                this.setState({loading:false, alert:error});
            }
        })
    }
}

MissionPost.contextTypes = {
    router: React.PropTypes.object,
};

export default connect((state)=>({
    currentMission: state.MissionReducer.currentMission,
    currentUserMissionId: state.UserReducer.currentUserMissionId
}),Dispatcher({
    postMissionPost
}))(MissionPost)