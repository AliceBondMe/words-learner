import { FC } from "react";

import auth_desc from "../../assets/images/home-desctop.png";
import auth_desc_2x from "../../assets/images/home-desctop-2x.png";
import auth_mob from "../../assets/images/home.png";
import auth_mob_2x from "../../assets/images/home-2x.png";

import styles from "./AuthPicture.module.css";
import { useIsTablet } from "../../hooks/useIsTablet";

export const AuthPicture: FC = () => {
  const { isTablet } = useIsTablet();

  return (
    <>
      {!isTablet && (
        <div className={styles.imageContainer}>
          <picture>
            <source
              srcSet={`${auth_desc} 1x, ${auth_desc_2x} 2x`}
              media="(min-width: 1440px)"
            />
            <source
              srcSet={`${auth_mob} 1x, ${auth_mob_2x} 2x`}
              media="(max-width: 767px)"
            />
            <img src={auth_mob} alt="Students reading" />
          </picture>
        </div>
      )}
    </>
  );
};
