import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const AlertDialog = ({open,close,content=""})=>(
    <Dialog
        actions={<FlatButton
            label="关闭"
            primary={true}
            onTouchTap={close}
        />}
        modal={false}
        open={open}
        onRequestClose={close}>
        {content}
    </Dialog>
);

export default AlertDialog