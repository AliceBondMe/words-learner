import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./VerbTypePicker.module.css";

const VerbTypePicker: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isIrregular, setIsIrregular] = useState<"true" | "false" | null>(null);

  useEffect(() => {
    const urlType = searchParams.get("isIrregular");
    if (!urlType) {
      setIsIrregular(null);
    } else {
      urlType === "true" ? setIsIrregular("true") : setIsIrregular("false");
    }
  }, [searchParams]);

  const handleInputChange = (value: "true" | "false") => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("isIrregular", value);
    setSearchParams(params);
    setIsIrregular(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.radioWrap}>
        <input
          className={styles.radio}
          type="radio"
          name="verbType"
          id="regular"
          value="regular"
          checked={isIrregular === "false"}
          onChange={() => handleInputChange("false")}
        />
        <label htmlFor="regular" className={styles.label}>
          Regular
        </label>
      </div>
      <div className={styles.radioWrap}>
        <input
          className={styles.radio}
          type="radio"
          name="verbType"
          id="irregular"
          value="irregular"
          checked={isIrregular === "true"}
          onChange={() => handleInputChange("true")}
        />
        <label htmlFor="irregular" className={styles.label}>
          Irregular
        </label>
      </div>
    </div>
  );
};

export default VerbTypePicker;
