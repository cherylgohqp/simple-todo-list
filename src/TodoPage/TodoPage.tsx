
import classes from "./TodoPage.module.scss";
import { TodoLandingPage } from "../TodoLandingPage/TodoLandingPage";
import { AddTodoSection } from "./AddTodoSection";
import TodoCards from "../Cards/TodoCards";
import { useState  } from "react";

export const TodoPage = () => {
  
  const [isJsonEmpty, setIsJsonEmpty] = useState<boolean>(true);
  const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);
  const [selectedCardHeader, setSelectedCardHeader] = useState("");
  const [defaultCardValue, setDefaultCardValue] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState("");

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <h3 className={classes.targetTitle}>To-Do Tasks</h3>
        <AddTodoSection isEditBtnClicked={isEditBtnClicked} setIsEditBtnClicked={setIsEditBtnClicked} selectedCardHeader={selectedCardHeader} defaultCardValue={defaultCardValue} selectedCardIndex={selectedCardIndex}/>

      </div>
      <div>
          {/* if there is no data in the jsonfile then render the default landing page */}
          {isJsonEmpty && <TodoLandingPage />} 
          <TodoCards setIsJsonEmpty={setIsJsonEmpty} setIsEditBtnClicked={setIsEditBtnClicked} setSelectedCardHeader={setSelectedCardHeader} setDefaultCardValue={setDefaultCardValue} setSelectedCardIndex={setSelectedCardIndex}/>
      </div>
    </div>
    
  );
};


