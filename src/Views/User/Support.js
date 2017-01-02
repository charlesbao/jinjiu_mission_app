/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import { CardHeader, CardText} from 'material-ui/Card';
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'

const styles = {
    wrapper: {
        paddingTop: 20,
        top:45
    },
    menu: {
        paddingRight: 20
    },
    headerTitle: {
        fontSize:18,
    },
    header: {
        paddingBottom: 10,
        paddingTop: 5,
        color:"black"
    },
    text: {
        paddingTop: 0,
        lineHeight:1.5
    }
}
class SupportSection extends Component {

    shouldComponentUpdate(){
        return false;
    }

    render() {
        return (
            <ContainerWithBackBar title="帮助与反馈">
                <ScrollView style={styles.wrapper}>
                    <CardHeader
                        titleStyle={styles.headerTitle}
                        title="联系客服"
                    />
                    <CardText style={styles.text}>QQ：2684816907</CardText>
                    <CardHeader
                        titleStyle={styles.headerTitle}
                        title="常见问题"
                    />
                    <CardHeader
                        style={styles.header}
                        subtitleColor="black"
                        subtitle="问题一：关于“我的钱包”"
                    />
                    <CardText style={styles.text}>
                        1.	平台内完成任务的所得薪金均储蓄于“我的钱包”，绑定支付宝后，钱包内的钱可提现至支付宝<br/>
                        2.	钱包内的总余额=现金+审核中金额，支持提现的仅为现金，已提交反馈的任务审核通过后，审核中的金额将自动转入现金，若未通过审核，该部分金额将被扣除<br/>
                        3.	每个账号每日提现权限为1次，每次提现金额不得小于20元，申请提现到账时间预计在48小时内<br/>
                        4.	如满足条件的提现被驳回可联系客服QQ帮助您查看一下原因哦
                    </CardText>
                    <CardHeader
                        style={styles.header}
                        subtitleColor="black"
                        subtitle="问题二：关于“我的任务”"
                    />
                    <CardText style={styles.text}>
                        1.	平台内的每个任务都会要求以截图或图加文字的方式进行反馈，请按任务“步骤说明”的要求进行反馈，使反馈能尽快通过审核<br/>
                        2.	请留意任务的剩余次数和截至日期，如果完成任务所需时间超过截至时间的，建议就不要再申请该任务啦，以免任务反馈被驳回<br/>
                        3.	下载APP或关注公众号，请用任务“步骤说明”内提供的链接或者二维码进行下载或关注哦，否则反馈将无法通过审核<br/>
                        4.	所有任务开始后请在3小时之内完成，否则开始的任务将自动失效哦
                    </CardText>
                    <CardHeader
                        style={styles.header}
                        subtitleColor="black"
                        subtitle="问题三：平台内任务投放需求及商务洽谈"
                    />
                    <CardText style={styles.text}>
                        请联系商务经理 微信：miaoanqin
                    </CardText>
                    <div style={{height:40}}></div>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }
}
export default SupportSection