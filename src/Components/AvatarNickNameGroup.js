import React, { Component } from 'react';
import { Box } from './FlexBox'
import Avatar from 'material-ui/Avatar';

import "../Styles/AvatarNickNameGroup.css"
import defaultAvatar from '../assets/avatar.png'

const AvatarNickNameGroup = ({avatar,avatarTap,nickname,nicknameTap})=>(
    <Box className="avatar-nickname--wrapper">
        <Box onTouchTap={avatarTap}>
            <Avatar
                src={avatar || defaultAvatar}
                style={{border:"5px solid white"}}
                size={100}
            />
        </Box>
        <Box className="avatar-nickname--title" onTouchTap={nicknameTap}>{nickname}</Box>
    </Box>
)

export default AvatarNickNameGroup;