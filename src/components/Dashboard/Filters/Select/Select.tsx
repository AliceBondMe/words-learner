import { FC, useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { IoChevronDownSharp } from "react-icons/io5";

import { selectWordsCategories } from "../../../../redux/words/selectors";

import styles from "./Select.module.css";

const Select: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const options = useSelector(selectWordsCategories);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Categories");

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    !urlCategory
      ? setSelectedOption("Categories")
      : setSelectedOption(urlCategory);
  }, [searchParams, options]);

  const onSelectChange = (value: string) => {
    setSelectedOption(value);
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    params.delete("isIrregular");
    params.set("page", "1");
    setSearchParams(params);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
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
          isOpen ? `${styles.select} ${styles.selectActive}` : styles.select
        }
      >
        {selectedOption} <IoChevronDownSharp size={20} />
      </div>

      {isOpen && (
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
  );
};

export default Select;
