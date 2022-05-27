import React,{useEffect} from 'react'
import UsersCharts from  '../../reusableComponents/charts/usersCharts'
import { getUserscategory } from "../../../actions";
import { USERS_CATEGORY_LOADING_ID } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";


const UsersCategory =()=>{

    const dispatch = useDispatch();
    const usersCategories = useSelector((state) => state.appStatsReducer.usersCategories);
    const isloading = useSelector(
      (state) => state?.loader[USERS_CATEGORY_LOADING_ID]?.isLoading
    );
    useEffect(() => {
        dispatch(getUserscategory());
      }, [dispatch]);  

  console.log(usersCategories)  
  const category= usersCategories?.data?.map((users)=>users?.category.map((categoryName)=>categoryName?.name))
  const labels=category&&[].concat.apply([],category)
  const series= usersCategories?.data?.map((users)=>users?.users)

    return(
        <>
        <UsersCharts 
        labels={labels}
        series={series}
        />
        </>
    )
}

export default UsersCategory
