import React,{useEffect} from 'react'
import { getAllEvents, deleteEventAction,activateEvent,approveEvent,cancelEvent } from "../../actions";
import { GET_ALL_EVENTS_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import EventTable from '../reusableComponents/tables/eventTable';
import actionFunction from '../reusableComponents/otherComponents/actionFunction';

const EventList = () => { 
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const isloading = useSelector(
    (state) => state?.loader[GET_ALL_EVENTS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const deleteEvent = (id) => {
    actionFunction(id,deleteEventAction,getAllEvents,"delete","Event has been deleted","Deleted",dispatch)
     };
   
     const approvingEvent = (id) => {
    actionFunction(id,approveEvent,getAllEvents,"Approve","Event has been approved","Approved",dispatch)
     };
     const activatingEvent = (id,status) => {
    actionFunction(id,activateEvent,getAllEvents,`${status==="active"?"Deactivate":"activate"}`,`Event has been ${status==="active"?"Deactivated":"activated"}`,`${status==="active"?"Deactivated":"activated"}`,dispatch)
     };
     const cancellingEvent = (id) => {
    actionFunction(id,cancelEvent,getAllEvents,"Cancel","Event has been cancelled","Cancelled",dispatch)
     };
    return (
       <> 
            <EventTable
            title="Events List"
            deleteEvent={deleteEvent}
            activateEvent={activatingEvent}
            cancelEvent={cancellingEvent}
            approveEvent={approvingEvent}
            events={events}
            isloading={isloading}
        />

       </>
    )
}
export default EventList;