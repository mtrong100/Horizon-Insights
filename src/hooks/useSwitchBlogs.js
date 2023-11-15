import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

const useSwitchBlogs = (currentUserId) => {
  const [selected, setSelected] = useState("Blog");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!currentUserId) return;
      setIsLoading(true);

      try {
        let queryColRef;

        if (selected === "Blog") {
          queryColRef = query(
            collection(db, "Blog"),
            where("userId", "==", currentUserId),
            orderBy("createdAt", "desc")
          );
        } else {
          queryColRef = query(
            collection(db, "Blog"),
            where("likes", "array-contains", currentUserId),
            orderBy("createdAt", "desc")
          );
        }

        const querySnapshot = await getDocs(queryColRef);
        const results = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            results.push({ ...data });
          }
        });

        setBlogs(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [currentUserId, selected]);

  return { selected, setSelected, blogs, isLoading };
};

export default useSwitchBlogs;
