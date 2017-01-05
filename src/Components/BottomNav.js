import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const recentsIcon = <FontIcon className="ion-android-document"/>;
const favoritesIcon = <FontIcon className="ion-android-person"/>;

class BottomNav extends Component {

    constructor(props){
        super(props)
        this.state = {
            selectedIndex: this.props.index,
        };
    }


    select(index) {
        this.setState({selectedIndex: index});
        this.props.onTap(index)
    }

    render() {
        return (
            <Paper zDepth={1} style={paper}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="任务"
                        icon={recentsIcon}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="我的"
                        icon={favoritesIcon}
                        onTouchTap={() => this.select(1)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}

const paper = {
    position:"fixed",
    left: 0,
    right: 0,
    bottom: 0
}


export default BottomNav;