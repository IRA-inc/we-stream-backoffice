import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import  Card  from '../../Card'
import { getAppStats } from "../../../actions";
import { APP_STATS_LOADING_ID } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
const GeneralStats=()=>{

  const dispatch = useDispatch();
  const appStats = useSelector((state) => state.appStatsReducer.appStats);
  const isloading = useSelector(
    (state) => state?.loader[APP_STATS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getAppStats());
  }, [dispatch]);
    return(
    <>
       <Row>
          <Col sm="6" lg="6" xl="3">
             <Card className="iq-card-block iq-card-stretch iq-card-height">
                <Card.Body>
                   <div className="d-flex align-items-center justify-content-between">
                      <div className="iq-cart-text text-capitalize">
                         <p className="mb-0">
                            views
                         </p>
                      </div>
                      <div className="icon iq-icon-box-top rounded-circle bg-primary">
                         <i className="las la-eye"></i>
                      </div>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mt-3">
                      <h4 className=" mb-0">{appStats?.data?.views}</h4>
                      {/* <p className="mb-0 text-primary"><span><i className="fa fa-caret-down mr-2"></i></span>35%</p> */}
                   </div>
                </Card.Body>
             </Card>
          </Col>
          <Col sm="6" lg="6" xl="3">
             <Card className="iq-card-block iq-card-stretch iq-card-height">
                <Card.Body>
                   <div className="d-flex align-items-center justify-content-between">
                      <div className="iq-cart-text text-capitalize">
                         <p className="mb-0 font-size-14">
                            Events
                         </p>
                      </div>
                      <div className="icon iq-icon-box-top rounded-circle bg-warning">
                         <i className="lar la-star"></i>
                      </div>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mt-3">
                      <h4 className="mb-0">{appStats?.data?.events}</h4>
                      {/* <p className="mb-0 text-warning"><span><i className="fa fa-caret-up mr-2"></i></span>50%</p> */}
                   </div>
                </Card.Body>
             </Card>
          </Col>
          <Col sm="6" lg="6" xl="3">
             <Card className="iq-card-block iq-card-stretch iq-card-height">
                <Card.Body>
                   <div className="d-flex align-items-center justify-content-between">
                      <div className="iq-cart-text text-capitalize">
                         <p className="mb-0 font-size-14">
                            Event Organisers
                         </p>
                      </div>
                      <div className="icon iq-icon-box-top rounded-circle bg-info">
                         <i className="las la-download"></i>
                      </div>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mt-3">
                      <h4 className="mb-0">{appStats?.data?.eventOrganizers}</h4>
                      {/* <p className="mb-0 text-info"><span><i className="fa fa-caret-up mr-2"></i></span>80%</p> */}
                   </div>
                </Card.Body>
             </Card>
          </Col>
          <Col sm="6" lg="6" xl="3">
             <Card className="iq-card-block iq-card-stretch iq-card-height">
                <Card.Body>
                   <div className="d-flex align-items-center justify-content-between">
                      <div className="iq-cart-text text-uppercase">
                         <p className="mb-0 font-size-14">
                            Users
                         </p>
                      </div>
                      <div className="icon iq-icon-box-top rounded-circle bg-success">
                         <i className="lar la-user"></i>
                      </div>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mt-3">
                      <h4 className="mb-0">{appStats?.data?.viewers}</h4>
                      {/* <p className="mb-0 text-success"><span><i className="fa fa-caret-up mr-2"></i></span>80%</p> */}
                   </div>
                </Card.Body>
             </Card>
          </Col>
       </Row>
       </>
    )
}

export default GeneralStats