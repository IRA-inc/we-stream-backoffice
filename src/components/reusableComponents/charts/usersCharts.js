import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import  Card  from '../../Card'
import Chart from "react-apexcharts";

const UsersCharts =(props)=>{

    const {series, labels} =props
    const chart1={
        options:{
           chart: {
              id: "view-chart-01",
              },
           colors:['#e20e02', '#f68a04', '#007aff','#545e75'],
           labels: labels,
           dataLabels: {
              enabled: false
         },
         stroke: {
             show: false,
             width: 0
         },
         legend: {
             show: false,
         },
         responsive: [{
           breakpoint: 480,
           options: {
             chart: {
               width: 200
             },
             legend: {
               position: 'bottom'
             }
           }
         }]
        },
         series: series,
     }
     const colors=["primary","danger","info","success","warning","light","dark"]
return(
<>
<Card className="iq-card-block iq-card-stretch iq-card-height">
                    <div className="iq-card-header">
                       <Card.Header.Title>
                          <h4 className="card-title text-center">User's favorite categories</h4>
                       </Card.Header.Title>
                    </div>
                    <Card.Body className="pb-0">
                        <Chart  id="view-chart-01" options={chart1?.options} series={series?chart1?.series:[]} type="donut" width="250"  />
                       <Row className="mt-1">
                           {labels?.map((label,index)=>(
                          <Col sm="6" md="3" lg="6" className="iq-user-list" key={index}>
                             <Card>
                                <Card.Body>
                                   <div className="media align-items-center">
                                      <div className={`iq-user-box bg-${colors.find((color,Index)=>Index===index)}`}></div>
                                      <div className="media-body text-white">
                                         <p className="mb-0 font-size-14 line-height">{index+1}. {label}</p>
                                      </div>
                                   </div>
                                </Card.Body>
                             </Card>
                          </Col>
                          ))}
                       </Row>
                    </Card.Body>
                 </Card>
</>
)
}

export default UsersCharts