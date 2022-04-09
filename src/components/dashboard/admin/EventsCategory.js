import React,{useEffect} from 'react'
import EventsCharts from  '../../reusableComponents/charts/eventsCharts'
import { getEventscategory } from "../../../actions";
// import { USERS_CATEGORY_LOADING_ID } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";


const EventsCategory =()=>{

    const dispatch = useDispatch();
    const eventsCategories = useSelector((state) => state?.appStatsReducer?.eventsCategories);
    // const isloading = useSelector(
    //   (state) => state?.loader[USERS_CATEGORY_LOADING_ID]?.isLoading
    // );
   
  const category= eventsCategories?.data?.map((event)=>event?.category?.map((categoryName)=>categoryName?.name))
  const labels=[].concat.apply([],category)
  const series= eventsCategories?.data?.map((event)=>event?.totalEvent)
    useEffect(() => {
      dispatch(getEventscategory());
    }, [dispatch]);  

    return(
        <>
        <EventsCharts 
        labels={labels}
        series={series}
        data={eventsCategories?.data}
        />
        </>
    )
}

export default EventsCategory
