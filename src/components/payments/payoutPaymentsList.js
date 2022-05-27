import React,{ useEffect,useState } from 'react'
import { allPayments, deleteCategoryAction } from "../../actions";
import { ALL_PAYMENT_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import PaymentTable from '../reusableComponents/tables/paymentsTable';

const PayoutList = () => { 
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [page, setPage] = React.useState(1);
  const payments = useSelector((state) => state.payments.payments);
  const isloading = useSelector(
    (state) => state?.loader[ALL_PAYMENT_LOADING_ID]?.isLoading
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
};

const handleChange = (event,value) => {
  setPage(value);
};


  useEffect(() => {
    dispatch(allPayments({page,search}));
  }, [dispatch,page,search]);

//   const  deleteCategory = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       color: "#ffffff",
//       confirmButtonText: "Yes, delete it!",
//       background: "#141414",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteCategoryAction({ id }));
//         dispatch(getAllCategories());
//         Swal.fire({
//           title: "Deleted!",
//           text: "Category has been deleted.",
//           icon: "success",
//           color: "#ffffff",
//           background: "#141414",
//         });
//       }
//     });
//   };
    return (
            <> 
               <PaymentTable
               title="Payout Lists"
               payments={payments}
               isloading={isloading}
               page={page}
               handleChange={handleChange}
               pages={payments?.data?.pages}
               handleInputChange={handleInputChange}
               />

            </>
    )
}
export default PayoutList;