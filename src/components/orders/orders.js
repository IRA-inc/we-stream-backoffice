import React, { useEffect, useState } from "react";
import { ownerEventOrders } from "../../actions";
import { OWNER_ORDERS_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import EventOrdersTable from "../reusableComponents/tables/ordersTables";

const OrdersList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const orders = useSelector((state) => state.orders.orders);
  const isloading = useSelector(
    (state) => state?.loader[OWNER_ORDERS_LOADING_ID]?.isLoading
  );
  useEffect(() => {
    dispatch(ownerEventOrders({ search, page }));
  }, [dispatch, search, page]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <EventOrdersTable
        title="Events Orders List"
        orders={orders}
        isloading={isloading}
        search={search}
        page={page}
        pages={orders?.data?.pages}
        onChange={handleChange}
        handleInputChange={handleInputChange}
      />
    </>
  );
};
export default OrdersList;
