import React, { useEffect, useState } from "react";
import "./YouTubeVideosList.scss";
import { GET_VIDEOS_ACTION } from "../../store/projectStore/videos/action";
import { connect } from "react-redux";
import { Table, Button, message, Popconfirm,  Select, Empty, Row } from "antd";
import { CheckCircleOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import CreateYouTubeVideoModal from "./CreateYoutubeVideoModal/CreateYouTubeVideoModal";
import { GET_YOUTUBE_CATEGARY_ACTION } from "../../store/projectStore/videos/action";
import { get_youtube_thumbnail } from "../../common/getTubeThumbnail/GetTubeThumbnail";
import Youtubemodel from "../../common/youtubeModel/YoutubeModel";
import { DELETE_YOUTUBE_VIDEOS_ACTION } from "../../store/projectStore/videos/action";
import EditVideoModal from "./EditVideoModal/EditVideoModal";

const Youtubevideoslist = (props) => {
  const [selectedVideoCategary, setSelectedVideoCategary] = useState("allData");
  const [page, setPage] = useState(1);
  const [newVideo,setNewVideo] = useState(null)
  const [EditModal,setEditModal] = useState(null)
  const [state,setState] = useState({
    visibility: false,
    Videourl : '',
    VideoTitle :'',
  })
  
  useEffect(() => {
    props.VideosData.videos = []
    props.VideosData.loading=true
    props.GET_YOUTUBE_CATEGARY_ACTION()
    props.GET_VIDEOS_ACTION({
      selectVideoCategary: selectedVideoCategary,
      page,
    });
  }, []);

  
  const EditFunction = (text) => {
    setEditModal(text)
  };

  const DeleteFunction = (data) => {
    props.DELETE_YOUTUBE_VIDEOS_ACTION(data._id)
    console.log(data)
  };


  const OpenYoutbeModal = (item) => {
    setState({
      visibility: true,
      Videourl : item.url,
      VideoTitle : item.title,
    })
  }
  const VideosColumn = [
    {
      align: "center",
      title: "sno",
      dataIndex: "sno",
      width: '80px',
      filtered: true,
      render: (text) => <p>{text}</p>,
    },
    {
      align: "center",
      title: "categary",
      dataIndex: "categary",
      width: '150px',
      filtered: true,
      render: (text) => <p>{text}</p>,
    },
    {
      align: "center",
      title: "title",
      dataIndex: "title",
      width: '150px',
      filtered: true,
      render: (text) => <p>{text}</p>,
    },
    {
      align: "center",
      title: "url Id",
      dataIndex: "url",
      width: '150px',
      filtered: true,
      render: (text) => <p>{text}</p>,
    },
    {
      align :'center',
      title : 'thumbnail',
      dataIndex:'thumbnail',
      width: '150px',
      render : (text) => <img rel="noreferrer" src={get_youtube_thumbnail(`https://youtu.be/${text.url}`, 'max').toString()} alt="" style={{width:'75px',height:'75px',objectFit:'contain'}} onClick={() => OpenYoutbeModal(text)}/>      
    },
    {
      align: "center",
      title: "edit",
      width: '80px',
      dataIndex: "edit",
      render: (text) => (
        <Popconfirm
          title="confirm to edit"
          onCancel={() => message.warn("denied for edit")}
          onConfirm={() => EditFunction(text)}
        >
          <Button>
            <EditOutlined />
          </Button>
        </Popconfirm>
      ),
    },
    {
      align: "center",
      title: "delete",
      dataIndex: "delete",
      width: '80px',
      render: (text) => (
        <Popconfirm
          title="confirm to delete"
          onCancel={() => message.warn("denied for remove")}
          onConfirm={() => DeleteFunction(text)}
        >
          <Button>
            <CheckCircleOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  var Videos = [];
  props.VideosData.videos &&
    props.VideosData.videos.forEach((item, index) => {
      Videos.push({
        key: index,
        sno: index + 1,
        title: item.title,
        url: item.url,
        categary: item.categary,
        thumbnail : item,
        edit: item,
        delete: item,
      });
    });

    
   function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  }


  const LoadMoreData = () => {
      setPage(page + 1)
      props.GET_VIDEOS_ACTION({
        selectVideoCategary: selectedVideoCategary,
        page:page+1,
      });
      props.VideosData.loading=true
  }

  const OnchangeVideoCategary = (e) => {    

    props.VideosData.videos = []
    props.GET_VIDEOS_ACTION({
      selectVideoCategary: e,
      page : 1,
    });    
    setPage(1)
    setSelectedVideoCategary(e)
  }

  const VisibilityToggle = () =>
  {
    setState({
      visibility: false      
    })    
  }

  return (
    <div>  
      <Row justify="space-between">
        <Button onClick={() => setNewVideo(true)}><PlusCircleOutlined />Add New Video</Button>
        <Select style={{width:'160px'}} defaultValue={"AllData"} onChange={OnchangeVideoCategary}>
        <Select.Option key={"allData"} value={"allData"}>{"AllData"}</Select.Option>
          {
            props.VideosData.YoutubeCategary.map((item,index)=>{
              return (
                <Select.Option key={index} value={item.categary}>{item.categary}</Select.Option>
              )
            })
          }              
        </Select>
      </Row>    
            <Table columns={VideosColumn}  
            style={{overflowX:'auto',backgroundColor:'white',height:'calc(100vh - 160px)'}}                                    
            pagination={{ position: ['bottomRight'] , style:{position:'fixed',right:'20px',bottom:'20px',margin:'2px'}}}
            bordered={true}            
            size="small"
            loading={props.VideosData.loading}            
            dataSource={Videos} />
            <Row justify="center" style={{marginTop:'10px'}}>
            {props.VideosData.hasMoreData && <Button loading={props.VideosData.loading} onClick={LoadMoreData}> Load More Data </Button>}            
            </Row>                  
      {state.visibility && <Youtubemodel state={state} VisibilityToggle={VisibilityToggle}/>}
      {EditModal  && <EditVideoModal EditModal={EditModal} setEditModal={setEditModal} youtubeCategary={props.VideosData.YoutubeCategary} />}
      {newVideo && <CreateYouTubeVideoModal setNewVideo={setNewVideo} newVideo={newVideo} youtubeCategary={props.VideosData.YoutubeCategary}/>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    VideosData: state.VideoReducer,
  };
};


const mapDispatchToProps = {
  GET_VIDEOS_ACTION: GET_VIDEOS_ACTION,
  GET_YOUTUBE_CATEGARY_ACTION : GET_YOUTUBE_CATEGARY_ACTION,
  DELETE_YOUTUBE_VIDEOS_ACTION : DELETE_YOUTUBE_VIDEOS_ACTION,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Youtubevideoslist);
