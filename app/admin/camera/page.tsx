"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./camera.module.css";

type CameraItem = {
  id: number;
  name: string;
  location: string;
  status: "online" | "offline";
};

const INITIAL_CAMERAS: CameraItem[] = [
  { id: 1, name: "Camera Front Gate", location: "Branch Alpha", status: "online" },
  { id: 2, name: "Camera Lobby", location: "Branch Alpha", status: "online" },
  { id: 3, name: "Camera Parking 1", location: "Branch Beta", status: "offline" },
  { id: 4, name: "Camera Stock Room", location: "Branch Beta", status: "online" },
  { id: 5, name: "Camera Back Door", location: "Branch Alpha", status: "offline" },
];

export default function CameraListPage() {
  const router = useRouter();
  const [cameras] = useState<CameraItem[]>(INITIAL_CAMERAS);
  const [query, setQuery] = useState("");

  const filteredCameras = cameras.filter((item) =>
    `${item.name} ${item.location}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => router.back()}
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className={styles.title}>All Branch Cameras</h1>
        </header>

        {/* Content */}
        <main className={styles.content}>
          {/* Search Box */}
          <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="2.5" />
              <path d="M16.5 16.5L21 21" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search camera name or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Camera List */}
          <ul className={styles.list}>
            {filteredCameras.map((item) => (
              <li
                key={item.id}
                className={styles.card}
                onClick={() => router.push("/admin/Camera-Access-Permissions")}
              >
                <div className={styles.cardMain}>
                  <div className={styles.cameraIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 7l-7 5 7 5V7z" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cameraName}>{item.name}</h3>
                    <p className={styles.locationText}>{item.location}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.statusWrapper}>
                    <span
                      className={styles.statusDot}
                      style={{ backgroundColor: item.status === "online" ? "#22c55e" : "#94a3b8" }}
                    />
                    <span
                      className={styles.statusText}
                      style={{ color: item.status === "online" ? "#22c55e" : "#94a3b8" }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <button
                    className={styles.viewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/admin/Camera-Access-Permissions");
                    }}
                  >
                    View Stream
                  </button>
                </div>
              </li>
            ))}

            {filteredCameras.length === 0 && (
              <p className={styles.emptyState}>No cameras found</p>
            )}
          </ul>
        </main>

        {/* Bottom Navigation */}
        <nav className={styles.bottomNav}>
          <button className={styles.navItem} onClick={() => router.push("/admin")} aria-label="Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
            </svg>
          </button>
          <button className={`${styles.navItem} ${styles.active}`} aria-label="Cameras">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 3.7l5 4.5v7.3H7v-7.3l5-4.5z" />
            </svg>
          </button>
          <button className={styles.navItem} aria-label="Notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>
          <button className={styles.navItem} onClick={() => router.push("/admin/all-members")} aria-label="Profile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}