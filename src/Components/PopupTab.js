/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import pureRender from "pure-render-decorator"
import { Box } from './FlexBox'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Popover,{PopoverAnimationVertical} from 'material-ui/Popover';

import CONSTANTS from '../Constants'

const labels = {
    billingLabel:[
        "简单易做",
        "收入中等",
        "高薪奖金",
        "按金额"
    ],
    attributeLabel:[
        "体验",
        "分享",
        "互动",
        "其他",
        "按性质"
    ]
};

const styles = {
    box: {
        width:"100%",
        height:36,
        position:"relative",
        zIndex:99
    },
    floatItem: {
        width:"33%",
        boxShadow:"none",
        float:"left"
    }
}
class PopupTab extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);

        let billingLabel = labels.billingLabel[3]
        let attributeLabel = labels.attributeLabel[4]
        if(this.props.topFilter === 1){
            billingLabel = labels.billingLabel[this.props.subFilter]
        }else if(this.props.topFilter === 2){
            attributeLabel = labels.attributeLabel[this.props.subFilter]
        }

        this.state = {
            area:this.props.topFilter,
            subArea:this.props.subFilter,
            billingLabel:billingLabel,
            attributeLabel:attributeLabel
        };
    }

    render() {
        return (
            <Box style={styles.box}>
                <RaisedButton label="最新发布"
                              primary={this.state.area == CONSTANTS.FILTER_LABEL.BY_NEWEST}
                              buttonStyle={{borderRadius:0}}
                              style={styles.floatItem}
                              onTouchTap={this.onChangeHandle.bind(this,CONSTANTS.FILTER_LABEL.BY_NEWEST,0)}/>
                <Popup label={this.state.billingLabel}
                       primary={this.state.area == CONSTANTS.FILTER_LABEL.BY_BILLING}
                       onTap={this.onChangeHandle.bind(this,CONSTANTS.FILTER_LABEL.BY_BILLING)}>
                    <MenuItem primaryText={labels.billingLabel[0]} />
                    <MenuItem primaryText={labels.billingLabel[1]} />
                    <MenuItem primaryText={labels.billingLabel[2]} />
                </Popup>
                <Popup label={this.state.attributeLabel}
                       primary={this.state.area == CONSTANTS.FILTER_LABEL.BY_ATTRIBUTE}
                       onTap={this.onChangeHandle.bind(this,CONSTANTS.FILTER_LABEL.BY_ATTRIBUTE)}>
                    <MenuItem primaryText={labels.attributeLabel[0]} />
                    <MenuItem primaryText={labels.attributeLabel[1]} />
                    <MenuItem primaryText={labels.attributeLabel[2]} />
                    <MenuItem primaryText={labels.attributeLabel[3]} />
                </Popup>
            </Box>
        );
    }

    onChangeHandle(area,subArea){
        let billingLabel = labels.billingLabel[3];
        let attributeLabel = labels.attributeLabel[4];
        switch(area){
            case CONSTANTS.FILTER_LABEL.BY_BILLING:
                billingLabel = labels.billingLabel[subArea];
                break;
            case CONSTANTS.FILTER_LABEL.BY_ATTRIBUTE:
                attributeLabel = labels.attributeLabel[subArea];
                break;
            default:
                break;
        }

        this.setState({
            area:area,
            subArea:subArea,
            billingLabel:billingLabel,
            attributeLabel:attributeLabel
        });
        this.props.onPopupTap(area,subArea)
    }
}

class Popup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.clickAway = 0
    }

    render() {
        return (
            <Box style={{float:'left',width:"33.3333%"}}>
                <RaisedButton
                    primary={this.props.primary}
                    buttonStyle={{borderRadius:0}}
                    label={this.props.label}
                    style={{width:"100%",boxShadow:"none"}}
                    onTouchTap={this.handleOpen.bind(this)}/>
                <Popover
                    animation={PopoverAnimationVertical}
                    onRequestClose={this.handleClose.bind(this)}
                    open={this.state.open}>
                    <Menu onItemTouchTap={this.onChangeHandle.bind(this)}>
                        {this.props.children}
                    </Menu>
                </Popover>
            </Box>
        );
    }

    handleOpen(event){
        event.preventDefault();
        this.setState({
            open: true
        });
        this.clickAway = 0
    };

    handleClose(reason){
        this.clickAway += 1
        if(this.clickAway == 2){
            this.setState({
                open: false,
            });
            this.clickAway = 0
        }

    };

    onChangeHandle(event,object,index){
        this.setState({
            open: false,
        });
        this.clickAway = 0
        this.props.onTap(index);
    }
}

export default pureRender(PopupTab);