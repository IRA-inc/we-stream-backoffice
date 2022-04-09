import { Link} from 'react-router-dom'
import {Container,Row,Col,OverlayTrigger,Tooltip} from 'react-bootstrap'
import Card  from '../../../components/Card'
import { TableLoader } from "../../reusableComponents";
import moment from 'moment'
import Select from 'react-select'
import SearchBox from '../otherComponents/searchBox';
import Paginations from '../otherComponents/pagination';

const EventTable=(props)=>{

const { deleteEvent,isloading,events,title,activateEvent,cancelEvent,approveEvent,search,handleInputChange,page,pages,onChange}=props
const options2 = [
    { value: 'Most Likely', label: 'Most Likely' },
    { value: 'Unlikely', label: 'Unlikely' }
 ]
    return(
        <> 
        <Container fluid>
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
                        <div className="iq-custom-select d-inline-block sea-epi s-margin mx-2">
                          <Select options={options2} />
                          </div>
                                    <Link to="/add-event" className="btn btn-primary">Add event</Link>
                                </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <table className="data-tables table movie_table" style={{width:"100%"}}>
                                <thead>
                                <tr>
                                    <th style={{width: "2%"}}>#</th>
                                    <th style={{width: "5%"}}>Image</th>
                                    <th style={{width: "20%"}}>Name</th>
                                    <th style={{width: "10%"}}>Owner</th>
                                    <th style={{width: "20%"}}>Contact</th>
                                    <th style={{width: "20%"}}>Email</th>
                                    <th style={{width: "15%"}}>starDate</th>
                                    <th style={{width: "3%"}}>Duration</th>
                                    <th style={{width: "5%"}}>Approved</th>
                                    <th style={{width: "5%"}}>Status</th>
                                    <th style={{width: "10%"}}>Action</th>
                                </tr>
                                </thead>
                                {isloading ? (
                  <tr>
                    <td colSpan={8}>
                      <TableLoader />
                    </td>
                  </tr>
                ) : (
                                <tbody>
                                     {events?.data?.objects?.map((event, index) => (
                                 <tr key={index}>
                                     <td>{(page-1) * 10 + index + 1}</td>
                                    <td>
                                        <img src={event.banner} className="img-fluid avatar-50" alt="author-profile"/>
                                    </td>
                                    <td>{event?.name}</td>
                                    <td>{event?.ownerId?.name}</td>
                                    <td>{event?.ownerId?.phoneNumber}</td>
                                    <td>{event?.ownerId?.email}</td>
                                    <td>{moment(event?.startingDate).format("DD-MM-YYYY HH:mm")}</td>
                                    <td>{event.estimatedDuration}</td>
                                    <td><span className={`${event?.approvalLevel==="approved"?`${event?.status==="pending"?"badge iq-bg-info":"badge iq-bg-success"}`:"badge iq-bg-primary"}`}>{event.approvalLevel==="approved"?"approved":`${event.approvalLevel}`}</span></td>
                                    <td><span className={`${event?.status==="active"?`${event?.status==="pending"?"badge iq-bg-info":"badge iq-bg-success"}`:"badge iq-bg-primary"}`}>{event.status}</span></td>
                                    <td>
                                        <div className="d-flex align-items-center list-user-action">
                                            <OverlayTrigger placement="top"overlay={<Tooltip>Edit</Tooltip>}>
                                                <Link to={`/edit-event/${event._id}`} className="iq-bg-success"><i className="ri-pencil-line"></i></Link>
                                            </OverlayTrigger>
                                            {event?.status==="active"?
                                            <>
                                            <OverlayTrigger placement="top"overlay={<Tooltip>Payout</Tooltip>}>
                                                <Link to={`/payout-event/${event._id}`} className="iq-bg-success"><i className="ri-pencil-line"></i></Link>
                                            </OverlayTrigger>
                                            </>:""}
                                            {event?.approvalLevel==="approved"?"":
                                            <>
                                            <OverlayTrigger placement="top"overlay={<Tooltip>Approve</Tooltip>}>
                                                <Link onClick={()=>approveEvent(event._id)} className="iq-bg-warning" to="#"><i className="ri-checkbox-circle-line"></i></Link>
                                            </OverlayTrigger>
                                            </>
}
                                            <OverlayTrigger placement="top"overlay={<Tooltip>
                                        {event?.status==="pending" || event?.status==="blocked" ?"Activate":""}
                                        {event?.status==="active"?"Deactivate":""}</Tooltip>}>
                                                <Link onClick={()=>activateEvent(event._id,event?.status)} className="iq-bg-info" to="#"><i className="ri-open-arm-line"></i></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top"overlay={<Tooltip>Cancel</Tooltip>}>
                                                <Link onClick={()=>cancelEvent(event._id,)} className="iq-bg-primary" to="#"><i className="ri-close-line"></i></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top"overlay={<Tooltip>Delete</Tooltip>}>
                                                <Link onClick={()=>deleteEvent(event._id)} className="iq-bg-primary" to="#"><i className="ri-delete-bin-line"></i></Link>
                                            </OverlayTrigger>
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

export default EventTable
