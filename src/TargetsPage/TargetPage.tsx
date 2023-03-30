// import { TargetCardSection } from "../components/Cards/TargetCards";
// import { AddTargetSection } from "../components/AddTargetSection";
import classes from "./TargetPage.module.scss";
import { TargetsLandingPage } from "../TargetsLandingPage/TargetsLandingPage";
import { AddTargetSection } from "./AddTargetsSection";
// import { useProjectStore } from "stores/projectStore";

export const TargetPage = () => {
  // const [targetCardStore] = useProjectStore();

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <h3 className={classes.targetTitle}>Project Targets</h3>
        <AddTargetSection/>
        {/* <AddTargetSection projectId={targetCardStore.selectedProjectId} data={targetCardStore.targets} /> */}
      </div>
      <div>
        {/* {targetCardStore.targets.length > 0 ? ( */}
          {/* <TargetCardSection data={targetCardStore.targets} /> */}
        {/* ) : ( */}
          <TargetsLandingPage />
      {/*read data from json file , key value pair and then pass the args into card to render the card?*/}
      </div>
    </div>
  );
};


