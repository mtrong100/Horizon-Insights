import { useState, useEffect } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase-app";
/* ====================================================== */

export default function useFetchBlogType(collectionName, blogType) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!collectionName || !blogType) return;

    const queryRef = query(
      collection(db, collectionName),
      where("type", "==", blogType),
      orderBy("createdAt", "desc")
      // limit(9)
    );

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          ...doc.data(),
        });
      });

      // results.sort((a, b) => b.createdAt - a.createdAt);

      setData(results);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [blogType, collectionName]);

  return { data, isLoading };
}
