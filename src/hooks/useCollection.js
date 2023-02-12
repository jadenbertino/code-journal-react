import { useEffect, useState } from "react";
import { db } from "../firebase/init";
import { collection, onSnapshot, getDocs, query, where } from "firebase/firestore";

export function useCollection(collectionName, userQuery) {
  const [documents, setDocuments] = useState(null)

  async function getPosts() {
    const ref = collection(db, collectionName);
    const q = userQuery ? query(ref, where(...userQuery)) : null;
    const snapshot = await getDocs(q ? q : ref);
    const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setDocuments(docs);
  }

  useEffect(() => {
    getPosts()
    // add listener on mount + anytime collection changes
    
    // const unsub = onSnapshot(ref, (snapshot) => {
    //   const docs = getDocs(snapshot)
    //   const results = docs.map(doc => ({ ...doc.data(), id: doc.id}))
    //   setDocuments(results)
    // })

    // return () => unsub()

  }, [collectionName])
  console.log('documents:', documents)

  return { documents }
}