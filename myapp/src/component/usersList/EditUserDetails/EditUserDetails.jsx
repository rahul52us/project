import { Avatar, Button, Form, Input, message, Radio, Select, Switch , Card } from 'antd';
import React,{useEffect, useMemo , useState} from 'react';
import { Country, State, City }  from 'country-state-city';
import api from '../../../config/backendApi/BackendApi'
import Inputcomponent from '../../../common/inputComponent/InputComponent';
import { Notify } from '../../../config/Notify/Notify';


const EditUserDetail = (props) => {
    const [errorPart,setErrorPart] = useState(false)    
    const [selectCountryCode , setSelectCountryCode] = useState("In")
    const [selectState , setSelectState] = useState([])
    const [SelectedCities , setSelectedCities] = useState([])
    const [CityCode , setCityCode] = useState(null)
    const {state}  = props
    const [form] = Form.useForm()

    const [UserInfo,setUserInfo] = useState({
        _id:state.ExtraInfo,
        userId:'',
        FatherName:'',
        MotherName:'',
        className:'',
        Age:'',
        DOB:'',
        section:'',
        standard:'',
        BloodGroup:'',
        gender:'male',
        address:'',
        PhoneNo:'',
        sibling:'',
        description:'',
        pinCode:'',
        country : '',
        state:'',
        city : ''        
    })
    const options = useMemo(() => Country.getAllCountries(), [])
    useEffect(()=>{
        async function GetUserData()
        {      

            try
            {              
              const response = await api.post('/api/auth/getUserDetails',{email : state.email , userId : state._id})                                    
              setUserInfo({
                  _id: state.ExtraInfo,
                  userId:state._id,
                  FatherName:response.data.FatherName,
                  MotherName:response.data.MotherName,
                  className:response.data.className,
                  Age:response.data.Age,
                  DOB:response.data.DOB,
                  section:response.data.section,
                  standard:response.data.standard,
                  BloodGroup:response.data.BloodGroup,
                  gender:response.data.gender,
                  address:response.data.address,
                  PhoneNo:response.data.PhoneNo,
                  sibling:response.data.sibling,
                  description:response.data.description,
                  pinCode:response.data.pinCode,
                  country : response.data.country,
                  state:response.data.state,
                  city : response.data.city        
              })
            }
            catch(err)
            {
                Notify({type : 'warning' , description : err.response.data })                            
                setErrorPart(true)            
            }            
        }
        GetUserData()  
    },[])


   function changeCountryCode(event,Code)
   {
       const states =  State.getStatesOfCountry(Code.value) 
       setSelectCountryCode(Code.value)
       setSelectState(states)       
       setUserInfo({...UserInfo,'country':Code.key})         
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
       try
        {             
            console.log('the e data is ',e)
              const response = await api.post('/api/auth/editUserDetails',UserInfo)
              message.info('data updated successfully')
              props.setEditModal(null)              
        }
        catch(err)
        {
            Notify({type : 'error', description : err.message , message : 'Update User Failed' })            
            props.setEditModal(null)
        }       
   }

   console.log('the userInfo age is',UserInfo.Age)
  return (      
    <div className='CreateProfileDetail'>
        <div className='EditUserProfileSwitch'>
          <Switch />
        </div>        
        <h3>Edit your profile</h3>        
        <Button onClick={() => props.DELETE_USER_ACCOUNT_ACTION({userId:state.email})}>Delete Account</Button>
        <div className='userData'>            
            <div className='UserData__Avatar' >
              <Avatar src={state.pic} size="large" style={{width:'100%',height:'100%'}}/>
           </div>
           <p>{state.name}</p>
           <p>{state.email}</p>
        </div>
    <Form onFinish={SendUserDetails} form={form} layout="vertical">
    
            <Inputcomponent name="FatherName" label="Father Name" type="text" placeholder="Enter the father name"    hint="Provide the Father Name" rules={[{required : true , message : 'father name is required'} , { type : 'email' , message : 'email is not valid'}]} />
            <Inputcomponent name="MotherName" label={"Mother Name"} type="password" placeholder="Enter the mother name"  hint="Provide the Mother Name" />
            <Inputcomponent name="className" label={"Class"} type="number" placeholder="Enter the class name"  hint="Enter or Edit the className"/>                   
            <Inputcomponent name="section" label={"Section"} type="text" placeholder="Enter the Section"  hint="Enter or Edit the Section"/>
            <Inputcomponent name="standard" label={"Medium"} type="text" placeholder="Enter the medium name"   hint="Enter or Edit the Medium"/>
            <Inputcomponent name="BloodGroup" label={"Blood Group"} type="text" placeholder="Enter the Blood Group"   hint="Enter or Edit the Blood Group"/>        
            <Inputcomponent label="DOB"  type="date" placeholder={UserInfo.DOB}  hint="Provide the DOB"/>
            <Inputcomponent  label="Age" type="number" placeholder="Enter the age" hint="Provide the Age"/>
        
        <div className='InputFields'>
            <label>
                gender *
            </label>
            <div className='CreateProfileDetail__radio'>
            <Radio.Group onChange={(e) => setUserInfo({...UserInfo,'gender':e.target.value})} value={UserInfo.gender}>
                <Radio value={"male"}>Male</Radio>
                <Radio value={"female"}>Female</Radio>
                <Radio value={"transgender"}>Transgender</Radio>                
            </Radio.Group>           
            </div>
        </div>

        
        
            <Inputcomponent label={"Sibling"} type="number" placeholder='Number of sibling' name="sibling" value={UserInfo.sibling} onChange={(e) => setUserInfo({...UserInfo,'sibling':e.target.value})} hint="No of Sibling."/>                
            <Inputcomponent label={"Telephone No."} type="telephone" placeholder="Enter the phone no"  value={UserInfo.PhoneNo} onChange={(e) => setUserInfo({...UserInfo,'PhoneNo':e.target.value})}  hint="Telephone No"/>
            <Inputcomponent label="Address" type="text" placeholder="Enter the Address"  value={UserInfo.address} onChange={(e) => setUserInfo({...UserInfo,'address':e.target.value})}  hint="Address" />
            <Inputcomponent label={"Pin Code"}  type="text" placeholder="Enter the pin code"  value={UserInfo.pinCode} onChange={(e) => setUserInfo({...UserInfo,'pinCode':e.target.value})}  hint="Pin Code"/>
            
        <div className='InputFields'>
            <label>
            Country *
            </label>
                <Select className="CreateProfile__Select"  placeholder={UserInfo.country} onChange={(e,Code) => changeCountryCode(e,Code)}>            
                {
                    options.map((item)=>{
                        return (
                            <Select.Option key={item.name} value={item.isoCode}>{item.name}</Select.Option>
                        )                        
                    })
                }            
                </Select>            
        </div>

        <div className='InputFields'>
            <label>
                State *
            </label>
            <Select  className="CreateProfile__Select" placeholder={UserInfo.state} onChange={(event,code) => changeStateToCities(event,code)}>            
                {
                    selectState.map((item,index)=>{
                        return (
                            <Select.Option key={item.name} value={item.isoCode}>{item.name} {item.flag}</Select.Option>
                        )                        
                    })
                }            
            </Select>            
        </div>

        <div className='InputFields'>
            <label>
                City *
            </label>
            <Select  className="CreateProfile__Select" placeholder={UserInfo.city}  onChange={(event,code) => GetCity(event,code)}>            
                {
                    SelectedCities.map((item,index)=>{
                        return (
                            <Select.Option key={item.name} value={item.isoCode}>{item.name}</Select.Option>
                        )                        
                    })
                }            
            </Select>            
        </div>        
            <Inputcomponent type="textarea" placeholder={`Any description about ${state?.name}`} rowSize={4} label={`Any description about ${state?.name}`}/>        
        <Button disabled={errorPart} htmlType='submit'>Submit</Button>
        </Form>
        </div>        
  )
}
export default EditUserDetail;