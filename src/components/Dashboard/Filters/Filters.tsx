import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { selectWordsCategories } from "../../../redux/words/selectors";
import Select from "./Select/Select";
import Input from "./Input/Input";
import VerbTypePicker from "./VerbTypePicker/VerbTypePicker";

import styles from "./Filters.module.css";

const Filters: FC = () => {
  const [searchParams] = useSearchParams();
  const [isVerb, setIsVerb] = useState(false);

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    urlCategory === "verb" ? setIsVerb(true) : setIsVerb(false);
  }, [searchParams]);

  const options = useSelector(selectWordsCategories);

  return (
    <div className={styles.container}>
      <Input />
      {options.length && <Select />}
      {isVerb && <VerbTypePicker />}
    </div>
  );
};

export default Filters;
