/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Box} from '../../Components/FlexBox'

import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Alert from '../../Components/AlertDialog'
import LoadingMask from '../../Components/LoadingMask'

import Dispatcher from '../../Models/Dispatcher'
import {postRequestVerifyNumber,postUpdateUser,postVerifySmsNumber} from '../../Models/Actions/UserActions'

const styles = {
    wrapper: {
        padding: 15
    },
    buttonGroup: {
        paddingTop: 15
    },
    smsNumber: {
        width:"60%",
    },
    send: {
        width: "40%"
    }
}
class MobileSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alert:null,
            loading:false,
            mobilePhoneNumber:"",
            smsNumber:"",
        };
    }

    render() {
        return (
            <ContainerWithBackBar title="绑定手机号码">
                <Alert open={this.state.alert !== null}
                       close={this.handleClose.bind(this)}
                       content={this.state.alert}/>
                <LoadingMask show={this.state.loading} />
                <ScrollView style={{top:45}}>
                    <Box style={styles.wrapper}>
                        <TextField fullWidth={true}
                                   disabled={true}
                                   floatingLabelText="已绑定手机号"
                                   floatingLabelFixed={true}
                                   value={this.props.user.get('mobilePhoneNumber') || "未绑定任何手机号"}/>
                        <TextField
                            fullWidth={true}
                            type="tel"
                            hintText="输入手机号"
                            value={this.state.mobilePhoneNumber}
                            onChange={this.handleChange.bind(this,'mobilePhoneNumber')}
                            floatingLabelText="手机号"
                            floatingLabelFixed={true}
                        />
                        <TextField
                            style={styles.smsNumber}
                            hintText="输入验证码"
                            value={this.state.smsNumber}
                            onChange={this.handleChange.bind(this,'smsNumber')}
                            floatingLabelText="验证码"
                            floatingLabelFixed={true}
                        />
                        <FlatButton onTouchTap={this.onSendHandle.bind(this)}
                                    style={styles.send}
                                    label="发送验证码" primary={true} />
                        <Box style={styles.buttonGroup}>
                            <RaisedButton onTouchTap={this.onTapHandle.bind(this)} label="绑 定" secondary={true} fullWidth={true} />
                        </Box>
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleClose(){
        if(this.state.alert === "手机绑定成功!")setTimeout(()=>this.context.router.goBack(),500)
        this.setState({alert:null});
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    onSendHandle(){
        this.setState({loading:true});
        this.props.actions.postRequestVerifyNumber(this.state.mobilePhoneNumber,(error)=>{
            this.setState({loading:false,alert:error})
        });
    }

    onTapHandle(){
        this.setState({loading:true});
        this.props.actions.postVerifySmsNumber(this.state.smsNumber,this.state.mobilePhoneNumber,(error)=>{
            if(error === null){
                this.setState({loading:false,alert:'手机绑定成功!'});
            }else{
                this.setState({loading:false,alert:error})
            }
        });
    }
}

MobileSection.contextTypes = {
    router: React.PropTypes.object
};

export default connect((state)=>({
    user: state.UserReducer.user,
    requestVerifyNumber: state.UserReducer.requestVerifyNumber
}),Dispatcher({
    postRequestVerifyNumber,
    postUpdateUser,
    postVerifySmsNumber
}))(MobileSection)