import { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { MdError } from "react-icons/md";
import { IoChevronDownSharp } from "react-icons/io5";

import { AppDispatch } from "../../redux/store";
import { validationSchemaAddWord } from "./validationSchema";
import { AddWordFormProps, WordData } from "./types";
import { selectWordsCategories } from "../../redux/words/selectors";
import { Icon } from "../common";
import { addNewWord } from "../../redux/words/operations";
import { useSearchParams } from "react-router-dom";

import styles from "./AddWordForm.module.css";

const AddWordForm: FC<AddWordFormProps> = ({ closeModal }) => {
  const options = useSelector(selectWordsCategories);
  const [isSelectOpen, setSelectIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<WordData>({
    resolver: yupResolver(validationSchemaAddWord),
  });
  const isIrregular = watch("isIrregular");
  const [isShowRadioError, setIsShowRadioError] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  const onSelectChange = (value: string) => {
    setSelectedOption(value);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setSelectIsOpen((prev) => !prev);
  };

  const onSubmit: SubmitHandler<WordData> = async ({
    en,
    ua,
    isIrregular,
  }: WordData) => {
    const newWord: {
      en: string;
      ua: string;
      category: string;
      isIrregular?: boolean;
    } = {
      en,
      ua,
      category: selectedOption,
    };
    if (selectedOption === "verb")
      newWord.isIrregular = isIrregular === "true" ? true : false;

    dispatch(addNewWord(newWord)).then((action) => {
      if (action.type === "words/addNewWord/fulfilled") {
        closeModal();
        setSearchParams({ page: "1" });
      } else {
        alert("Some error occured");
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Add word</h2>
      <p className={styles.instructions}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={
            selectedOption === "verb"
              ? styles.selectWrap
              : `${styles.selectWrap} ${styles.selectWrapOpt}`
          }
        >
          <div
            onClick={toggleDropdown}
            className={
              isSelectOpen
                ? `${styles.select} ${styles.selectActive}`
                : styles.select
            }
          >
            {selectedOption} <IoChevronDownSharp size={20} />
          </div>

          {isSelectOpen && (
            <div className={styles.optionsWrap}>
              {options.map((item) => (
                <div
                  key={nanoid()}
                  data-value={item}
                  onClick={() => onSelectChange(item)}
                  className={styles.option}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedOption === "verb" && (
          <>
            <div
              className={
                !isIrregular
                  ? `${styles.radioBlockWrap} ${styles.radioBlockWrapOpt}`
                  : styles.radioBlockWrap
              }
            >
              <div className={styles.radioGroup}>
                <div className={styles.radioWrap}>
                  <input
                    type="radio"
                    {...register("isIrregular")}
                    value="false"
                    id="regular"
                    className={styles.radio}
                  />
                  <label htmlFor="regular" className={styles.label}>
                    Regular
                  </label>
                </div>
                <div className={styles.radioWrap}>
                  <input
                    type="radio"
                    {...register("isIrregular")}
                    value="true"
                    id="irregular"
                    className={styles.radio}
                  />
                  <label htmlFor="irregular" className={styles.label}>
                    Irregular
                  </label>
                </div>
              </div>

              {isShowRadioError &&
                isIrregular !== "true" &&
                isIrregular !== "false" && (
                  <p className={styles.errorMessage}>
                    <MdError size={16} /> "Verb type must be picked"
                  </p>
                )}
            </div>

            {isIrregular === "true" && (
              <p className={styles.irregularMessage}>
                Such data must be entered in the format "I form-II form-III
                form".
              </p>
            )}
          </>
        )}

        <p className={styles.languageLabel}>
          <Icon name="icon-ukraine" width={28} height={28} />
          <span>Ukrainian</span>
        </p>

        <div className={styles.inputWrap}>
          <input
            {...register("ua")}
            placeholder="Переклад"
            className={styles.input}
          />
          <p className={styles.errorMessage}>
            {errors.ua && <MdError size={16} />} {errors.ua?.message}
          </p>
        </div>

        <p className={styles.languageLabel}>
          <Icon name="icon-uk" width={28} height={28} />
          <span>English</span>
        </p>

        <div className={styles.inputWrap}>
          <input
            {...register("en")}
            placeholder="New word"
            className={styles.input}
          />
          <p className={styles.errorMessage}>
            {errors.en && <MdError size={16} />} {errors.en?.message}
          </p>
        </div>

        <div className={styles.buttonsWrap}>
          <button
            type="submit"
            className={styles.buttonAdd}
            onClick={() => setIsShowRadioError(true)}
          >
            Add
          </button>
          <button
            type="button"
            className={styles.buttonCancel}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWordForm;
