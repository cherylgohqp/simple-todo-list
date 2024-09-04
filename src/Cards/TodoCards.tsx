import { useEffect, useState} from "react";
import axios, { CancelTokenSource } from 'axios';
import styles from "./TodoCard.module.scss";
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

const TodoCards = ({setIsJsonEmpty, setIsEditBtnClicked, setSelectedCardHeader, setDefaultCardValue, setSelectedCardIndex}:TargetPageProp) =>{
    // Axios cancel token source
    let cancelTokenSource: CancelTokenSource;
  const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
    // Fetch the data from the server using an API call
    axios.get(`${API_URL}/api/cards`)
      .then(response => setCards(response.data[0].cards))
      .catch(error => console.log(error));

      setIsJsonEmpty(cards.length === 0); //this is to check if the current cards data is empty or not so that we know whether to render the landing page or cards

       // Cleanup function to cancel any pending API requests when component unmounts
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled due to component unmounting");
      }
    };
    }, [cards]);

    const handleDelete = (index:number) => {
    // Delete the card at the given index
      const newCards = [...cards];
      newCards.splice(index, 1); //removes the index clicked
    // Create a cancel token
      cancelTokenSource = axios.CancelToken.source();

      axios.delete(`${API_URL}/api/cards/${index}`)
      .then( ()=> setCards(newCards))
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.log(error);
        }
      });
    };

    const handleEditBtnClick = (index:number, header:string, value:string) => {
      setIsEditBtnClicked(true);
      setSelectedCardHeader(header);
      setDefaultCardValue(value);
      setSelectedCardIndex(index);
  
    };
  
  
  return(
    <div className={styles["card-section"]}>
      {cards.length > 0 && cards.map((card, index) => (
        card && ( // Guard against null or undefined
        <div className={styles["card-content-wrapper"]} key={index}>
             <div className={styles["card-headersection"]}>
            <h2 className={styles["card-title"]}>{card.header}</h2>
              <div className={styles["icons-container"]}>
            <EditIcon className={styles["editIcon"]} onClick={()=>handleEditBtnClick(index, card.header, card.value)}/>
            <DeleteIcon className={styles["deleteIcon"]} onClick={()=>handleDelete(index)}/>
            </div>
            </div>
      
         <p className={styles["card-body"]}>{card.value}</p>
        </div>
      )
      ))}
    </div>);

};
export default TodoCards;