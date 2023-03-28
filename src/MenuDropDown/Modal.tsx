import React, { ReactNode } from "react";
import "./Modal.scss";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
        <div className="modal-overlay" >
          <div  className="modal-box">
            {props.children}
          </div>
        </div>
    </>
  );
}
