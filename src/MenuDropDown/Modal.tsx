import React, { ReactNode, useEffect, useState } from "react";
import "./Modal.scss";
// import { ReactComponent as Cross } from "./caret_down.svg";
import TargetCards from "../Cards/TargetCards";

interface ModalProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  value:string;
  onSave: (header: string, value:string) => void;
}

interface Card{
  modalTitle: string;
  inputValue: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, onSave, value}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [header, setHeader] = useState(title);
  const [cardValue, setValue] = useState(value);
  const [cards, setCards] = useState<Card[]>([]);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  // const handleSave = () => {
  //   onSave(header,value);
  //   console.log(header,value);
  //   setHeader('');
  //   setValue('');
  // }

  const handleSave = () => {
    console.log(`clicked on ${title} and ${value}`)
    onSave(header,cardValue);
    const newCard = { modalTitle: title, inputValue: value };
    setCards([...cards, newCard]);
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
                <button className="save-button" onClick={handleSave}>Save</button>
              </div>
          </div>
        </div>
      )}
      {/* <TargetCards title={header} value={cardValue}/> */}
    </>
  );
};

export default Modal;
