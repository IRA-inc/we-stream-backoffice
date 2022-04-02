import React,{useEffect} from 'react'
import { Link} from 'react-router-dom'
import {Container,Row,Col,OverlayTrigger,Tooltip} from 'react-bootstrap'
import Card  from '../../components/Card';
import { getAllUsers, deleteUserAction } from "../../actions";
import { GET_ALL_USERS_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { TableLoader } from "../reusableComponents";
import moment from 'moment'
//img
import user01 from '../../assets/images/user/2.jpg'
import user05 from '../../assets/images/user/5.jpg'
import user03 from '../../assets/images/user/3.jpg'
import user08 from '../../assets/images/user/6.jpg'
import user06 from '../../assets/images/user/6.jpg'
import user10 from '../../assets/images/user/4.jpg'


const UserList = () => { 
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const isloading = useSelector(
    (state) => state?.loader[GET_ALL_USERS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const deleteUser = (id) => {
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
        dispatch(deleteUserAction({ id }));
        dispatch(getAllUsers());
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
          color: "#ffffff",
          background: "#141414",
        });
      }
    });
  };
    return (
       <> 
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <Card.Header.Title>
                                <h4 className="card-title">User Lists</h4>
                            </Card.Header.Title>
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to="/add-user" className="btn btn-primary">Add user</Link>
                                    </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-view">
                                <table className="data-tables table movie_table" style={{width:"100%"}}>
                                    <thead>
                                    <tr>
                                       <th style={{width: "2%"}}>#</th>
                                        <th style={{width: "5%"}}>Profile</th>
                                        <th style={{width: "10%"}}>Name</th>
                                        <th style={{width: "20%"}}>Contact</th>
                                        <th style={{width: "20%"}}>Email</th>
                                        <th style={{width: "10%"}}>role</th>
                                        <th style={{width: "10%"}}>Status</th>
                                        <th style={{width: "15%"}}>Join Date</th>
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
                                        {users?.data?.objects?.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            <img src={user01} className="img-fluid avatar-50" alt="author-profile"/>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user?.role?.map((userRole)=>userRole?.name)}</td>
                                        <td><span className={`${user.isActive===true?"badge iq-bg-success":"badge iq-bg-primary"}`}>{user.isActive===true?"Active":'Deactivated'}</span></td>
                                        <td>{moment(user.createdDate).format("DD-MM-YYYY HH:mm")}</td>
                                        <td>
                                            <div className="d-flex align-items-center list-user-action">
                                                <OverlayTrigger placement="top"overlay={<Tooltip>Edit</Tooltip>}>
                                                    <Link to={`/edit-user/${user._id}`} className="iq-bg-success"><i className="ri-pencil-line"></i></Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top"overlay={<Tooltip>Activate</Tooltip>}>
                                                    <Link onClick={() => deleteUser(user._id)} className="iq-bg-info" to="#"><i className="ri-checkbox-circle-line"></i></Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top"overlay={<Tooltip>Delete</Tooltip>}>
                                                    <Link onClick={() => deleteUser(user._id)} className="iq-bg-primary" to="#"><i className="ri-delete-bin-line"></i></Link>
                                                </OverlayTrigger>
                                                </div>
                                                </td>
                                            </tr>
                                                                        ))}
                                                                        </tbody>
                                                                        )}
                                                                    </table>
                                                                </div>
                                                            </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </Container>

       </>
    )
}
export default UserList;