import { FC } from "react";
import classes from "./TargetsLandingPage.module.scss";
import { ReactComponent as TargetFeaturedIcon } from "./targetFeaturedIcon.svg";

type Props = {
  title?: string;
};

export const TargetsLandingPage: FC<Props> = () => {
  return (
    // <div>
      <div className={classes.center}>
        <div className={classes.icon}>
          <TargetFeaturedIcon />
        </div>
        <h5 className={classes.DefinedTargetsHeader}> Defined Targets will show up here. </h5>
        <div className={classes.description}>
          <p>
            Start defining a project target to start your design and compare with building metrics.
          </p>
        </div>
      </div>
    // </div>
  );
};
