import React,{useEffect} from 'react'
import { getMyTopFiveEvents } from "../../../actions";
import { MY_TOP_FIVE_EVENT_LOADING_ID } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
import EventsCard from '../../reusableComponents/cards/EventsCards';

const MyTopFiveEvents=()=>{

  const dispatch = useDispatch();
  const mytopFiveEvents = useSelector((state) => state.appStatsReducer.myTopFiveEvents);
  const isloading = useSelector(
    (state) => state?.loader[MY_TOP_FIVE_EVENT_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getMyTopFiveEvents());
  }, [dispatch]);
    return(
    <>
       <EventsCard
       appStats={mytopFiveEvents}
       />
       </>
    )
}

export default MyTopFiveEvents