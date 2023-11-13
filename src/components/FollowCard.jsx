import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import ButtonFollow from "./buttons/ButtonFollow";

const FollowCard = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* Fetch users */
  useEffect(() => {
    const queryRef = query(
      collection(db, "User"),
      orderBy("createdAt", "desc"),
      limit(6)
    );

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
  }, []);

  const users = data.filter((item) => item.id !== currentUser?.id);

  return (
    <div className="p-5 rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-linear leading-normal">
        Recommended Users
      </h1>
      <ul className="flex flex-col gap-5 mt-5">
        {isLoading && (
          <p className="text-2xl font-bold opacity-50 text-center">
            Loading...
          </p>
        )}

        {!isLoading &&
          users &&
          users.length > 0 &&
          users.map((item) => (
            <UserItem
              key={item.id}
              data={item}
              currentUserId={currentUser?.id}
            />
          ))}
      </ul>
    </div>
  );
};

export default FollowCard;

function UserItem({ data, currentUserId }) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={data?.avatar}
          alt="user-avatar"
          className="img-cover w-[45px] h-[45px] rounded-full"
        />
        <h3 className="font-semibold text-lg">{data?.username}</h3>
      </div>
      <ButtonFollow userId={data?.id} />
    </li>
  );
}
