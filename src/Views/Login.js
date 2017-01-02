/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import {connect} from "react-redux"

import { Wrapper, Box } from '../Components/FlexBox'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

import avatar from '../assets/avatar.png'
import PostAction from '../Actions/PostActions'
import QueryAction from '../Actions/QueryActions'

import CONSTANTS from '../Constants'
import ActionType from '../Constants/ActionType'

import "../Styles/Login.css"

const loginButton = {
    width:200,
    margin:5
};

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username:"",
            password:""
        }
    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            if(this.props.user != null)
                this.context.router.push(CONSTANTS.ROUTER_PATH.HOME)
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        return (
            <Wrapper>
                <Box className="login-form">
                    <Box className="login-form--inside login-form--avatar"><Avatar src={avatar} size={120}/></Box>
                    <Box className="login-form--inside">
                        <TextField value={this.state.username} onChange={this.handleChange.bind(this,'username')}
                                   hintText="输入账户" floatingLabelText="账户" floatingLabelFixed={true}/>
                    </Box>
                    <Box className="login-form--inside">
                        <TextField value={this.state.password} onChange={this.handleChange.bind(this,'password')}
                                   hintText="输入密码" floatingLabelText="密码" floatingLabelFixed={true} type="password"/>
                    </Box>
                    <Box className="login-form--inside login-form--button" style={{marginTop:15}}>
                        <FlatButton onTouchTap={this.handleLogin.bind(this)} label="登陆" style={loginButton} labelStyle={{color:"white"}} backgroundColor="rgb(0, 188, 212)" hoverColor="rgb(0, 188, 212)" />
                    </Box>
                    <Box className="login-form--inside login-form--button">
                        <FlatButton onTouchTap={this.handleRegister.bind(this)} label="注册" primary={true} style={loginButton} />
                    </Box>
                </Box>
                <Box className="login--footer">
                    <Box className="login--copyRight">Copyright © 2015-2016 有鲸余</Box>
                </Box>
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
        this.props.postUserLogin(this.state.username,this.state.password)
    }
}

Login.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

const mapState = (state)=>{
    return {}
};

const mapDispatch = (dispatch)=>{
    return {
        postUserLogin: (username,password)=>{
            PostAction.postUserLogin(username, password, (currentUser) => {
                QueryAction.queryUserMission((userMission)=>{
                    dispatch({
                        type: ActionType.USER_ACTIONS.POST_USER_LOGIN,
                        user: currentUser,
                        mission: userMission
                    })
                })

            });
        },
    }
};

export default connect(mapState,mapDispatch)(Login)