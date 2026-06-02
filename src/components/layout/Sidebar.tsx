"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navItems, siteConfig } from "@/data/site";
import styles from "./sidebar.module.css";

type SidebarProps = {
  onMenuOpen: () => void;
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/projects/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ onMenuOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <header className={styles.headerBar}>
        <div className={styles.logoWrap}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              width={120}
              height={120}
              className={styles.profileImage}
              priority
            />
          </Link>
        </div>
        <button
          type="button"
          className={styles.hamburger}
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
          aria-expanded={false}
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </header>

      <aside className={styles.sidebarInner} aria-label="Site navigation">
        <div className={styles.logoWrap}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              width={400}
              height={400}
              className={styles.profileImage}
              priority
            />
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Primary">
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

        <div className={styles.sidebarSocial}>
          <SocialLinks variant="footer" className={styles.socialLinks} />
        </div>
      </aside>
    </>
  );
}
