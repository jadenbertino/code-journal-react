import { useState } from "react"

export function useEntry() {
  const [pending, setPending] = useState(true)

  async function getEntryById(collectionName, id) {
    setPending(true)
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      setPending(false)
      return
    }
    return docSnap.data()
  }

  return { getEntryById, pending }
}