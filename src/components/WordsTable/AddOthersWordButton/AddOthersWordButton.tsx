import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useIsNotMobile } from "../../../hooks/useIsNotMobile";
import { selectOwnWords } from "../../../redux/words/selectors";
import { addOthersWord } from "../../../redux/words/operations";
import { AppDispatch } from "../../../redux/store";

import styles from "./AddOthersWordButton.module.css";
import { Icon } from "../../common";
import { AddOthersWordBtnProps } from "./types";

const AddOthersWordButton: FC<AddOthersWordBtnProps> = ({ wordId, wordEn }) => {
  const { isNotMobile } = useIsNotMobile();
  const dispatch: AppDispatch = useDispatch();
  const { results: ownWords } = useSelector(selectOwnWords);

  const handleAddToDictionary = (id: string) => {
    dispatch(addOthersWord(id));
  };

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Add to dictionary"
      onClick={() => handleAddToDictionary(wordId)}
      disabled={Boolean(ownWords.find(({ en }) => en === wordEn))}
    >
      {isNotMobile && <span>Add to dictionary</span>}
      <Icon
        name="icon-arrow-right"
        width={20}
        height={20}
        stroke="var(--accent-primary)"
      />
    </button>
  );
};

export default AddOthersWordButton;
