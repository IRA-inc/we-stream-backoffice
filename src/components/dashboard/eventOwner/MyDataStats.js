import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import  Card  from '../../Card'
import { getOwnerStats } from "../../../actions";
import { APP_STATS_LOADING_ID } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
const MyDataStats=()=>{

  const dispatch = useDispatch();
  const ownerStats = useSelector((state) => state.appStatsReducer.ownerStats);
  const isloading = useSelector(
    (state) => state?.loader[APP_STATS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getOwnerStats());
  }, [dispatch]);
  console.log("appStats===>", ownerStats)
    return(
    <>
        <Row>
                    <Col sm="6" lg="6" xl="3">
                       <Card className="iq-card-block iq-card-stretch iq-card-height">
                          <Card.Body>
                             <div className="d-flex align-items-center justify-content-between">
                                <div className="iq-cart-text text-capitalize">
                                   <p className="mb-0">
                                      view
                                   </p>
                                </div>
                                <div className="icon iq-icon-box-top rounded-circle bg-primary">
                                   <i className="las la-eye"></i>
                                </div>
                             </div>
                             <div className="d-flex align-items-center justify-content-between mt-3">
                                <h4 className=" mb-0">{ownerStats?.data?.views}</h4>
                                <p className="mb-0 text-primary"><span><i className="fa fa-caret-down mr-2"></i></span>35%</p>
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
                                   Earned Amount
                                   </p>
                                </div>
                                <div className="icon iq-icon-box-top rounded-circle bg-warning">
                                   <i className="lar la-star"></i>
                                </div>
                             </div>
                             <div className="d-flex align-items-center justify-content-between mt-3">
                                <h4 className="mb-0">{ownerStats?.data?.amount}</h4>
                                <p className="mb-0 text-warning"><span><i className="fa fa-caret-up mr-2"></i></span>50%</p>
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
                                <div className="icon iq-icon-box-top rounded-circle bg-info">
                                   <i className="las la-download"></i>
                                </div>
                             </div>
                             <div className="d-flex align-items-center justify-content-between mt-3">
                                <h4 className="mb-0">{ownerStats?.data?.events}</h4>
                                <p className="mb-0 text-info"><span><i className="fa fa-caret-up mr-2"></i></span>80%</p>
                             </div>
                          </Card.Body>
                       </Card>
                    </Col>
                    {/* <Col sm="6" lg="6" xl="3">
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
                                <h4 className="mb-0">+2M</h4>
                                <p className="mb-0 text-success"><span><i className="fa fa-caret-up mr-2"></i></span>80%</p>
                             </div>
                          </Card.Body>
                       </Card>
                    </Col> */}
                 </Row>
       </>
    )
}

export default MyDataStats