import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  let admin = { name: "admin", password: "admin@123" }
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const admin = { name: "admin", password: "admin@123" }

const Login = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  let handleLogin = () => {
    if (name === admin.name && password === admin.password) {
      setError("")
      navigate("/dashboard")
    } else {
      setError("Enter a valid username and password.")
    }
  }

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <div style={styles.formCard}>
        <div style={styles.formCardTop}>
          <span style={styles.formCardLabel}>Library Card</span>
          <span style={styles.formCardNo}>No. 001</span>
        </div>

        <h1 style={styles.pageTitle}>Sign in</h1>
        <p style={styles.pageSubtext}>Staff access to the library system.</p>

        <div style={styles.field}>
          <label style={styles.fieldLabel}>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.fieldLabel}>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleLogin} style={styles.button}>
          Stamp &amp; sign in
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F6F1E4",
    fontFamily: "'Inter', sans-serif",
    color: "#24211B",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    boxSizing: "border-box",
  },
  formCard: {
    backgroundColor: "#FFFDF7",
    border: "1px solid #E5DCC3",
    borderTop: "3px solid #A9812C",
    borderRadius: "3px",
    padding: "24px 26px 28px",
    width: "320px",
    boxShadow: "0 6px 16px rgba(31, 61, 43, 0.08)",
  },
  formCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderBottom: "1px dashed #D8CBA3",
    paddingBottom: "14px",
    marginBottom: "18px",
  },
  formCardLabel: {
    fontFamily: "'Fraunces', serif",
    fontSize: "15px",
    color: "#1F3D2B",
  },
  formCardNo: {
    fontSize: "12px",
    color: "#A9812C",
  },
  pageTitle: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 500,
    fontSize: "24px",
    margin: 0,
    color: "#24211B",
  },
  pageSubtext: {
    color: "#6B6357",
    fontSize: "13.5px",
    marginTop: "6px",
    marginBottom: "22px",
  },
  field: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
  },
  fieldLabel: {
    fontSize: "12px",
    color: "#6B6357",
    marginBottom: "6px",
  },
  input: {
    padding: "10px 11px",
    border: "1px solid #D8CBA3",
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#FFFEFA",
    color: "#24211B",
    fontFamily: "'Inter', sans-serif",
  },
  error: {
    color: "#B24B3C",
    fontSize: "13px",
    marginTop: "-6px",
    marginBottom: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    backgroundColor: "#1F3D2B",
    color: "#F6F1E4",
    border: "none",
    borderRadius: "4px",
    fontSize: "14.5px",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
}

export default Login
  let handleLogin = () => {
    if (name === admin.name && password === admin.password) {
      navigate("/dashboard")
    } else {
      alert("enter the valid email and password")
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Library Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>Login</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "15px",
    cursor: "pointer",
  },
}

export default Login
