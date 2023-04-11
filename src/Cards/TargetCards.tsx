import React, { ReactNode, useEffect, useState, FC } from "react";
import axios from 'axios';
import "./TargetCard.scss";
import { ReactComponent as DeleteIcon } from "./delete.svg";
import { ReactComponent as EditIcon } from "./edit.svg";
import { Routes, Route, useNavigate} from "react-router-dom";

interface Card{
  header: string;
  value: string;
}

// interface EditCard{
//   edit: boolean;
//   header: string;
//   value: string;
// }

interface TargetPageProp{
  setIsJsonEmpty: Function;
  setIsEditBtnClicked: Function;
  setSelectedCardHeader: Function;
  setDefaultCardValue: Function;
}

const TargetCards: FC<TargetPageProp> = ({setIsJsonEmpty, setIsEditBtnClicked, setSelectedCardHeader, setDefaultCardValue}) =>{
  const [cards, setCards] = useState<Card[]>([]);
  // const [editedCard, setEditedCard] = useState<EditCard[]>([]);;

  const navigate = useNavigate();
    useEffect(() => {
    // Fetch the data from the server using an API call
    axios.get('http://localhost:5000/api/cards')
      .then(response => setCards(response.data.cards))
      .catch(error => console.log(error));
    }, []);
    
    useEffect(() => {
      console.log(cards.length);
      // console.log(cards)
      setIsJsonEmpty(cards.length === 0);
    })

    const handleDelete = (index:number) => {
    // Delete the card at the given index
      console.log(index);
      const newCards = [...cards];
      newCards.splice(index, 1); //removes the index clicked
      console.log(newCards);
      //post reques to send the index clicked to delete from db, then FORCE refresh the page?
      // console.log()
      
      axios.delete(`http://localhost:5000/api/cards/${index}`)
      .then( ()=> setCards(newCards))
      .catch(error => console.log(error))
    };

    const handleEditBtnClick = (index:number, header:string, value:string) => {
      console.log('clicked on edit button for');
      console.log(index, header, value);
      setIsEditBtnClicked(true);
      setSelectedCardHeader(header);
      setDefaultCardValue(value);
  
    };
    
  //WORKING ISH CARDS
  // const cardsDiv = [];
  // for(var i in cards){ //change to the let i=blah blah
  //   // console.log( `am inside for loop`)
  //   // console.log(cards[i]['value']);
  //   cardsDiv.push(<div className="card-content-wrapper" key={i}>
  //     <div className="card-headersection">
  //     {/* <VerticalKebabMenu className="verticalKebab" onClick={()=>navigate("/clickkebab")}/> */}
  //     <button className="verticalKebab" onClick={()=> handleDelete(parseInt(i))}>
  //               X
  //     </button>
  //     <h2 className="card-title">{cards[i].header}</h2>
  //     </div>

  //   <p className="card-body">{cards[i].value}</p>
  // </div>)
  // }
  
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
             {/* <button className="verticalKebab" onClick={()=> handleDelete(index)}>
                       X
                      </button> */}
            </div>
      
         <p className="card-body">{card.value}</p>
        </div>
      )
      )}
      {/* {cardsDiv} WORKING ISH*/} 
    </div>);

};
export default TargetCards;