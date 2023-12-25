import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import image from "../../images/bun-01.png";
import styles from "./feed-detail.module.css";
import cn from "classnames";
import { TOrderFeedOptions } from "../../types/interface";
import { successfulResponse } from "../../services/ingredints/ingredients-selector";
import { useAppSelector } from "../../utils/hooks";

interface IFeedDetail {
  order: TOrderFeedOptions | undefined;
}

const FeedDetail: FC<IFeedDetail> = ({ order }) => {
  const ingredientsServer = useAppSelector(successfulResponse);

  const uniqueIngredientIds: string[] = [];

  const renderIngredientImages = (ingredientIds: string[]) => {
    const composition = ingredientIds.map((ingredientId) => {
      if (!uniqueIngredientIds.includes(ingredientId)) {
        const matchingIngredient = ingredientsServer.find(
          (ingredient) => ingredient._id === ingredientId
        );

        if (matchingIngredient) {
          const quantity = ingredientIds.filter(
            (id) => id === ingredientId
          ).length;

          uniqueIngredientIds.push(ingredientId);

          return (
            <li
              key={matchingIngredient._id}
              className={cn(styles.container_detail, "mb-4")}
            >
              <div className={cn(styles.conteiner_icon_one, "mr-4")}>
                <img
                  src={matchingIngredient.image}
                  alt={matchingIngredient.name}
                  className={styles.icon}
                />
              </div>
              <p
                className={cn(
                  styles.container_name,
                  "text text_type_main-default mr-4"
                )}
              >
                {matchingIngredient.name}
              </p>
              <div className={styles.container_price}>
                <p className="text text_type_digits-default">
                  {quantity} x {matchingIngredient.price}
                </p>
                <div className={styles.container_icon}>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          );
        }
      }

      return null;
    });

    return composition;
  };

  return (
    <ul className={styles.container_details}>
      {order && renderIngredientImages(order.ingredients)}
    </ul>
  );
};

export default FeedDetail;
