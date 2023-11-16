import React, { useEffect, useState } from "react";
import Blog, { BlogSkeleton } from "../modules/Blog";
import useOnchange from "../hooks/useOnchange";
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import Button from "../components/buttons/Button";
import SearchBox from "../components/SearchBox";

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
        <SearchBox value={value} onChange={handleChange} />

        <div
          onClick={() => (sort === "desc" ? setSort("asc") : setSort("desc"))}
          className="bg-buttonColor text-buttonText cursor-pointer  gap-1 py-2 w-[120px] hover:opacity-90 justify-center flex items-center rounded-full"
        >
          <p className="capitalize font-semibold text-lg">
            {sort === "desc" ? "Recent" : "Older"}
          </p>
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
