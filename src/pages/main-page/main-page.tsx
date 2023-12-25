import React, { FC } from "react";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useAppSelector } from "../../utils/hooks";
import style from "../../components/app/app.module.css";
import {
  ingredientRequest,
  ingredientRequestError,
} from "../../services/ingredints/ingredients-selector";

const MainPage: FC = () => {
  const isLoading = useAppSelector(ingredientRequest);
  const error = useAppSelector(ingredientRequestError);
  return (
    <>
      {isLoading && <h2 className={style.services}>Loading...</h2>}
      {!isLoading && error && (
        <h2 className={style.services}>Ошибка при загрузке данных</h2>
      )}
      {!isLoading && !error && (
        <main className={style.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </>
  );
};

export default MainPage;
