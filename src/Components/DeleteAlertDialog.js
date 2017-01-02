/**
 * Created by chalresbao on 16/12/14.
 */
import React,{Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const AlertDialog = ({label,close,deleteClose,open})=>(
    <Dialog
        actions={[<FlatButton
            label="关闭"
            primary={true}
            onTouchTap={close}/>,
            <FlatButton
                label="删除并重新开始"
                secondary={true}
                onTouchTap={deleteClose}/>]}
        modal={false}
        open={open}
        onRequestClose={close}>
        {label}
    </Dialog>
)

export default AlertDialog;