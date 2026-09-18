import React, { useState, useEffect } from 'react'
import axios from 'axios'

const url = "https://6aa919da2d442cb69d496611.mockapi.io/books"

const Books = () => {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    getBooks()
  }, [])

  let getBooks = async () => {
    let data = await axios.get(url)
    setBooks(data.data)
  }

  let addBook = async () => {
    if (!title || !author) return
    await axios.post(url, { title, author })
    setTitle("")
    setAuthor("")
    getBooks()
  }

  let startEdit = (b) => {
    setEditingId(b.id)
    setTitle(b.title)
    setAuthor(b.author)
  }

  let cancelEdit = () => {
    setEditingId(null)
    setTitle("")
    setAuthor("")
  }

  let updateBook = async () => {
    if (!title || !author) return
    await axios.put(`${url}/${editingId}`, { title, author })
    setEditingId(null)
    setTitle("")
    setAuthor("")
    getBooks()
  }

  let deleteBook = async (id) => {
    await axios.delete(`${url}/${id}`)
    if (editingId === id) cancelEdit()
    getBooks()
  }

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <header style={styles.pageHeader}>
        <div style={styles.eyebrowRow}>
          <span style={styles.eyebrowCode}>012</span>
          <span style={styles.eyebrowText}>Catalog — Books</span>
        </div>
        <h1 style={styles.pageTitle}>Book catalog</h1>
        <p style={styles.pageSubtext}>
          Add new titles to the shelf, or update and retire existing ones.
        </p>
      </header>

      <div style={styles.layout}>
        {/* the form, styled like a library card being filled in */}
        <div style={styles.formCard}>
          <div style={styles.formCardTop}>
            <span style={styles.formCardLabel}>
              {editingId ? "Editing entry" : "Catalog Card"}
            </span>
            <span style={styles.formCardNo}>No. 012</span>
          </div>

          <div style={styles.field}>
            <label style={styles.fieldLabel}>Title</label>
            <input
              placeholder="Book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.fieldLabel}>Author</label>
            <input
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={styles.input}
            />
          </div>

          {editingId ? (
            <div style={styles.buttonRow}>
              <button onClick={updateBook} style={styles.button}>
                Save changes
              </button>
              <button onClick={cancelEdit} style={styles.buttonGhost}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={addBook} style={styles.button}>
              Stamp &amp; add
            </button>
          )}
        </div>

        {/* catalog, as a stack of book cards */}
        <div style={styles.listPanel}>
          <div style={styles.listHeaderRow}>
            <h2 style={styles.listHeading}>On the shelf</h2>
            <span style={styles.listCount}>{books.length}</span>
          </div>

          {books.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>
                No books yet. Added titles will appear here.
              </p>
            </div>
          ) : (
            <div style={styles.cardStack}>
              {books.map((b) => (
                <div key={b.id} style={styles.bookCard}>
                  <div style={styles.bookCardMain}>
                    <div style={styles.bookTitle}>{b.title}</div>
                    <div style={styles.bookAuthor}>{b.author}</div>
                  </div>
                  <div style={styles.cardActions}>
                    <button onClick={() => startEdit(b)} style={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => deleteBook(b.id)} style={styles.deleteButton}>
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
  bookCard: {
    backgroundColor: "#FFFDF7",
    border: "1px solid #E5DCC3",
    borderLeft: "3px solid #A9812C",
    borderRadius: "3px",
    padding: "13px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookCardMain: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  bookTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "15.5px",
    color: "#1F3D2B",
  },
  bookAuthor: {
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

export default Books
