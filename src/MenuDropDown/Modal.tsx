import React, { ReactNode, useEffect, useState } from "react";
import "./Modal.scss";
// import { ReactComponent as Cross } from "./caret_down.svg";
import TargetCards from "../Cards/TargetCards";
import { isDisabled } from "@testing-library/user-event/dist/utils";

interface ModalProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  value:string;
  onSave: (header: string, value:string) => void;
  isDisabled?:boolean;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, onSave, value, isDisabled}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [header, setHeader] = useState(title);
  const [cardValue, setValue] = useState(value);
  // const [cards, setCards] = useState<Card[]>([]);
  // Determine if changes are made
  // const hasChanges = header !== title || cardValue !== value;
  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSave = () => {
    console.log(`clicked on ${title} and ${value}`)
    onSave(header,cardValue); //this helps to pass the header and card value to addtargetssection handlesave function, for cards data to be saved
    setHeader('');
    setValue('');
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>{title}</h2>
              <button className="close-button" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="modal-body">{children}</div>
              <div className="footerButtons">
                <button className="cancel-button" onClick={closeModal}>Cancel</button>
                <button className="save-button" onClick={handleSave} disabled={isDisabled}>Save</button>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
