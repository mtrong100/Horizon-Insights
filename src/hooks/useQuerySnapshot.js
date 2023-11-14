import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

const useQuerySnapshot = (collectionName, fieldName, fieldValue) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!collectionName || !fieldName || !fieldValue) return;
      setIsLoading(true);

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
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fieldValue, collectionName, fieldName]);

  return { data, isLoading, setData };
};

export default useQuerySnapshot;
