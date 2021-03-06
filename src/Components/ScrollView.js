/**
 * Created by chalresbao on 16/12/16.
 */
import React,{Component} from 'react'

class ScrollView extends Component {

    constructor(props){
        super(props)
        this.wrapperId = "scroll-wrapper--"+new Date().getTime()
        this.scrollerId = "scroller--"+new Date().getTime()
    }

    getScrollTop(){
        return this.myScroll.y
    }

    componentDidMount(){
        this.iScrollInit()
    }

    componentDidUpdate(){
        this.myScroll.destroy();
        this.iScrollInit()
    }

    componentWillUnmount(){
        this.myScroll.destroy();
    }

    iScrollInit(){
        const wrapper = document.getElementById(this.wrapperId);
        const scroller = document.getElementById(this.scrollerId);

        scroller.style.height = "auto";
        if(scroller.offsetHeight < wrapper.offsetHeight){
            scroller.style.height = wrapper.offsetHeight+10 + 'px'
        }

        this.myScroll = new window.IScroll(wrapper, {
            mouseWheel: false,
            scrollbars: this.props.scrollbarShow,
            click:false,
            bounce:true,
            fadeScrollbars:this.props.scrollbarShow
        });
    }

    render(){
        return (
            <div id={this.wrapperId}
                 className="iScroll-wrapper"
                 style={this.props.style}>
                <div id={this.scrollerId}
                     className="iScroll-scroller">
                    <div>{ this.props.children }</div>
                </div>
            </div>
        )
    }
}
ScrollView.defaultProps = {
    scrollbarShow: false
}

export default ScrollView