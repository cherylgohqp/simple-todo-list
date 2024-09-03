
import classes from "./TargetPage.module.scss";
import { TargetsLandingPage } from "../TargetsLandingPage/TargetsLandingPage";
import { AddTargetSection } from "./AddTargetsSection";
import TodoCards from "../Cards/TodoCards";
import { useState  } from "react";

export const TargetPage = () => {
  
  const [isJsonEmpty, setIsJsonEmpty] = useState<boolean>(true);
  const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);
  const [selectedCardHeader, setSelectedCardHeader] = useState("");
  const [defaultCardValue, setDefaultCardValue] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState("");

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <h3 className={classes.targetTitle}>To-Do Tasks</h3>
        <AddTargetSection isEditBtnClicked={isEditBtnClicked} setIsEditBtnClicked={setIsEditBtnClicked} selectedCardHeader={selectedCardHeader} defaultCardValue={defaultCardValue} selectedCardIndex={selectedCardIndex}/>

      </div>
      <div>
          {/* if there is no data in the jsonfile then render the default landing page */}
          {isJsonEmpty && <TargetsLandingPage />} 
          <TodoCards setIsJsonEmpty={setIsJsonEmpty} setIsEditBtnClicked={setIsEditBtnClicked} setSelectedCardHeader={setSelectedCardHeader} setDefaultCardValue={setDefaultCardValue} setSelectedCardIndex={setSelectedCardIndex}/>
      </div>
      <div className={classes.wombat}>
      <a href="https://www.flaticon.com/free-icons/wombat" title="wombat icons">Wombat icons created by Freepik - Flaticon</a>
      </div>
    </div>
    
  );
};


