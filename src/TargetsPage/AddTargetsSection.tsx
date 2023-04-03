import React, { useRef, useState, useEffect, createContext } from "react";
import classes from "./TargetPage.module.scss";
import {useNavigate} from "react-router-dom";
// import caretDownIcon from "./caret_down.svg";
import { ReactComponent as CaretDownIcon } from "./caret_down.svg";
import {DropDown} from "../MenuDropDown/DropDown";
import options from "../MenuDropDown/options";
import Modal from "../MenuDropDown/Modal";
import "../MenuDropDown/Modal.scss";
import axios from 'axios';
// import TargetCards from "../Cards/TargetCards";


//REFERENCING src\pages\target\components\AddTargetSection.tsx FROM ENVISION REPO

// interface Card {
//   cardTitle: string;
//   cardValue: string;
// }
interface Card{
  header: any;
  value: string;
}

// export const AddTargetSection = ({cardTitle, cardValue}: Card) => {
  export const AddTargetSection = () => {
  // const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectTargetType, setselectTargetType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [header, setHeader] = useState('');
  const [value, setValue] = useState('');
  const [cards, setCards] = useState<Card[]>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   // Fetch the data from the server using an API call
  //   axios.get('http://localhost:5000/api/cards')
  //     .then(response => setCards(response.data))
  //     .catch(error => console.log(error));
  // }, []);

  //for modal input fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(event.target.value);
    setHeader(selectTargetType); //maybe can have a if scenario where if value is not null then set header to modal title
    console.log(selectTargetType);
    // cardValue=value;
  }

  const handleSave = () => {
  console.log(header);
  const newCard: Card = {header, value};
  const updatedCards = [...cards, newCard];
  setCards(updatedCards);
  // console.log(`${JSON.stringify(newCard)}`);
  // console.log(`${JSON.stringify(updatedCards)}`);

  // Send a POST request to the server to update the JSON file
  axios.post('http://localhost:5000/api/cards', { cards: updatedCards })
  .then(response =>console.log(response))
  .catch(error => console.log(error));
  // return <TargetCards title={selectTargetType} value={value}/> 
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
          return <Modal title={selectTargetType} value={value} onClose={closeModal} onSave={handleSave}>
          <p>Enter the amount you would like to invest on construction.</p>
          <input className={classes.modal_input} onChange={handleChange}/>
        </Modal>;

        case "Construction Time":
          return <Modal title={selectTargetType} value={value} onClose={closeModal} onSave={handleSave}>
          <p>Enter the estimate amount of time it takes to build.</p>
          <input className={classes.modal_input} onChange={handleChange}/>
        </Modal>;

        case "Floor Efficiency":
          return <Modal title={selectTargetType} value={value} onClose={closeModal} onSave={handleSave}>
          <p>Optimise your floor for maximum efficiency.</p>
          <input className={classes.modal_input} onChange={handleChange}/>
        </Modal>;

        case "No. of Apartments":
          return <Modal title={selectTargetType} value={value} onClose={closeModal} onSave={handleSave}>
          <p>Enter total number of apartments that would required for this project.</p>
          <input className={classes.modal_input} onChange={handleChange}/>
        </Modal>;

        case "Apartment Type Distribution":
          return <Modal title={selectTargetType} value={value} onClose={closeModal} onSave={handleSave}>
          <p>Enter apartment type distribution targets for this project.</p>
          <input className={classes.modal_input} onChange={handleChange}/>
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
        {/* <TargetCards title={selectTargetType} value={value}/> */}
        </div>
      </div>
    </div>
  );
};
