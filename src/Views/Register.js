/**
 * Created by chalresbao on 16/12/16.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Wrapper} from '../Components/FlexBox'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Alert from '../Components/AlertDialog'
import LoadingMask from '../Components/LoadingMask'

import avatar from '../assets/avatar.png'
import CONSTANTS from '../Constants'

import Dispatcher from '../Models/Dispatcher'
import {postUserRegister} from '../Models/Actions/UserActions'
import "../Styles/Login.css"

const loginButton = {
    width:200,
    margin:5
};

class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            alert:null,
            loading:false,
            username:"",
            password:"",
            re_password:""
        }
    }

    render(){
        return (
            <Wrapper>
                <LoadingMask show={this.state.loading} />
                <Alert open={this.state.alert !== null}
                       close={()=>this.setState({alert:null})}
                       content={this.state.alert}/>
                <div className="register-form">
                    <div className="login-form--inside register-form--avatar"><Avatar src={avatar} size={100}/></div>
                    <div className="login-form--inside">
                        <TextField value={this.state.username} onChange={this.handleChange.bind(this,"username")}
                                   hintText="设置账户" floatingLabelText="账户" floatingLabelFixed={true}/></div>
                    <div className="login-form--inside">
                        <TextField value={this.state.password} onChange={this.handleChange.bind(this,"password")}
                                   hintText="设置密码" floatingLabelText="密码" floatingLabelFixed={true} type="password"/></div>
                    <div className="login-form--inside">
                        <TextField value={this.state.re_password} onChange={this.handleChange.bind(this,"re_password")}
                                   hintText="确认密码" floatingLabelText="确认密码" floatingLabelFixed={true} type="password"/></div>
                    <div className="login-form--inside register-form--button" style={{marginTop:15}}>
                        <FlatButton onTouchTap={this.handleRegister.bind(this)} label="确认注册" style={loginButton} labelStyle={{color:"white"}} backgroundColor="rgb(0, 188, 212)" hoverColor="rgb(0, 188, 212)" />
                    </div>
                    <div className="login-form--inside register-form--button">
                        <FlatButton onTouchTap={this.handleLogin.bind(this)} label="登陆" primary={true} style={loginButton} />
                    </div>
                </div>
                <div className="register--footer">
                    <div className="login--copyRight">Copyright © 2015-2016 有鲸余</div>
                </div>
            </Wrapper>
        )
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue;
        this.setState(dict)
    }

    handleLogin(){
        this.props.router.goBack()
    }

    handleRegister(){
        this.setState({loading:true});
        const {username,password,re_password} = this.state;
        this.props.actions.postUserRegister(username,password,re_password,(error)=>{
            if(error === null){
                this.context.router.replace(CONSTANTS.ROUTER_PATH.HOME)
            }else{
                this.setState({loading:false, alert:error});
            }
        });
    }
}

Register.contextTypes = {
    router: React.PropTypes.object
};

export default connect(()=>({}),Dispatcher({
    postUserRegister
}))(Register)