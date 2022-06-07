import React, { useEffect , useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Form, Progress , Button, Card } from 'antd';
import { Loader } from '../../../config/Notify/Notify';
import { FETCH_STUDENT_SINGLE_FEES_DETAILS_ACTION } from '../../../store/StudentManageStore/action';
import './UpdateFeesStructure.scss'
import { Col, DatePicker, Divider, Row, Space , Select } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import Inputcomponent from '../../../common/inputComponent/InputComponent';


const UpdateFeesStructure = (props) => {
    const [data,setData] = useState(props.data) 
    const [UpdateData,setUpdateData] = useState({
        NoOfInstallment : '',
        remainingFees:'',
        TotalFees:'',
        amount:'',
        submitedDate:'',
        depositedBy:''
    })
    const {RangePicker} = DatePicker       
    useEffect(()=>{
        props.CategaryStudentReducer.UpdateStudentFeesLoading=true
        props.FETCH_STUDENT_SINGLE_FEES_DETAILS_ACTION({_id:data.userId.ScholarFees,userId:data.userId._id})
    },[])

    useEffect(()=>{
        if(props.singleFeesDetails)
        {
            setUpdateData({
                NoOfInstallment :props.singleFeesDetails.NoOfInstallment,
                TotalFees : props.singleFeesDetails.TotalFees,
                remainingFees : props.singleFeesDetails.remainingFees 
            })            
        }
    },[props.singleFeesDetails])

    const handleInputData = (e) => {
        e.preventDefault()
        console.log(UpdateData)

        console.log(props.singleFeesDetails.FeesInfo)
        var TotalAmount=UpdateData.amount
        props.singleFeesDetails.FeesInfo.forEach((data,index)=>{
            TotalAmount = parseInt(data.amount) + parseInt(TotalAmount)
        })
        console.log(TotalAmount)
        console.log(UpdateData.TotalFees)

        console.log(UpdateData.TotalFees-TotalAmount)
    }

    return (        
             props.CategaryStudentReducer.UpdateStudentFeesLoading ? <Loader size="large" text="fees data is loading , please wait"/> :            
             UpdateData && props.singleFeesDetails ? 
             <Card style={{height:'100%'}}>
             <form layout='verticle' onSubmit={handleInputData}>                              
             <div className='UpdateFeesStructure__Top'>              
             { 
                props.singleFeesDetails.FinancialYear.map((item,index)=>{
                    return(
                        <div key={index} className="UpdateFeesStructure__Top_Map">                            
                            <div className='UpdateFeesStructure_Financial_Year'>
                            <h4>Financial Year:- <HighlightOutlined /></h4>
                            <div>
                            <Moment format="YYYY/MM/DD">{item.StartYear}</Moment>
                            <br />
                            <Moment format="YYYY/MM/DD">{item.EndYear}</Moment>
                            </div>
                            <Space />
                            </div>                                
                        </div> )
                })
              }
             </div>
             <Row justify={'space-between'} >
             <Col sm={24} xl={7} xs={24} md={18}>
                   <Inputcomponent type="number" value={UpdateData.TotalFees} label="Total Fees" name="TotalFees" onChange={handleInputData} min={0}/>
                 </Col>
                 <Col sm={24} xl={7} xs={24} md={18}>
                   <Inputcomponent type="number" value={UpdateData.NoOfInstallment} label="Total No of Installments" name="NoOfInstallment" onChange={handleInputData} min={0}/>
                 </Col>
                 <Col sm={24} xl={7} xs={24} md={18}>
                   <Inputcomponent type="number" value={UpdateData.remainingFees} label="Remaining Fees" name="remainingFees" onChange={handleInputData} disabled={true} min={0}/>
                 </Col>
             </Row>
             <Row className='mt-5'>
               <Progress percent={50} status="active" />             
             </Row>
             <Row>             
             <Col sm={24} xl={24} xs={24} md={24}>
                 <h3>NOTE :-</h3>
                 <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse in, libero tempora quisquam sit ut expedita,
                    sapiente nihil suscipit quidem sed ullam, qui cum exercitationem quas iste error ea maiores!</h4>
                 </Col>
             </Row>             
             <Row justify={'space-between'} >
             <Col sm={24} xl={7} xs={24} md={18}>
                   <Inputcomponent type="number" value={UpdateData.amount} label="Amount" name="amount" onChange={(e) => setUpdateData({...UpdateData,'amount':e.target.value})} max={UpdateData.remainingFees}/>
                 </Col>                 
             </Row>               
             <Row justify='space-between'>
             <Col sm={24} xl={7} xs={24} md={18}>
                    <label>Fees deposite by :</label>
                    <Select defaultValue={"cash"} name="depositedBy" style={{width:'100%'}} onChange={(e) => setUpdateData({...UpdateData,'depositedBy':e})}>
                        <Select.Option value="cash">
                            Cash
                        </Select.Option>
                        <Select.Option value="network">
                            Network
                        </Select.Option>
                    </Select>                                
            </Col>                      
            <Col span={12} sm={24} xl={7} xs={24} md={18}>
            <label>Fees deposite by :</label>
            <br />

            <RangePicker onChange={(e) => setUpdateData({...UpdateData,'submitedDate':e})}/>
            </Col>        
            </Row>       
            <Button htmlType='submit'>submit</Button>                  
            </form>
            </Card> 
            : <Loader size={"large"}/>
    )
}
const mapStateToProps = (state) => {
    console.log(state.CategaryStudentReducer)
    return {
        CategaryStudentReducer : state.CategaryStudentReducer,
        singleFeesDetails:state.CategaryStudentReducer.singleFeesDetails
    }
}
const mapDispatchToProps = {
    FETCH_STUDENT_SINGLE_FEES_DETAILS_ACTION : FETCH_STUDENT_SINGLE_FEES_DETAILS_ACTION
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateFeesStructure)

