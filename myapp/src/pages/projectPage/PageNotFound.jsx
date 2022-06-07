import React from 'react';
import { Result, Button } from 'antd';
import './PageNotFound.scss'
import { useNavigate } from 'react-router-dom';


const Pagenotfound = () => {

    const navigate = useNavigate()
    return (
        <div className='PageNotFound'>
                    <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={() => navigate(-1)}>Go back</Button>}
            />
        </div>
    );
}

export default Pagenotfound;

