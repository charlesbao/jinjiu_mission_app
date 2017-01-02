/**
 * Created by chalresbao on 16/12/23.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Box} from '../../../Components/FlexBox'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import QueryAction from '../../../Actions/QueryActions'
import ActionType from '../../../Constants/ActionType'
class Second extends Component{
    componentDidMount(){
        this.props.queryCurrentMissionComments(this.props.missionId)
    }
    render(){
        const {comments} = this.props;

        let commentList = [];
        comments.forEach((item,index)=>{
            commentList.push(
                <ListItem
                    key={index}
                    leftAvatar={<Avatar src={item['avatar']} />}
                    primaryText={item['nickname']}
                    secondaryText={<p>{item['content']}</p>}
                    secondaryTextLines={2} />,
                <Divider key={"d_"+index} />
            );
        });
        return (
            <Box className="mission-detail-second--wrapper">
                <List className="mission-detail-second--content">{ commentList }</List>
            </Box>
        )
    }
}

const mapState =(state,ownProps)=>{
    return {
        comments:state.MissionReducer.currentMissionComments,
        missionId:ownProps.missionId
    }
}

const mapDispatch = (dispatch)=>{
    return {
        queryCurrentMissionComments:(missionId)=>{
            QueryAction.queryCurrentMissionComments(missionId,(currentMissionComments)=>{
                dispatch({
                    type:ActionType.MISSION_ACTIONS.QUERY_CURRENT_MISSION_COMMENTS,
                    currentMissionComments:currentMissionComments
                })
            })
        }
    }
}

export default connect(mapState,mapDispatch)(Second);