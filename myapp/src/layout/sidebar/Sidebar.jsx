import React from 'react';
import './sidebar.scss';
import { connect } from 'react-redux';
import { YoutubeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { OPENCOLLAPSE_ACTION } from '../../store/layoutStore/action';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';


const MenuData = [
    {
    title : <Link to="/">Home</Link>,
    key : 'home',
    icon : <AppstoreOutlined/>
    },
    {
        title : 'About',
        key : 'about',
        icon : <AppstoreOutlined/>
    },
    {
        title : <Link to="blog">Blog</Link>,
        key : 'Blog',
        icon : <AppstoreOutlined/>
    },
    {
        title : 'File',
        key : 'file',
        icon : <AppstoreOutlined/>
    },
    {
        title : 'Quiz',
        key : 'quiz',
        icon : <AppstoreOutlined/>
    },
    {
        title : 'dashboard',
        key : 'dashboard',
        icon : <DesktopOutlined/>
    },
    {
        title : 'Videos',
        key : 'Videos',
        icon : <YoutubeOutlined />
    },
    {      
        title : <Link to="">Help</Link> ,
        key : 'help',
        icon : <QuestionCircleOutlined/>
    },
    {
        title : 'group chat',
        key : 'groupChat',
        icon : <AppstoreOutlined/>
    },
]

const Sidebar = (props) => {
  
  return (
  <>  
    <div className={props.collapse ? 'sidebar' : 'sidebar_close'}>
      <Button
        type="primary"
        onClick={() => props.OPENCOLLAPSE_ACTION()}
        style={{
          width :props.collapse ?  '200px' : '0px',
          display: !props.collapse ? 'none' : 'block'          
        }}>
        {props.collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
       mode="inline"
       theme="dark"
       inlineCollapsed={props.collapse}       
       style={{ width:props.collapse ? '210px' : '-10px' , height:'95%',zIndex : props.collapse ? 999999 : 0  }}>        
          {
              MenuData.map((item)=>{
                  return (
                    <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>
                  )
              })
          }                  
      </Menu>
    </div>
    </>
  );
};
const mapStateToProps  = (state) => {
  return {
    collapse : state.layOutReducer.collapse
  }  
}
const mapDispatchToProps = {
  OPENCOLLAPSE_ACTION : OPENCOLLAPSE_ACTION
}
export default  connect(mapStateToProps,mapDispatchToProps)(Sidebar)




// const Sidebar = () => {
//     return (
//         <div className='sidebar'>
//             <div className="sidebar-top">
//                 <div className="sidebar-logo">
//                     <h5>KFC</h5>
//                 </div>
//             </div>
//             <div className="sidebar-middle">
//                <Link to="/"><SidebarElement icon={<HomeOutlined />} title="Home"/></Link>
//                <Link to="/about"><SidebarElement icon={<CrownOutlined />} title="About" /> </Link>
//                <Link to="/pdf"><SidebarElement icon={<FilePdfOutlined />} title="pdf"/></Link>
//                <Link to="/blog"><SidebarElement icon={<BlockOutlined />} title="Blogs"/></Link>
//                <Link to="/videos" ><SidebarElement icon={<YoutubeOutlined />} title="videos"/></Link>
//                <Link to="/quiz"><SidebarElement icon={<BookOutlined />} title="Quiz"/></Link>
//                <SidebarElement icon={<QuestionCircleOutlined />} title="Help"/>
//                <Link to="/dashboard"><SidebarElement icon={<BookOutlined />} title="dashboard"/></Link>
//             </div>
//             <div className="sidebar-bottom">
//                 <p>this is sidebar bottom</p>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;