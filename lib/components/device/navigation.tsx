import { Device } from "@/lib/types";
import Button from "../ui/button";

interface DeviceNavigationProps {
  previousId?: Device["id"];
  nextId?: Device["id"];
}

const DeviceNavigation = ({ previousId, nextId }: DeviceNavigationProps) => {
  return (
    <section className="sticky top-0 inset-x-0 z-50 py-4">
      <div className="container flex justify-between">
        <Button href="/" variant="navigation" icon="chevron-left">
          Back
        </Button>

        <div className="flex gap-x-1">
          <Button
            disabled={!previousId}
            href={`/device/${previousId}`}
            variant="navigation"
            icon="chevron-left"
          />

          <Button
            disabled={!nextId}
            href={`/device/${nextId}`}
            variant="navigation"
            icon="chevron-right"
          />
        </div>
      </div>
    </section>
  );
};

export default DeviceNavigation;
