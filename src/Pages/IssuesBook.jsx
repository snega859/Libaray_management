import React, { useState, useEffect } from 'react'
import axios from 'axios'

const IssuesBook = () => {
  const [students, setStudents] = useState([])
  const [books, setBooks] = useState([])
  const [studentId, setStudentId] = useState("")
  const [bookTitle, setBookTitle] = useState("")
  const [issueDate, setIssueDate] = useState("")

  const studentUrl = "https://6aa919da2d442cb69d496611.mockapi.io/Students"
  const bookUrl = "https://6aa919da2d442cb69d496611.mockapi.io/books"

  useEffect(() => {
    getStudents()
    getBooks()
  }, [])

  let getStudents = async () => {
    let data = await axios.get(studentUrl)
    setStudents(data.data)
  }

  let getBooks = async () => {
    let data = await axios.get(bookUrl)
    setBooks(data.data)
  }

  let handleIssue = async () => {
    if (!studentId || !bookTitle || !issueDate) return

    let student = students.find((s) => s.id === studentId)

    await axios.put(`${studentUrl}/${studentId}`, {
      ...student,
      Book: bookTitle,
      Date: issueDate,
    })

    setStudentId("")
    setBookTitle("")
    setIssueDate("")
    getStudents()
  }

  // only students who currently have a book issued
  const issuedList = students.filter((s) => s.Book)

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Issue Book</h2>

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.title}>{b.title}</option>
          ))}
        </select>

        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleIssue} style={styles.button}>Issue Book</button>
      </div>

      {/* table of currently issued books */}
      <div style={{ ...styles.card, width: "600px", marginTop: "30px" }}>
        <h2 style={styles.heading}>Issued Books</h2>
        {issuedList.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No books issued yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Book</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {issuedList.map((s) => (
                <tr key={s.id}>
                  <td style={styles.td}>{s.name}</td>
                  <td style={styles.td}>{s.Book}</td>
                  <td style={styles.td}>{s.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
    paddingBottom: "40px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "35px 30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "2px solid #ddd",
    color: "#555",
    fontSize: "14px",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  },
}

export default IssuesBook