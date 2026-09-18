import React, { useState, useEffect } from 'react'
import axios from 'axios'

const url = "https://6aa919da2d442cb69d496611.mockapi.io/Students"

const Students = () => {
  const [students, setStudents] = useState([])
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [rollNo, setRollNo] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    getStudents()
  }, [])

  let getStudents = async () => {
    let data = await axios.get(url)
    setStudents(data.data)
  }

  let addStudent = async () => {
    if (!name || !department || !rollNo) return
    await axios.post(url, { name, department, rollNo })
    setName("")
    setDepartment("")
    setRollNo("")
    getStudents()
  }

  let startEdit = (s) => {
    setEditingId(s.id)
    setName(s.name)
    setDepartment(s.department)
    setRollNo(s.rollNo)
  }

  let cancelEdit = () => {
    setEditingId(null)
    setName("")
    setDepartment("")
    setRollNo("")
  }

  let updateStudent = async () => {
    if (!name || !department || !rollNo) return
    await axios.put(`${url}/${editingId}`, { name, department, rollNo })
    setEditingId(null)
    setName("")
    setDepartment("")
    setRollNo("")
    getStudents()
  }

  let deleteStudent = async (id) => {
    await axios.delete(`${url}/${id}`)
    if (editingId === id) cancelEdit()
    getStudents()
  }

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <header style={styles.pageHeader}>
        <div style={styles.eyebrowRow}>
          <span style={styles.eyebrowCode}>007</span>
          <span style={styles.eyebrowText}>Registry — Students</span>
        </div>
        <h1 style={styles.pageTitle}>Student registry</h1>
        <p style={styles.pageSubtext}>
          Enroll new students, or update and retire existing records.
        </p>
      </header>

      <div style={styles.layout}>
        {/* the form, styled like a library card being filled in */}
        <div style={styles.formCard}>
          <div style={styles.formCardTop}>
            <span style={styles.formCardLabel}>
              {editingId ? "Editing entry" : "Registry Card"}
            </span>
            <span style={styles.formCardNo}>No. 007</span>
          </div>

          <div style={styles.field}>
            <label style={styles.fieldLabel}>Name</label>
            <input
              placeholder="Student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.fieldLabel}>Department</label>
            <input
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.fieldLabel}>Roll no.</label>
            <input
              placeholder="Roll number"
              type="number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              style={styles.input}
            />
          </div>

          {editingId ? (
            <div style={styles.buttonRow}>
              <button onClick={updateStudent} style={styles.button}>
                Save changes
              </button>
              <button onClick={cancelEdit} style={styles.buttonGhost}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={addStudent} style={styles.button}>
              Stamp &amp; enroll
            </button>
          )}
        </div>

        {/* roster, as a stack of student cards */}
        <div style={styles.listPanel}>
          <div style={styles.listHeaderRow}>
            <h2 style={styles.listHeading}>On the roster</h2>
            <span style={styles.listCount}>{students.length}</span>
          </div>

          {students.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>
                No students yet. Enrolled students will appear here.
              </p>
            </div>
          ) : (
            <div style={styles.cardStack}>
              {students.map((s) => (
                <div key={s.id} style={styles.studentCard}>
                  <div style={styles.studentCardMain}>
                    <div style={styles.studentName}>{s.name}</div>
                    <div style={styles.studentMeta}>
                      {s.department} · Roll {s.rollNo}
                    </div>
                  </div>
                  <div style={styles.cardActions}>
                    <button onClick={() => startEdit(s)} style={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => deleteStudent(s.id)} style={styles.deleteButton}>
                      Delete
                    </button>
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
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "6px",
  },
  button: {
    flex: 1,
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
  buttonGhost: {
    flex: 1,
    padding: "12px",
    marginTop: "6px",
    backgroundColor: "transparent",
    color: "#6B6357",
    border: "1px solid #D8CBA3",
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
  studentCard: {
    backgroundColor: "#FFFDF7",
    border: "1px solid #E5DCC3",
    borderLeft: "3px solid #A9812C",
    borderRadius: "3px",
    padding: "13px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  studentCardMain: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  studentName: {
    fontFamily: "'Fraunces', serif",
    fontSize: "15.5px",
    color: "#1F3D2B",
  },
  studentMeta: {
    fontSize: "13px",
    color: "#6B6357",
  },
  cardActions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "6px 14px",
    backgroundColor: "transparent",
    color: "#A9812C",
    border: "1px solid #A9812C",
    borderRadius: "4px",
    fontSize: "12.5px",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  deleteButton: {
    padding: "6px 14px",
    backgroundColor: "transparent",
    color: "#B24B3C",
    border: "1px solid #D9A090",
    borderRadius: "4px",
    fontSize: "12.5px",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
}

export default Students
