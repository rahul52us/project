import React, { useEffect , useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Modal, PageHeader, Row, Tooltip, Col, Typography } from 'antd'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import CreateQuiz from '../CreateQuiz/CreateQuiz';
import { GET_ALL_CATEGARY_QUIZ_ACTION } from '../../../store/projectStore/Quiz/action'
import EditQuizQuestion from '../EditQuizQuestion/EditQuizQuestion';
import AppsBreadcrumbComponent from '../../../config/AppBreadCrum/AppBreadCrumComponent';
import { FullHeightLoader, Loader } from '../../../config/Notify/Notify';

const DashQuizCreater = (props) => {
    const [ShowCreateQuizDiv,setShowCreateQuizDiv] = useState(false)
    const [page,setPage] = useState(1)
    const {categary,topic} = useParams()

    useEffect(() => {
        props.Quiz.quiz=[]
        setPage(1)
        props.GET_ALL_CATEGARY_QUIZ_ACTION({Categary : categary , Topic : topic , Page : page })                
    },[])

    const LoadMoreQuiz = () => {
        props.GET_ALL_CATEGARY_QUIZ_ACTION({Categary : categary , Topic : topic , Page : page + 1  }) 
        setPage(page + 1)
    }    
  return (    
       !props.Quiz.loading ? 
      <Row style={{margin:'10px'}}>
          <Row style={{margin:'10px'}}>
             <AppsBreadcrumbComponent items={[{name : 'dashboard' , link : '/dashboard'},{name : 'quiz' , link :'/dashboard/quiz'},{name : `${categary}  /  ${topic}`}]}/>
          </Row>
          <Row justify='space-between' style={{width:'100%'}}>
              <Col><Typography.Title level={4}>{categary}</Typography.Title><Typography.Title  level={5}>{topic}</Typography.Title></Col>
              <Col><Button key={'create new question'} onClick={() => setShowCreateQuizDiv(!ShowCreateQuizDiv)}><PlusCircleOutlined />create new question</Button></Col>              
          </Row>
          <Tooltip title={`total question ${props.Quiz.quiz.length}`}><span> Total Questions :- {props.Quiz.quiz.length} </span> </Tooltip>           
        <Row justify='space-between' style={{width:'100%'}}>                         
            {props.Quiz.quiz.map((item,index)=>{
                return (
                    <Col span={24} key={item._id}>
                    <EditQuizQuestion key={item._id} index={index+1} item={item}/>                        
                    </Col>)
                    })}
        </Row>        
        {ShowCreateQuizDiv && 
            <Modal visible={ShowCreateQuizDiv} footer={null} onCancel={() => setShowCreateQuizDiv(false)}>
            <CreateQuiz Categary={categary} Topic={topic}/>
            </Modal>}     
        <Row style={{width:'100%'}} justify='center'>{props.Quiz.hasMoreData && <Button onClick={LoadMoreQuiz}>Load More</Button>}</Row>    
        </Row> : <FullHeightLoader text="please wait" size={"large"}/>
  )
}

const mapStateToProps = (state) => {    
    return {
        Quiz : state.QuizReducer
    }
}

const mapDispatchToProps = {
    GET_ALL_CATEGARY_QUIZ_ACTION : GET_ALL_CATEGARY_QUIZ_ACTION
}

export default connect(mapStateToProps,mapDispatchToProps)(DashQuizCreater)

