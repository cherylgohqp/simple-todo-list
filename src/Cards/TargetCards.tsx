import React, { useEffect, useState, FC } from "react";
import axios from 'axios';
import "./TargetCard.scss";
import { ReactComponent as DeleteIcon } from "./delete.svg";
import { ReactComponent as EditIcon } from "./edit.svg";

interface Card{
  header: string;
  value: string;
}

interface TargetPageProp{
  setIsJsonEmpty: Function;
  setIsEditBtnClicked: Function;
  setSelectedCardHeader: Function;
  setDefaultCardValue: Function;
  setSelectedCardIndex: Function;
}
const API_URL = "https://target-test-api.vercel.app"; //prev: http://localhost:5000/

const TargetCards: FC<TargetPageProp> = ({setIsJsonEmpty, setIsEditBtnClicked, setSelectedCardHeader, setDefaultCardValue, setSelectedCardIndex}) =>{
  const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
    // Fetch the data from the server using an API call
    axios.get(`${API_URL}/api/cards`)
      .then(response => setCards(response.data[0].cards))
        // console.log("response", response.data[0].cards))
        // setCards(response.data.cards))
      .catch(error => console.log(error));
    }, [cards]);
    
    useEffect(() => {

      setIsJsonEmpty(cards.length === 0);
    })

    const handleDelete = (index:number) => {
    // Delete the card at the given index
      const newCards = [...cards];
      newCards.splice(index, 1); //removes the index clicked

      axios.delete(`${API_URL}/api/cards/${index}`)
      .then( ()=> setCards(newCards))
      .catch(error => console.log(error))
    };

    const handleEditBtnClick = (index:number, header:string, value:string) => {
      setIsEditBtnClicked(true);
      setSelectedCardHeader(header);
      setDefaultCardValue(value);
      setSelectedCardIndex(index);
  
    };
  
  
  return(
    <div className="card-section">
      {cards.length > 0 && cards.map((card, index) => (
        card && ( // Guard against null or undefined
        <div className="card-content-wrapper" key={index}>
             <div className="card-headersection">
            <h2 className="card-title">{card.header}</h2>
              <div className="icons-container">
            <EditIcon className="editIcon" onClick={()=>handleEditBtnClick(index, card.header, card.value)}/>
            <DeleteIcon className="deleteIcon" onClick={()=>handleDelete(index)}/>
            </div>
            </div>
      
         <p className="card-body">{card.value}</p>
        </div>
      )
      ))}
    </div>);

};
export default TargetCards;