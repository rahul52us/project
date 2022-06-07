import React, { useEffect, useState } from 'react';
import './FeesStructure.scss'
import Moment from 'react-moment';
import { Button, Col, Divider, Input, Row, Select } from 'antd';
import { CREATE_FEES_CATEGARY_STUDENT_ACTION } from '../../../store/StudentManageStore/action';
import { DatePicker, Space } from 'antd';
import { connect } from 'react-redux';
import Inputcomponent from '../../../common/inputComponent/InputComponent';
import { Notify } from '../../../config/Notify/Notify';

const FeesStructure = (props) => {
    const {data} = props;         
    const { RangePicker } = DatePicker;    
    const [SendData,setSendData] = useState({
        userId : data.userId._id,
        StartDate : '',
        EndDate : '',
        depositBy:'cash',
        NoOfInstallment:0,
        amount : 0,
        dateSubmission:'',
        TotalFees : 0,
        remainingFees:'',
        FinancialYear:'',
        DepositeMonth:''
    })
    
    const handleInputData = (e) => {
        console.log(e.target.value)
        console.log(e.target.name)
        setSendData({...SendData,[e.target.name] : e.target.value})
    }

    const handleSubmitData = () => {
        if(parseInt(SendData.TotalFees) < parseInt(SendData.amount))
        {
            Notify({type : 'error' , message : 'total fees should be greature than deposite fees '})
            return
        }
        if(!SendData.DepositeMonth)
        {
            Notify({type : 'error' , message : 'Fees deposition for the month are required !'})            
            return            
        }
        if(!SendData.FinancialYear)
        {
            Notify({type : 'error' , message : 'Fees deposition for the month are required !'})            
            return            
        }



        var FeesInfo = [{
            amount : parseInt(SendData.amount),
            StartDate : SendData.DepositeMonth[0],
            EndDate : SendData.DepositeMonth[1],
            depositBy:SendData.depositBy,
        }]


        console.log({
            userId : SendData.userId,
            remainingFees : SendData.TotalFees - SendData.amount,
            NoOfInstallment : SendData.NoOfInstallment,
            FeesInfo : JSON.stringify(FeesInfo),
            TotalFees : parseInt(SendData.TotalFees),
            FinancialYear : JSON.stringify([{StartYear : SendData.FinancialYear[0] , EndYear : SendData.FinancialYear[1]}])
        })

        props.CREATE_FEES_CATEGARY_STUDENT_ACTION({
            userId : SendData.userId,
            remainingFees : SendData.TotalFees - SendData.amount,
            NoOfInstallment : SendData.NoOfInstallment,
            FeesInfo : JSON.stringify(FeesInfo),
            TotalFees : parseInt(SendData.TotalFees),
            FinancialYear :JSON.stringify({StartYear : SendData.FinancialYear[0] , EndYear : SendData.FinancialYear[1]})
        })
    }


    return (
        <div>                             
            <Row>
            <Col sm={18} xl={7} xs={24} md={12} style={{margin:'10px'}}>
                <label>
                    Financial Date :-
                </label>
               <RangePicker onChange={(e) => setSendData({...SendData,'FinancialYear':e})}/>         
            </Col>   
            <Divider style={{margin:'10px'}}/>                
                <Col sm={18} xl={7} xs={24} md={10} style={{margin:'10px'}}>
                    <Inputcomponent type="number" value={SendData.TotalFees} name="TotalFees" onChange={handleInputData} placeholder={"Enter the Total Fees"} min={0} label={"Total Fees :"} hint={"Total Fees is required !"}/>
                </Col>
                
                <Col sm={18} xl={7} xs={24} md={10} style={{margin:'10px'}}>
                <Inputcomponent type="number" value={SendData.NoOfInstallment} name="NoOfInstallment" onChange={handleInputData}  placeholder={"Total No. of installments"} min={0} label={"Total No. of installements"} hint={"required field!"}/>
                </Col>
                                
                <Col sm={18} xl={7} xs={24} md={10} style={{margin:'10px'}}>
                <Inputcomponent type="number" name="amount" value={SendData.amount} onChange={handleInputData} placeholder={"Deposite fees"} min={0} label={"Deposite fees"} hint={"Deposite fees as first installment !"}/>
                </Col>

                <Col sm={18} xl={7} xs={24} md={10} style={{margin:'10px'}}>
                <Inputcomponent type="number" placeholder={"Total No of installments"} name="NoOfInstallments" value={SendData.NoOfInstallment} min={0} label={"Total No of installments"} hint={"No. of installemts"} />
                </Col>
                <Divider style={{margin:'10px'}}/>                
                <Col sm={18} xl={7} xs={24} md={10} style={{margin:'10px'}}>
                    <label>Fees deposite by :</label>
                    <Select defaultValue={"cash"} style={{width:'100%'}} onChange={(e) => setSendData({...SendData,'depositBy':e})}>
                        <Select.Option value="cash">
                            Cash
                        </Select.Option>
                        <Select.Option value="network">
                            Network
                        </Select.Option>
                    </Select>                
                </Col>
                <Divider style={{margin:'10px'}}/>                
               
                <Col sm={18} xl={7} xs={24} md={12} style={{margin:'10px'}}>
                <label>
                    Date of submission fees  :-
                </label>
               <RangePicker onChange={(e) => setSendData({...SendData,'DepositeMonth':e})}/>         
               </Col>   

                <Divider style={{margin:'10px'}}/>
                <Col sm={18} xl={24} xs={24} md={24} style={{margin:'10px'}}>
                    <Button  className='Button' onClick={handleSubmitData}>create fees</Button>
                    <Button className='Button'>create and generate fees slip</Button>
                </Col>                
        </Row>
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        
    }
}


const mapDispatchToProps = {
    CREATE_FEES_CATEGARY_STUDENT_ACTION : CREATE_FEES_CATEGARY_STUDENT_ACTION
}

export default connect(mapStateToProps,mapDispatchToProps)(FeesStructure)

