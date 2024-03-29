import React,{ useEffect,useState } from 'react'
import { Link} from 'react-router-dom'
import {Container,Row,Col,OverlayTrigger,Tooltip} from 'react-bootstrap'
import Card  from '../Card'
import { getAllMessage, deleteCategoryAction } from "../../actions";
import { ALL_MESSAGES_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { TableLoader } from "../reusableComponents";
import SearchBox from '../reusableComponents/otherComponents/searchBox';
import Paginations from '../reusableComponents/otherComponents/pagination';


const MessagesList = () => { 
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const messages = useSelector((state) => state.messages.messages);
  const isloading = useSelector(
    (state) => state?.loader[ALL_MESSAGES_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getAllMessage({ search,page }));
  }, [dispatch,search,page]);

  const  deleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      color: "#ffffff",
      confirmButtonText: "Yes, delete it!",
      background: "#141414",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategoryAction({ id }));
        dispatch(getAllMessage());
        Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted.",
          icon: "success",
          color: "#ffffff",
          background: "#141414",
        });
      }
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };
    return (
            <> 
                <Container fluid>
                    <Row>
                        <Col sm="12">
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <Card.Header.Title>
                                        <h4 className="card-title">Messages Lists</h4>
                                    </Card.Header.Title>
                                    <SearchBox
                    search={search}
                    handleInputChange={handleInputChange}
                  />
                                    {/* <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to="/add-category" className="btn btn-primary"></Link>
                                    </div> */}
                                </Card.Header>
                                <Card.Body>
                                <div className="table-responsive">
                                        <table className="data-tables table movie_table " style={{width:"100%"}}>
                                            <thead>
                                                <tr>
                                                    <th style={{width:"10%"}}>No</th>
                                                    <th style={{width:"20%"}}>Name</th>
                                                    <th style={{width:"20%"}}>Email</th>
                                                    <th style={{width:"20%"}}>Phone</th>
                                                    <th style={{width:"20%"}}>Message</th>
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
                        {messages?.data?.objects?.map((message, index) => (
                          <tr key={index}>
                            <td>{(page - 1) * 10 + index + 1}</td>
                            <td>{message.name}</td>
                            <td>{message.email}</td>
                            <td>{message.PhoneNumber}</td>
                            <td><span className={`${message?.status==="replied"?`${message?.status==="sent"?"badge iq-bg-info":"badge iq-bg-success"}`:"badge iq-bg-primary"}`}>{message.status}</span></td>
                            <td>
                              <div className="flex align-items-center list-user-action">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>View</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-warning"
                                    to={`/send-message/${message._id}`}
                                  >
                                    <i className="lar la-eye"></i>
                                  </Link>
                                </OverlayTrigger>
                                {/* <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Edit</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-success"
                                    to={`/edit-message/${message._id}`}
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Link>
                                </OverlayTrigger> */}
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Delete</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-primary"
                                    to="#"
                                    onClick={() => deleteCategory(message._id)}
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </Link>
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
                      pages={messages?.data?.pages}
                      onChange={handleChange}
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
export default MessagesList;