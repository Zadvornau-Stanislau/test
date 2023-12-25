import React, { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
  children?: ReactNode;
  onCloseModal: () => void;
}

const Modal: FC<ModalProps> = ({
  children,

  onCloseModal,
}) => {
  function onClose() {
    onCloseModal();
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <article className={styles.modal}>
        <button className={styles.modal__cross} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        <div className={styles.container__modal_center}>{children}</div>
      </article>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("react-modals") as HTMLElement
  );
};

export default Modal;
