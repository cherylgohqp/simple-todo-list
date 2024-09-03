import React, { useState, FC, useEffect } from "react";
import classes from "./TodoPage.module.scss";
import { ReactComponent as PlusIcon } from "./plus.svg";
import Modal from "../MenuDropDown/Modal";
import "../MenuDropDown/Modal.scss";
import axios from "axios";

interface Card {
  header: any;
  value: string;
}
interface TargetPageProp {
  isEditBtnClicked: boolean;
  selectedCardHeader: string;
  defaultCardValue: string;
  setIsEditBtnClicked: Function;
  selectedCardIndex: string;
}

export const AddTargetSection: FC<TargetPageProp> = ({
  isEditBtnClicked,
  setIsEditBtnClicked,
  selectedCardHeader,
  defaultCardValue,
  selectedCardIndex,
}) => {
  const API_URL = "https://target-test-api.vercel.app"; //prev: http://localhost:5000/
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectTargetType, setselectTargetType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [cards, setCards] = useState<Card[]>([]);

  // Error states
  const [headerError, setHeaderError] = useState<string>("");
  const [valueError, setValueError] = useState<string>("");

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
    setValueError("");
  };

  const openEditModal = () => {
    setHeader(selectedCardHeader); // Set the current header for editing
    setValue(defaultCardValue); // Set the current value for editing
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
    const newCard: Card = { header, value };
    const updatedCards = [...cards, newCard];

    setCards(updatedCards);

    // Send a POST request to the server to update the JSON file
    axios
      .post(`${API_URL}/api/cards`, newCard)
      .then((response) => {
        console.log(response);

        closeModal();
      })
      .catch((error) => console.log(error));
  };

  const updateCardHandler = () => {

    // Send a PUT request to the server with the ID of the card to be updated and the new title and description
    axios
      .put(`${API_URL}/api/cards/${parseInt(selectedCardIndex)}`, {
        header: header,
        value: value, 
      })
      .then((response) => {
        // If the card is updated successfully, log a success message (to do)
        console.log("Card updated successfully:", response.data);
        closeModal();
      })
      .catch((error) => {
        // If the card is not found or there's an error, log an error message
        console.log(error.message);
      });
  };

  //commented out dropdown button handlers
  // /**
  //  * Toggle the drop down menu
  //  */
  // const toggleDropDown = () => {
  //   setShowDropDown(!showDropDown);
  // };

  // /**
  //  * Hide the drop down menu if click occurs
  //  * outside of the drop-down element.
  //  *
  //  * @param event  The mouse event
  //  */
  // const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
  //   if (event.currentTarget === event.target) {
  //     setShowDropDown(false);
  //   }
  // };

  const validateInputs = (field: string) => {
    if (field === "header") {
      if (header.trim() === "") {
        setHeaderError("Task title is required.");
      } else {
        setHeaderError("");
      }
    }
    if (field === "description") {
      if (value.trim() === "") {
        setValueError("Task description is required.");
      } else {
        setValueError("");
      }
    }
  };

  const modalRendered = () => {
    return (
      <Modal
        title="Add New Task"
        value={value}
        onClose={closeModal}
        onSave={handleSave}
        isDisabled={
          value === "" || header === "" || !!valueError || !!headerError
        } // double exclamation marks (!!) ensure that the condition evaluates to a boolean value (true if there's an error string, false otherwise).
      >
        <p>Task Title</p>
        <input
          className={classes.modal_header_input}
          value={header}
          onChange={handleHeaderChange}
          placeholder="Task Title"
          onBlur={() => validateInputs("header")}
        />
        {headerError && <p className={classes.errorText}>{headerError}</p>}
        <p>Task Description</p>
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
          (value === defaultCardValue && header === selectedCardHeader) ||
          !!headerError ||
          !!valueError
        }
      >
        <p>Edit the task title:</p>
        <input
          className={classes.modal_header_input}
          value={header}
          onChange={handleHeaderChange} // Update state correctly
          placeholder="Task Title"
          onBlur={() => validateInputs("header")}
        />
        {headerError && <p className={classes.errorText}>{headerError}</p>}

        <p>Edit the task description:</p>
        <input
          className={classes.modal_value_input}
          value={value}
          onChange={handleValueChange} // Update state correctly
          placeholder="Task Description"
          onBlur={() => validateInputs("description")}
        />
        {valueError && <p className={classes.errorText}>{valueError}</p>}
      </Modal>
    );
  };

  return (
    <div>
        <div className={classes["button-spacing"]}>
          <button
            className={classes.button}
            onClick={() => openModal()}
            // onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
            //   dismissHandler(e)
            // } //this is for the dropdown button previously
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
            )} hide dropdown*/} 
          </button>
          {isModalOpen && <div>{modalRendered()}</div>}
          {isEditBtnClicked && <div>{editModalRendered()}</div>}
      </div>
    </div>
  );
};
