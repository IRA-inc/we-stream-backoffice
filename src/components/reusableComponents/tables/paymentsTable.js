import React from 'react'
import { Link} from 'react-router-dom'
import {Container,Row,Col,OverlayTrigger,Tooltip} from 'react-bootstrap'
import Card  from '../../Card'
import { TableLoader } from "../Loaders/tableLoader";
import moment from "moment"
import SearchBox from '../otherComponents/searchBox';
import Paginations from '../otherComponents/pagination';
import { checkEventOwnerRole } from '../../../helpers/checkRoleHelper';

const PaymentTable = (props) => { 
   const {payments,search,title,handleInputChange,page,pages,onChange,isloading }=props
    return (
            <>  <Container fluid>
            <Row>
                <Col sm="12">
                    <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <Card.Header.Title>
                            <h4 className="card-title">{title}</h4>
                        </Card.Header.Title>
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                        <SearchBox
                        search={search}
                        handleInputChange={handleInputChange}
                        />
                                </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <table className="data-tables table movie_table" style={{width:"100%"}}>
                                <thead>
                                <tr>
                                                    <th style={{width:"10%"}}>No</th>
                                                    <th style={{width:"20%"}}>Date</th>
                                                    <th style={{width:"20%"}}>Event Name</th>
                                                    <th style={{width:"20%"}}>Price</th>
                                                    <th style={{width:"20%"}}>transaction</th>
                                                    <th style={{width:"20%"}}>amount</th>
                                                    <th style={{width:"20%"}}>Action</th>
                                                </tr>
                                            </thead>
                                            {isloading ? (
                      <tr>
                        <td colSpan={3}>
                          <TableLoader />
                        </td>
                      </tr>
                    ) : (
                      <tbody>
                        {payments?.data?.objects.map((payment, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{moment(payment.created_at).format("DD-MM-YYYY HH:mm")}</td>
                            <td>{payment?.eventId?.name}</td>
                            <td>{payment?.eventId?.price}</td>
                            <td>{payment.transaction_id}</td>
                            <td>{payment.amount}</td>
                            <td>
                              <div className="d-flex align-items-center list-user-action">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>View</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-warning"
                                    to={checkEventOwnerRole()?`/view-mypayment/${payment?.eventId?._id}`:`/view-payment/${payment?.eventId?._id}`}
                                  >
                                    <i className="lar la-eye"></i>
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>payout</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-success"
                                    to={`/payout-event/${payment?.eventId?._id}`}
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Link>
                                </OverlayTrigger>
                                {/* <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Delete</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-primary"
                                    to="#"
                                    onClick={() => deleteCategory(category._id)}
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </Link> 
                                </OverlayTrigger>
                                */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                                        </table>
                                        <div className="float-right pb-2">
                                                        <Paginations
                                                        page={page}
                                                        pages={pages}
                                                        onChange={onChange}
                                                        />
                                                         </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </>
    )
}
export default PaymentTable;