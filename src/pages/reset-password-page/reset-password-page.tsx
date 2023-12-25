import React, { ChangeEvent, FC, FormEvent } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import styles from "./reset-password-page.module.css";
import cn from "classnames";
import { useAppSelector } from "../../utils/hooks";
import { resetPassword } from "../../services/user/user-slice";
import { IUserLogging } from "../../types/interface";
import { passcodeForgot } from "../../services/user/user-selector";
import { useAppDispatch } from "../../utils/hooks";

const ResetPassworPage: FC = () => {
  const [changePassword, setChangePassword] = React.useState<IUserLogging>({
    password: "",
    token: "",
  });

  const dispatch = useAppDispatch();

  const passwordForgot = useAppSelector(passcodeForgot);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /* console.log("Form submitted!"); */
    const { password, token } = changePassword;
    if (!password && !token) {
      return;
    }

    dispatch(resetPassword({ password, token }));
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setChangePassword({
      ...changePassword,
      [name]: value,
    });
  };

  return passwordForgot ? (
    <div className={styles.page}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className={cn(styles.container, "mt-6 mb-6")}>
          <PasswordInput
            onChange={handlePasswordChange}
            placeholder={"Введите новый пароль"}
            value={changePassword.password}
            name={"password"}
            extraClass="mb-2"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handlePasswordChange}
            value={changePassword.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
        </Button>
      </form>
      <p className={cn(styles.text, "text text_type_main-default pt-20")}>
        Уже зарегестрированы?{" "}
        <Link
          to="/login"
          className={cn(styles.link, "text text_type_main-default")}
        >
          Войти
        </Link>{" "}
      </p>
    </div>
  ) : (
    <Navigate to={{ pathname: "/" }} />
  );
};

export default ResetPassworPage;
