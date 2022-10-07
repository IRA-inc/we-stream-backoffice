import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../components/Card";
import {
  getAllUsers,
  activateUserAction,
  deleteUserAction,
} from "../../actions";
import { GET_ALL_USERS_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { TableLoader } from "../reusableComponents";
import moment from "moment";
//img
import user01 from "../../assets/images/user/2.jpg";
import actionFunction from "../reusableComponents/otherComponents/actionFunction";
import Paginations from "../reusableComponents/otherComponents/pagination";
import SearchBox from "../reusableComponents/otherComponents/searchBox";

const UserList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const users = useSelector((state) => state.users.users);
  const isloading = useSelector(
    (state) => state?.loader[GET_ALL_USERS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getAllUsers({ search, page }));
  }, [dispatch, search, page]);

  const deleteUser = (id) => {
    actionFunction(
      id,
      deleteUserAction,
      getAllUsers,
      "delete",
      "User has been deleted",
      "Deleted",
      dispatch
    );
  };

  const activateUser = (id, isActive) => {
    actionFunction(
      id,
      activateUserAction,
      getAllUsers,
      `${isActive === true ? "Deactivate" : "activate"}`,
      `User has been ${isActive === true ? "Deactivate" : "activate"}`,
      `${isActive === true ? "Deactivated" : "activated"}`,
      dispatch
    );
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
                  <h4 className="card-title">User Lists</h4>
                </Card.Header.Title>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                <SearchBox
                        search={search}
                        handleInputChange={handleInputChange}
                        />
                  <Link to="/add-user" className="btn btn-primary">
                    Add user
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
              <div className="table-responsive">
                  <table
                    className="data-tables table movie_table"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "2%" }}>#</th>
                        <th style={{ width: "5%" }}>Profile</th>
                        <th style={{ width: "10%" }}>Name</th>
                        <th style={{ width: "20%" }}>Contact</th>
                        <th style={{ width: "20%" }}>Email</th>
                        <th style={{ width: "10%" }}>role</th>
                        <th style={{ width: "10%" }}>Status</th>
                        <th style={{ width: "15%" }}>Join Date</th>
                        <th style={{ width: "10%" }}>Action</th>
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
                            <td>{(page - 1) * 10 + index + 1}</td>
                            <td>
                              <img
                                src={user01}
                                className="img-fluid avatar-50"
                                alt="author-profile"
                              />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>
                              {user?.role?.map((userRole) => userRole?.name)}
                            </td>
                            <td>
                              <span
                                className={`${
                                  user.isActive === true
                                    ? "badge iq-bg-success"
                                    : "badge iq-bg-primary"
                                }`}
                              >
                                {user.isActive === true
                                  ? "Active"
                                  : "Deactivated"}
                              </span>
                            </td>
                            <td>
                              {moment(user.createdDate).format(
                                "DD-MM-YYYY HH:mm"
                              )}
                            </td>
                            <td>
                              <div className="d-flex align-items-center list-user-action">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Edit</Tooltip>}
                                >
                                  <Link
                                    to={`/edit-user/${user._id}`}
                                    className="iq-bg-success"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip>
                                      {user.isActive === true
                                        ? "Deactivate"
                                        : "activate"}
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    onClick={() =>
                                      activateUser(user._id, user?.isActive)
                                    }
                                    className="iq-bg-info"
                                    to="#"
                                  >
                                    <i className="ri-checkbox-circle-line"></i>
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Delete</Tooltip>}
                                >
                                  <Link
                                    onClick={() => deleteUser(user._id)}
                                    className="iq-bg-primary"
                                    to="#"
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
                      pages={users?.data?.pages}
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
  );
};
export default UserList;
