import React, { FC, useEffect } from "react";
import FeedList from "../feed-list/feed-list";
import {
  WS_CONNECTION_CLOSED,
  WsConnectionStart,
} from "../../services/action/actions";

import { useAppDispatch } from "../../utils/hooks";
import styles from "./profile-orders.module.css";
import { getUrlOrders } from "../../utils/chek-response";

const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const urlOrders = getUrlOrders();
    dispatch(WsConnectionStart(urlOrders));
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <div className={styles.orders}>
      <FeedList pathPrefix="/profile/orders" />
    </div>
  );
};

export default ProfileOrders;
