/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import { Flex, Box } from './FlexBox'
import TextField from 'material-ui/TextField';

const box = {
    width:50,
    height:50,
    marginRight:10
}

class TextFieldWithIcon extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    render() {
        return (
            <Flex align="center">
                    <Box style={box}>{this.props.icon}</Box>
                    <TextField
                        hintText="输入密码"
                        floatingLabelText="密码"
                        floatingLabelFixed={true}
                        type="password"
                    />
            </Flex>
        );
    }
}

export default TextFieldWithIcon;