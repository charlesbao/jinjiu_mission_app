/**
 * Created by chalresbao on 16/12/23.
 */
import React,{Component} from 'react'

class Toast extends Component {
    render(){
        if(this.props.show){
            setTimeout(()=>{
                this.props.timeout()
            },2000);
            return (
                <div className="toast">
                    <span>再按一次退出</span>
                </div>
            )
        }else{
           return <div></div>
        }
    }
}

export default Toast;