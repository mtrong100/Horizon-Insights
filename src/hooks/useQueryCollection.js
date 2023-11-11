import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../utils/firebase-app";
/* ====================================================== */

const useQueryCollection = (collectionName, fieldName, fieldValue) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!fieldValue || !collectionName || !fieldValue) return;

      try {
        const queryRef = query(
          collection(db, collectionName),
          where(fieldName, "==", fieldValue),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(queryRef);
        const results = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            results.push({ ...data });
          }
        });

        // results.sort((a, b) => b.createdAt - a.createdAt);

        setData(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fieldValue, collectionName, fieldName]);

  return { data, isLoading };
};

export default useQueryCollection;
