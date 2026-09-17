import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Books = () => {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  const url = "https://6aa919da2d442cb69d496611.mockapi.io/books"

  useEffect(() => {
    getBooks()
  }, [])

  let getBooks = async () => {
    let data = await axios.get(url)
    setBooks(data.data)
  }

  let addBook = async () => {
    let data = await axios.post(url, { title: title, author: author })
    getBooks()
  }

  let editBook = async (id) => {
    let data = await axios.put(`${url}/${id}`, { title: title, author: author })
    getBooks()
  }

  let deleteBook = async (id) => {
    let data = await axios.delete(`${url}/${id}`)
    getBooks()
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Books</h2>

      <div style={styles.form}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={styles.input}
        />
        <button onClick={addBook} style={styles.addButton}>Add Book</button>
      </div>

      <div style={styles.grid}>
        {books.map((b) => (
          <div key={b.id} style={styles.card}>
            <h4 style={styles.bookTitle}>Book Name: {b.title}</h4>
            <h4 style={styles.bookAuthor}>Author Name: {b.author}</h4>
            <div style={styles.cardButtons}>
              <button onClick={() => editBook(b.id)} style={styles.editButton}>Edit</button>
              <button onClick={() => deleteBook(b.id)} style={styles.deleteButton}>Delete</button>
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
  bookTitle: {
    margin: "0 0 8px 0",
    color: "#333",
  },
  bookAuthor: {
    margin: "0 0 12px 0",
    color: "#666",
  },
  cardButtons: {
    display: "flex",
    gap: "10px",
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

export default Books