import React, { useEffect, useState } from "react"
import Home from "./Home"
import CategorySelection from "./CategorySelection"
import NewEntry from "./NewEntry"
import { BrowserRouter, Routes, Route, useParams, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import ShowEntry from "./ShowEntry"

// const seedEntries = [
//   { category: "Food", content: "Pizza is yummy!" },
//   { category: "Coding", content: "Coding is fun!" },
//   { category: "Gaming", content: "Skyrim is for the Nords!" },
// ]

const App = () => {
  const nav = useNavigate()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    // IIFE
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}/entries`)
      const data = await res.json()
      setEntries(data)
    })()
    // getEntries()
  }, [])

  // HOC (higher-order component)
  function ShowEntryWrapper() {
    const { id } = useParams()
    return <ShowEntry entry={entries[id]} />
  }

  async function addEntry(category, content) {
    const id = entries.length
    // Add a new entry
    const returnedEntry = await fetch(`${import.meta.env.VITE_API_HOST}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, content }),
    })
    setEntries([...entries, await returnedEntry.json()])
    nav(`/entry/${id}`)
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home entries={entries} />} />
        <Route path="/category" element={<CategorySelection />} />
        <Route path="/entry">
          <Route path=":id" element={<ShowEntryWrapper />} />
          <Route path="new/:category" element={<NewEntry addEntry={addEntry} />} />
        </Route>
        <Route path="*" element={<h3>Page not found</h3>} />
      </Routes>
    </>
  )
}

export default App