import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Icon } from "../../../common";
import debounce from "lodash.debounce";

import styles from "./Input.module.css";

const Input: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const urlKeyword = searchParams.get("keyword");
    !urlKeyword ? setKeyword("") : setKeyword(urlKeyword);
  }, [searchParams]);

  const debouncedSetSearchParams = useMemo(
    () =>
      debounce((inputValue: string) => {
        const params = new URLSearchParams(searchParams);
        if (inputValue) {
          params.set("keyword", inputValue);
        } else {
          params.delete("keyword");
        }
        params.set("page", "1");
        setSearchParams(params);
      }, 300),
    [searchParams, setSearchParams]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    setKeyword(inputValue);
    debouncedSetSearchParams(inputValue);
  };

  return (
    <div className={styles.inputWrap}>
      <input
        value={keyword}
        type="text"
        placeholder="Find the word"
        onChange={handleInputChange}
        className={styles.input}
      />
      <Icon
        name="icon-search"
        width={20}
        height={20}
        fill="transparent"
        stroke="var(--text-primary)"
      />
    </div>
  );
};

export default Input;
