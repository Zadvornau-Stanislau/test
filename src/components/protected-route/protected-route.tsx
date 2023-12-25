import React, { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./protected-route.module.css";
import { useAppSelector } from "../../utils/hooks";
import { check, user } from "../../services/user/user-selector";

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyUnAuth, children }) => {
  const location = useLocation();
  const currentUser = useAppSelector(user);
  /*   console.log(currentUser); */
  const isAuthCheck = useAppSelector(check);

  if (!isAuthCheck) {
    return <span className={styles.loader}></span>;
  }

  if (onlyUnAuth && currentUser) {
    const from = location.state?.from || { pathname: "/" };

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !currentUser) {
    return <Navigate to={{ pathname: "/login" }} state={{ from: location }} />;
  }

  return children as React.ReactElement | null;
};

export default ProtectedRoute;
