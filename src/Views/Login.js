/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import {connect} from "react-redux"
import { Wrapper, Box } from '../Components/FlexBox'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Alert from '../Components/AlertDialog'
import LoadingMask from '../Components/LoadingMask'

import avatar from '../assets/avatar.png'
import CONSTANTS from '../Constants'

import Dispatcher from '../Models/Dispatcher'
import {postUserLogin} from '../Models/Actions/UserActions'

import "../Styles/Login.css"

const loginButton = {
    width:200,
    margin:5
};

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            alert:null,
            loading:false,
            username:"",
            password:""
        }
    }

    render() {
        return (
            <Wrapper>
                <LoadingMask show={this.state.loading} />
                <Alert open={this.state.alert !== null}
                       close={()=>this.setState({alert:null})}
                       content={this.state.alert}/>
                <div className="login-form">
                    <div className="login-form--inside login-form--avatar"><Avatar src={avatar} size={120}/></div>
                    <div className="login-form--inside">
                        <TextField value={this.state.username} onChange={this.handleChange.bind(this,'username')}
                                   hintText="输入账户" floatingLabelText="账户" floatingLabelFixed={true}/>
                    </div>
                    <div className="login-form--inside">
                        <TextField value={this.state.password} onChange={this.handleChange.bind(this,'password')}
                                   hintText="输入密码" floatingLabelText="密码" floatingLabelFixed={true} type="password"/>
                    </div>
                    <div className="login-form--inside login-form--button" style={{marginTop:15}}>
                        <FlatButton onTouchTap={this.handleLogin.bind(this)} label="登陆" style={loginButton} labelStyle={{color:"white"}} backgroundColor="rgb(0, 188, 212)" hoverColor="rgb(0, 188, 212)" />
                    </div>
                    <div className="login-form--inside login-form--button">
                        <FlatButton onTouchTap={this.handleRegister.bind(this)} label="注册" primary={true} style={loginButton} />
                    </div>
                </div>
                <div className="login--footer">
                    <div className="login--copyRight">Copyright © 2015-2016 有鲸余</div>
                </div>
            </Wrapper>
        );
    }



    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    handleRegister(){
        this.context.router.push(CONSTANTS.ROUTER_PATH.REGISTER)
    }

    handleLogin(){
        this.setState({loading:true});
        this.props.actions.postUserLogin(this.state.username,this.state.password,(error)=>{
            if(error === null){
                this.context.router.replace(CONSTANTS.ROUTER_PATH.HOME)
            }else{
                this.setState({loading:false, alert:error});
            }
        });
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
};

export default connect(()=>({}),Dispatcher({
    postUserLogin
}))(Login)