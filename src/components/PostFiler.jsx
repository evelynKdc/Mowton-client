import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const PostFiler = () => {
  const [image, setImage] = useState([]);
  const {token } = useAuth();
  const customHeaders = {
    token: token
  };

  const axiosConfig = {
    headers: customHeaders,
  };
  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  // const setFileToBase = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImage(reader.result);
  //   };
  // };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        setImage(reader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8081/api/posts", {
        image,
      }, axiosConfig);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      PostFiler
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleImage} />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
