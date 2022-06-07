import React from 'react';
import './dashboard.scss'
import { Card , Row , Col } from 'antd';
import {UserOutlined} from '@ant-design/icons';
import Widget from '../../component/widgets/Widget';
import Dashchart from '../../component/dashChart/DashPdfChart';
import Dashuserchart from '../../component/dashChart/DashUserChart';
import { Link } from 'react-router-dom';
import AppsBreadcrumbComponent from '../../config/AppBreadCrum/AppBreadCrumComponent';
import { dashCardConfig } from '../../config/DashBoardConfig/DashCardConfig';
import DashWidget from '../../component/widgets/Widget';

// const widgetsData = [
    
//     {
//         title :  <Link to="/dashboard/usersList">users</Link>,
//         icons : UserOutlined,
//         count : 12,        
//     },
//     {
//         title : <Link to="/dashboard/pdflist">pdf</Link>,         
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : <Link to="/dashboard/youtubeVideos">YoutubeVideos</Link>,         
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : <Link to="/dashboard/quiz">quiz</Link>,         
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : <Link to="/dashboard/users/Blocks">Block Users</Link>,         
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : <Link to="/dashboard/chat">Chat</Link>,
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : <Link to="/dashboard/student/management">Student Managent</Link>,
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
//     {
//         title : 'users',
//         icons : UserOutlined,
//         count : 12
//     },
// ]


const Dashboard = () => {    
    return (
        <Card>      
      {/* <AppsBreadcrumbComponent items={dashboardBreadCrub}/> */}
      <Row gutter={[15,15]}>              
      {
        dashCardConfig.map((item,index)=>{
          return (
            <DashWidget key={index} items={item} />            
          )
        })
      }      
      </Row>
    </Card>
    );
};


export default Dashboard;
