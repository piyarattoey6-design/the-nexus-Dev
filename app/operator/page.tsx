"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./operator.module.css";

type CameraItem = {
  id: number;
  name: string;
  location: string;
  active: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
};

export default function OperatorCameraPermissionsPage() {
  const router = useRouter();

  const [permissions, setPermissions] = useState({
    liveView: false,
    playback: false,
    ptz: false,
    download: false,
  });

  const [cameras, setCameras] = useState<CameraItem[]>([
    { id: 1, name: "Camera 01", location: "Main Entrance - PTZ", active: true, canEdit: true },
    { id: 2, name: "Camera 02", location: "Loading Dock - Fixed", active: true, canEdit: true },
    { id: 3, name: "Camera 03", location: "Server Room - Indoor", active: true, canDelete: true },
  ]);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Form States
  const [camName, setCamName] = useState("");
  const [branch, setBranch] = useState("");
  const [rtspUrl, setRtspUrl] = useState("");

  const handleTogglePerm = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleCamera = (id: number) => {
    setCameras((prev) =>
      prev.map((cam) => (cam.id === id ? { ...cam, active: !cam.active } : cam))
    );
  };

  const handleDeleteCamera = (id: number) => {
    setCameras((prev) => prev.filter((cam) => cam.id !== id));
  };

  const handleOpenAddModal = () => {
    setCamName("");
    setBranch("");
    setRtspUrl("");
    setShowAddModal(true);
  };

  const handleAddCameraSubmit = () => {
    if (!camName.trim()) {
      alert("Please enter camera name");
      return;
    }
    const newCam: CameraItem = {
      id: Date.now(),
      name: camName,
      location: rtspUrl ? `${branch || "Branch"} - ${rtspUrl}` : (branch || "Main Entrance - PTZ"),
      active: true,
      canEdit: true,
      canDelete: true,
    };
    setCameras((prev) => [...prev, newCam]);
    setShowAddModal(false);
  };

  const handleOpenEditModal = (cam: CameraItem) => {
    setCurrentEditId(cam.id);
    setCamName(cam.name);
    setBranch(cam.location);
    setShowEditModal(true);
  };

  const handleEditCameraSubmit = () => {
    if (!camName.trim() || currentEditId === null) {
      alert("Please enter camera name");
      return;
    }
    setCameras((prev) =>
      prev.map((cam) =>
        cam.id === currentEditId
          ? { ...cam, name: camName, location: branch ? branch : cam.location }
          : cam
      )
    );
    setShowEditModal(false);
    setCurrentEditId(null);
  };

  const handleSaveChanges = () => {
    router.push("/operator/success");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          {/* เปลี่ยนให้พากลับไปหน้า /member */}
          <button
            className={styles.backBtn}
            onClick={() => router.push("/member")}
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
          <h1 className={styles.title}>Camera Access Permissions</h1>
        </header>

        {/* Content */}
        <main className={styles.content}>
          {/* User Profile Card */}
          <div className={styles.userCard}>
            <div className={styles.userInfoMain}>
              <div className={styles.avatar} />
              <div>
                <h2 className={styles.userName}>Name</h2>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusText}>online</span>
                </div>
              </div>
            </div>
            <div className={styles.userMeta}>
              <p className={styles.metaEmail}>Mail Admin: admin@gmail.com</p>
              <p className={styles.metaRole}>General User</p>
            </div>
          </div>

          {/* Individual Permissions */}
          <h2 className={styles.sectionTitle}>Individual Permissions</h2>
          <div className={styles.permissionsCard}>
            <div className={styles.permissionRow}>
              <span>Live View</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions.liveView}
                  onChange={() => handleTogglePerm("liveView")}
                />
                <span className={styles.slider} />
              </label>
            </div>
            <div className={styles.permissionRow}>
              <span>Playback Access</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions.playback}
                  onChange={() => handleTogglePerm("playback")}
                />
                <span className={styles.slider} />
              </label>
            </div>
            <div className={styles.permissionRow}>
              <span>Camera PTZ control</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions.ptz}
                  onChange={() => handleTogglePerm("ptz")}
                />
                <span className={styles.slider} />
              </label>
            </div>
            <div className={styles.permissionRow}>
              <span>Download Footage</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={permissions.download}
                  onChange={() => handleTogglePerm("download")}
                />
                <span className={styles.slider} />
              </label>
            </div>
          </div>

          {/* Camera List */}
          <h2 className={styles.sectionTitle}>Camera List</h2>
          <div className={styles.cameraListCard}>
            <div className={styles.cameraListHeader}>
              <span className={styles.selectedCount}>
                Selected Cameras ({cameras.filter((c) => c.active).length})
              </span>
              <button className={styles.addCameraBtn} onClick={handleOpenAddModal}>
                +Add Camera
              </button>
            </div>

            <ul className={styles.cameraUl}>
              {cameras.map((cam) => (
                <li key={cam.id} className={styles.cameraLi}>
                  <div className={styles.cameraLeft}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <div>
                      <h4 className={styles.camName}>{cam.name}</h4>
                      <p className={styles.camLocation}>{cam.location}</p>
                    </div>
                  </div>

                  <div className={styles.cameraRight}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={cam.active}
                        onChange={() => handleToggleCamera(cam.id)}
                      />
                      <span className={styles.slider} />
                    </label>

                    {cam.canEdit && (
                      <button
                        className={styles.actionIconBtn}
                        onClick={() => handleOpenEditModal(cam)}
                        aria-label="Edit"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    )}

                    {cam.canDelete && (
                      <button
                        className={styles.actionIconBtn}
                        onClick={() => handleDeleteCamera(cam.id)}
                        aria-label="Delete"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className={styles.buttonGroup}>
            <button className={styles.saveBtn} onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button className={styles.cancelBtn} onClick={() => router.push("/member")}>
              Cancel
            </button>
          </div>
        </main>

        {/* Modal: Add Camera */}
        {showAddModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <div className={styles.modalFieldGroup}>
                <label className={styles.modalLabel}>Camera name</label>
                <input
                  type="text"
                  placeholder="Front entrance"
                  value={camName}
                  onChange={(e) => setCamName(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.modalFieldGroup}>
                <label className={styles.modalLabel}>Branch</label>
                <div className={styles.selectWrapper}>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className={styles.modalSelect}
                  >
                    <option value="" disabled>Select branch</option>
                    <option value="Main Branch">Main Branch</option>
                    <option value="Branch Alpha">Branch Alpha</option>
                    <option value="Branch Beta">Branch Beta</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalFieldGroup}>
                <label className={styles.modalLabel}>IP address/ RTSP URL</label>
                <input
                  type="text"
                  placeholder="Enter numbers or text"
                  value={rtspUrl}
                  onChange={(e) => setRtspUrl(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <button
                className={styles.addCameraSubmitBtn}
                onClick={handleAddCameraSubmit}
              >
                Add camera
              </button>
            </div>
          </div>
        )}

        {/* Modal: Edit Camera */}
        {showEditModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <div className={styles.modalFieldGroup}>
                <label className={styles.modalLabel}>Edit Camera name</label>
                <input
                  type="text"
                  placeholder="Camera name"
                  value={camName}
                  onChange={(e) => setCamName(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.modalFieldGroup}>
                <label className={styles.modalLabel}>Branch / Location</label>
                <input
                  type="text"
                  placeholder="Location"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <button
                className={styles.addCameraSubmitBtn}
                onClick={handleEditCameraSubmit}
              >
                Save camera
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <nav className={styles.bottomNav}>
          <button className={styles.navItem} onClick={() => router.push("/member")} aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
            </svg>
          </button>
          <button className={styles.navItem} onClick={() => router.push("/operator/camera")} aria-label="Building">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
            </svg>
          </button>
          <button className={styles.navItem} aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>
          <button
            className={`${styles.navItem} ${styles.profileNavBtn}`}
            onClick={() => router.push("/member")}
            aria-label="Profile"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}