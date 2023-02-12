import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/init";
import { collection, onSnapshot, getDocs, query, where } from "firebase/firestore";
export function useCollection(collectionName, _userQuery) {
  const [documents, setDocuments] = useState(null)
  const userQuery = useRef(_userQuery).current

  // One Time fetch, unused but leaving here to see how code works
  // async function getPosts() {
  //   const ref = collection(db, collectionName);
  //   const q = userQuery ? query(ref, where(...userQuery)) : null;
  //   const snapshot = await getDocs(q ? q : ref);
  //   const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  //   setDocuments(docs);
  // }

  useEffect(() => {
    // add listener on mount + anytime collection changes
    let ref = collection(db, collectionName)
    ref = !userQuery ? ref : query(ref, where(...userQuery))
    const unsub = onSnapshot(ref, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id}))
      setDocuments(docs)
    })

    return unsub

  }, [collectionName, userQuery])
  console.log('documents:', documents)

  return { documents }
}