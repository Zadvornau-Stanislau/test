import React, { FC, useEffect } from "react";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-details.module.css";
import cn from "classnames";
import FeedDetail from "../feed-detail/feed-detail";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import { successfulResponse } from "../../services/ingredints/ingredients-selector";
import {
  WS_CONNECTION_CLOSED,
  WsConnectionStart,
} from "../../services/action/actions";
import { getUrlOrders, urlFeed } from "../../utils/chek-response";

interface IFeedDetails {
  feed?: boolean;
  orders?: boolean;
}
const FeedDetails: FC<IFeedDetails> = ({ feed, orders }) => {
  const data = useAppSelector((state) => state.ws.messages?.orders) || [];

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (orders === true) {
      const urlOrders = getUrlOrders();
      dispatch(WsConnectionStart(urlOrders));
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    } else if (feed === true) {
      dispatch(WsConnectionStart(urlFeed));
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    }
  }, [feed, orders]);

  const order = data.find((item) => item._id === id);

  const ingredientsServer = useAppSelector(successfulResponse);
  const calculatePrice = (priceItem: { ingredients: string[] }): number => {
    return priceItem.ingredients.reduce((totalPrice, ingredientId) => {
      const matchingIngredient = ingredientsServer.find(
        (ingredient) => ingredient._id === ingredientId
      );
      if (matchingIngredient) {
        return totalPrice + matchingIngredient.price;
      }
      return totalPrice;
    }, 0);
  };

  const statusOrder = () => {
    if (order?.status === "created") {
      return <p className={"text text_type_main-default  mb-15"}>Создан</p>;
    }
    if (order?.status === "pending") {
      return <p className={"text text_type_main-default  mb-15"}>Готовится</p>;
    }
    if (order?.status === "done") {
      return (
        <p
          className={cn(
            styles.text_color_done,
            "text text_type_main-default  mb-15"
          )}
        >
          Выполнен
        </p>
      );
    }
  };

  return (
    <>
      <div key={order?._id} className={cn(styles.container_modal, "p-10")}>
        <p className="text text_type_digits-default mb-10  ">
          #{order?.number}
        </p>
        <h2 className="text text_type_main-medium mb-3">{order?.name}</h2>
        {statusOrder()}
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <FeedDetail order={order} />
        <div className={cn(styles.date, "mt-10")}>
          <FormattedDate
            date={new Date(order?.updatedAt || "")}
            className={styles.text_color_data}
          />
          <div className={styles.container_price}>
            <p className="text text_type_digits-default">
              {order && order.ingredients !== undefined
                ? calculatePrice(order)
                : null}
            </p>
            <div className={styles.container_icon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedDetails;
