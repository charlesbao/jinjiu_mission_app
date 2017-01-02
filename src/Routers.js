import React, { Component } from 'react';
import pureRender from "pure-render-decorator"

import {
    Router,
    Route,
    IndexRoute,
    Redirect,
    DefaultRoute,
    hashHistory,
    browserHistory
} from 'react-router';
import CONSTANTS from './Constants'

import Container from "./Views/Container"

import Home from "./Views/Home"
import Login from "./Views/Login"
import Register from "./Views/Register"

import Search from "./Views/Mission/Search"
import UserMission from "./Views/Mission/UserMission"
import MissionDetail from './Views/Mission/MissionDetail'
import MissionPost from './Views/Mission/MissionPost'
import Comment from './Views/Mission/MissionComment'

import Wallet from './Views/User/Wallet'
import Withdraws from './Views/User/Withdraws'
import Favour from './Views/User/Favour'
import Support from './Views/User/Support'
import Setting from './Views/User/Setting'

import Password from './Views/Setting/Password'
import Mobile from './Views/Setting/Mobile'
import Nickname from './Views/Setting/Nickname'
import Avatar from './Views/Setting/Avatar'


class App extends Component {
  render() {
      return (
          <Router history={hashHistory}>
                <Route path='/' component={Container}>

                    <IndexRoute component={Home} />
                    <Route path={CONSTANTS.ROUTER_PATH.HOME} component={Home} />
                    <Route path={CONSTANTS.ROUTER_PATH.LOGIN} component={Login} />
                    <Route path={CONSTANTS.ROUTER_PATH.REGISTER} component={Register} />

                    <Route path={CONSTANTS.ROUTER_PATH.MISSION.SEARCH} component={Search} />
                    <Route path={CONSTANTS.ROUTER_PATH.MISSION.USER_MISSION} component={UserMission} />
                    <Route path={CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL} component={MissionDetail} />
                    <Route path={CONSTANTS.ROUTER_PATH.MISSION.MISSION_POST} component={MissionPost} />
                    <Route path={CONSTANTS.ROUTER_PATH.MISSION.COMMENT} component={Comment} />

                    <Route path={CONSTANTS.ROUTER_PATH.USER.WALLET} component={Wallet} />
                    <Route path={CONSTANTS.ROUTER_PATH.USER.WITHDRAWS} component={Withdraws} />
                    <Route path={CONSTANTS.ROUTER_PATH.USER.FAVOUR} component={Favour} />
                    <Route path={CONSTANTS.ROUTER_PATH.USER.SETTING} component={Setting} />
                    <Route path={CONSTANTS.ROUTER_PATH.USER.SUPPORT} component={Support} />

                    <Route path={CONSTANTS.ROUTER_PATH.SETTING.SETTING_AVATAR} component={Avatar} />
                    <Route path={CONSTANTS.ROUTER_PATH.SETTING.SETTING_NICKNAME} component={Nickname} />
                    <Route path={CONSTANTS.ROUTER_PATH.SETTING.SETTING_MOBILE} component={Mobile} />
                    <Route path={CONSTANTS.ROUTER_PATH.SETTING.SETTING_PASSWORD} component={Password} />
                </Route>
            </Router>
      );
  }
}

export default pureRender(App);
