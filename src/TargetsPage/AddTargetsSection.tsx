import React, { useRef, useState, useEffect } from "react";
import classes from "./TargetPage.module.scss";
import {useNavigate} from "react-router-dom";
// import caretDownIcon from "./caret_down.svg";
import { ReactComponent as CaretDownIcon } from "./caret_down.svg";
import {DropDown} from "../MenuDropDown/DropDown";
import options from "../MenuDropDown/options";
import Modal from "../MenuDropDown/Modal";
import "../MenuDropDown/Modal.scss";

interface Category{
  name: string;
  options: string[];
}

//REFERENCING src\pages\target\components\AddTargetSection.tsx FROM ENVISION REPO

// export const AddTargetSection = () => {
  // const [menuOpen, setMenuOpen] = useState<boolean>(false);

export const AddTargetSection: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectTargetType, setselectTargetType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 
  // function getTargetOptions () {
    
  // }

  const targetTypes = () => {
    // console.log(options.data.targetTypes.map((type) => type.options)) //['Construction Cost', 'Construction Time', 'Floor Efficiency', 'No. of Apartments', 'Apartment Type Distribution']
    return options.data.targetTypes.map((type) => type.options);

    // console.log(options.data.targetTypes[0].options)
    // return options.data.targetTypes[0].options;
    // return ["Construction Cost", "Construction Time", "Floor Efficiency", "No. Of Apartments", "Apartment Type Distribution"];
  };
  
    /**
     * Toggle the drop down menu
     */
    const toggleDropDown = () => {
      setShowDropDown(!showDropDown);
    };
  
    /**
     * Hide the drop down menu if click occurs
     * outside of the drop-down element.
     *
     * @param event  The mouse event
     */
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
      if (event.currentTarget === event.target) {
        setShowDropDown(false);
      }
    };
  
    /**
     * Callback function to consume the
     * targetType name from the child component
     *
     * @param targetType  The selected targetType
     */
    const targetTypeSelection = (targetType: string): void => {
      setselectTargetType(targetType);
      openModal();
    };
    const modalRendered = () => {
      switch(selectTargetType){
        case "Construction Cost":
          return <Modal title={selectTargetType} onClose={closeModal}>
          <p>Enter the amount you would like to invest on construction.</p>
        </Modal>;

        case "Construction Time":
          return <Modal title={selectTargetType} onClose={closeModal}>
          <p>Enter the estimate amount of time it takes to build.</p>
        </Modal>;

        case "Floor Efficiency":
          return <Modal title={selectTargetType} onClose={closeModal}>
          <p>Optimise your floor for maximum efficiency.</p>
        </Modal>;

        case "No. of Apartments":
          return <Modal title={selectTargetType} onClose={closeModal}>
          <p>Enter total number of apartments that would required for this project.</p>
        </Modal>;

        case "Apartment Type Distribution":
          return <Modal title={selectTargetType} onClose={closeModal}>
          <p>Enter apartment type distribution targets for this project.</p>
        </Modal>;
      }
    };



  return (
    <div>
      <div>
        <div className={classes["button-spacing"]}>
        {/* <button className={classes.button} onClick={()=> navigate("/buttonClicked")}> */}
        <button className={classes.button} onClick={()=> toggleDropDown()} onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }>
      Add Target
      {/* <span className={classes.caretDownIcon}> </span> */}
      {/* <img src={caretDownIcon} className={classes.caretDownIcon_} /> */}
      <CaretDownIcon className={classes.caretDownIcon_}/>
      {showDropDown && (
        <DropDown
          targetTypes={targetTypes()}
          showDropDown={false}
          toggleDropDown={(): void => toggleDropDown()}
          targetTypeSelection={targetTypeSelection}
        />
        )}
      {/* {selectTargetType==='Construction Cost' && isModalOpen && (
        <Modal title={selectTargetType} onClose={closeModal}>
        <p>This is the modal content!</p>
        </Modal>)}
        {selectTargetType==='Construction Time' && isModalOpen && (
          <Modal title={selectTargetType} onClose={closeModal}>
          <p>This is the modal content!</p>
        </Modal>)} */}
    </button>
        {isModalOpen && (<div>{modalRendered()}</div>)}
        </div>
      </div>
    </div>
  );
};
