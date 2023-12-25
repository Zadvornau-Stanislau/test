import React, { FC, useEffect } from "react";
import styles from "./feed-page.module.css";
import FeedList from "../feed-list/feed-list";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { connect } from "http2";
import {
  WS_CONNECTION_CLOSED,
  WsConnectionStart,
} from "../../services/action/actions";
import { urlFeed } from "../../utils/chek-response";

interface IFeedPage {
  status: boolean;
}
const FeedPage: FC<IFeedPage> = ({ status }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(WsConnectionStart(urlFeed));
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);
  const dataTatal = useAppSelector((state) => state.ws.messages?.total) || [];
  const dataTotalToday =
    useAppSelector((state) => state.ws.messages?.totalToday) || [];
  const data = useAppSelector((state) => state.ws.messages?.orders) || [];

  const finalOrderNumbers = () => {
    const lastTenItems = data.slice(0, 10);
    return lastTenItems.map((item) => {
      if (item.status === "done") {
        return (
          <p
            className={cn(
              styles.final_order_numbers,
              "text text_type_digits-default"
            )}
            key={item._id}
          >
            {item.number}
          </p>
        );
      }
    });
  };
  const orderInProgress = () => {
    return data.map((item) => {
      if (item.status === "created" || item.status === "pending") {
        return (
          <p
            className={cn(
              styles.order_in_progress,
              "text text_type_digits-default"
            )}
            key={item._id}
          >
            {item.number}
          </p>
        );
      }
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container_orders}>
        <h2 className="text text_type_main-large mt-10">Лента заказов </h2>
        <ul className={styles.orders}>
          <FeedList pathPrefix="/feed" />
        </ul>
      </div>
      <div className={styles.order_numbers}>
        <div className={styles.order_panel_header}>
          <section className={styles.finished_orders}>
            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
            <div className={styles.column}>{finalOrderNumbers()}</div>
          </section>
          <section>
            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
            <div className={styles.column}>{orderInProgress()}</div>
          </section>
        </div>
        <section className="mt-15">
          <h3 className="text text_type_main-medium m-0">
            Выполнено за все время:
          </h3>
          <p
            className={cn(styles.all_completed, "text text_type_digits-large")}
          >
            {dataTatal}
          </p>
        </section>
        <section className="mt-15">
          <h3 className="text text_type_main-medium m-0">
            Выполнено за сегодня:
          </h3>
          <p
            className={cn(styles.all_completed, "text text_type_digits-large")}
          >
            {dataTotalToday}
          </p>
        </section>
      </div>
    </section>
  );
};

export default FeedPage;
