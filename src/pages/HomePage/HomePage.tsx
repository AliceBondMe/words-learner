import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AuthNav } from "../../components";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import home_desc from "../../assets/images/main-desctop.png";
import home_desc_2x from "../../assets/images/main-desctop-2x.png";
import home_mob from "../../assets/images/main-mob.png";
import home_mob_2x from "../../assets/images/main-mob-2x.png";

import styles from "./HomePage.module.css";

const HomePage: FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Expand Your Vocabulary, Expand Your Horizons
      </h1>
      <div className={styles.imageWrap}>
        <picture>
          <source
            srcSet={`${home_desc} 1x, ${home_desc_2x} 2x`}
            media="(min-width: 768px)"
          />
          <source
            srcSet={`${home_mob} 1x, ${home_mob_2x} 2x`}
            media="(max-width: 767px)"
          />
          <img src={home_mob} alt="Student girl studying with laptop" />
        </picture>
      </div>

      {isLoggedIn ? (
        <Link to="/dictionary" className={styles.link}>
          Dive into Your Dictionary!
        </Link>
      ) : (
        <AuthNav />
      )}
    </div>
  );
};

export default HomePage;
