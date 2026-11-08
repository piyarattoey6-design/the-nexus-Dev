"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBuilding, FaBell, FaUser } from "react-icons/fa";

const items = [
  { href: "/admin", icon: FaHome, label: "Home" },
  { href: "/admin/camera", icon: FaBuilding, label: "Branch" },
  { href: "/notifications", icon: FaBell, label: "Notifications" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="navbar">
      <div className="navbar-pill">
        {items.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} aria-label={label}
                className={isActive(href) ? "nav-item active" : "nav-item"}>
            <Icon />
          </Link>
        ))}
      </div>
      <Link href="/member" aria-label="Profile"
            className={isActive("/member") ? "nav-profile active" : "nav-profile"}>
        <FaUser />
      </Link>
    </nav>
  );
}