/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Box} from '../../Components/FlexBox'

import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import LoadingMask from '../../Components/LoadingMask'

import PostAction from '../../Actions/PostActions'
import Constants from '../../Constants'
import ActionType from '../../Constants/ActionType'
const styles = {
    wrapper: {
        padding: 15
    },
    buttonGroup: {
        paddingTop: 15
    },
    smsNumber: {
        width:"60%",
    },
    send: {
        width: "40%"
    }
}
class MobileSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            mobilePhoneNumber:"",
            smsNumber:"",
        };

        this.step = 0
    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            const state = this.context.store.getState()
            console.log(state.UserReducer.error)
            switch (state.UserReducer.error){
                case Constants.ERROR.REQUEST_PHONE_FAILED:
                    alert('发送错误')
                    this.setState({
                        loading:false
                    })
                    break;
                case Constants.ERROR.REQUEST_PHONE_SUCCESS:
                    alert('发送成功')
                    this.setState({
                        loading:false
                    })
                    break;
                case Constants.ERROR.VERIFY_SMS_FAILED:
                    alert('验证错误')
                    this.setState({
                        loading:false
                    })
                    break;
                case Constants.ERROR.VERIFY_SMS_SUCCESS:
                    alert('验证成功')
                    this.props.postUpdateUser(this.state.mobilePhoneNumber);
                    this.setState({
                        loading:true
                    });
                    break;
                case null:
                    alert('绑定成功')
                    this.setState({
                        loading:false
                    });
                    break;
                default:
                    break;
            }
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render() {
        return (
            <ContainerWithBackBar title="绑定手机号码">
                <LoadingMask show={this.state.loading} />
                <ScrollView style={{top:45}}>
                    <Box style={styles.wrapper}>
                        <TextField fullWidth={true}
                                   disabled={true}
                                   floatingLabelText="已绑定手机号"
                                   floatingLabelFixed={true}
                                   value={this.props.user.get('mobilePhoneNumber') || "未绑定任何手机号"}/>
                        <TextField
                            fullWidth={true}
                            type="tel"
                            hintText="输入手机号"
                            value={this.state.mobilePhoneNumber}
                            onChange={this.handleChange.bind(this,'mobilePhoneNumber')}
                            floatingLabelText="手机号"
                            floatingLabelFixed={true}
                        />
                        <TextField
                            style={styles.smsNumber}
                            hintText="输入验证码"
                            value={this.state.smsNumber}
                            onChange={this.handleChange.bind(this,'smsNumber')}
                            floatingLabelText="验证码"
                            floatingLabelFixed={true}
                        />
                        <FlatButton onTouchTap={this.onSendHandle.bind(this)}
                                    style={styles.send}
                                    label="发送验证码" primary={true} />
                        <Box style={styles.buttonGroup}>
                            <RaisedButton onTouchTap={this.onTapHandle.bind(this)} label="绑 定" secondary={true} fullWidth={true} />
                        </Box>
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    onSendHandle(){
        this.props.postRequestVerifyNumber(this.state.mobilePhoneNumber)
        this.setState({
            loading:true
        })
    }

    onTapHandle(){
        this.props.postVerifySmsNumber(this.state.smsNumber,this.state.mobilePhoneNumber)
        this.setState({
            loading:true
        })
    }
}

MobileSection.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};


const mapState = (state)=>{
    return {
        user: state.UserReducer.user,
        requestVerifyNumber: state.UserReducer.requestVerifyNumber
    }
};


const mapDispatch = (dispatch)=>{
    return {
        postRequestVerifyNumber:(mobilePhoneNumber)=>{
            PostAction.postRequestVerifyNumber(mobilePhoneNumber,function(result){
                dispatch({
                    type:ActionType.USER_ACTIONS.POST_REQUEST_VERIFY_NUMBER,
                    result:result
                })
            })
        },
        postVerifySmsNumber:(smsNumber,mobilePhoneNumber)=>{
            PostAction.postVerifySmsNumber(smsNumber,mobilePhoneNumber,(result)=>{
                dispatch({
                    type:ActionType.USER_ACTIONS.POST_VERIFY_SMS_NUMBER,
                    result:result
                })
            })
        },
        postUpdateUser:(mobilePhoneNumber)=>{
            PostAction.postUpdateUserInfo({mobilePhoneNumber:mobilePhoneNumber},(currentUser)=>{
                dispatch({
                    type:ActionType.USER_ACTIONS.POST_USER_CHANGE_PHONE_NUMBER,
                    user:currentUser
                })
            })
        }
    }
}
export default connect(mapState,mapDispatch)(MobileSection)