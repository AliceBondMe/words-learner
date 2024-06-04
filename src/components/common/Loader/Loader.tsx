import { ColorRing } from "react-loader-spinner";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div>
      <div className={styles.loader}>
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={[
            "var(--accent-primary)",
            "var(--background-primary)",
            "var(--accent-secondary)",
            "var(-background-tertiary)",
            "var(--background-primary)",
          ]}
        />
      </div>
    </div>
  );
};

export default Loader;
