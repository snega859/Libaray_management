import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  let handleLogout = () => {
    navigate("/")
  }

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h3 style={styles.logo}>Library System</h3>
        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => navigate("/books")}>Books</button>
          <button style={styles.navButton} onClick={() => navigate("/students")}>Students</button>
          <button style={styles.navButton} onClick={() => navigate("/issue")}>Issue Book</button>
          <button style={styles.navButton} onClick={() => navigate("/return")}>Return Book</button>
          <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div style={styles.content}>
        <h2 style={styles.heading}>Welcome to Library Dashboard</h2>
        <p style={styles.subtext}>Select an option from the menu above to get started.</p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "15px 30px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  logo: {
    color: "#333",
    margin: 0,
  },
  navLinks: {
    display: "flex",
    gap: "12px",
  },
  navButton: {
    padding: "10px 16px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "10px 16px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "calc(100vh - 70px)",
  },
  heading: {
    color: "#333",
    marginBottom: "10px",
  },
  subtext: {
    color: "#666",
  },
}

export default Dashboard