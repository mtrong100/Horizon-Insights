import { formatDistanceToNow } from "date-fns";

export const formateDate = (time) => {
  if (!time) return;
  const createdAtDate = time.toDate();
  const date = formatDistanceToNow(createdAtDate, {
    addSuffix: true,
  });

  return date;
};
