/**
 * Created by chalresbao on 16/12/6.
 */

import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
    lineHeight: {
        height:45,
        lineHeight:"46px",
        fontSize: 18
    },
    iconStyle: {
        marginTop: -1,
        marginLeft: -27,
        marginRight:0,
    }
}
class TopNavBar extends Component {
    render(){
        return (
            <AppBar
                title={this.props.title}
                style={styles.lineHeight}
                titleStyle={styles.lineHeight}
                iconClassNameLeft="ion-chevron-left"
                iconStyleLeft={styles.iconStyle}
                onLeftIconButtonTouchTap={this.props.onTap}
            />
        )
    }
}

export default TopNavBar