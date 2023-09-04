import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const PostFiler = () => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errorsServer, setErrorsServer] = useState(null);
  const { token } = useAuth();
  const customHeaders = {
    token: token,
  };

  const axiosConfig = {
    headers: customHeaders,
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

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
    const info = {};

    if (image) {
      info.image = image;
    }

    if (description) {
      info.description = description;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/posts",
        info,
        axiosConfig
      );

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
      setErrorsServer(error.response.data);
    }
  };

  return (

      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        onChange={handleDescription}
        value={description}
      />
      {image && <div>
        <span onClick={()=>{setImage(null)}}>x</span>
        <img src={image} alt="Imagen del post" />
        </div>}
      <input type="file" multiple onChange={handleImage} />
      {errorsServer && errorsServer.mssg}
      <input type="submit" value="Send" />

    </form>
    
      


    
  );
};
