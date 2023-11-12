import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
/* <<=============================================================>> */

export default function useUploadPhoto() {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "pictures/" + file.name + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            console.log("bla..");
        }
      },
      (error) => {
        setImage("");
        setProgress(0);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setProgress(0);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleUploadImage(file);
  };

  return {
    image,
    setImage,
    progress,
    handleSelectImage,
  };
}
