import React, { FC } from "react";
import cat from "../../images/cat.jpg";
import styles from "./error-page.module.css";

const ErrorPage: FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>Произошла какая-то ошибка № 404</h2>
      <img src={cat} alt="Ремонт" className={styles.cat} />
    </div>
  );
};

export default ErrorPage;
