import Link from "next/link";
import Logo from "../ui/logo";

const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[var(--header-height)] bg-unifi-neutral-2 text-unifi-text-3">
      <div className="pl-0 container flex items-center gap-x-4 justify-between">
        <div className="flex gap-x-4 items-center">
          <Logo />
          <Link href="/">Devices</Link>
        </div>

        <p>Bruno Segliņš</p>
      </div>
    </header>
  );
};

export default Header;
