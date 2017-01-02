/**
 * Created by chalresbao on 16/12/21.
 */
import React,{Component} from 'react'
class Flex extends Component {
    constructor(props){
        super(props)

    }
    render(){
        const styles = Object.assign({
            display: 'flex',
            boxSizing: 'border-box',
            flexWrap: this.props.wrap ? 'wrap' : "initial",
            flexDirection: this.props.flexColumn ? 'column': 'row',
            flex: this.props.flexAuto ? "1 1 auto" : "initial",
            justifyContent:this.props.justify || "initial",
            alignItems: this.props.align || "initial",
        },this.props.style)
        
        const classNames = Object.assign({

        },this.props.classNames)
        return (
            <div style={styles} className={classNames}>
                {this.props.children}
            </div>
        )
    }
}

const Box = ({children,className = "",style = {},onTouchTap}) => (
    <div className={"box "+className} style={style} onTouchTap={onTouchTap}>
        {children}
    </div>
);

const Wrapper = ({children}) => <div className="section-wrapper">{children}</div>

export {
    Flex,
    Box,
    Wrapper
};