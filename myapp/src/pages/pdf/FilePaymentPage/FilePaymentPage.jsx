import React from 'react';
import { Result , Button  } from 'antd';
import { Link } from 'react-router-dom';

const Filepaymentpage = () => {
    return (
        <div>
           <div className='ErrorPart'>
              <Result
                    status="warning"
                    title="There are some problems with your operation."
                    extra={
                    <Button type="primary" key="console">
                    <Link to="/pdf">try later</Link>
                   </Button>                
             }
           />
           </div>
        </div>
    );
}

export default Filepaymentpage;
