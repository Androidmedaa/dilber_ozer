"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { navItems } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import styles from "./mobile-nav.module.css";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/projects/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className={styles.closeArea}
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <span className={styles.closeButton} />
      </button>

      <nav className={styles.nav}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${
                  isActive(pathname, item.href) ? styles.navLinkActive : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.social}>
        <SocialLinks variant="large" />
      </div>
    </div>
  );
}
