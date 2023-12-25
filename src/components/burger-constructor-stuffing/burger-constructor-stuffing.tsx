import React, { FC, useRef } from "react";
import cn from "classnames";
import styles from "../burger-constructor/burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrop, useDrag } from "react-dnd";

import {
  deleteStuffing,
  reorderStuffing,
} from "../../services/constructor/constructor-slice";
import {
  IIngredient,
  IDragItemConstructor,
  IColletedPropsDrag,
  IColletedPropsDrop,
} from "../../types/interface";
import { useAppDispatch } from "../../utils/hooks";

interface BurgerConstructorStuffingProps {
  ingredients: IIngredient;
  index: number;
}

const BurgerConstructorStuffing: FC<BurgerConstructorStuffingProps> = ({
  ingredients,
  index,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);
  /* console.log(ingredients); */

  //перенос ингредиентов в конструкторе
  const [{ handlerId }, drop] = useDrop<
    IDragItemConstructor,
    unknown,
    IColletedPropsDrop
  >({
    accept: "STUFFING_INGREDIENT",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId() as string,
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY: number = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      dispatch(reorderStuffing({ from: dragIndex, to: hoverIndex }));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag<
    IDragItemConstructor,
    unknown,
    IColletedPropsDrag
  >({
    type: "STUFFING_INGREDIENT",
    item: (): IDragItemConstructor => {
      return { ingredients, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  //перенос ингредиентов в конструкторе

  const opacity = isDragging ? 0.8 : 1;

  drag(drop(ref));

  return (
    <li
      data-handler-id={handlerId}
      ref={ref}
      style={{ opacity }}
      className={cn(styles.single__fill, "pr-2")}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredients.name}
        price={ingredients.price}
        thumbnail={ingredients.image}
        handleClose={() => dispatch(deleteStuffing(index))}
      />
    </li>
  );
};

export default BurgerConstructorStuffing;
