/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import { createSelector } from 'reselect';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Toast from '../Components/Toast'
import Login from '../Views/Login'
import Dispatcher from '../Models/Dispatcher'
import CONSTANTS from '../Constants'
import {queryUserMissions} from '../Models/Actions/UserActions'

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
        if(this.props.user !== null){
            this.props.actions.queryUserMissions();
        }
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

export default connect(createSelector(
    state => state.UserReducer.user,
    user => ({
        user
    })
),Dispatcher({
    queryUserMissions
}))(Container);