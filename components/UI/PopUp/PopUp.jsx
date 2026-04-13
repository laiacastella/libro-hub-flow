"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Boton } from "@/components/index";
import { X } from "lucide-react";
import styles from "./PopUp.module.css";

export default function PopUp({
  isOpen,
  onClose,
  title,
  children,
  footer,
  cerrarAlHacerClickFuera = true,
  overlayClassName = "",
  popupClassName = "",
  ariaLabel = "Ventana emergente",
}) {
  const popupRef = useRef(null);

  // BLOQUEO SCROLL
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (
      cerrarAlHacerClickFuera &&
      popupRef.current &&
      !popupRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${styles.fadeIn} ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.popup} ${styles.scaleIn} ${popupClassName}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        ref={popupRef}
      >
        {/* HEADER */}
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}

          <Boton
            texto={<X />}
            variant="cerrar"
            title="Cerrar ventana"
            className={styles.cerrarX}
            onClick={onClose}
          />
        </div>

        {/* BODY */}
        <div className={styles.body}>
          {children}
        </div>

        {/* FOOTER */}
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}