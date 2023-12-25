import React, { useEffect, FC } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPassword from "../../pages/forgot-password-page/forgot-password-page";
import ResetPassworPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import ErrorPage from "../../pages/error-page/error-page";

import { getIngredients } from "../../services/ingredints/ingredients-slice";

import ProtectedRoute from "../protected-route/protected-route";

import { currentUserRequest } from "../../services/user/user-slice";
import ProfileDataPage from "../../pages/profile-data-page/profile-data-page";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import FeedPage from "../../pages/feed/feed-page";
import FeedDetails from "../feed-details/feed-details";
import ProfileOrders from "../../pages/profile-orders/profile-orders";

const App: FC = () => {
  const state = useAppSelector((store) => {
    return store;
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  useEffect(() => {
    dispatch(currentUserRequest());
  }, []);

  const backgroundLocation = location.state?.backgroundLocation;
  const onCloseModal = (): void => {
    navigate(backgroundLocation.pathname || "/", { replace: true });
  };

  return (
    <div className={style.page}>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<MainPage />} />
          <Route path="/feed" element={<FeedPage status />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassworPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileDataPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/orders"
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/feed/:id" element={<FeedDetails feed />} />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute>
                <FeedDetails orders />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onCloseModal={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path="/feed/:id"
            element={
              <Modal onCloseModal={onCloseModal}>
                <FeedDetails feed />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute>
                <Modal onCloseModal={onCloseModal}>
                  <FeedDetails orders />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
//accessToken Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGI5NmY0YzJjYzYxMDAxYjNkNjY2ZCIsImlhdCI6MTY5OTU5NzY5MCwiZXhwIjoxNjk5NTk4ODkwfQ.iDCObfJ8udQRyyINGP-BS9aTap-8yo211fZsspXHDCc
