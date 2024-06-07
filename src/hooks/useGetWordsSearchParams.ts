import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchParams {
  page?: number;
  keyword?: string;
  category?: string;
  isIrregular?: boolean;
}

export const useGetWordsSearchParams = (): SearchParams => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const page = searchParams.get("page");
    const pageParam = page ? Number(page) : undefined;

    const keyword = searchParams.get("keyword");
    const keywordParam = keyword || undefined;

    const category = searchParams.get("category");
    const categoryParam = category || undefined;

    const isIrregular = searchParams.get("isIrregular");
    const isIrregularParam = isIrregular ? isIrregular === "true" : undefined;

    return {
      page: pageParam,
      keyword: keywordParam,
      category: categoryParam,
      isIrregular: isIrregularParam,
    };
  }, [searchParams]);
};
