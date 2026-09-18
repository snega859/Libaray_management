import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const studentUrl = "https://6aa919da2d442cb69d496611.mockapi.io/Students"
const bookUrl = "https://6aa919da2d442cb69d496611.mockapi.io/books"

const navItems = [
  { code: "000", label: "Dashboard", path: "/dashboard" },
  { code: "020", label: "Books", path: "/books" },
  { code: "370", label: "Students", path: "/students" },
  { code: "025", label: "Issue Book", path: "/issue" },
  { code: "025.6", label: "Return Book", path: "/return" },
]

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [totalBooks, setTotalBooks] = useState(null)
  const [totalStudents, setTotalStudents] = useState(null)
  const [issuedCount, setIssuedCount] = useState(null)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [studentsRes, booksRes] = await Promise.all([
        axios.get(studentUrl),
        axios.get(bookUrl),
      ])
      const students = studentsRes.data
      const books = booksRes.data
      setTotalStudents(students.length)
      setTotalBooks(books.length)
      setIssuedCount(students.filter((s) => s.Book).length)
    } catch (err) {
      setTotalStudents(0)
      setTotalBooks(0)
      setIssuedCount(0)
    }
  }

  const handleLogout = () => navigate("/")

  const available =
    totalBooks !== null && issuedCount !== null
      ? Math.max(totalBooks - issuedCount, 0)
      : null

  const stats = [
    { label: "Total books", value: totalBooks, code: "020" },
    { label: "Total students", value: totalStudents, code: "370" },
    { label: "Currently issued", value: issuedCount, code: "025", featured: true },
    { label: "Available copies", value: available, code: "021" },
  ]

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <aside style={styles.sidebar}>
        <div style={styles.brandBlock}>
          <div style={styles.brandMark}>LS</div>
          <div>
            <div style={styles.brandTitle}>Library System</div>
            <div style={styles.brandSub}>Circulation desk</div>
          </div>
        </div>

        <div style={styles.drawerRule} />

        <nav style={styles.nav}>
          {navItems.map((item) => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  ...styles.navItem,
                  ...(active ? styles.navItemActive : {}),
                }}
              >
                <span style={styles.navCode}>{item.code}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <button style={styles.logoutButton} onClick={handleLogout}>
          Log out
        </button>
      </aside>

      <main style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.heading}>Good to see you at the desk</h1>
          <p style={styles.subtext}>
            Here's what's moving through circulation today.
          </p>
        </header>

        <section style={styles.statGrid}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                ...styles.statCard,
                ...(s.featured ? styles.statCardFeatured : {}),
              }}
            >
              <div style={styles.statCode}>{s.code}</div>
              <div style={styles.statValue}>
                {s.value === null ? "—" : s.value}
              </div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </section>

        <section style={styles.actionsRow}>
          <button style={styles.actionButton} onClick={() => navigate("/issue")}>
            Issue a book
          </button>
          <button
            style={{ ...styles.actionButton, ...styles.actionButtonGhost }}
            onClick={() => navigate("/return")}
          >
            Return a book
          </button>
        </section>
      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#F6F1E4",
    fontFamily: "'Inter', sans-serif",
    color: "#24211B",
  },
  sidebar: {
    width: "240px",
    flexShrink: 0,
    backgroundColor: "#1F3D2B",
    display: "flex",
    flexDirection: "column",
    padding: "28px 20px",
    boxSizing: "border-box",
  },
  brandBlock: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 4px",
  },
  brandMark: {
    width: "36px",
    height: "36px",
    borderRadius: "4px",
    border: "1px solid #A9812C",
    color: "#E9DCB8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Fraunces', serif",
    fontSize: "15px",
    flexShrink: 0,
  },
  brandTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "17px",
    color: "#F6F1E4",
    lineHeight: 1.2,
  },
  brandSub: {
    fontSize: "12px",
    color: "#9CB0A2",
    marginTop: "2px",
  },
  drawerRule: {
    height: "1px",
    backgroundColor: "#3A5C46",
    margin: "24px 4px 18px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flexGrow: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    padding: "10px 12px",
    background: "none",
    border: "none",
    borderRadius: "5px",
    color: "#D9E3DC",
    fontSize: "14.5px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  navItemActive: {
    backgroundColor: "#2B4E3A",
    color: "#FFFFFF",
  },
  navCode: {
    fontFamily: "'Fraunces', serif",
    fontSize: "12.5px",
    color: "#A9812C",
    width: "34px",
    flexShrink: 0,
  },
  logoutButton: {
    marginTop: "16px",
    padding: "10px 12px",
    backgroundColor: "transparent",
    border: "1px solid #3A5C46",
    borderRadius: "5px",
    color: "#D9E3DC",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  content: {
    flexGrow: 1,
    padding: "48px 56px",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: "36px",
  },
  heading: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 500,
    fontSize: "32px",
    color: "#24211B",
    margin: 0,
  },
  subtext: {
    color: "#6B6357",
    fontSize: "15px",
    marginTop: "8px",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: {
    backgroundColor: "#FFFDF7",
    border: "1px solid #E5DCC3",
    borderTop: "3px solid #A9812C",
    borderRadius: "3px",
    padding: "20px 18px",
    position: "relative",
  },
  statCardFeatured: {
    transform: "rotate(-1.2deg)",
    boxShadow: "0 6px 16px rgba(31, 61, 43, 0.12)",
  },
  statCode: {
    fontFamily: "'Fraunces', serif",
    fontSize: "12px",
    color: "#A9812C",
    marginBottom: "14px",
  },
  statValue: {
    fontFamily: "'Fraunces', serif",
    fontSize: "34px",
    color: "#1F3D2B",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "13px",
    color: "#6B6357",
    marginTop: "8px",
  },
  actionsRow: {
    display: "flex",
    gap: "14px",
  },
  actionButton: {
    padding: "13px 22px",
    backgroundColor: "#1F3D2B",
    color: "#F6F1E4",
    border: "none",
    borderRadius: "4px",
    fontSize: "14.5px",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  actionButtonGhost: {
    backgroundColor: "transparent",
    color: "#1F3D2B",
    border: "1px solid #1F3D2B",
  },
}

export default Dashboard
