import React, { FC, RefObject } from "react";
import styles from "./burger-ingredient-category.module.css";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { IIngredient } from "../../types/interface";

type BurgerIngredientCategoryProps = {
  title: string;
  titleId: string;
  data: IIngredient[];
  refs: (node?: Element | null) => void;
};

const BurgerIngredientCategory: FC<BurgerIngredientCategoryProps> = ({
  title,
  titleId,
  data,
  refs,
}) => {
  return (
    <>
      <h2 id={titleId} className="text text_type_main-medium" ref={refs}>
        {title}
      </h2>
      <ul className={styles.cart__ingridient}>
        {data.map((item) => (
          <BurgerIngredient ingredients={item} key={item._id} />
        ))}
      </ul>
    </>
  );
};

export default BurgerIngredientCategory;
