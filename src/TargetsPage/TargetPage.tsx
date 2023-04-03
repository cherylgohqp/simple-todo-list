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

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <h3 className={classes.targetTitle}>Project Targets</h3>
        <AddTargetSection/>

      </div>
      <div>
          {isJsonEmpty && <TargetsLandingPage />}
          <TargetCards setIsJsonEmpty={setIsJsonEmpty}/>
          {/* {isJsonEmpty ? <TargetsLandingPage /> : <TargetCards setIsJsonEmpty={setIsJsonEmpty}/>} */}
      </div>
    </div>
  );
};


