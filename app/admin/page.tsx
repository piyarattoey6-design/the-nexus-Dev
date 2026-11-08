"use client";

import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function ManagerPage() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* แถบสีน้ำเงินด้านบนสุด */}
        <div className={styles.topBar} />

        {/* ส่วนหัว < Manager (กดย้อนกลับไปหน้า /member) */}
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => router.push("/member")}
            aria-label="Back"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="#0f346c"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className={styles.title}>Manager</h1>
        </header>

        <main className={styles.content}>
          {/* การ์ดโปรไฟล์ Main Barnch */}
          <div className={styles.card}>
            <div className={styles.profileInfo}>
              <div className={styles.avatar} />
              <div>
                <h2 className={styles.profileName}>Main Barnch</h2>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusText}>online</span>
                </div>
              </div>
            </div>
            <div className={styles.profileDetails}>
              <p>Mail Admin: admin@gmail.com</p>
              <p>Created :Nov 20,2026 (via Gmail)</p>
            </div>
          </div>

          {/* ส่วนหัวกล่องฟ้า Barnch Infomation */}
          <div className={styles.sectionWrapper}>
            <div className={styles.sectionHeader}>Barnch Infomation</div>
            <div className={styles.sectionBody}>
              <div
                className={styles.menuItem}
                onClick={() => router.push("/admin/camera")}
              >
                <span>All Branch cameras</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
              <div
                className={styles.menuItem}
                onClick={() => router.push("/admin/all-members")}
              >
                <span>All Members</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
              <div
                className={styles.menuItem}
                onClick={() => router.push("/admin/member-approvals")}
              >
                <span>Member Approvals</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation Bar + ปุ่มโปรไฟล์วงกลมด้านขวา */}
        <div className={styles.navContainer}>
          <nav className={styles.bottomNav}>
            <button
              className={styles.navItem}
              onClick={() => router.push("/")}
              aria-label="Home"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
              </svg>
            </button>
            <button
              className={styles.navItem}
              onClick={() => router.push("/admin/camera")}
              aria-label="Building"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
              </svg>
            </button>
            <button className={styles.navItem} aria-label="Notifications">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </button>
          </nav>

          <button className={styles.profileCircleBtn} aria-label="Profile">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}