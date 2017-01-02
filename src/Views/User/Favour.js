/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import MissionList from '../../Components/MissionList'

import AlertDialog from '../../Components/DeleteAlertDialog'
import LoadingMask from '../../Components/LoadingMask'

import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'
import PostAction from '../../Actions/PostActions'

import CONSTANTS from '../../Constants'
import ActionType from'../../Constants/ActionType';
import QueryAction from '../../Actions/QueryActions'

class FavourSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteId:-1,
            loading:false
        };

    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            this.setState({
                deleteId: -1,
                loading:false
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render() {
        return (
            <ContainerWithBackBar title="任务收藏">
                <LoadingMask show={this.state.loading} />
                <AlertDialog deleteClose={this.handleDelete.bind(this)}
                             open={this.state.deleteId !== -1}
                             close={this.handleClose.bind(this)}
                             label="任务已失效"/>
                <ScrollView style={{top:45}}>
                    {this.renderView()}
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    renderView(){
        const { currentUserMission } = this.props;
        let tmpMissionList = [];
        for(let i in currentUserMission){
            if(currentUserMission[i]['favor'] == true){
                tmpMissionList.push(currentUserMission[i]['mission'])
            }
        }
        return (
            <MissionList list={tmpMissionList}
                         onListTap={this.onListTapHandle.bind(this)}/>
        )
    }

    deleteTapHandle(missionId){
        this.setState({
            deleteId:missionId,
        })
    }

    handleClose(){
        this.setState({
            deleteId:-1
        })
    }

    onListTapHandle(currentMission){
        this.props.setCurrentMission(currentMission)
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL)
    }

    handleDelete(){
        this.props.removeCurrentFavour(this.state.deleteId)
        this.setState({
            loading:true
        })
    }
}

FavourSection.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

FavourSection.propTypes = {
    userFavour: React.PropTypes.array
};

const mapState = (state)=>{
    return {
        currentUserMission: state.UserReducer.userMission
    }
};

const mapDispatch = (dispatch)=>{
    return {
        setCurrentMission:(currentMission)=>{
            dispatch({
                type:ActionType.MISSION_ACTIONS.SET_CURRENT_MISSION,
                currentMission:currentMission
            })
        },
        removeCurrentFavour:(missionId)=>{
            PostAction.postUserChangeFavour(missionId,false,(result)=>{
                dispatch({
                    type:ActionType.USER_ACTIONS.POST_USER_CHANGE_FAVOURITE_MISSION,
                    data:result
                })
            })
        }
    }
};

export default connect(mapState,mapDispatch)(FavourSection);