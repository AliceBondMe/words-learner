import { FC } from "react";
import { CircularProgress } from "@mui/material";

import { ProgressBarProps } from "./types";

const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  color1,
  color2,
  thickness1,
  thickness2,
  size,
}) => {
  return (
    <CircularProgress
      variant="determinate"
      value={progress}
      thickness={thickness1}
      size={size}
      sx={{
        borderRadius: "100%",
        boxShadow: `inset 0 0 0px ${thickness2}px ${color2}`,
        color: { color1 },
      }}
    />
  );
};

export default ProgressBar;
