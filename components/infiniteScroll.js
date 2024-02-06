import useSWRInfinite from "swr/infinite";
import "dotenv/config";

export const usePagination = (url) => {
  const PageSize = 12;
  const getKey = (pageIndex, previousPageData) => {
    const apiKey = process.env.API_KEY;
    pageIndex = pageIndex + 1;
    if (previousPageData && !previousPageData.length) return null; //reached the end
    return `${url}client_id=${apiKey}&per_page=${PageSize}&page=${pageIndex}`;
  };

  const fetcher = (URL) => fetch(URL).then((res) => res.json());
  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );
  const imgArr = data?.flat();
  const isReachEnd = data && data[data.length - 1]?.length < PageSize; // got last batch of data
  const loadingMore = data && typeof data[size - 1] === "undefined";

  if (error) return <h1>圖片載入失敗</h1>;
  if (isLoading) return <h1>載入中......</h1>;
  if (!imgArr) return null;

  return {
    imgArr,
    isReachEnd,
    loadingMore,
    error,
    isLoading,
    size,
    setSize,
    mutate,
  };
};
