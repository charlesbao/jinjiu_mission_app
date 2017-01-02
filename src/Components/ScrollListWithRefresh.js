/**
 * Created by chalresbao on 16/12/23.
 */
import React,{Component} from 'react'
class ScrollList extends Component {

    constructor(props){
        super(props);

        this.refreshState = false;
        this.loadMoreState = false
    }

    getScrollTop(){
        return this.myScroll.y
    }

    refresh(){
        const wrapper = document.getElementById('iScroll-wrapper')
        const pullDown = document.getElementById('iScroll-pullDown')

        this.refreshState = true;
        pullDown.innerHTML = '<i class="ion-android-refresh"></i><span>正在刷新</span>'

        let startTime = new Date().getTime()

        this.props.onRefresh(()=>{
            setTimeout(()=>{
                wrapper.style.paddingTop = "0";
                pullDown.innerHTML = '<i class="ion-arrow-up-a"></i><span>向下拉动刷新</span>'

                this.refreshState = false;
            },new Date().getTime() - startTime < 200 ? 500 : 300)
        })
    }

    loadMore(){
        this.loadMoreState = true;
        this.props.loadMore(()=>{
            this.myScroll.refresh();
            this.loadMoreState = false;
        })
    }

    componentDidMount(){
        this.iScrollInit();
    }

    componentDidUpdate(){
        if(this.loadMoreState == false){
            this.iScrollInit();
        }
    }

    componentWillUnmount(){
        this.myScroll.destroy();
    }

    iScrollInit(){
        if(this.myScroll != null)this.myScroll.destroy();
        const wrapper = document.getElementById('iScroll-wrapper')
        const scroller = document.getElementById('iScroll-scroller')
        let scrollbarShow = true;

        scroller.style.height = "auto";
        if(scroller.offsetHeight < wrapper.offsetHeight){
            scroller.style.height = wrapper.offsetHeight+10 + 'px'
            scrollbarShow = false
        }

        this.myScroll = new window.IScroll(wrapper, {
            mouseWheel: false,
            scrollbars: scrollbarShow,
            click:false,
            bounce:true,
            probeType:1,
            fadeScrollbars:scrollbarShow,
            startY:this.props.startY
        });

        this.myScroll.on('scroll', ()=> {
            if(this.myScroll.y > 50 && !this.refreshState){
                wrapper.style.paddingTop = "50px";
                this.refresh()
            }
        });

        if(this.props.initFresh){
            document.getElementById('iScroll-wrapper').style.paddingTop = "40px";
            this.refresh()
        }
    }

    render(){

        return (
            <div id="iScroll-wrapper"
                 className={this.props.className}
                 style={this.props.style}>
                <div id="iScroll-scroller">
                    <div id="iScroll-pullDown"><i className="ion-arrow-up-a" /><span>向下拉动刷新</span></div>
                    <div>{ this.props.children }</div>
                    {
                        this.props.loadMore !== null &&
                        <div id="iScroll-loadMore" onTouchTap={this.loadMore.bind(this)}>点击加载更多</div>
                    }
                </div>
            </div>
        )
    }
}

ScrollList.defaultProps = {
    className:"",
    style:{},
    children:[],
    loadMore:null,
    initFresh:false,
    startY:0
}

export default ScrollList;