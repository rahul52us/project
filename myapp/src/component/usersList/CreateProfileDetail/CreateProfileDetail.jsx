import { Button, Radio , message, Select , Form } from 'antd';
import React,{useMemo , useState} from 'react';
import { Country, State, City }  from 'country-state-city';
import { Avatar } from 'antd';
import api from '../../../config/backendApi/BackendApi'
import Inputcomponent from '../../../common/inputComponent/InputComponent';
import { Notify } from '../../../config/Notify/Notify';


const CreateProfileDetail = (props) => {
    const [form] = Form.useForm()

    const [UserInfo,setUserInfo] = useState({
        userId:'',        
        gender:'male',                
        country : '',
        state:'',
        city : ''        
    })


    const [selectCountryCode , setSelectCountryCode] = useState("In")
    const [selectState , setSelectState] = useState([])
    const [SelectedCities , setSelectedCities] = useState([])
    const [CityCode , setCityCode] = useState(null)
    const {state}  = props

    const options = useMemo(() => Country.getAllCountries(), [])
   

   function changeCountryCode(event,Code)
   {
       console.log(form.getFieldValue('country'))
       console.log('the e is',Code)
       const states =  State.getStatesOfCountry(event) 
       setSelectCountryCode(event)
       setSelectState(states)       
       //setUserInfo({...UserInfo,'country':Code.key})         

   }
      
   function changeStateToCities(event,Code)
   {           
       
       var cities = City.getCitiesOfState(selectCountryCode,Code.value)       
       setCityCode(Code.value)
       setSelectedCities(cities)              
       setUserInfo({...UserInfo,'state':Code.key})       
   }

   function GetCity(event,Code)
   {
    setUserInfo({...UserInfo,'city':Code.key})    
   }

   const SendUserDetails = async(e) => {       
       console.log(e)
       try
       {
    //     UserInfo.userId = state._id
    //    const response = await api.post('/api/auth/userDetails',{email : state.email , details : UserInfo})
    //    props.ME_USER_ACTION()
    //    Notify({type : 'success' , message : 'Created SuccessFully' , description : 'user details has been created successfully !'})
    //    props.setShowCreatedModal(null)
       }
       catch(err)
       {           
           Notify({type : 'error' , description : err?.response?.data , message : 'Create Profile Failed !'})           
       }       
   }
      
  return (
    <div className='CreateProfileDetail'>
        <h3>provide your details</h3>

        <div className='userData'>
            <div className='UserData__Avatar' >
              <Avatar src={state.pic} size="large" style={{width:'100%',height:'100%'}}/>
           </div>
           <p>{state.name}</p>
           <p>{state.email}</p>
        </div>

    <Form form={form} onFinish={SendUserDetails} layout="vertical">
            <Inputcomponent label="Father Name" name="FatherName" type="text" placeholder="Enter the father name"  hint="Provide Father Name" rules={[{required : true , message : 'father name is required' , whitespace: true}]} required/>        
            <Inputcomponent label="Mother Name" name="MotherName" type="text" placeholder="Enter the father name"   hint="Provide Mother Name" rules={[{required : true , message : 'mother name is required'}]} required/>              
            <Inputcomponent label="DOB" type="date" name="DOB" placeholder="Select the data" />                
            <Inputcomponent  label="Age" type="number" name="Age" placeholder="Enter the age" hint="Provide the Age" max={1}  rules={[{
            type: 'number',
            min: 0,
            max: 99 }]}/>

            <Inputcomponent label={"Select the gender"} initialValue="male" type="radio" name="gender" options={[{value:'male',name:'male'},{value:'female',name:'female'},{value:'other',name:'other',disabled:true}]} /> 
            <Inputcomponent label="Sibling" type="number" placeholder='Number of sibling' name="sibling"  hint="No of Sibling"/>            
            <Inputcomponent  label="Telephone No." name="PhoneNo" type="telephone" placeholder="Enter the phone no"  hint="Telephone No." />
            <Inputcomponent label={"Address"}  type="text" name="address" placeholder="Enter the Address"  hint="Provide the Current Address"/>        
            <Inputcomponent label={"Pin Code"} type="text" placeholder="Enter the pin code" name="pinCode" hint="Provide The Pin Code"/>

            <Form.Item>
                <Form.Item name="country" label="Country">
                <Select placeholder="Select the country"  onChange={(e,Code) => changeCountryCode(e,Code)}>            
                {
                    options.map((item,index)=>{
                        return (
                            <Select.Option key={item.name} value={item.isoCode}>{item.name}</Select.Option>
                        )                        
                    })
                }            
                </Select>  
                </Form.Item>          
            </Form.Item>        
            
            <Form.Item>
                <Form.Item name="state" label="state">
            <Select placeholder="Select the State" onChange={(event,code) => changeStateToCities(event,code)}>            
                {
                    selectState.map((item,index)=>{
                        return (
                            <Select.Option key={item.name} value={item.isoCode}>{item.name} {item.flag}</Select.Option>
                        )                        
                    })
                }            
            </Select>                        
            </Form.Item>
        </Form.Item>

        

        <Form.Item>
                <Form.Item name="city" label="City">
            <Select placeholder="Select the State" onChange={(event,code) => GetCity(event,code)}>            
                {
                    SelectedCities.map((item,index)=>{
                        return (
                            <Select.Option key={item.name} value={item.isoCode}>{item.name} {item.flag}</Select.Option>
                        )                        
                    })
                }            
            </Select>                        
            </Form.Item>
        </Form.Item>



       
            <Inputcomponent label={`Description About ${state?.name}`} type="textarea" showCount maxLength={300} placeholder={`Any description about ${state?.name}`} name="description"  />        
        <Button htmlType='submit'>Submit</Button>
        </Form>
        </div>
  )
}

export default CreateProfileDetail;