import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../components/Card";
import { getAllAdds, deleteAddAction } from "../../actions";
import { GET_ALL_ADDS_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { TableLoader } from "../reusableComponents";
import SearchBox from "../reusableComponents/otherComponents/searchBox";
import Paginations from "../reusableComponents/otherComponents/pagination";

const AddsList = (props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const adverts = useSelector((state) => state.advertesments.adverts);
  const isloading = useSelector(
    (state) => state?.loader[GET_ALL_ADDS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getAllAdds({ search,page }));
  }, [dispatch,search,page]);

  const deleteRole = (id) => {
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
        dispatch(deleteAddAction({ id }));
        dispatch(getAllAdds({ search,page }));
        Swal.fire({
          title: "Deleted!",
          text: "Add has been deleted.",
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
                  <h4 className="card-title">Advertesment Lists</h4>
                </Card.Header.Title>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                <SearchBox
                    search={search}
                    handleInputChange={handleInputChange}
                  />
                  <Link to="/add-addvert" className="btn btn-primary">
                    Add Advert
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
              <div className="table-responsive">
                  <table
                    className="data-tables table movie_table "
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>No</th>
                        <th style={{ width: "40%" }}>comany</th>
                        <th style={{ width: "20%" }}>start Date</th>
                        <th style={{ width: "20%" }}>End date</th>
                        <th style={{ width: "20%" }}>place</th>
                        <th style={{ width: "20%" }}>Amount</th>
                        <th style={{ width: "30%" }}>action</th>
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
                        {adverts?.data?.objects?.map((addData, index) => (
                          <tr key={index}>
                              <td>{(page - 1) * 10 + index + 1}</td>
                            <td>{addData.company}</td>
                            <td>{addData.startingDate}</td>
                            <td>{addData.endDate}</td>
                            <td>{addData.place}</td>
                            <td>{addData.amount}</td>
                            <td>
                              <div className="d-flex align-items-center list-user-action">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>View</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-warning"
                                    to={`/edit-addvert/${addData._id}`}
                                  >
                                    <i className="lar la-eye"></i>
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Edit</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-success"
                                    to={`/edit-addvert/${addData._id}`}
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Delete</Tooltip>}
                                >
                                  <Link
                                    className="iq-bg-primary"
                                    to="#"
                                    onClick={() => deleteRole(addData._id)}
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
                      pages={adverts?.data?.pages}
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

export default AddsList;
