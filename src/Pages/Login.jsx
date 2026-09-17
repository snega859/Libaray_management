import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  let admin = { name: "admin", password: "admin@123" }

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