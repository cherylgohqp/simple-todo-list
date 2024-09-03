import classes from "./TodoLandingPage.module.scss";
import { ReactComponent as TargetFeaturedIcon } from "./targetFeaturedIcon.svg";

type Props = {
  title?: string;
};

export const TodoLandingPage = ({ title }: Props) => {
  return (
      <div className={classes.center}>
        <div className={classes.icon}>
          <TargetFeaturedIcon />
        </div>
        <h5 className={classes.DefinedTargetsHeader}> Your To-Dos will show up here. </h5>
        <div className={classes.description}>
          <p>
            Start adding a task to kick start your productivity!
          </p>
        </div>
      </div>
  );
};
