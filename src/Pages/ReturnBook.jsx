import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ReturnBook = () => {
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [fine, setFine] = useState("")
  const [returnedList, setReturnedList] = useState([])

  const studentUrl = "https://6aa919da2d442cb69d496611.mockapi.io/Students"

  useEffect(() => {
    getStudents()
  }, [])

  let getStudents = async () => {
    let data = await axios.get(studentUrl)
    setStudents(data.data)
  }

  let selectedStudent = students.find((s) => s.id === studentId)

  let handleReturn = async () => {
    if (!studentId || !returnDate) return

    let bookTitle = selectedStudent.Book

    await axios.put(`${studentUrl}/${studentId}`, {
      ...selectedStudent,
      Book: "",
      Date: "",
      Fine: fine ? Number(fine) : 0,
    })

    setReturnedList([
      ...returnedList,
      {
        name: selectedStudent.name,
        book: bookTitle,
        returnDate: returnDate,
        fine: fine ? Number(fine) : 0,
      },
    ])

    setStudentId("")
    setReturnDate("")
    setFine("")
    getStudents()
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Return Book</h2>

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Student</option>
          {students
            .filter((s) => s.Book)
            .map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
        </select>

        {selectedStudent && (
          <div style={styles.detailsBox}>
            <p style={styles.detailText}>Book: {selectedStudent.Book}</p>
            <p style={styles.detailText}>Issue Date: {selectedStudent.Date}</p>
          </div>
        )}

        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Fine"
          value={fine}
          onChange={(e) => setFine(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleReturn} style={styles.button}>Return Book</button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.heading}>Returned Books</h3>
        {returnedList.length === 0 ? (
          <p style={styles.detailText}>No books returned yet.</p>
        ) : (
          returnedList.map((r, index) => (
            <div key={index} style={styles.returnedItem}>
              <p style={styles.detailText}>
                <strong>{r.name}</strong> returned "{r.book}" on {r.returnDate} — Fine: {r.fine}
              </p>
            </div>
          ))
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
    gap: "20px",
    padding: "40px 20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  detailsBox: {
    backgroundColor: "#f7f7f7",
    padding: "10px 12px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
  detailText: {
    margin: "4px 0",
    color: "#555",
    fontSize: "14px",
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
  returnedItem: {
    borderBottom: "1px solid #eee",
    padding: "8px 0",
  },
}

export default ReturnBook