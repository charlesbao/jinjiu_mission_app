/**
 * Created by chalresbao on 16/12/23.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Box} from '../../../Components/FlexBox'
import MissionList from '../../../Components/MissionList'
import QueryAction from '../../../Actions/QueryActions'
import ActionType from '../../../Constants/ActionType'
class Third extends Component{
    componentDidMount(){
        this.props.queryRelatedMissions(this.props.missionId,this.props.attribute)
    }
    render(){
        const {relatedMissions,onTap} = this.props

        return (
            <Box className="mission-detail-third--wrapper">
                <MissionList list={relatedMissions}
                             onListTap={onTap}/>
            </Box>
        )
    }
}

const mapState =(state,ownProps)=>{
    return {
        relatedMissions:state.MissionReducer.relatedMissions,
        missionId:ownProps.missionId,
        onTap:ownProps.onTap,
        attribute:ownProps.attribute
    }
}

const mapDispatch =(dispatch)=>{
    return {
        queryRelatedMissions(missionId,attribute){
            dispatch({type:ActionType.MISSION_ACTIONS.CLEAR_CURRENT_RELATED_MISSIONS})
            QueryAction.queryRelatedMissions(missionId,attribute,(relatedMissions)=>{
                dispatch({
                    type:ActionType.MISSION_ACTIONS.QUERY_RELATED_MISSIONS,
                    relatedMissions:relatedMissions
                })
            })
        }
    }
}

export default connect(mapState,mapDispatch)(Third);