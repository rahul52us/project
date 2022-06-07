import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'


const AppsBreadcrumbComponent = (props) => {        
    return (
        <Breadcrumb>
            {(props.items) ? props.items.map((item, index) => (
                <Breadcrumb.Item key={index}>
                    {
                        item.link ? (
                            <Link to={item.link}>{item.name}</Link>
                        ) : (item.name)
                    }
                </Breadcrumb.Item>
            )) : null
            }
        </Breadcrumb>
    )
} 
export default AppsBreadcrumbComponent
