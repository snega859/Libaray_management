import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Books from './Pages/Books'
import Students from './Pages/Students'
import IssuesBook from './Pages/IssuesBook'
import ReturnBook from './Pages/ReturnBook'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/students" element={<Students />} />
        <Route path="/issue" element={<IssuesBook />} />
        <Route path="/return" element={<ReturnBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App