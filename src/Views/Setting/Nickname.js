/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Box} from '../../Components/FlexBox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Alert from '../../Components/AlertDialog'
import LoadingMask from '../../Components/LoadingMask'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'
import Dispatcher from '../../Models/Dispatcher'
import {postUpdateUser} from '../../Models/Actions/UserActions'

class NicknameSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alert:null,
            loading:false,
            nickname:this.props.user.get('nickname')
        };
    }

    render() {
        return (
            <ContainerWithBackBar title="昵称">
                <Alert open={this.state.alert !== null}
                       close={this.handleClose.bind(this)}
                       content={this.state.alert}/>
                <LoadingMask show={this.state.loading} />
                <ScrollView style={{top:45}}>
                    <Box style={{padding:15}}>
                        <TextField
                            fullWidth={true}
                            hintText="输入昵称"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.nickname}
                            floatingLabelText="更改昵称"
                            floatingLabelFixed={true}
                        />
                        <Box style={{paddingTop:15}}>
                            <RaisedButton onTouchTap={this.onTapHandle.bind(this)} label="修 改" secondary={true} fullWidth={true} />
                        </Box>
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleClose(){
        if(this.state.alert === "昵称修改成功!")setTimeout(()=>this.context.router.goBack(),500)
        this.setState({alert:null});
    }

    handleChange(evt,newValue){
        this.setState({
            nickname:newValue
        })
    }

    onTapHandle(){
        this.setState({loading:true})
        this.props.actions.postUpdateUser({nickname:this.state.nickname},(error)=>{
            if(error === null){
                this.setState({loading:false, alert:'昵称修改成功!'})
            }else{
                this.setState({loading:false, alert:error})
            }
        });
    }
}

NicknameSection.contextTypes = {
    router: React.PropTypes.object
};


export default connect((state)=>({
    user:state.UserReducer.user
}),Dispatcher({
    postUpdateUser
}))(NicknameSection)