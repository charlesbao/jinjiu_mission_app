/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import Measure from 'react-measure'
import AvatarEditor from 'react-avatar-editor'
import {connect} from 'react-redux'
import {Box} from '../../Components/FlexBox'
import Slider from 'material-ui/Slider';

import DropZone from 'react-dropzone'
import RaisedButton from 'material-ui/RaisedButton'
import Alert from '../../Components/AlertDialog'
import LoadingMask from '../../Components/LoadingMask'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'

import Dispatcher from '../../Models/Dispatcher'
import {postChangeAvatar} from '../../Models/Actions/UserActions'

// <Avatar
// src={this.state.avatar || require('../../assets/avatar.png')}
// style={{border:"5px solid white"}}
// size={100}
//     />
class AvatarSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            square:-1,
            alert:null,
            loading:false,
            step:0,
            files:[],
            imgScale:12,
            avatar:this.props.user.get('avatar') ? this.props.user.get('avatar').get('url') : null
    };

    }
    onDrop (files) {
        if(files.length === 0){
            this.setState({alert:"图片大小不大于2MB"})
        }else{
            this.setState({step:1, avatar:files[0].preview,});
        }
    }

    onSelect(){
        this.refs.dropzone.open()
    }

    render() {
        return (
            <ContainerWithBackBar title="头像">
                <Alert open={this.state.alert !== null}
                       close={this.handleClose.bind(this)}
                       content={this.state.alert}/>
                <LoadingMask show={this.state.loading} />
                <DropZone ref="dropzone"
                          multiple={false}
                          style={{display:'hidden'}}
                          maxSize={1024*1024*2}
                          accept={'image/*'}
                          onDrop={this.onDrop.bind(this)} />
                <Measure onMeasure={(dimensions) => this.setState({square: dimensions['width']})}>
                    {this.renderView()}
                </Measure>
            </ContainerWithBackBar>
        )
    }

    renderView(){
        if(this.state.step === 0){
            return (
                <div style={{textAlign:'center'}}>
                    <img style={{width:this.state.square, height:this.state.square}}
                         src={this.state.avatar || require('../../assets/avatar.png')} />
                    <Box style={{padding:"20px 15px"}}>
                        <RaisedButton onTouchTap={this.onSelect.bind(this)}
                                      label="从相册选取一张照片"
                                      fullWidth={true} />
                    </Box>
                </div>
            )
        }else{
            return (
                <div style={{textAlign:'center'}}>
                    <AvatarEditor
                            ref="editor"
                            image={this.state.avatar || require('../../assets/avatar.png')}
                            width={200}
                            height={200}
                            style={{
                                width:this.state.square,
                                height:this.state.square
                            }}
                            color={[0,0,0,0.5]} // RGBA
                            scale={this.state.imgScale / 10}
                    />
                    <Slider min={5}
                            max={20}
                            sliderStyle={{margin:0}}
                            style={{marginTop:-27,padding: "0 15px",}}
                            value={this.state.imgScale}
                            onChange={this.handleSlider.bind(this)} />
                    <Box style={{padding:"30px 15px"}}>
                        <RaisedButton onTouchTap={this.onTapHandle.bind(this)}
                                      secondary={true}
                                      label="确 定"
                                      fullWidth={true} />
                    </Box>
                </div>
            )
        }
    }

    handleSlider(evt,value){
        this.setState({imgScale: value});
    }

    handleClose(){
        if(this.state.alert === "头像修改成功!"){
            this.setState({
                alert:null,
                step:0,
                avatar:this.props.user.get('avatar').get('url')
            });
            // setTimeout(()=>this.context.router.goBack(),500)
        }else{
            this.setState({alert:null});
        }

    }

    onTapHandle(){
        const canvasScaled = this.refs.editor.getImageScaledToCanvas();
        const base64File = canvasScaled.toDataURL("image/png");
        this.setState({loading:true});
        this.props.actions.postChangeAvatar(base64File,(error)=>{
            if(error !== null){
                this.setState({loading:false, alert:error})
            }else{
                this.setState({loading:false, alert:'头像修改成功!'})
            }
        });
    }
}

AvatarSection.contextTypes = {
    router: React.PropTypes.object
};

export default connect((state)=>({
    user:state.UserReducer.user
}),Dispatcher({
    postChangeAvatar
}))(AvatarSection)