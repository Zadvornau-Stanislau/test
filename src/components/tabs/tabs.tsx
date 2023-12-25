import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import style from "../burger-ingredients/burger-ingredients.module.css";

interface TabsProps {
  currentTab: string;
  onClickTab: (tab: string) => void;
}

const Tabs: FC<TabsProps> = ({ currentTab, onClickTab }) => {
  return (
    <div className={cn(style.ingredient_category, "pt-5")}>
      <Tab value="buns" active={currentTab === "buns"} onClick={onClickTab}>
        Булки
      </Tab>
      <Tab value="mains" active={currentTab === "mains"} onClick={onClickTab}>
        Начинки
      </Tab>
      <Tab value="sauces" active={currentTab === "sauces"} onClick={onClickTab}>
        Соусы
      </Tab>
    </div>
  );
};
export default Tabs;
