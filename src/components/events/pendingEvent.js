import React,{useEffect,useState} from 'react'
import { getPendingEvents, deleteEventAction,activateEvent,approveEvent,cancelEvent } from "../../actions";
import { GET_PENDING_EVENTS_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import EventTable from '../reusableComponents/tables/eventTable';
import actionFunction from '../reusableComponents/otherComponents/actionFunction';

const PeningEventList = () => { 
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = React.useState(1);
  const events = useSelector((state) => state.events.events);
  const isloading = useSelector(
    (state) => state?.loader[GET_PENDING_EVENTS_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getPendingEvents({search,page}));
  }, [dispatch,search,page]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
};

const handleChange = (event,value) => {
  setPage(value);
};

  const deleteEvent = (id) => {
 actionFunction(id,deleteEventAction,getPendingEvents,"delete","Event has been deleted","Deleted",dispatch)
  };

  const approvingEvent = (id) => {
 actionFunction(id,approveEvent,getPendingEvents,"Approve","Event has been approved","Approved",dispatch)
  };
  const activatingEvent = (id,status) => {
 actionFunction(id,activateEvent,getPendingEvents,`${status==="active"?"Deactivate":"activate"}`,`Event has been ${status==="active"?"Deactivated":"Activated"}`,`${status==="active"?"Deactivated":"Activated"}`,dispatch)
  };
  const cancellingEvent = (id) => {
 actionFunction(id,cancelEvent,getPendingEvents,"Cancel","Event has been cancelled","Cancelled",dispatch)
  };

    return (
       <> 
            <EventTable
            title="Pending Events"
            deleteEvent={deleteEvent}
            activateEvent={activatingEvent}
            cancelEvent={cancellingEvent}
            approveEvent={approvingEvent}
            events={events}
            handleInputChange={handleInputChange}
            search={search}
            page={page}
            pages={events?.data?.pages}
            onChange={handleChange}
            isloading={isloading}
        />

       </>
    )
}
export default PeningEventList;