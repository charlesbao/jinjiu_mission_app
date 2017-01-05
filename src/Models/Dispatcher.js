/**
 * Created by chalresbao on 17/1/3.
 */
import {bindActionCreators} from 'redux'

export default (actionCreators) => (dispatch) =>{
    return {
        actions:bindActionCreators(actionCreators,dispatch)
    }
};