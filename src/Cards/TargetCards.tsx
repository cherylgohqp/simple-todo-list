import React, { ReactNode, useEffect, useState, FC } from "react";
import axios from 'axios';
import "./TargetCard.scss";

interface Card{
  header: string;
  value: string;
}

interface TargetPageProp{
  setIsJsonEmpty: Function;
}

const TargetCards: FC<TargetPageProp> = ({setIsJsonEmpty}) =>{
  const [cards, setCards] = useState<Card[]>([]);

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
    
  const cardsDiv = [];
  for(var i in cards){ //change to the let i=blah blah
    // console.log( `am inside for loop`)
    // console.log(cards[i]['value']);
    cardsDiv.push(<div className="card-content-wrapper" key={i}>
    <h2 className="card-title">{cards[i].header}</h2>
    <p className="card-body">{cards[i].value}</p>
  </div>)
  }
  
  return(
    <div className="card-section">
      {cardsDiv}
      
      {/* {for(var i in cards){
        <div>
        <h2>{i.cardTitle}</h2>
        <p>{i.cardValue}</p>
      </div>
      }} */}
      
      {/* {cards.map((card, index) => (
        <div key={index}>
          <h2>{card.cardTitle}</h2>
          <p>{card.cardValue}</p>
        </div>
      ))} */}
    </div>);

};
export default TargetCards;