import Chart from "react-apexcharts";
import React from 'react';
import './chartClass.scss'


const Dashchart = () => {

    const options =  {   
        dataLabels: {
            style: {
              fontSize: '10px',
              fontWeight: 'bold',
            },
        },    
        labels : ['hindi', 'english', 'science', 'computer', 'G.K.'],
        series : [44, 55, 41, 17, 15]
    }
    

    return (
        <div className="chartClass">
            <Chart options={options} series={options.series} type="donut" width="100%" />
        </div>
    );
};


export default Dashchart;
