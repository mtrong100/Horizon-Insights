import React from "react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { setFollowPending } from "../../redux/slices/globalSlice";

const ButtonFollow = ({ userId }) => {
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useAuth();
  const isLoading = useSelector((state) => state.global[userId]);

  const handleFollowUser = async () => {
    if (!userId || !currentUser?.id) return;

    dispatch(setFollowPending({ userId, value: true }));

    const followingDocRef = doc(db, "User", currentUser?.id);
    const followersDocRef = doc(db, "User", userId);

    try {
      const [followingDoc, followersDoc] = await Promise.all([
        getDoc(followingDocRef),
        getDoc(followersDocRef),
      ]);

      const isFollowing = (followingDoc.data()?.following || []).includes(
        userId
      );
      const isFollower = (followersDoc.data()?.followers || []).includes(
        currentUser?.id
      );

      const updateFollowing = isFollowing
        ? arrayRemove(userId)
        : arrayUnion(userId);

      const updateFollowers = isFollower
        ? arrayRemove(currentUser?.id)
        : arrayUnion(currentUser?.id);

      await Promise.all([
        updateDoc(followingDocRef, { following: updateFollowing }),
        updateDoc(followersDocRef, { followers: updateFollowers }),
      ]);

      const updatedUserDoc = await getDoc(followingDocRef);
      const updatedUserData = updatedUserDoc.data();
      setCurrentUser(updatedUserData);

      dispatch(setFollowPending({ userId, value: false }));
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      toast.error("Failed!");
      dispatch(setFollowPending({ userId, value: false }));
    }
  };

  return (
    <React.Fragment>
      {currentUser?.following?.some((item) => item === userId) ? (
        <button
          onClick={handleFollowUser}
          className={`py-2 px-4 border font-medium rounded-full border-indigo-500 text-indigo-500 hover:bg-indigo-100 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Following
        </button>
      ) : (
        <button
          onClick={handleFollowUser}
          className={`py-2 px-4 border font-medium rounded-full bg-indigo-500 text-white border-transparent hover:bg-indigo-600 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Follow
        </button>
      )}
    </React.Fragment>
  );
};

export default ButtonFollow;
