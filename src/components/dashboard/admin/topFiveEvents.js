import React,{useEffect} from 'react'
import { getTopFiveEvents } from "../../../actions";
import { TOP_FIVE_EVENT_LOADING_ID } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
import EventsCard from '../../reusableComponents/cards/EventsCards';

const TopFiveEvents=()=>{

  const dispatch = useDispatch();
  const topFiveEvents = useSelector((state) => state.appStatsReducer.topFiveEvents);
  const isloading = useSelector(
    (state) => state?.loader[TOP_FIVE_EVENT_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getTopFiveEvents());
  }, [dispatch]);
    return(
    <>
       <EventsCard
       appStats={topFiveEvents}
       />
       </>
    )
}

export default TopFiveEvents