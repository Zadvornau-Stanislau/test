import React, { FC } from "react";
import { NavLink, Outlet, useLocation, useMatch } from "react-router-dom";
import styles from "./profile-page.module.css";
import cn from "classnames";
import { logoutUserRequest } from "../../services/user/user-slice";
import { useAppDispatch } from "../../utils/hooks";

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const logoutUser = () => {
    dispatch(logoutUserRequest());
  };

  const location = useLocation();
  const isProfileActive = location.pathname === "/profile";
  const isOrdersActive = location.pathname === "/profile/orders";

  const setNavStyle = (isActive: boolean) => {
    return isActive
      ? cn(styles.activelink, "text text_type_main-medium")
      : cn(styles.link, "text text_type_main-medium");
  };

  return (
    <div className={styles.page}>
      <div className={styles.navigate}>
        <nav className={styles.links}>
          <NavLink to="/profile" className={setNavStyle(isProfileActive)}>
            Профиль
          </NavLink>

          <NavLink to="/profile/orders" className={setNavStyle(isOrdersActive)}>
            История заказов
          </NavLink>
          <p
            onClick={logoutUser}
            className={cn(styles.link, "text text_type_main-medium")}
          >
            Выход
          </p>
        </nav>
        <p className={cn(styles.text, "text text_type_main-default mt-20")}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
