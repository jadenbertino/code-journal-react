import { createContext, useState } from "react"

export const DataContext = createContext()

export function DataContextProvider({ children }) {

  const [dataContext, setDataContext] = useState(null)

  // On mount => import data from localStorage
  const prevData = JSON.parse(localStorage.getItem('dataJSON'))
  setDataContext(prevData || {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
  })

  // Save any changes to data in localStorage
  localStorage.setItem('dataJSON', JSON.stringify(dataContext))

  return (
    <DataContext.Provider value={{ ...dataContext, setDataContext }} >
      { children }
    </DataContext.Provider>
  )
}