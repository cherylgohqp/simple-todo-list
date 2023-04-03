import React, { ReactNode, useEffect, useState } from "react";
import axios from 'axios';
import "./TargetCard.scss";

interface Card{
  header: string;
  value: string;
}

const TargetCards = () =>{
  const [cards, setCards] = useState<Card[]>([]);
  // console.log(title,value)
  // // localStorage.clear();
  // console.log(localStorage)
  // //storage of card info
  // useEffect(() => {
  //   const cardsFromStorage = localStorage.getItem('cards');
    
  //   if (cardsFromStorage) {
  //     setCards(JSON.parse(cardsFromStorage));
  //   } else {
  //     setCards([]);
  //   }
  // }, []);
    useEffect(() => {
    // Fetch the data from the server using an API call
    axios.get('http://localhost:5000/api/cards')
      .then(response => setCards(response.data.cards))
      .catch(error => console.log(error));
  }, []);

  // const handleSave = () => {
  //   const newCard: Card = { title, value };
  //   const updatedCards = [...cards, newCard];
  //   setCards(updatedCards);
  //   localStorage.setItem('cards', JSON.stringify(updatedCards));
  // };
  console.log(cards);
  const cardsDiv = [];
  for(var i in cards){
    // console.log( `am inside for loop`)
    // console.log(cards[i]['value']);
    cardsDiv.push(<div className="card-content-wrapper">
    <h2 className="card-title">{cards[i].header}</h2>
    <p className="card-body">{cards[i].value}</p>
  </div>)
  }
  
  return(
    <div>
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