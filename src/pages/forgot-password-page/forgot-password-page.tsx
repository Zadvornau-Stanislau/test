import React, { ChangeEvent, FC, FormEvent } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import styles from "./forgot-password-page.module.css";
import cn from "classnames";
import { useAppSelector } from "../../utils/hooks";
import { forgotPassword } from "../../services/user/user-slice";
import { passcodeForgot } from "../../services/user/user-selector";
import { IUserLogging } from "../../types/interface";
import { useAppDispatch } from "../../utils/hooks";

const ForgotPasswordPage: FC = () => {
  const [emailUser, setEmail] = React.useState<IUserLogging>({
    email: "",
  });
  const passwordForgot = useAppSelector(passcodeForgot);

  const dispatch = useAppDispatch();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { email } = emailUser;
    if (!email) {
      return;
    }

    dispatch(forgotPassword({ email }));
  }
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail({
      [name]: value,
    });
  };

  return (
    <div className={styles.page}>
      {!passwordForgot ? (
        <>
          <h2 className="text text_type_main-medium"> Восстановление пароля</h2>
          <form onSubmit={handleSubmit}>
            <div className={cn(styles.container, "mt-6 mb-6")}>
              <EmailInput
                onChange={handleEmailChange}
                placeholder="Укажите E-mail"
                value={emailUser.email}
                name={"email"}
                isIcon={false}
              />
            </div>
            <Button htmlType="submit" type="primary" size="large">
              Восстановить
            </Button>
          </form>
          <p className={cn(styles.text, "text text_type_main-default pt-20")}>
            Вспонили пароль?{" "}
            <Link
              to="/login"
              className={cn(styles.link, "text text_type_main-default")}
            >
              Войти
            </Link>
          </p>
        </>
      ) : (
        <Navigate to={{ pathname: "/reset-password" }} />
      )}
    </div>
  );
};

export default ForgotPasswordPage;
