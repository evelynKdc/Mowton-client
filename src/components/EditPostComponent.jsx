
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
export const EditPostComponent = ({id}) => {
    const [postData, setPostData] = useState({});
    const [image, setImage] = useState(postData.img || "");
  const [description, setDescription] = useState(postData.description ||"");
  const [errorsServer, setErrorsServer] = useState(null);
  const { token } = useAuth();

  const customHeaders = {
    token: token,
  };

  const axiosConfig = {
    headers: customHeaders,
  };



  useEffect(()=>{
        const getPost = async ()=>{
            try {
                const { data } = await axios.get(
                    `http://localhost:8081/api/posts/64f4e7ff87d0ba56298d6e75`,
                    axiosConfig
                  );
                  setPostData(data.post);
     
            } catch (error) {
                setErrorsServer(error.response.data)
            }
          }
       getPost();
    
  }, [id])

  useEffect(() => {
    // Verifica si postData.description tiene un valor antes de establecerlo
    if (postData.description !== undefined) {
      setDescription(postData.description);
    }

    if (postData.img !== undefined) {
        setImage(postData.img);
      }
  }, [postData]);

  
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
    const info = {image};

    console.log(image);

     if (description) {
      info.description = description;
     }

    try {
      const { data } = await axios.put(
        `http://localhost:8081/api/posts/${id}`,
        info,
        axiosConfig
      );

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
      setErrorsServer(error.response.data)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="description"
      value={description}
      onChange={handleDescription}
    />
    <input type="file" onChange={handleImage} />
    {image && <div>
      <span onClick={()=>{setImage(null)}}>x</span>
      <img src={image} alt="Imagen" />
      </div>}
    {postData && (<div>{postData.description}</div>)}
    {errorsServer && errorsServer.mssg}
    <input type="submit" value="Actualizar" />
  </form>
  )
}
