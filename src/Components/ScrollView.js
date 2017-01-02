/**
 * Created by chalresbao on 16/12/16.
 */
import React,{Component} from 'react'

class ScrollView extends Component {
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
        const wrapper = document.getElementById('iScroll-wrapper')
        const scroller = document.getElementById('iScroll-scroller')

        scroller.style.height = "auto";
        if(scroller.offsetHeight < wrapper.offsetHeight){
            scroller.style.height = wrapper.offsetHeight+10 + 'px'
        }

        this.myScroll = new window.IScroll(document.getElementById('iScroll-wrapper'), {
            mouseWheel: false,
            scrollbars: false,
            click:false,
            bounce:true,
            fadeScrollbars:false
        });
    }

    render(){
        return (
            <div id="iScroll-wrapper"
                 className={this.props.className}
                 style={this.props.style}>
                <div id="iScroll-scroller">
                    <div>{ this.props.children }</div>
                </div>
            </div>
        )
    }
}

export default ScrollView