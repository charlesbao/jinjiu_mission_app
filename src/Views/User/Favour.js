/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import MissionList from '../../Components/MissionList'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'

import CONSTANTS from '../../Constants'

import Dispatcher from '../../Models/Dispatcher'
import {setCurrentMission} from '../../Models/Actions/MissionActions'

class FavourSection extends Component {

    render() {
        return (
            <ContainerWithBackBar title="任务收藏">
                <ScrollView style={{top:45}}>
                    <MissionList list={this.props.missionList}
                                 onListTap={this.onListTapHandle.bind(this)}/>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    onListTapHandle(currentMission){
        this.props.actions.setCurrentMission(currentMission)
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL)
    }

}

FavourSection.contextTypes = {
    router: React.PropTypes.object
};

export default connect(createSelector(
    state => state.UserReducer.userMission,
    userMission => {
        let missionList = [];
        userMission.map((item)=>{
            item['favor'] && missionList.push(item['mission'])
        });
        return {
            missionList
        }
    }
),Dispatcher({
    setCurrentMission
}))(FavourSection);