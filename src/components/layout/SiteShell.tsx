"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { BackToTop } from "@/components/ui/BackToTop";
import { SiteFooter } from "./SiteFooter";
import styles from "./layout.module.css";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <div className={styles.sidebar}>
          <Sidebar onMenuOpen={() => setMobileOpen(true)} />
        </div>
        <div className={styles.main}>
          <div className={styles.mainColumn}>
            <div className={styles.mainInner}>{children}</div>
            <SiteFooter />
          </div>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <BackToTop />
    </div>
  );
}
