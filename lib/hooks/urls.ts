"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useUrls = () => {
  const searchParams = useSearchParams();

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

  return { getUrlWithSearchParams, getDeviceUrl };
};

export default useUrls;
