import { FC } from "react";

import icons from "/sprite.svg";
import { IconProps } from "./types";

export const Icon: FC<IconProps> = ({ name, ...props }) => {
  return (
    <svg {...props}>
      <use xlinkHref={`${icons}#${name}`} />
    </svg>
  );
};
