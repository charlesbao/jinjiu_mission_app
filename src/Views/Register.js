/**
 * Created by chalresbao on 16/12/16.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Wrapper, Box} from '../Components/FlexBox'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

import avatar from '../assets/avatar.png'

import PostActions from '../Actions/PostActions'
import CONSTANTS from '../Constants'
import ActionType from '../Constants/ActionType'

import "../Styles/Login.css"

const loginButton = {
    width:200,
    margin:5
};

class Register extends Component {

    constructor(props){
        super(props)

        this.state = {
            username:"",
            password:"",
            re_password:""
        }
    }
    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            this.context.router.push(CONSTANTS.ROUTER_PATH.HOME)
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render(){
        return (
            <Wrapper>
                <Box className="register-form">
                    <Box className="login-form--inside register-form--avatar"><Avatar src={avatar} size={100}/></Box>
                    <Box className="login-form--inside">
                        <TextField value={this.state.username} onChange={this.handleChange.bind(this,"username")}
                                   hintText="设置账户" floatingLabelText="账户" floatingLabelFixed={true}/></Box>
                    <Box className="login-form--inside">
                        <TextField value={this.state.password} onChange={this.handleChange.bind(this,"password")}
                                   hintText="设置密码" floatingLabelText="密码" floatingLabelFixed={true} type="password"/></Box>
                    <Box className="login-form--inside">
                        <TextField value={this.state.re_password} onChange={this.handleChange.bind(this,"re_password")}
                                   hintText="确认密码" floatingLabelText="确认密码" floatingLabelFixed={true} type="password"/></Box>
                    <Box className="login-form--inside register-form--button" style={{marginTop:15}}>
                        <FlatButton onTouchTap={this.handleRegister.bind(this)} label="确认注册" style={loginButton} labelStyle={{color:"white"}} backgroundColor="rgb(0, 188, 212)" hoverColor="rgb(0, 188, 212)" />
                    </Box>
                    <Box className="login-form--inside register-form--button">
                        <FlatButton onTouchTap={this.handleLogin.bind(this)} label="登陆" primary={true} style={loginButton} />
                    </Box>
                </Box>
                <Box className="register--footer">
                    <Box className="login--copyRight">Copyright © 2015-2016 有鲸余</Box>
                </Box>
            </Wrapper>
        )
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    handleLogin(){
        this.props.router.goBack()
    }

    handleRegister(){
        const {username,password,re_password} = this.state
        this.props.register(username,password,re_password)
    }
}

Register.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

const mapState = (state)=>{
    return {
        user:state.UserReducer.user
    }
};

const mapDispatch = (dispatch)=>{
    return {
        register:(username,password,re_password)=>{
            if(password !== re_password){
                return
            }

            PostActions.postUserRegister(username,password,(currentUser)=>{
                dispatch({
                    type:ActionType.USER_ACTIONS.POST_USER_REGISTER,
                    user: currentUser
                })
            })
        }
    }
};

export default connect(mapState,mapDispatch)(Register)