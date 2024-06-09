import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

import { AppDispatch } from "../../redux/store";
import { useShowModal } from "../../hooks/useShowModal";
import { useIsNotMobile } from "../../hooks/useIsNotMobile";
import useSnackbar from "../../hooks/useSnackBar";
import { Answer, Task, TrainingRoomProps } from "./types";
import { Icon, Modal, SnackbarMessage } from "../common";
import { selectTasks, selectWordsError } from "../../redux/words/selectors";
import { sendAnswers } from "../../redux/words/operations";
import Results from "../Results/Results";

import styles from "./TrainingRoom.module.css";
import styles2 from "../NoTasks/NoTasks.module.css";

const TrainingRoom: FC<TrainingRoomProps> = ({ handleNumberOfDoneTasks }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectTasks);
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTask, setCurrentTask] = useState<Task>(tasks[currentIndex]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { isShowModal, openModal, closeModal } = useShowModal();
  const { isNotMobile } = useIsNotMobile();
  const wordsError = useSelector(selectWordsError);
  const { snackbarOpen, handleOpenSnackbar, handleCloseSnackbar } =
    useSnackbar();

  useEffect(() => {
    setCurrentTask(tasks[currentIndex]);
  }, [currentIndex, tasks]);

  const validateInput = () => {
    if (inputValue.trim() === "") {
      setValidationError(
        currentTask.task === "en"
          ? "Translation must be entered"
          : "Переклад необхідно ввести"
      );
      return false;
    }
    if (
      currentTask.task === "en" &&
      !inputValue.trim().match(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/)
    ) {
      setValidationError("The translation must contain only English letters");
      return false;
    }
    if (
      currentTask.task === "ua" &&
      !inputValue.trim().match(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u)
    ) {
      setValidationError("Переклад має складатися тільки з українських літер");
      return false;
    }
    setValidationError("");
    return true;
  };

  const createNewAnswer = () => {
    return {
      _id: currentTask._id,
      en: currentTask.task === "en" ? inputValue : (currentTask.en as string),
      ua: currentTask.task === "ua" ? inputValue : (currentTask.ua as string),
      task: currentTask.task,
    };
  };

  const handleNext = () => {
    if (!validateInput()) return;

    const newAnswer = createNewAnswer();
    setAnswers((prev) => [...prev, newAnswer]);

    setInputValue("");

    if (currentIndex < tasks.length - 1) setCurrentIndex((prev) => prev + 1);
    handleNumberOfDoneTasks();
  };

  const handleSubmit = () => {
    if (!validateInput()) return;

    const newAnswer = createNewAnswer();
    const updatedAnswers = [...answers, newAnswer];

    handleNumberOfDoneTasks();

    dispatch(sendAnswers(updatedAnswers)).then((action) => {
      if (action.type === "words/sendAnswers/fulfilled") {
        openModal();
      } else {
        handleOpenSnackbar();
      }
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.block} ${styles.firstBlock}`}>
          <div className={styles.topPart}>
            <div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  currentTask.task === "en"
                    ? "Enter translation"
                    : "Введіть переклад"
                }
                className={styles.input}
              />
              {validationError && (
                <p className={styles.errorMessage}>
                  <MdError size={16} /> {validationError}
                </p>
              )}
            </div>

            {isNotMobile && (
              <p className={styles.languageWrap}>
                <Icon
                  name={currentTask.task === "en" ? "icon-uk" : "icon-ukraine"}
                  width={28}
                  height={28}
                />
                <span className={styles.language}>
                  {currentTask.task === "en" ? "English" : "Ukrainian"}
                </span>
              </p>
            )}
          </div>

          <div className={styles.bottomPart}>
            {currentIndex < tasks.length - 1 && (
              <button className={styles.nextButton} onClick={handleNext}>
                <span className={styles.nextText}>Next</span>
                <Icon
                  name="icon-arrow-right"
                  width={20}
                  height={20}
                  stroke="var(--accent-primary)"
                />
              </button>
            )}

            {!isNotMobile && (
              <p className={styles.languageWrap}>
                <Icon
                  name={currentTask.task === "en" ? "icon-uk" : "icon-ukraine"}
                  width={28}
                  height={28}
                />
                <span className={styles.language}>
                  {currentTask.task === "en" ? "English" : "Ukrainian"}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.topPart}>
            <p className={styles.taskText}>
              {currentTask.task === "en" ? currentTask.ua : currentTask.en}
            </p>

            {isNotMobile && (
              <p className={styles.languageWrap}>
                <Icon
                  name={currentTask.task === "ua" ? "icon-uk" : "icon-ukraine"}
                  width={28}
                  height={28}
                />
                <span className={styles.language}>
                  {currentTask.task === "ua" ? "English" : "Ukrainian"}
                </span>
              </p>
            )}
          </div>

          {!isNotMobile && (
            <p className={styles.languageWrap}>
              <Icon
                name={currentTask.task === "ua" ? "icon-uk" : "icon-ukraine"}
                width={28}
                height={28}
              />
              <span className={styles.language}>
                {currentTask.task === "ua" ? "English" : "Ukrainian"}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className={styles2.linksWrap}>
        <button
          type="submit"
          className={`${styles2.link} ${styles.button}`}
          onClick={handleSubmit}
          disabled={currentIndex < tasks.length - 1}
        >
          Save
        </button>

        <Link to="/dictionary" className={styles2.linkCancel}>
          Cancel
        </Link>
      </div>

      {isShowModal && (
        <Modal
          closeModal={() => {
            closeModal();
            navigate("/dictionary");
          }}
        >
          {<Results />}
        </Modal>
      )}

      {wordsError && (
        <SnackbarMessage
          message={wordsError!.message}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
          severity="error"
        />
      )}
    </>
  );
};

export default TrainingRoom;
