"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useUrls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const getUrlWithSearchParams = useCallback(
    (url: string) => {
      const params = new URLSearchParams(searchParams.toString());
      return `${url}?${params.toString()}`;
    },
    [searchParams],
  );

  const getDeviceUrl = useCallback(
    (id: string) => getUrlWithSearchParams(`/device/${id}`),
    [getUrlWithSearchParams],
  );

  return {
    searchParams,
    updateSearchParam,
    getUrlWithSearchParams,
    getDeviceUrl,
  };
};

export default useUrls;
