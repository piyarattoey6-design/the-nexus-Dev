"use client";

import { useRouter } from "next/navigation";
import styles from "./success.module.css";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => router.push("/operator")}
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className={styles.title}>Access Granted</h1>
        </header>

        {/* Content */}
        <main className={styles.content}>
          <div className={styles.successIconWrapper}>
            <div className={styles.greenCircle}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <div className={styles.messageContainer}>
            <h2 className={styles.successTitle}>Permission Granted</h2>
            <h2 className={styles.successTitle}>Successfully !</h2>
            <p className={styles.successDesc}>
              You have successfully granted access<br />
              to CCTV camera : Main Entrance
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionLabel}>Camera Details</h3>
            <div className={styles.cameraCard}>
              <div className={styles.cameraIconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d3b66" strokeWidth="2">
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
        </main>

        {/* Footer Button */}
        <div className={styles.footer}>
          <button
            className={styles.backToCameraBtn}
            onClick={() => router.push("/operator")}
          >
            Back to camera
          </button>
        </div>
      </div>
    </div>
  );
}