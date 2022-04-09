import React from "react";
import { Link } from "react-router-dom";
import Card from "../../Card";
import user01 from "../../../assets/images/notification-flat.png";
import moment from "moment";

const NotificationBox = (props) => {
  const { notifications } = props;
  return (
    <>
      <Card className="shadow-none m-0">
        <Card.Body className="p-0">
          <div className="bg-primary p-3 d-flex justify-content-between">
            <h5 className="mb-0 text-white">All Notifications</h5>
            <small className="badge  badge-light float-right pt-1">
              {notifications?.data?.objects?.length}
            </small>
          </div>
          {notifications?.data?.objects?.map((notification, index) => (
            <>
              <Link to="#" className="iq-sub-card" key={index}>
                <div className="media align-items-center">
                  <div>
                    <img className="avatar-40 rounded" src={user01} alt="" />
                  </div>
                  <div className="media-body ml-3">
                    <h6 className="mb-0">{notification?.message}</h6>
                    <small className="float-right font-size-12 iq-text">
                      {moment(notification.sentDate).fromNow()}
                    </small>
                    {/* <p className="mb-0 iq-text">click to mark as read</p> */}
                  </div>
                </div>
              </Link>
            </>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};
export default NotificationBox;
