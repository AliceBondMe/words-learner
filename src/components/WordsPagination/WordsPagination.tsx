import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";

import { WordsPaginationProps } from "./types";

const WordsPagination: FC<WordsPaginationProps> = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlPage = searchParams.get("page");
    if (!urlPage) return;
    setCurrentPage(Number(urlPage));
  }, [searchParams]);

  const handlePageClick = (event: ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setCurrentPage(value);
    setSearchParams({ page: String(value) });
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageClick}
      color={"primary"}
      showFirstButton
      showLastButton
      sx={{
        "& .MuiPaginationItem-root": {
          width: "33px",
          height: "33px",
          padding: "10px",
          color: "var(--text-primary)",
          backgroundColor: "transparent",
          fontFamily: "inherit",
          fontSize: "13px",
          fontWeight: "600",
          lineHeight: 1,
          borderRadius: "8px",
          border: "1px solid var(--border)",
        },
        "& .Mui-selected": {
          backgroundColor: "var(--accent-primary) !important",
          color: "var(--text-contrast)",
          border: "none",
        },
        "& .MuiPaginationItem-ellipsis": {
          backgroundColor: "transparent",
          color: "inherit",
          fontSize: "13px",
          fontWeight: "600",
        },
      }}
    />
  );
};

export default WordsPagination;
