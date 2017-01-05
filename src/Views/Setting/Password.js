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
import {postUpdatePassword} from '../../Models/Actions/UserActions'

const styles = {
    wrapper: {
        padding: 15
    },
    buttonGroup: {
        paddingTop:15
    }
}
class PasswordSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alert:null,
            loading:false,
            password:"",
            newPassword:"",
            re_newPassword:""
        };

    }

    render() {
        return (
            <ContainerWithBackBar title="账户密码">
                <Alert open={this.state.alert !== null}
                       close={this.handleClose.bind(this)}
                       content={this.state.alert}/>
                <LoadingMask show={this.state.loading} />
                <ScrollView style={{top:45}}>
                    <Box style={styles.wrapper}>
                        <TextField
                            fullWidth={true}
                            type="password"
                            hintText="输入原密码"
                            value={this.state.password}
                            onChange={this.handleChange.bind(this,'password')}
                            floatingLabelText="原密码"
                            floatingLabelFixed={true}
                        />
                        <TextField
                            fullWidth={true}
                            type="password"
                            hintText="输入新密码"
                            value={this.state.newPassword}
                            onChange={this.handleChange.bind(this,'newPassword')}
                            floatingLabelText="新密码"
                            floatingLabelFixed={true}
                        />
                        <TextField
                            fullWidth={true}
                            type="password"
                            hintText="确认新密码"
                            value={this.state.re_newPassword}
                            onChange={this.handleChange.bind(this,'re_newPassword')}
                            floatingLabelText="确认密码"
                            floatingLabelFixed={true}
                        />
                        <Box style={styles.buttonGroup}>
                            <RaisedButton onTouchTap={this.onTapHandle.bind(this)} label="修 改" secondary={true} fullWidth={true} />
                        </Box>
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleClose(){
        if(this.state.alert === "密码修改成功!")setTimeout(()=>this.context.router.goBack(),500)
        this.setState({alert:null});
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    onTapHandle(){
        this.setState({loading:true})
        this.props.actions.postUpdatePassword(
            this.props.user.get('username'),
            this.state.password,
            this.state.newPassword,
            this.state.re_newPassword,(error)=>{
                if(error === null){
                    this.setState({loading:false, alert:'密码修改成功!'});
                }else{
                    this.setState({loading:false, alert:error})
                }
            }
        )
    }
}

PasswordSection.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

export default connect((state)=>({
    user:state.UserReducer.user
}),Dispatcher({
    postUpdatePassword
}))(PasswordSection)