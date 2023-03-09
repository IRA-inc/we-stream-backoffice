import React from 'react'
import  Card  from '../../Card'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay  } from 'swiper';
import 'swiper/swiper-bundle.css';

const EventsCard =(props)=>{
    const {appStats}= props
    return(
       <>
        <Card id="slider1">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                           <div>
                              <h4 className="card-title m-0">Top Rated Events </h4>
                           </div>
                           <div className="" id="swiper">
                              <div className="swiper-button swiper-button-prev">Previous</div>
                              <div className="swiper-button swiper-button-next">Next</div>
                           </div>
                    </Card.Header>
                    <Card.Body>
                       <Swiper
                           navigation={{
                              prevEl: '.swiper-button-prev',
                              nextEl: '.swiper-button-next'
                           }}
                           breakpoints={{
                              320: {   slidesPerView: 1},                
                              550: { slidesPerView: 2 },
                              991: { slidesPerView: 3 },
                              1400: { slidesPerView: 4 },
                           }}
                           loop={true}
                           className="list-unstyled row top-rated-item mb-0 iq-rtl-direction"
                        >
                            {appStats?.data?.map((stats,index)=>(
                          <SwiperSlide className="col-sm-6 col-lg-4 col-xl-3 iq-rated-box" key={index}>
                             <Card className="mb-0">
                                <Card.Body className="p-0">
                                   <div className="iq-thumb">
                                      <Link to={`/edit-event/${stats?.event[0]?._id}`}>
                                         <img src={stats?.event[0]?.banner} className="img-fluid w-100 img-border-radius" alt=""/>
                                      </Link>
                                   </div>
                                   <div className="iq-feature-list">
                                      <h6 className="font-weight-600 mb-0">{stats?.event[0]?.name}</h6>
                                      {/* <p className="mb-0 mt-2">T.v show</p> */}
                                      <div className="d-flex align-items-center my-2 iq-ltr-direction">
                                         <p className="mb-0 mr-2"><i className="lar la-eye mr-1"></i>{stats?.views}</p>
                                         <p className="mb-0 "><i className="las la-download ml-2"></i> {stats?.maxTotalAmount} frw</p>
                                      </div>
                                   </div>
                                </Card.Body>
                             </Card>
                          </SwiperSlide>
                            ))}
                          </Swiper>
                    </Card.Body>
                 </Card>
       </> 
    )
}

export default EventsCard;
