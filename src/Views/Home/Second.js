/**
 * Created by chalresbao on 16/12/22.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Wrapper} from '../../Components/FlexBox'
import AvatarNickNameGroup from '../../Components/AvatarNickNameGroup'
import MissionButtonGroup from '../../Components/MissionButtonGroup'
import IconLargeFlatButtonGroup from '../../Components/IconLargeFlatButtonGroup'
import ScrollView from '../../Components/ScrollView'
import CONSTANT from '../../Constants'

import Dispatcher from '../../Models/Dispatcher'
import {setCurrentUserMissionIndex} from '../../Models/Actions/StateActions'

class Second extends Component {

    shouldComponentUpdate(){
        return false;
    }

    render(){
        const avatar = this.props.user.get('avatar') ? this.props.user.get('avatar').get('url') : null;
        return (
            <Wrapper>
                <ScrollView style={{bottom:56}}>
                    <AvatarNickNameGroup avatar={avatar}
                                         avatarTap={()=>this.context.router.push(CONSTANT.ROUTER_PATH.SETTING.SETTING_AVATAR)}
                                         nickname={this.props.user.get('nickname')}
                                         nicknameTap={()=>this.context.router.push(CONSTANT.ROUTER_PATH.SETTING.SETTING_NICKNAME)}/>
                    <MissionButtonGroup onTap={this.linkToUserMission.bind(this)}/>
                    <IconLargeFlatButtonGroup onTap={this.linkToUserInfo.bind(this)}/>
                </ScrollView>
            </Wrapper>
        )
    }

    linkToUserMission(route){
        this.props.actions.setCurrentUserMissionIndex(route);
        this.context.router.push(CONSTANT.ROUTER_PATH.MISSION.USER_MISSION);
    }
    linkToUserInfo(route){
        this.context.router.push(route);
    }

}

Second.contextTypes = {
    router: React.PropTypes.object
};

export default connect((state)=>({
    user:state.UserReducer.user,
    currentUserMissionIndex: state.StateReducer.currentUserMissionIndex
}),Dispatcher({
    setCurrentUserMissionIndex
}))(Second);