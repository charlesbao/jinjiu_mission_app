/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Box} from '../../Components/FlexBox'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import LoadingMask from '../../Components/LoadingMask'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'

import PostAction from '../../Actions/PostActions'
import ActionType from '../../Constants/ActionType'
import Constants from '../../Constants'

class AvatarSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            avatar:this.props.user.get('avatar')
        };

    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            const state = this.context.store.getState()
            console.log(state.UserReducer.error)
            if(state.UserReducer.error == Constants.ERROR.UPDATE_USER_INFO_FAILED){
                alert('修改失败')
            }
            this.setState({
                loading:false
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render() {
        console.log(this.state.avatar)
        return (
            <ContainerWithBackBar title="头像">
                <LoadingMask show={this.state.loading} />
                <ScrollView style={{top:45}}>
                    <Box style={{padding:15,textAlign:'center'}}>
                        <Box>
                            <Avatar
                                src={this.state.avatar || require('../../assets/avatar.png')}
                                style={{border:"5px solid white"}}
                                size={100}
                            />
                        </Box>
                        <Box style={{paddingTop:30}}>
                            <RaisedButton onTouchTap={this.onTapHandle.bind(this)} label="修 改"
                                          secondary={true} fullWidth={false} />
                        </Box>
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleChange(evt,newValue){
        this.setState({
            avatar:newValue
        })
    }

    onTapHandle(){
        this.props.postUpdateUser(this.state.avatar)
        this.setState({
            loading:true
        })
    }
}

AvatarSection.contextTypes = {
    store: React.PropTypes.object
};

const mapState = (state)=>{
    return {
        user: state.UserReducer.user
    }
};


const mapDispatch = (dispatch)=>{
    return {
        postUpdateUser:(avatar)=>{
            PostAction.postUpdateUserInfo({avatar:avatar},(currentUser)=>{
                dispatch({
                    type:ActionType.USER_ACTIONS.POST_UPDATE_USER_INFO,
                    user:currentUser
                })
            })
        }
    }
}


export default connect(mapState,mapDispatch)(AvatarSection)