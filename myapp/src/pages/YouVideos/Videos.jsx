import React, { Component } from 'react';
import './Videos.scss'
import {get_youtube_thumbnail} from '../../common/getTubeThumbnail/GetTubeThumbnail'
import { GET_VIDEOS_ACTION } from '../../store/projectStore/videos/action';
import Youtubemodel from '../../common/youtubeModel/YoutubeModel';
import { connect } from 'react-redux';
import {Spin , Button , Empty, Select } from 'antd';
import { GET_YOUTUBE_CATEGARY_ACTION } from '../../store/projectStore/videos/action';

class Videos extends Component {
    constructor(props)
    {
        super(props)
        this.state  = {
            page : 1,
            visibility:false,
            Videourl:null,
            selectVideoCategary:'allData',
            VideoTitle:null
        }        
    }
    componentDidMount()
    {
        this.props.VideosData.videos=[]
        this.props.GET_YOUTUBE_CATEGARY_ACTION()
        this.props.GET_VIDEOS_ACTION({selectVideoCategary:this.state.selectVideoCategary,page:this.state.page}) 
    }
    componentWillUnmount()
    {
        this.props.VideosData.YoutubeCategary=[]
        this.props.VideosData.videos=[]
    }
    render() {
        const showModel = (url,title) => {            
            this.setState({
                VideoTitle:title,
                visibility:true,
                Videourl:url
            })
        }        
         const onVideosChange = (e) => {                
            this.setState({
                setSelectVideoCategary:e
            })    
            this.setState({
                page : 1,
                selectVideoCategary:e
            })
            this.props.VideosData.videos=[]
            this.props.GET_VIDEOS_ACTION({selectVideoCategary:e,page:1}) 
          }
        const VisibilityToggle = () =>
        {
            this.setState({
                visibility: false
            })
        }
        const LoadMoreData = () => {
            this.setState({
                page : this.state.page + 1
            })
            this.props.GET_VIDEOS_ACTION({selectVideoCategary:this.state.selectVideoCategary,page:this.state.page+1}) 
            this.props.VideosData.loading=true
        }
        return (
            <div className='youtubeContainer'>
            <div className='videosHeader'>
                <div>
                    <p>See All Videos here</p>
                </div>
              <Select  showSearch className='SelectCategary' defaultValue={this.state.selectVideoCategary} onChange={onVideosChange}>
                <Select.Option key={"allData"} value={"allData"}>AllData</Select.Option>              
                  {                               
                        this.props.VideosData.YoutubeCategary.map((item,index)=>{
                          return (
                            <Select.Option key={index} value={item.categary}>{item.categary}</Select.Option>
                          )
                        })                          
                  }                
              </Select>
              </div>
              <div className='VideoContainer'>              
              {this.state.visibility && <Youtubemodel state={this.state} VisibilityToggle={VisibilityToggle} /> } 
            {          
                this.props.VideosData.videos && this.props.VideosData.videos.map((item,index)=>{         
                    var thumbnail = get_youtube_thumbnail(`https://youtu.be/${item.url}`, 'max');
                    return (
                        <div className='videoDiv' key={index}>
                        <img src={thumbnail.toString()} alt="" style={{width:'100%'}} onClick={() => showModel(item.url,item.title)}/>
                        <p className='VideoTitle' onClick={() => showModel(item.url,item.title)}>{item.title}</p>                       
                        </div>
                    )
                })
            }
            </div>
            <div className='moreLoadButton'>
            { this.props.VideosData.loading && <div className='LoadMoreSpinTag'> <Spin /> </div> }
            {                        
            this.props.VideosData && this.props.VideosData.hasMoreData ?
            <Button onClick={LoadMoreData}>load more</Button> : <Empty description="No More Videos ☹️"/>
            } 
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {    
    return {
        VideosData : state.VideoReducer        
    }
}
const mapDispatchToProps = {
  GET_VIDEOS_ACTION :  GET_VIDEOS_ACTION,
  GET_YOUTUBE_CATEGARY_ACTION:GET_YOUTUBE_CATEGARY_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(Videos)

