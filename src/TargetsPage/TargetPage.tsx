// import { TargetCardSection } from "../components/Cards/TargetCards";
// import { AddTargetSection } from "../components/AddTargetSection";
import classes from "./TargetPage.module.scss";
import { TargetsLandingPage } from "../TargetsLandingPage/TargetsLandingPage";
import { AddTargetSection } from "./AddTargetsSection";
import TargetCards from "../Cards/TargetCards";
import * as fs from "fs";
import React, { useRef, useState, useEffect, createContext } from "react";

// import { useProjectStore } from "stores/projectStore";

export const TargetPage = () => {
  // const [targetCardStore] = useProjectStore();
  
  const [isJsonEmpty, setIsJsonEmpty] = useState<boolean>(true);
  const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(true);
  const [selectedCardHeader, setSelectedCardHeader] = useState("");
  const [defaultCardValue, setDefaultCardValue] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState("");
  console.log(isEditBtnClicked)
  console.log(selectedCardHeader)
  console.log(defaultCardValue)
  console.log(selectedCardIndex);

  // const handleModalStateChange = (newState: boolean | ((prevState: boolean) => boolean)) => {
  //   setModalState(newState);
  // };

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <h3 className={classes.targetTitle}>Project Targets</h3>
        <AddTargetSection isEditBtnClicked={isEditBtnClicked} setIsEditBtnClicked={setIsEditBtnClicked} selectedCardHeader={selectedCardHeader} defaultCardValue={defaultCardValue} selectedCardIndex={selectedCardIndex}/>

      </div>
      <div>
          {/* if there is no data in the jsonfile then render the default landing page */}
          {isJsonEmpty && <TargetsLandingPage />} 
          <TargetCards setIsJsonEmpty={setIsJsonEmpty} setIsEditBtnClicked={setIsEditBtnClicked} setSelectedCardHeader={setSelectedCardHeader} setDefaultCardValue={setDefaultCardValue} setSelectedCardIndex={setSelectedCardIndex}/>
          {/* {isJsonEmpty ? <TargetsLandingPage /> : <TargetCards setIsJsonEmpty={setIsJsonEmpty}/>} */}
      </div>
    </div>
  );
};


