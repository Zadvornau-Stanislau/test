import React, { FC } from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className={styles.overlay}
      data-testid="modal-overlay"
    ></div>
  );
};

export default ModalOverlay;
