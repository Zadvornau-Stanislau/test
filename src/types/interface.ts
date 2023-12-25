export interface IIngredient {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  calories: number;
  carbohydrates: number;
  proteins: number;
  fat: number;
  price: number;
  __v: number;
  image: string;
  image_large: string;
  image_mobile: string;
}

export interface IdataIngredient {
  success: boolean;
  data: IIngredient[];
}
export interface IIngredientAndUniqueId extends IIngredient {
  uniqueId?: string;
}

export interface IUserLogging {
  [name: string]: string;
}
export interface IIngredientAndNumber extends IIngredient {
  index?: string | number;
}
export interface IIsActive {
  isActive: boolean;
}

export interface IDragItemConstructor {
  ingredients: IIngredient;
  index: number;
}
export interface IColletedPropsDrag {
  isDragging: boolean;
}
export interface IColletedPropsDrop {
  handlerId: string;
}
export interface IUser {
  email: string;
  name: string;
}
export interface IUserName {
  name: string;
}
export interface IUserEmail {
  email: string;
}

export interface IStatusModalOrder {
  success: boolean;
  name: string;
  order: {
    ingredient: IIngredient[];
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updateAt: string;
    };
    status: string;
    name: string;
    createdAt: string;
    updateAt: string;
    number: number;
    price: number;
  };
}
export interface IdataRegister {
  dataRegister: string;
}
interface RefreshTokenPayload {
  token: string | null;
}
export interface IOptions {
  method: string;
  headers?:
    | {
        [name: string]: string;
      }
    | {
        Authorization: string | null;
        "Content-Type": "application/json;charset=utf-8";
      }
    | {
        Authorization: string | null;
      };

  body?: string | RefreshTokenPayload;
}

export interface IErr {
  success: boolean;
  message: string;
}

export type IRes = IdataIngredient | IUser;
export type TOrderFeedOptions = {
  _id: string;
  ingredients: string[];
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
export type TFeed = {
  success: boolean;
  orders: TOrderFeedOptions[];
  total: number;
  totalToday: number;
};
