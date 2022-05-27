import React, { useEffect } from "react";
import { viewNotification, deleteCategoryAction } from "../../../actions";
import { VIEW_NOTIFICATION_LOADING_ID } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
import NotificationBox from "../../reusableComponents/otherComponents/notificationBox";

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const isloading = useSelector(
    (state) => state?.loader[VIEW_NOTIFICATION_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(viewNotification());
  }, [dispatch]);

  return (
    <>
      <NotificationBox notifications={notifications} />
    </>
  );
};
export default Notification;
