import React, { useRef, useState, FC, useEffect, createContext } from "react";
import classes from "./TargetPage.module.scss";
import { useNavigate } from "react-router-dom";
// import caretDownIcon from "./caret_down.svg";
import { ReactComponent as CaretDownIcon } from "./caret_down.svg";
import { ReactComponent as PlusIcon } from "./plus.svg";
import { DropDown } from "../MenuDropDown/DropDown";
import options from "../MenuDropDown/options";
import Modal from "../MenuDropDown/Modal";
import "../MenuDropDown/Modal.scss";
import axios from "axios";
// import TargetCards from "../Cards/TargetCards";

//REFERENCING src\pages\target\components\AddTargetSection.tsx FROM ENVISION REPO

interface Card {
  header: any;
  value: string;
}
interface TargetPageProp {
  // setModalState:Function;
  isEditBtnClicked: boolean;
  selectedCardHeader: string;
  defaultCardValue: string;
  setIsEditBtnClicked: Function;
  selectedCardIndex: string;
}

// export const AddTargetSection  = () => {
export const AddTargetSection: FC<TargetPageProp> = ({
  isEditBtnClicked,
  setIsEditBtnClicked,
  selectedCardHeader,
  defaultCardValue,
  selectedCardIndex,
}) => {
  // const navigate = useNavigate();
  const API_URL = "https://target-test-api.vercel.app"; //prev: http://localhost:5000/
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectTargetType, setselectTargetType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [cards, setCards] = useState<Card[]>([]);
  // const [editHeader, setEditHeader] = useState<string>(selectedCardHeader);
  // const [editValue, setEditValue] = useState<string>(defaultCardValue);
  // Error states
  const [headerError, setHeaderError] = useState<string>("");
  const [valueError, setValueError] = useState<string>("");

  // useEffect(() => {
  //   // Update the state with the selected card values when editing is initiated
  //   if (isEditBtnClicked) {
  //     setEditHeader(selectedCardHeader);
  //     setEditValue(defaultCardValue);
  //   }
  // }, [isEditBtnClicked, selectedCardHeader, defaultCardValue]);

  useEffect(() => {
    if (isEditBtnClicked) {
      openEditModal();
    }
  }, [isEditBtnClicked]);

  const openModal = () => {
    setHeader("");
    setValue("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditBtnClicked(false);
    setHeaderError("");
    setValueError("")
  };


  const openEditModal = () => {
    setHeader(selectedCardHeader); // Set the current header for editing
    setValue(defaultCardValue);    // Set the current value for editing
    setIsModalOpen(true);
  };

  // Handle input changes for both header and value
  const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeader(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    console.log(header);
    const newCard: Card = { header, value };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);

    // Send a POST request to the server to update the JSON file
    axios
      .post(`${API_URL}/api/cards`, updatedCards[0])
      .then((response) => {
        console.log(response);
        // setIsModalOpen(false);
        closeModal();
        // saveChanges();
      })
      .catch((error) => console.log(error));
    // return <TargetCards title={selectTargetType} value={value}/>
  };

  const updateCardHandler = () => {
    // console.log("edited values", editHeader, editValue);

    // Send a PUT request to the server with the ID of the card to be updated and the new title and description
    axios
      .put(`${API_URL}/api/cards/${parseInt(selectedCardIndex)}`, {
        header: header, // Use edited state
        value: value, // Use edited state
      })
      .then((response) => {
        // If the card is updated successfully, log a success message
        console.log(response.data);
        closeModal();
      })
      .catch((error) => {
        // If the card is not found or there's an error, log an error message
        console.log(error.message);
      });
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

  const validateInputs = (field: string) => {
    // let isValid = true;
    if (field === "header") {
      if (header.trim() === "" ) {
        console.log("header", header);
        // console.log('edit header', editHeader)
        setHeaderError("Task title is required.");
        // isValid = false;
      } else {
        setHeaderError("");
      }
    }
    if (field === "description") {
      if (value.trim() === "" ) {
        setValueError("Task description is required.");
        // isValid = false;
      } else {
        setValueError("");
      }
    }

    // return isValid;
  };

  // const isButtonDisabled =
  //   (editValue === defaultCardValue && editHeader === selectedCardHeader) ||
  //   (value === "" && header === "");

  const modalRendered = () => {
    return (
      <Modal
        title="Add New Task"
        value={value}
        onClose={closeModal}
        onSave={handleSave}
        isDisabled={value === "" || header === ""}
      >
        <p>Enter the task title:</p>
        <input
          className={classes.modal_header_input}
          value={header}
          onChange={handleHeaderChange}
          placeholder="Task Title"
          onBlur={() => validateInputs("header")}
        />
        {headerError && <p className={classes.errorText}>{headerError}</p>}
        <p>Enter the task description:</p>
        <input
          className={classes.modal_value_input}
          value={value}
          onChange={handleValueChange}
          placeholder="Task Description"
          onBlur={() => validateInputs("description")}
        />
        {valueError && <p className={classes.errorText}>{valueError}</p>}
      </Modal>
    );
  };

  const editModalRendered = () => {
    return (
      <Modal
        title="Edit Task"
        value={value}
        onClose={closeModal}
        onSave={updateCardHandler}
        isDisabled={
          (value === defaultCardValue && header === selectedCardHeader)
        } //maybe can do a validation check for null values
      >
        <p>Edit the task title:</p>
        <input
          className={classes.modal_header_input}
          value={header}
          onChange={(e) => setHeader(e.target.value)} // Update state correctly
          placeholder="Task Title"
          onBlur={() => validateInputs("header")}
        />
        {headerError && <p className={classes.errorText}>{headerError}</p>}

        <p>Edit the task description:</p>
        <input
          className={classes.modal_value_input}
          value={value}
          onChange={(e) => setValue(e.target.value)} // Update state correctly
          placeholder="Task Description"
          onBlur={() => validateInputs("description")}
        />
        {valueError && <p className={classes.errorText}>{valueError}</p>}
      </Modal>
    );
  };

  return (
    <div>
      <div>
        <div className={classes["button-spacing"]}>
          {/* <button className={classes.button} onClick={()=> navigate("/buttonClicked")}> */}
          <button
            className={classes.button}
            onClick={() => openModal()}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
              dismissHandler(e)
            }
          >
            Add New Task
            {/* <span className={classes.caretDownIcon}> </span> */}
            {/* <img src={caretDownIcon} className={classes.caretDownIcon_} /> */}
            <PlusIcon className={classes.caretDownIcon_} />
            {/* {showDropDown && (
              <DropDown
                targetTypes={targetTypes()}
                showDropDown={false}
                toggleDropDown={(): void => toggleDropDown()}
                targetTypeSelection={targetTypeSelection}
              />
            )} */}
          </button>
          {isModalOpen && <div>{modalRendered()}</div>}
          {isEditBtnClicked && <div>{editModalRendered()}</div>}
        </div>
      </div>
    </div>
  );
};
