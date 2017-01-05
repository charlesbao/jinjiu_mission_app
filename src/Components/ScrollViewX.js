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

        scroller.style.width = this.props.scrollWidth;
        if(scroller.offsetWidth < wrapper.offsetWidth){
            scroller.style.width = wrapper.offsetWidth+10 + 'px'
        }

        this.myScroll = new window.IScroll(wrapper, {
            mouseWheel: false,
            scrollbars: this.props.scrollbarShow,
            click:false,
            bounce:true,
            scrollX:true,
            scrollY:false,
            fadeScrollbars:this.props.scrollbarShow
        });
    }

    render(){
        return (
            <div id={this.wrapperId}
                 className="iScroll-wrapperX"
                 style={this.props.style}>
                <div id={this.scrollerId}
                     className="iScroll-scrollerX">
                    <div>{ this.props.children }</div>
                </div>
            </div>
        )
    }
}
ScrollView.defaultProps = {
    scrollbarShow: false,
    scrollWidth:'auto'
}

export default ScrollView