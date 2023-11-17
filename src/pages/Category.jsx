import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeadingTitle from "../components/HeadingTitle";
import Blog, { BlogSkeleton } from "../modules/Blog";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const Category = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const queryRef = query(
          collection(db, "Blog"),
          where("category", "==", slug),
          orderBy("createdAt", "desc"),
          limit(6)
        );

        const querySnapshot = await getDocs(queryRef);
        const results = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            results.push({ ...data });
          }
        });

        setData(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="page-container">
      <HeadingTitle>Category: #{slug}</HeadingTitle>

      <ul className="md:py-10 py-5 lg:my-5 grid md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5 ">
        {isLoading &&
          Array(6)
            .fill(0)
            .map((item, index) => <BlogSkeleton key={index} />)}

        {!isLoading &&
          data &&
          data.length > 0 &&
          data.map((blog) => <Blog key={blog.id} data={blog} />)}
      </ul>
    </section>
  );
};

export default Category;
