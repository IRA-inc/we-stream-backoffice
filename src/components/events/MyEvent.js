import React,{useEffect,useState} from 'react'
import { getMyEvents, getOneEvent, deleteEventAction,verifyCardPayment } from "../../actions";
import { GET_MY_EVENTS_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import {useParams, useSearchParams } from "react-router-dom";
import PaywithMomoForm from "../payments/mobileMoneyPay";
import PaywithCardForm from "../payments/creditCardPayment";
import ActionModal from "../reusableComponents/modals/actionModal";
import Swal from "sweetalert2";
import moment from 'moment'
import EventTableOwner from '../reusableComponents/tables/eventOwnerTable';

const MyEventList = () => { 
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [showMomo, setShowMomo] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [page, setPage] = React.useState(1);
  const [id,setId]= React.useState('');
  const events = useSelector((state) => state.events.events);
  const event = useSelector((state) => state?.events?.event);
  const isloading = useSelector(
    (state) => state?.loader[GET_MY_EVENTS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getMyEvents({search,page}));
    console.log("useeffect id ====>",id)
    if(id){
    dispatch(getOneEvent({ id }));
    }
  }, [dispatch,search,page,id]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
};

const handleChange = (event,value) => {
  setPage(value);
};

const toggleMomoModal = (id) => {
  setId(id)
  setShowMomo(!showMomo);
};

const toggleCardModal = (id) => {
  setId(id)
  setShowCard(!showCard);
};

console.log("id ====>",sessionStorage.getItem('EventId'))
  // const search = useLocation().search;
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");



useEffect(() => {
  if (status !== null && tx_ref !== null && transaction_id !== null) {
    dispatch(
      verifyCardPayment({
        eventId: sessionStorage.getItem('EventId'),
        status,
        tx_ref,
        transaction_id,
      })
    );
    sessionStorage.removeItem('EventId')
  }
}, [dispatch,id,status,tx_ref,transaction_id,]);

  const deleteEvent = (id) => {
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
        dispatch(deleteEventAction({ id }));
        dispatch(getMyEvents());
        Swal.fire({
          title: "Deleted!",
          text: "Event has been deleted.",
          icon: "success",
          color: "#ffffff",
          background: "#141414",
        });
      }
    });
  };
    return (
       <> 
        <ActionModal
          show={showMomo}
          toggleModal={toggleMomoModal}
          Component={PaywithMomoForm}
          formData={event}
          title="Payment"
        />
        <ActionModal
          show={showCard}
          toggleModal={toggleCardModal}
          Component={PaywithCardForm}
          formData={event}
          title="Payment"
        />
            <EventTableOwner
            title="My Events"
            deleteEvent={deleteEvent}
            toggleMomoModal={toggleMomoModal}
            toggleCardModal={toggleCardModal}
            events={events}
            isloading={isloading}
            handleInputChange={handleInputChange}
            search={search}
            page={page}
            pages={events?.data?.pages}
            onChange={handleChange}
        />

       </>
    )
}
export default MyEventList;