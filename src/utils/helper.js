import { formatDistanceToNow } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const formateDate = (time) => {
  if (!time) return;

  // Convert plain object to Firestore Timestamp
  const timestamp = new Timestamp(time.seconds, time.nanoseconds);

  // Convert Firestore Timestamp to Date
  const createdAtDate = timestamp.toDate();

  const date = formatDistanceToNow(createdAtDate, {
    addSuffix: true,
  });

  return date;
};
