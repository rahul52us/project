import { notification, Spin } from "antd";

export const Notify = ({type, message , description , status}) => {
    notification.open({type : type , message : message , description : description , placement : 'topRight'})
}

export const Loader = ({size,text}) => {
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h4>{text}</h4>
        <Spin size={size}/>
        </div>
    )
}

export const FullHeightLoader = ({size,text}) => {
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'80vh',justifyContent:'center'}}>        
        <Spin size={size}/>
        <h4>{text}</h4>
        </div>
    )
}