import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Students = () => {
  const [students, setStudents] = useState([])
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [rollNo, setRollNo] = useState("")

  const url = "https://6aa919da2d442cb69d496611.mockapi.io/Students"

  useEffect(() => {
    getStudents()
  }, [])

  let getStudents = async () => {
    let data = await axios.get(url)
    setStudents(data.data)
  }

  let addStudent = async () => {
    let data = await axios.post(url, {
      name: name,
      department: department,
      rollNo: rollNo,
    })
    getStudents()
  }

  let editStudent = async (id) => {
    let data = await axios.put(`${url}/${id}`, {
      name: name,
      department: department,
      rollNo: rollNo,
    })
    getStudents()
  }

  let deleteStudent = async (id) => {
    let data = await axios.delete(`${url}/${id}`)
    getStudents()
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Students</h2>

      <div style={styles.form}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Roll No"
          type="number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          style={styles.input}
        />
        <button onClick={addStudent} style={styles.addButton}>Add Student</button>
      </div>

      <div style={styles.grid}>
        {students.map((s) => (
          <div key={s.id} style={styles.card}>
            <h4 style={styles.name}>Student Name: {s.name}</h4>
            <h4 style={styles.detail}>Department: {s.department}</h4>
            <h4 style={styles.detail}>Roll No: {s.rollNo}</h4>
            <div style={styles.cardButtons}>
              <button onClick={() => editStudent(s.id)} style={styles.editButton}>Edit</button>
              <button onClick={() => deleteStudent(s.id)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: "30px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  addButton: {
    padding: "10px 18px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "18px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  name: {
    margin: "0 0 8px 0",
    color: "#333",
  },
  detail: {
    margin: "0 0 6px 0",
    color: "#666",
    fontWeight: "normal",
  },
  cardButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  editButton: {
    padding: "6px 14px",
    backgroundColor: "#f5a623",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "6px 14px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
}

export default Students