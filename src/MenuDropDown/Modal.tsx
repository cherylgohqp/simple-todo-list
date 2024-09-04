import { ReactNode, useState } from "react";
import "./Modal.scss";

interface ModalProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  value:string;
  onSave: (header: string, value:string) => void;
  isDisabled?:boolean;
}

const Modal = ({ title, onClose, children, onSave, value, isDisabled}:ModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [header, setHeader] = useState(title);
  const [cardValue, setValue] = useState(value);
  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSave = () => {
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
