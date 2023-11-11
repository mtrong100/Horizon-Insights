import { useState } from "react";

export default function useOnchange() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return { value, handleChange, setValue };
}
