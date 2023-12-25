import React, { useEffect, useMemo, useState, FC } from "react"; // Убедитесь, что вы импортируете React
import styles from "./burger-constructor.module.css";
import cn from "classnames";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStuffing from "../burger-constructor-stuffing/burger-constructor-stuffing";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { useAppSelector } from "../../utils/hooks";
import { useDrop } from "react-dnd";
import { addIngredinentConstructor } from "../../services/constructor/constructor-slice";

import loader from "../../icons/loader.png";
import {
  buns,
  stuffing,
} from "../../services/constructor/constructor-selector";
import {
  authorizationUser,
  download,
  nubers,
} from "../../services/modal-order/modal-order-selector";
import { setData } from "../../services/modal-order/modal-order-slice";
import { Navigate } from "react-router-dom";

import { IIngredient, IIngredientAndUniqueId } from "../../types/interface";
import { useAppDispatch } from "../../utils/hooks";

interface StateObject {
  pathname: string;
  state: {
    from: string;
  };
}

const BurgerConstructor: FC = () => {
  const [finalPrice, setfinalPrice] = useState<number>(0);
  const [isActive, setActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // state конструктора
  const bun = useAppSelector(buns) as IIngredientAndUniqueId;
  const list = useAppSelector(stuffing);
  // state конструктора

  //загрузка при оформлении заказа
  const number = useAppSelector(nubers);
  const loading = useAppSelector(download);
  //загрузка при оформлении заказа

  //счет
  let ingredientsId: string[] = [];
  if ((bun && "_id" in bun) || (list && list.length > 0)) {
    ingredientsId = list.map((item) => item._id).concat(bun._id, bun._id);
  }
  //счет

  const orderHandler = () => {
    setActive(true);
    dispatch(setData(ingredientsId));
  };

  const onCloseModal = () => {
    setActive(false);
  };

  //перенос ингредиетов
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ADD_CONSTRUCTOR",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (data) => {
      dispatch(addIngredinentConstructor(data as IIngredientAndUniqueId));
    },
  });
  //перенос ингредиетов

  //счет
  const account = useMemo(() => {
    const priceBun = bun.price ? bun.price * 2 : 0;
    const priceList =
      list.length !== 0
        ? list.reduce((accumulator, ingredient) => {
            return accumulator + ingredient.price;
          }, 0)
        : 0;
    return priceBun + priceList;
  }, [bun, list]);

  useEffect(() => {
    setfinalPrice(account);
  }, [account]);
  //счет

  //Открываю страницу авторизации, если при оформлении заказа не авторизован
  const authorization = useAppSelector(authorizationUser);
  if (authorization) {
    return (
      <Navigate
        to={{ pathname: "/login", state: { from: "/" } } as StateObject}
      />
    );
  }
  //Открываю страницу авторизации, если при оформлении заказа не авторизован

  return (
    <section
      ref={dropTarget}
      className={cn(styles.section__constructor, "pt-25 pl-4")}
    >
      <div
        className={styles.container}
        style={{
          outline: isHover ? "4px solid rgb(19, 33, 154)" : "none",
          borderRadius: isHover ? "50px" : "0",
          boxSizing: "border-box",
        }}
      >
        <div className={cn(styles.bun, "pl-8")}>
          <ConstructorElement
            key={bun.uniqueId}
            type="top"
            isLocked={true}
            text={bun.name ? `${bun.name} (верх)` : "Перенесите булочку "}
            price={bun.price}
            thumbnail={bun.image ? `${bun.image}` : loader}
          />
        </div>
        <ul className={styles.stuffing}>
          {list.map((item: IIngredientAndUniqueId, index: number) => (
            <BurgerConstructorStuffing
              ingredients={item}
              index={index}
              key={item.uniqueId}
            />
          ))}
        </ul>
        <div className="pl-8">
          <ConstructorElement
            key={bun.uniqueId}
            type="bottom"
            isLocked={true}
            text={bun.name ? `${bun.name} (низ)` : "Перенесите булочку "}
            price={bun.price}
            thumbnail={bun.image ? `${bun.image}` : loader}
          />
        </div>
      </div>
      <div className={cn(styles.container__order, "pt-10")}>
        <div className={styles.container__order_price}>
          <p
            data-testid="final-price"
            className="text text_type_digits-default mr-2"
          >
            {finalPrice}
          </p>
          <span className={styles.icon}>
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={orderHandler}
          disabled={
            !bun ||
            (Array.isArray(bun) &&
              bun.length === 0 &&
              (!list || list.length === 0))
          }
        >
          Оформить заказ
        </Button>
      </div>
      {loading && <span className={styles.loader}></span>}
      {number && isActive && (
        <Modal onCloseModal={onCloseModal}>
          <OrderDetails number={number} isActive={isActive} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
