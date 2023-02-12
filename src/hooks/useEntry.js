import { db } from "../firebase/init"
import { doc, getDoc } from "firebase/firestore"

import { useState } from "react"

export function useEntry() {
  const [pending, setPending] = useState(true)
  const [error, setError] = useState(false)

  async function getEntryById(collectionName, id) {
    setError(false)
    setPending(true)
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      setPending(false)
      setError(true)
      return
    }
    return docSnap.data()
  }

  return { getEntryById, pending, error }
}