"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./member-approvals.module.css";

type ApprovalItem = {
  id: number;
  name: string;
  email: string;
  requestText: string;
  date: string;
};

export default function MemberApprovalsPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    { id: 1, name: "Name", email: "name@gmail.com", requestText: "Requested to access: add branch cameras", date: "Nov 2, 2026 - 14:30" },
    { id: 2, name: "Name", email: "name@gmail.com", requestText: "Requested to access: add branch cameras", date: "Oct 15, 2026 - 10:00" },
    { id: 3, name: "Name", email: "name@gmail.com", requestText: "Requested to access: add branch cameras", date: "Oct 14, 2026 - 9:30" },
    { id: 4, name: "Name", email: "name@gmail.com", requestText: "Requested to access: add branch cameras", date: "Oct 10, 2026 - 14:30" },
    { id: 5, name: "Name", email: "name@gmail.com", requestText: "Requested to access: add branch cameras", date: "Oct 19, 2026 - 14:30" },
  ]);

  const handleAction = (id: number, actionType: "Reject" | "Approve") => {
    // กรองรายการที่ถูกกดอนุมัติหรือปฏิเสธออก
    setApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredApprovals = approvals.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => router.push("/admin")}
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
          <h1 className={styles.title}>Member Approvals</h1>
        </header>

        {/* Content */}
        <main className={styles.content}>
          {/* Search Bar */}
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <h2 className={styles.sectionTitle}>Approval Approvals</h2>

          {/* List of Approval Cards */}
          <div className={styles.approvalList}>
            {filteredApprovals.map((item, index) => (
              <div 
                key={item.id} 
                className={`${styles.approvalCard} ${index === 2 ? styles.activeCard : ""}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.avatar} />
                  <div className={styles.userInfo}>
                    <h3 className={styles.userName}>{item.name} <span className={styles.userEmail}>/ {item.email}</span></h3>
                    <p className={styles.requestText}>{item.requestText}</p>
                  </div>
                </div>

                <div className={styles.cardBottom}>
                  <span className={styles.dateText}>{item.date}</span>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => handleAction(item.id, "Reject")}
                    >
                      Reject
                    </button>
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleAction(item.id, "Approve")}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredApprovals.length === 0 && (
              <p className={styles.emptyText}>No approval requests found.</p>
            )}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className={styles.bottomNav}>
          <button className={styles.navItem} onClick={() => router.push("/admin")} aria-label="Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
            </svg>
          </button>
          <button className={styles.navItem} onClick={() => router.push("/admin/camera")} aria-label="Cameras">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 3.7l5 4.5v7.3H7v-7.3l5-4.5z" />
            </svg>
          </button>
          <button className={styles.navItem} aria-label="Notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>
          <button className={`${styles.navItem} ${styles.profileNavBtn}`} onClick={() => router.push("/admin/all-members")} aria-label="Profile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}