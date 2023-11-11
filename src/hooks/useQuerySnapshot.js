import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase-app";

const useQuerySnapshot = (collectionName, fieldName, fieldValue) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!fieldValue || !collectionName || !fieldName) return;

      try {
        const queryRef = query(
          collection(db, collectionName),
          where(fieldName, "==", fieldValue)
        );

        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            setData({ ...data });
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fieldValue, collectionName, fieldName]);

  return { data };
};

export default useQuerySnapshot;
