import React, { useState, useEffect } from 'react'
import axios from 'axios'

const studentUrl = "https://6aa919da2d442cb69d496611.mockapi.io/Students"

const ReturnBook = () => {
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [fine, setFine] = useState("")
  const [returnedList, setReturnedList] = useState([])

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

  const eligibleStudents = students.filter((s) => s.Book)

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <header style={styles.pageHeader}>
        <div style={styles.eyebrowRow}>
          <span style={styles.eyebrowCode}>031</span>
          <span style={styles.eyebrowText}>Circulation — Return</span>
        </div>
        <h1 style={styles.pageTitle}>Return a book</h1>
        <p style={styles.pageSubtext}>
          Close out a loan, log the return date, and note any fine owed.
        </p>
      </header>

      <div style={styles.layout}>
        {/* the form, styled like a library card being filled in */}
        <div style={styles.formCard}>
          <div style={styles.formCardTop}>
            <span style={styles.formCardLabel}>Library Card</span>
            <span style={styles.formCardNo}>No. 031</span>
          </div>

          <div style={styles.field}>
            <label style={styles.fieldLabel}>Student</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={styles.input}
            >
              <option value="">Select student</option>
              {eligibleStudents.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {selectedStudent && (
            <div style={styles.detailsBox}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Book</span>
                <span style={styles.detailValue}>{selectedStudent.Book}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Issued</span>
                <span style={styles.detailValue}>{selectedStudent.Date}</span>
              </div>
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.fieldLabel}>Return date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.fieldLabel}>Fine</label>
            <input
              type="number"
              placeholder="0"
              value={fine}
              onChange={(e) => setFine(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={handleReturn} style={styles.button}>
            Stamp &amp; return
          </button>
        </div>

        {/* returned books, as a stack of catalog cards */}
        <div style={styles.listPanel}>
          <div style={styles.listHeaderRow}>
            <h2 style={styles.listHeading}>Returned today</h2>
            <span style={styles.listCount}>{returnedList.length}</span>
          </div>

          {returnedList.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>
                No returns logged yet. Completed returns will appear here.
              </p>
            </div>
          ) : (
            <div style={styles.cardStack}>
              {returnedList.map((r, index) => (
                <div key={index} style={styles.returnedCard}>
                  <div style={styles.returnedCardMain}>
                    <div style={styles.returnedBook}>{r.book}</div>
                    <div style={styles.returnedStudent}>{r.name}</div>
                  </div>
                  <div style={styles.returnedMeta}>
                    <span style={styles.returnedDate}>{r.returnDate}</span>
                    <span style={styles.returnedFine}>
                      {r.fine > 0 ? `Fine: ${r.fine}` : "No fine"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
    padding: "48px 56px",
    boxSizing: "border-box",
  },
  pageHeader: {
    maxWidth: "760px",
    marginBottom: "36px",
  },
  eyebrowRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    marginBottom: "10px",
  },
  eyebrowCode: {
    fontFamily: "'Fraunces', serif",
    fontSize: "13px",
    color: "#A9812C",
  },
  eyebrowText: {
    fontSize: "13px",
    color: "#6B6357",
  },
  pageTitle: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 500,
    fontSize: "32px",
    margin: 0,
    color: "#24211B",
  },
  pageSubtext: {
    color: "#6B6357",
    fontSize: "15px",
    marginTop: "8px",
  },
  layout: {
    display: "flex",
    gap: "32px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  formCard: {
    backgroundColor: "#FFFDF7",
    border: "1px solid #E5DCC3",
    borderTop: "3px solid #A9812C",
    borderRadius: "3px",
    padding: "24px 26px 28px",
    width: "320px",
    flexShrink: 0,
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
  detailsBox: {
    backgroundColor: "#F6F1E4",
    border: "1px dashed #D8CBA3",
    borderRadius: "4px",
    padding: "10px 12px",
    marginBottom: "16px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2px 0",
  },
  detailLabel: {
    fontSize: "12px",
    color: "#6B6357",
  },
  detailValue: {
    fontSize: "13px",
    color: "#1F3D2B",
    fontWeight: 500,
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
  listPanel: {
    flexGrow: 1,
    minWidth: "320px",
  },
  listHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  listHeading: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 500,
    fontSize: "19px",
    margin: 0,
    color: "#24211B",
  },
  listCount: {
    fontSize: "12px",
    color: "#A9812C",
    border: "1px solid #A9812C",
    borderRadius: "20px",
    padding: "1px 9px",
  },
  emptyState: {
    border: "1px dashed #D8CBA3",
    borderRadius: "4px",
    padding: "28px 20px",
    textAlign: "center",
  },
  emptyText: {
    color: "#8A8272",
    fontSize: "14px",
    margin: 0,
  },
  cardStack: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  returnedCard: {
    backgroundColor: "#FFFDF7",
    border: "1px solid #E5DCC3",
    borderLeft: "3px solid #A9812C",
    borderRadius: "3px",
    padding: "13px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  returnedCardMain: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  returnedBook: {
    fontFamily: "'Fraunces', serif",
    fontSize: "15.5px",
    color: "#1F3D2B",
  },
  returnedStudent: {
    fontSize: "13px",
    color: "#6B6357",
  },
  returnedMeta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "3px",
  },
  returnedDate: {
    fontSize: "12.5px",
    color: "#A9812C",
    whiteSpace: "nowrap",
  },
  returnedFine: {
    fontSize: "12px",
    color: "#6B6357",
    whiteSpace: "nowrap",
  },
}

export default ReturnBook
