import useSWR from "swr";
import { ResponseData } from "../types";

const fetcher = async (url: string): Promise<ResponseData> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  return res.json();
};

export const useContentStyle = (contentUrl: string) => {
  const { data, error } = useSWR(`/api/font?url=${contentUrl}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    styles: data,
    isLoading: !error && !data,
    isError: error,
  };
};
