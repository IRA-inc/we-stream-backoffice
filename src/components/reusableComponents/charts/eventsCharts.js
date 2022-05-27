import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import  Card  from '../../Card'
import Chart from "react-apexcharts";

const EventsCharts =(props)=>{

    const {series, labels, data} =props
    console.log("data",data)

    const chart3={
        options : {
        chart: {
        id:"view-chart-02",
      },
      colors:['#e20e02','#83878a', '#007aff','#f68a04', '#14e788','#545e75'],
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
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
        }
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
                    <Card.Header className="align-items-center">
                       <Card.Header.Title>
                          <h4 className="card-title">Event by Category</h4>
                       </Card.Header.Title>
                       <div className="iq-card-header-toolbar d-flex align-items-center seasons">
                          {/* <div className="iq-custom-select d-inline-block sea-epi s-margin">
                              <Select options={options1} className="iq-select" />
                          </div> */}
                       </div>
                    </Card.Header>
                    <Card.Body className="row align-items-center">
                       <Col lg="7">
                          <Row className="list-unstyled mb-0 pb-0">
                              {data?.map((event,index)=>(
                             <Col sm="6" md="4" lg="6" className="mb-3" key={index}>
                                <div className={`iq-progress-bar progress-bar-vertical iq-bg-${colors.find((color,Index)=>Index===index)}`}>
                                   <span className="bg-primary" data-percent="100" style={{transition : "height 2s ease 0s", width: "100%", height: "40%",}}></span>
                                </div>
                                <div className="media align-items-center">
                                   <div className={`iq-icon-box-view rounded mr-3 iq-bg-${colors.find((color,Index)=>Index===index)}`}><i className="las la-film font-size-32"></i></div>
                                   <div className="media-body text-white">
                                      <h6 className="mb-0 font-size-14 line-height">{event?.category?.map((categ)=>categ?.name)[0]}</h6>
                                      <small className={`text-${colors.find((color,Index)=>Index===index)} mb-0`}>{event?.totalEvent}</small>
                                   </div>
                                </div>
                             </Col>
                             ))}
                          </Row>
                       </Col>
                       <Col lg="5">
                           <Chart id="view-chart-02" options={chart3.options} series={series?chart3.series:[]} type="donut" height="210" />
                       </Col>
                    </Card.Body>
                 </Card>
</>
)
}

export default EventsCharts