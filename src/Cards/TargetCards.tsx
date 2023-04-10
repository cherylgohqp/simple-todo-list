import React, { ReactNode, useEffect, useState, FC } from "react";
import axios from 'axios';
import "./TargetCard.scss";
import { ReactComponent as VerticalKebabMenu } from "./kebab.svg";
import { Routes, Route, useNavigate} from "react-router-dom";

interface Card{
  header: string;
  value: string;
}

interface TargetPageProp{
  setIsJsonEmpty: Function;
}

const TargetCards: FC<TargetPageProp> = ({setIsJsonEmpty}) =>{
  const [cards, setCards] = useState<Card[]>([]);
  const navigate = useNavigate();
    useEffect(() => {
    // Fetch the data from the server using an API call
    axios.get('http://localhost:5000/api/cards')
      .then(response => setCards(response.data.cards))
      .catch(error => console.log(error));
    }, []);
    
    useEffect(() => {
      console.log(cards.length);
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
             {/* <button className="verticalKebab" onClick={()=> handleDelete(index)}>
                       X
                      </button> */}
             <h2 className="card-title">{card.header}</h2>
            <VerticalKebabMenu className="deleteIcon" onClick={()=>handleDelete(index)}/>
            </div>
      
         <p className="card-body">{card.value}</p>
        </div>
      )
      )}
      {/* {cardsDiv} WORKING ISH*/} 
    </div>);

};
export default TargetCards;