import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";

import styles from "./feed-list.module.css";
import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { successfulResponse } from "../../services/ingredints/ingredients-selector";

interface IFeedList {
  pathPrefix?: string;
}

const FeedList: FC<IFeedList> = ({ pathPrefix }) => {
  const location = useLocation();

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

  const renderIngredientImages = (ingredientIds: string[]) => {
    const maxDisplayedIngredients = 6;
    const displayedIngredients = ingredientIds.slice(
      0,
      maxDisplayedIngredients
    );

    const getStyleForIndex = (subIndex: number) => {
      switch (subIndex) {
        case 0:
          return styles.conteiner_icon_one;
        case 1:
          return styles.conteiner_icon_two;
        case 2:
          return styles.conteiner_icon_three;
        case 3:
          return styles.conteiner_icon_four;
        case 4:
          return styles.conteiner_icon_five;
        case 5:
          return styles.conteiner_icon_six;
        default:
          return ""; // Если нужно что-то еще, если больше 6 изображений
      }
    };

    const images = displayedIngredients.map((ingredientId, subIndex) => {
      const matchingIngredient = ingredientsServer.find(
        (ingredient) => ingredient._id === ingredientId
      );

      if (matchingIngredient) {
        return (
          <li
            key={`${matchingIngredient._id}_${subIndex}_${subIndex}`}
            className={getStyleForIndex(subIndex)}
          >
            <img
              src={matchingIngredient.image}
              alt={matchingIngredient.name}
              className={styles.icon}
            />
          </li>
        );
      }

      return null;
    });

    if (ingredientIds.length > maxDisplayedIngredients) {
      const remainingIngredients =
        ingredientIds.length - maxDisplayedIngredients;
      images.push(
        <p
          key="remaining"
          className={cn(
            styles.remaining_ngredients,
            "text text_type_main-small"
          )}
        >
          +{remainingIngredients}
        </p>
      );
    }

    return images;
  };
  const data = useAppSelector((state) => state.ws.messages?.orders) || [];

  return (
    <>
      {data?.map((item) => (
        <Link
          to={`${pathPrefix}/${item._id}`}
          state={{ backgroundLocation: location }}
          replace
          className={cn(styles.list, "pt-6 pb-6 pl-6 pr-6 mb-4 mr-2")}
          key={item._id}
        >
          <div className={styles.container_list}>
            <p
              className={cn(
                styles.container_number,
                "text text_type_digits-default"
              )}
            >
              #{item.number}
            </p>
            <div className={styles.container_date}>
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(item.updatedAt)} />;
              </p>
            </div>
          </div>
          <div className="text text_type_main-medium">{item.name}</div>
          <div className={styles.conteiner}>
            <ul className={styles.container_icon}>
              {renderIngredientImages(item.ingredients)}
            </ul>
            <div className={styles.container_price}>
              <p className="text text_type_digits-default">
                {calculatePrice(item)}
              </p>
              <div className={styles.container_icon}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
export default FeedList;
