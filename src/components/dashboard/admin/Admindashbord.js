import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import  Card  from '../../Card'
import Chart from "react-apexcharts";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay  } from 'swiper';
import 'swiper/swiper-bundle.css';
import Select from 'react-select'
import GeneralStats from './adminGeneralStats';
import TopFiveEvents from './topFiveEvents';
import EventList from '../../events/eventLists';
import UsersCategory from './usersCategory';
import EventsCategory from './EventsCategory';

SwiperCore.use([Navigation, Autoplay ]); 

const Dashbord = () => { 
   // const Navigation = () => {
     
   const options1 = [
      { value: 'today', label: 'Today' },
      { value: 'this month', label: 'This Month' },
      { value: 'this week', label: 'This Week' }
   ]

   const options2 = [
      { value: 'Most Likely', label: 'Most Likely' },
      { value: 'Unlikely', label: 'Unlikely' }
   ]

   const chart1={
      options:{
         chart: {
            id: "view-chart-01",
            },
         colors:['#e20e02', '#f68a04', '#007aff','#545e75'],
         labels: ["New Customer", "Exsisting Subscriber's", "Daily Visitor's", "Extented Subscriber's"],
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
       series: [44, 55, 30, 30],
   }
   const chart2={
         options : {
       colors:['#e20e02', '#007aff'],
         chart: {
         id:"view-chart-03",
         foreColor: '#D1D0CF'
       },
       plotOptions: {
         bar: {
           horizontal: false,
           columnWidth: '55%',
           endingShape: 'rounded'
         },
       },
       dataLabels: {
         enabled: false
       },
       stroke: {
         show: true,
         width: 2,
         colors: ['transparent']
       },
       xaxis: {
         categories: ['a','b','c','d'],
       },
       yaxis: {
         title: {
           text: ''
         }
       },
       fill: {
         opacity: 1
       },
       tooltip: {
           enabled: false,
         y: {
           formatter: function (val) {
             return "$ " + val + " thousands"
           }
         }
       }
       },
       series: [{
         name: 'This Month',
         data: [44, 55,30,60]
       }, {
         name: 'Last Month',
         data: [35, 41,20,40]
       }],
   }
   const chart3={
         options : {
         chart: {
         id:"view-chart-02",
       },
       colors:['#e20e02','#83878a', '#007aff','#f68a04', '#14e788','#545e75'],
       labels: ['Actions', 'Comedy', 'Harror', 'Drama', 'Kids','Thrilled'],
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
       series: [44, 30, 20, 43, 22,20],
   }
    return (
       <> 
        <Container fluid>
           <Row>
              <Col lg="8">
              <GeneralStats />
              <TopFiveEvents />
              </Col>
              <Col lg="4">
              <UsersCategory />
              </Col>
           </Row>
           <Row>
              <Col sm="12" lg="4">
                 <Card className="iq-card-block iq-card-stretch iq-card-height">
                    <Card.Header className="d-flex align-items-center justify-content-between">
                       <Card.Header.Title>
                          <h4 className="card-title">Categories</h4>
                       </Card.Header.Title>
                    </Card.Header>
                    <Card.Body className="p-0">
                    <Chart  options={chart2.options} series={chart2.series} type="bar" height="230"  />
                    </Card.Body>
                 </Card>
              </Col>
              <Col lg="8">
              <EventsCategory />
              </Col>
              <Col sm="12">
              <Card>
              <EventList />
              </Card>
              </Col>
           </Row>
        </Container>
        </>
    )
}

export default Dashbord;