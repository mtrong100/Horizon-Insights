import React, { useEffect, useState } from "react";
import Blog, { BlogSkeleton } from "../modules/Blog";
import useOnchange from "../hooks/useOnchange";
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { HiOutlineSwitchVertical } from "react-icons/hi";

const Explore = () => {
  const { value, handleChange } = useOnchange();
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("desc");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const queryRef = query(collection(db, "Blog"), orderBy("createdAt", sort));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          ...doc.data(),
        });
      });
      setData(results);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [sort]);

  const filteredBlogs = data.filter((item) =>
    item.title.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <section className="page-container py-5">
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search your blog..."
          className="p-3 outline-none rounded-md max-w-lg border w-full bg-transparent border-gray-400 focus:border-blue-400"
        />

        <div
          onClick={() => (sort === "desc" ? setSort("asc") : setSort("desc"))}
          className="border bg-blue-500 text-white cursor-pointer  gap-1 py-2 w-[110px] hover:bg-blue-600 justify-center flex items-center rounded-full"
        >
          <p className="capitalize font-semibold text-lg">{sort}</p>
          <span>
            <HiOutlineSwitchVertical size={22} />
          </span>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-2 my-5">
        {isLoading &&
          Array(6)
            .fill(0)
            .map((item, index) => <BlogSkeleton key={index} />)}

        {!isLoading &&
          filteredBlogs &&
          filteredBlogs.length > 0 &&
          filteredBlogs.map((blog) => <Blog key={blog.id} data={blog} />)}
      </ul>
    </section>
  );
};

export default Explore;
