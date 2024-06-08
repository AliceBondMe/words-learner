import { FC, useEffect, useState } from "react";

import { NoTasks, ProgressBar, TrainingRoom } from "../../components";

import styles from "./TrainingPage.module.css";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/words/operations";
import { selectTasks } from "../../redux/words/selectors";

const TrainingPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const [numberOfDoneTasks, setNumberOfDoneTasks] = useState(0);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleNumberOfDoneTasks = () => {
    setNumberOfDoneTasks((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      {tasks.length > 0 ? (
        <>
          <div className={styles.progressWrap}>
            <ProgressBar
              progress={Math.round((numberOfDoneTasks / tasks.length) * 100)}
              color1="var(--accent-primary)"
              color2="var(--background-primary)"
              thickness1={4}
              thickness2={4}
              size="44px"
            />
            <span className={styles.wordsNumber}>{tasks?.length}</span>
          </div>

          <TrainingRoom handleNumberOfDoneTasks={handleNumberOfDoneTasks} />
        </>
      ) : (
        <NoTasks />
      )}
    </div>
  );
};

export default TrainingPage;
