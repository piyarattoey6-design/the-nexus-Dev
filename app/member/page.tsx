"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./member.module.css";

export default function MemberPage() {
  const router = useRouter();

  const [permissions, setPermissions] = useState({
    liveView: true,
    playback: true,
    ptz: true,
  });

  // ตั้งค่าเริ่มต้นเป็นค่าว่าง เพื่อให้กดเลือกซ้ำหรือเลือกตัวแรกแล้วระบบจับการเปลี่ยนแปลงได้
  const [role, setRole] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggle = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // พาเปลี่ยนหน้าตาม Role ที่เลือก
    if (selectedRole === "operator") {
      router.push("/operator");
    } else if (selectedRole === "admin") {
      router.push("/admin");
    } else if (selectedRole === "viewer") {
      router.push("/viewer-setting");
    }
  };

  const handleSave = () => {
    alert("Saved successfully!");
  };

  const handleDeleteClick = () => {
    setPasswordInput("");
    setErrorMessage("");
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const savedPassword = localStorage.getItem("user_password") || "123456";
    if (passwordInput === savedPassword) {
      setShowDeleteModal(false);
      alert("User deleted successfully!");
      router.push("/admin");
    } else {
      setErrorMessage("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
  };

  const countActivePermissions = Object.values(permissions).filter(Boolean).length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => router.back()}
            aria-label="Back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className={styles.title}>Member</h1>
        </header>

        <main className={styles.content}>
          <div className={styles.userCard}>
            <div className={styles.userInfo}>
              <div className={styles.avatar} />
              <div>
                <h2 className={styles.userName}>name</h2>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusText}>online</span>
                </div>
              </div>
            </div>
            <div className={styles.userDetails}>
              <p>Mail : user@gmail.com</p>
              <p>Joined: Nov 20,2026 (via Gmail)</p>
            </div>
          </div>

          {/* Role Section */}
          <div className={styles.roleCard}>
            <span className={styles.roleLabel}>Role</span>
            <div className={styles.selectWrapper}>
              <select
                className={styles.roleSelect}
                value={role}
                onChange={handleRoleChange}
              >
                <option value="" disabled>Select role</option>
                <option value="operator">operator</option>
                <option value="admin">manager</option>
                <option value="viewer">viewer</option>
              </select>
            </div>
          </div>

          <div className={styles.permissionsCard}>
            <div className={styles.permissionsHeader}>
              <h3 className={styles.permissionsTitle}>CCTV Access Permissions</h3>
              <div className={styles.accessCount}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>Access allowed ({countActivePermissions}/3)</span>
              </div>
            </div>

            <div className={styles.permissionItem}>
              <span>1. Live view</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions.liveView}
                  onChange={() => handleToggle("liveView")}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.permissionItem}>
              <span>2. Playback and Download</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions.playback}
                  onChange={() => handleToggle("playback")}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.permissionItem}>
              <span>3. PTZ Control and Mic</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions.ptz}
                  onChange={() => handleToggle("ptz")}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.saveBtn} onClick={handleSave}>
              Save as
            </button>
            <button className={styles.deleteBtn} onClick={handleDeleteClick}>
              Delete User
            </button>
          </div>
        </main>

        {showDeleteModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>ยืนยันการลบผู้ใช้งาน</h3>
              <p>กรุณากรอกรหัสผ่านของคุณเพื่อยืนยันการลบ:</p>
              <input
                type="password"
                placeholder="Enter your password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={styles.modalInput}
              />
              {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
              <div className={styles.modalActions}>
                <button
                  className={styles.cancelModalBtn}
                  onClick={() => setShowDeleteModal(false)}
                >
                  ยกเลิก
                </button>
                <button className={styles.confirmModalBtn} onClick={confirmDelete}>
                  ยืนยันลบ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <nav className={styles.bottomNav}>
          <button className={styles.navItem} aria-label="Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
            </svg>
          </button>
          <button className={styles.navItem} aria-label="Cameras">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 3.7l5 4.5v7.3H7v-7.3l5-4.5z" />
            </svg>
          </button>
          <button className={styles.navItem} aria-label="Notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>
          <button className={`${styles.navItem} ${styles.active}`} aria-label="Profile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}