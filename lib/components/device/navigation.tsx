"use client";

import { Device } from "@/lib/types";
import Button from "../ui/button";
import useUrls from "@/lib/hooks/urls";

interface DeviceNavigationProps {
  previousId?: Device["id"];
  nextId?: Device["id"];
}

const DeviceNavigation = ({ previousId, nextId }: DeviceNavigationProps) => {
  const { getUrlWithSearchParams, getDeviceUrl } = useUrls();

  const backUrl = getUrlWithSearchParams("/");
  const previousUrl = previousId ? getDeviceUrl(previousId) : undefined;
  const nextUrl = nextId ? getDeviceUrl(nextId) : undefined;

  return (
    <div className="container flex justify-between py-4">
      <Button href={backUrl} variant="navigation" icon="chevron-left">
        Back
      </Button>

      <div className="flex gap-x-1">
        <Button
          disabled={!previousId}
          href={previousUrl}
          variant="navigation"
          icon="chevron-left"
        />

        <Button
          disabled={!nextId}
          href={nextUrl}
          variant="navigation"
          icon="chevron-right"
        />
      </div>
    </div>
  );
};

export default DeviceNavigation;
