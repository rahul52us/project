import { Button, Input, message, Select } from 'antd';
import React,{useMemo , useState} from 'react';
import './createProfileDetail.scss';
import { Country, State, City }  from 'country-state-city';
import { Avatar } from 'antd';
import api from '../../../config/backendApi/BackendApi'
import Inputcomponent from '../../../common/inputComponent/InputComponent';
import { Notify } from '../../../config/Notify/Notify';


const CreateDashProfileDetail = (props) => {
    const [UserInfo,setUserInfo] = useState({
        userId:'',
        section:'A',
        className:'',
        standard:'English',
        BloodGroup:'',
        FatherName:'',
        MotherName:'',
        Age:'',
        DOB:'',
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

    const [selectCountryCode , setSelectCountryCode] = useState("In")
    const [selectState , setSelectState] = useState([])
    const [SelectedCities , setSelectedCities] = useState([])
    const [CityCode , setCityCode] = useState(null)
    const {state}  = props

    const options = useMemo(() => Country.getAllCountries(), [])
   

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
       e.preventDefault()       
       if(!UserInfo.FatherName.trim() || !UserInfo.MotherName.trim())
       {
        message.loading({ content:`Action in progress`, duration: 2.5 , style : {marginTop:'100px'} })        
        .then(() => message.warn({ content:"please provide the all fields", duration: 2.5 , style : {marginTop:'100px'} })                   )         
        return
       }       
       try
       {
        UserInfo.userId = state._id
       const response = await api.post('/api/auth/userDetails',{email : state.email , details : UserInfo})
       props.UPDATE_EXTRA_INFO_USER_ACTION(response.data.saveuser)       
       Notify({type : 'success' , message : 'Created SuccessFully' , description : 'user details has been created successfully !'})
       props.setShowCreatedModal(null)
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

    <form onSubmit={SendUserDetails}>
        <div className='InputFields'>            
            <Inputcomponent label="Father Name"  type="text" placeholder="Enter the father name" value={UserInfo.FatherName} onChange={(e) => setUserInfo({...UserInfo,'FatherName':e.target.value})}  hint="Provide Father Name"/>
        </div>                
        <div className='InputFields'>                        
            <Inputcomponent label="Mother Name" type="text" placeholder="Enter the father name"  value={UserInfo.MotherName} onChange={(e) => setUserInfo({...UserInfo,'MotherName':e.target.value})} hint="Provide Mother Name"/>
        </div>
        <div className='InputFields'>            
            <Inputcomponent label="Class" type="text" placeholder="Select the class"  value={UserInfo.className} onChange={(e) => setUserInfo({...UserInfo,'className':e.target.value})} hint="select the class" />
        </div>
        <div className='InputFields'>            
            <Inputcomponent label="Medium" type="text" placeholder="Select the medium"  value={UserInfo.standard} onChange={(e) => setUserInfo({...UserInfo,'standard':e.target.value})} hint="select the Medium ex: hindi,english or other like gujrati etc " />
        </div>
        <div className='InputFields'>            
            <Inputcomponent label="Section" type="text" placeholder="What section you are in "  value={UserInfo.section} onChange={(e) => setUserInfo({...UserInfo,'section':e.target.value})} hint="What section you are in ex : A , B or C etc" />
        </div>
        <div className='InputFields'>            
            <Inputcomponent label="DOB" type="date" placeholder="Select the date"  value={UserInfo.DOB} onChange={(e) => setUserInfo({...UserInfo,'DOB':e.target.value})} hint="Provide the DOB" />
        </div>
        <div className='InputFields'>            
            <Inputcomponent  label="Age" type="number" placeholder="Enter the age"  value={UserInfo.Age} onChange={(e) => setUserInfo({...UserInfo,'Age':e.target.value})} hint="Provide the Age"/>
        </div>
        <div className='InputFields'>            
            <Inputcomponent  label="Blood Group" type="text" placeholder="Enter the Blood Group"  value={UserInfo.BloodGroup} onChange={(e) => setUserInfo({...UserInfo,'BloodGroup':e.target.value})} hint="Enter the Blood Group"/>
        </div>
        <div className='InputFields'>
            <label>
                gender *
            </label>
            <div className='CreateProfileDetail__radio'>
            <div><Input type="radio" name="gender"  value="male" onChange={(e) => setUserInfo({...UserInfo,'gender':e.target.value})}/>Male</div>
            <div><Input type="radio" name="gender" value="female" onChange={(e) => setUserInfo({...UserInfo,'gender':e.target.value})} />Female</div>
            <div><Input type="radio" name="gender" value="other" onChange={(e) => setUserInfo({...UserInfo,'gender':e.target.value})}/>other</div>
            </div>
        </div>
        <div className='InputFields'>            
            <Inputcomponent label="Sibling" type="number" placeholder='Number of sibling' name="sibling" value={UserInfo.sibling} onChange={(e) => setUserInfo({...UserInfo,'sibling':e.target.value})} hint="No of Sibling"/>            
        </div>
        <div className='InputFields'>            
            <Inputcomponent  label="Telephone No." type="telephone" placeholder="Enter the phone no"  value={UserInfo.PhoneNo} onChange={(e) => setUserInfo({...UserInfo,'PhoneNo':e.target.value})} hint="Telephone No." />
        </div>
        <div className='InputFields'>            
            <Inputcomponent label={"Address"}  type="text" placeholder="Enter the Address"  value={UserInfo.address} onChange={(e) => setUserInfo({...UserInfo,'address':e.target.value})}  hint="Provide the Current Address"/>
        </div>

        <div className='InputFields'>            
            <Inputcomponent label={"Pin Code"} type="text" placeholder="Enter the pin code"  value={UserInfo.pinCode} onChange={(e) => setUserInfo({...UserInfo,'pinCode':e.target.value})}  hint="Provide The Pin Code"/>
        </div>

        <div className='InputFields'>
            <label>
                Country *
            </label>
                <Select className="CreateProfile__Select" placeholder="Select the country" onChange={(e,Code) => changeCountryCode(e,Code)}>            
                {
                    options.map((item,index)=>{
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
            <Select  className="CreateProfile__Select" placeholder="Select the State" onChange={(event,code) => changeStateToCities(event,code)}>            
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
            <Select  className="CreateProfile__Select" placeholder="Select the city"  onChange={(event,code) => GetCity(event,code)}>            
                {
                    SelectedCities.map((item,index)=>{
                        return (
                            <Select.Option key={item.name} value={item.isoCode}>{item.name}</Select.Option>
                        )                        
                    })
                }            
            </Select>            
        </div>
        <div className='InputFields'>                                        
            <Input.TextArea label={`Description About ${state?.name}`} type="text" placeholder={`Any description about ${state?.name}`} value={UserInfo.description} onChange={(e) => setUserInfo({...UserInfo,'description':e.target.value})}  />
        </div>
        <Button htmlType='submit'>Submit</Button>
        </form>
        </div>
  )
}
export default CreateDashProfileDetail;