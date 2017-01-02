/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'

import CONSTANTS from '../../Constants'
import '../../Styles/Wallet.css'

class WalletSection extends Component{
    render(){
        return(
            <ContainerWithBackBar title="我的钱包">
                <ScrollView style={{top:50}}>
                    <div className="wallet--master-count">
                        <div className="label">总余额(元)</div>
                        <div className="count">0.00</div>
                    </div>
                    <div className="wallet--sub-count">
                        <div className="wallet--sub-count--left">
                            <div className="label">现金(元)</div>
                            <div className="count">0.00</div>
                        </div>
                        <div className="wallet--sub-count--right">
                            <div className="label">审核中(元)</div>
                            <div className="count">0.00</div>
                        </div>
                    </div>
                    <div className="wallet--button-group">
                        <RaisedButton onTouchTap={()=>this.context.router.push(CONSTANTS.ROUTER_PATH.USER.WITHDRAWS)}
                                      label="提现" secondary={true} fullWidth={true} />
                    </div>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }
}

WalletSection.contextTypes = {
    router: React.PropTypes.object
}

export default WalletSection;