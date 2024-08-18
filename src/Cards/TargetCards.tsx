import React, { useEffect, useState, FC } from "react";
import axios from 'axios';
import "./TargetCard.scss";
import { ReactComponent as DeleteIcon } from "./delete.svg";
import { ReactComponent as EditIcon } from "./edit.svg";
import { useNavigate} from "react-router-dom";

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

const TargetCards: FC<TargetPageProp> = ({setIsJsonEmpty, setIsEditBtnClicked, setSelectedCardHeader, setDefaultCardValue, setSelectedCardIndex}) =>{
  const [cards, setCards] = useState<Card[]>([]);

  const navigate = useNavigate();
    useEffect(() => {
    // Fetch the data from the server using an API call
    axios.get('http://localhost:5000/api/cards')
      .then(response => setCards(response.data.cards))
      .catch(error => console.log(error));
    }, []);
    
    useEffect(() => {

      setIsJsonEmpty(cards.length === 0);
    })

    const handleDelete = (index:number) => {
    // Delete the card at the given index
      const newCards = [...cards];
      newCards.splice(index, 1); //removes the index clicked

      axios.delete(`http://localhost:5000/api/cards/${index}`)
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
      {cards.map((card,index) =>(
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
      )}
    </div>);

};
export default TargetCards;