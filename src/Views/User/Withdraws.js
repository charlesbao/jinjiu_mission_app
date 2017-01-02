/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {Box} from '../../Components/FlexBox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'

const styles = {
    wrapper: {
        padding: 15,
    },
    buttonGroup: {
        marginTop:15
    }
};
class WithdrawsSection extends Component {

    render() {
        return (
            <ContainerWithBackBar title="我的钱包">
                <ScrollView style={{top:45}}>
                    <Box style={styles.wrapper}>
                    <TextField
                        fullWidth={true}
                        hintText="提现金额不得小于20元"
                        floatingLabelText="提现金额"
                        floatingLabelFixed={true}
                    />
                    <Box style={styles.buttonGroup}>
                        <RaisedButton label="提现" secondary={true} fullWidth={true} />
                    </Box>
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }
}

WithdrawsSection.contextTypes = {
    router: React.PropTypes.object
};

export default WithdrawsSection