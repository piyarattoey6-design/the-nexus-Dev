"use client";

import { useRouter } from "next/navigation";
import styles from "./viewer.module.css";

export default function ViewerSettingPage() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* แถบสีน้ำเงินด้านบนสุด */}
        <div className={styles.topBar} />

        {/* ส่วนหัว < Viewer */}
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => router.back()}
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
          <h1 className={styles.title}>Viewer</h1>
        </header>

        <main className={styles.content}>
          {/* การ์ดข้อมูลโปรไฟล์ */}
          <div className={styles.card}>
            <div className={styles.profileInfo}>
              <div className={styles.avatar} />
              <div>
                <h2 className={styles.profileName}>name</h2>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusText}>online</span>
                </div>
              </div>
            </div>
            <div className={styles.profileDetails}>
              <p>Mail : user@gmail.com</p>
              <p>Joined: Nov 20,2026 &nbsp;(via Gmail)</p>
            </div>
          </div>

          {/* การ์ด Roal */}
          <div className={styles.card}>
            <span className={styles.labelTitle}>Roal</span>
            <div className={styles.roleBadge}>viewer</div>
          </div>

          {/* การ์ด ASSIGNED CAMERA */}
          <div className={styles.card}>
            <span className={styles.labelTitleUpper}>ASSIGNED CAMERA</span>
            <div className={styles.cameraCard}>
              <div className={styles.cameraIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="1.8"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <div>
                <h4 className={styles.camName}>Main Entrance</h4>
                <p className={styles.camLocation}>Location : Lobby Level</p>
              </div>
            </div>
          </div>

          {/* กลุ่มปุ่มด้านล่าง */}
          <div className={styles.buttonGroup}>
            <button className={styles.confirmBtn} onClick={() => {}}>
              Confirm Viewer Role
            </button>
            <button className={styles.cancelBtn} onClick={() => router.back()}>
              Cancel Changes
            </button>
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
              onClick={() => router.push("/camera")}
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