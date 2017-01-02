/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Toast from '../Components/Toast'
import Login from '../Views/Login'

import QueryAction from '../Actions/QueryActions'
import CONSTANTS from '../Constants'
import ActionType from '../Constants/ActionType'

class Container extends Component {

    constructor(props){
        super(props)

        this.state = {
            toast:false
        }
    }

    backbutton(){

        if(this.props.location.pathname === "/"){
            if(this.state.toast === true)navigator.app.exitApp();
            this.setState({
                toast:true
            })
        }else{
            this.context.router.goBack()
        }

    }

    componentDidMount(){
        if(this.props.user !== null)this.props.queryUserMission();
        document.addEventListener("backbutton", this.backbutton.bind(this), false);
    }

    componentWillUnmount(){
        document.removeEventListener("backbutton", this.backbutton.bind(this), false);
    }

    toastTimeOut(){
        this.setState({
            toast:false
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(BaseTheme)}>
                <div>
                    <Toast show={this.state.toast} timeout={this.toastTimeOut.bind(this)}/>
                    {this.renderView()}
                </div>
            </MuiThemeProvider>
        )
    }

    renderView(){
        if(this.props.user === null && this.props.location.pathname !== CONSTANTS.ROUTER_PATH.REGISTER){
            return  <Login />
        }else{
            return (
                <CSSTransitionGroup transitionName="push"
                                    transitionEnterTimeout={ 350 } transitionLeaveTimeout={ 350 }>
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </CSSTransitionGroup>
            );
        }
    }
}

Container.contextTypes = {
    router: React.PropTypes.object
};


const mapState = (state)=>{
    return {
        user:state.UserReducer.user
    }
}

const mapDispatch = (dispatch)=>{
    return {
        queryUserMission:()=>{
            QueryAction.queryUserMission((result)=>{
                dispatch({
                    type:ActionType.USER_ACTIONS.QUERY_USER_MISSION,
                    userMission:result
                })
            })

        }
    }
}

export default connect(mapState,mapDispatch)(Container);