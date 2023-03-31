import React, { ReactNode, useEffect, useState } from "react";
import axios from 'axios';

interface Card{
  cardTitle: string;
  cardValue: string;
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
      .then(response => setCards(response.data))
      .catch(error => console.log(error));
  }, []);

  // const handleSave = () => {
  //   const newCard: Card = { title, value };
  //   const updatedCards = [...cards, newCard];
  //   setCards(updatedCards);
  //   localStorage.setItem('cards', JSON.stringify(updatedCards));
  // };

  return(
    <div>
      {/* {cards.map((card, index) => (
        <div key={index}>
          <h2>{card.cardTitle}</h2>
          <p>{card.cardValue}</p>
        </div>
      ))} */}
    </div>);

};
export default TargetCards;