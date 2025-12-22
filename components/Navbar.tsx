import { NavClientWrapper } from "./nav-wrapper";
import { NavLinks } from "./NavLinks";
import Link from "next/link";

const Navbar = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <NavClientWrapper>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-xl font-bold tracking-tight text-white">
            FlowForge
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-white/50 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <NavLinks />
      </div>
    </NavClientWrapper>
  );
};

export default Navbar;
