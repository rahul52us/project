import React from 'react'
import { Card, Col, Row, Tooltip } from 'antd'
import {MoreOutlined , UserOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { disFlexColCenter } from '../../scssfile/InlineVariable';

const DashWidget = ({items,keys}) => {
  const {Meta} = Card; 
  console.log(items) 

  return (
    <Col xxl={8} xl={8} sm={24} xs={24} md={12}>    
    <Card hoverable        
    loading={false}  
    title={<><UserOutlined style={{marginRight:'10px'}}/><span>{items.title}</span></>}
    key={keys}    
    extra={<MoreOutlined keys={keys}/>}
    >          
    <Row justify="space-between" align='center'>
      <Col>
      <b>Active +</b>
      </Col>
      <Col>
      <Tooltip color={"blue"} title={`Total ${200}`}>
         <div style={{width:'45px',height:'45px',borderRadius:'50%',backgroundColor:'lightgreen',border:'2px solid gray'}} className="disCallCenter">
           {256}
         </div>
        </Tooltip>
      </Col>
    </Row>
          <Meta title="Europe Street beat" description={<Link to={items.link?items.link:'/dashboard' }>click here for {items.linkTitle}</Link>}  />
    </Card>
    </Col>
  )
}
export default DashWidget;