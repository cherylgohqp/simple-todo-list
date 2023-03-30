import React, { ReactNode, useEffect, useState } from "react";

interface Card{
  title: string;
  value: string;
}

// interface TargetCardProps{
//   title: string;
//   value: string;
// }

const TargetCards: React.FC<Card> = ({title, value}) =>{
  const [cards, setCards] = useState<Card[]>([]);
  console.log(title,value)
  // localStorage.clear();
  console.log(localStorage)
  //storage of card info
  useEffect(() => {
    const cardsFromStorage = localStorage.getItem('cards');
    
    if (cardsFromStorage) {
      setCards(JSON.parse(cardsFromStorage));
    } else {
      setCards([]);
    }
  }, []);
  

  const handleSave = () => {
    const newCard: Card = { title, value };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
  };

  return(
    <div>
      {cards.map((card, index) => (
        <div key={index}>
          <h2>{card.title}</h2>
          <p>{card.value}</p>
        </div>
      ))}
    </div>);

};
export default TargetCards;