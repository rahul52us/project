import React from 'react';
import { Result, Button } from 'antd';
import './PageNotFound.scss'
import { Link } from 'react-router-dom';

const PageWorkInProgress = () => {
    return (
        <div className='PageNotFound'>
            <Result
                status="404"
                title="Work in progress"
                subTitle="Chat Section in progress Please try later again"
                extra={<Button type="primary"><Link to="/">Go Back</Link></Button>}
            />
        </div>
    );
}
export default PageWorkInProgress;

