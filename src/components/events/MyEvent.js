import React,{useEffect} from 'react'
import { getMyEvents, deleteEventAction } from "../../actions";
import { GET_MY_EVENTS_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import moment from 'moment'
import EventTableOwner from '../reusableComponents/tables/eventOwnerTable';

const MyEventList = () => { 
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const isloading = useSelector(
    (state) => state?.loader[GET_MY_EVENTS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getMyEvents());
  }, [dispatch]);

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
            <EventTableOwner
            title="My Events"
            deleteEvent={deleteEvent}
            events={events}
            isloading={isloading}
        />

       </>
    )
}
export default MyEventList;