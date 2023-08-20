import { useState } from "react";
import axios from 'axios';
export const RegisterForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
   const handleChangeName = (e)=>{
    setName(e.target.value)
    
   } 
   const handleChangeEmail = (e)=>{
    setEmail(e.target.value)
    
   }  
   const handleChangePassword = (e)=>{
    setPassword(e.target.value)
    
   }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = {name,email,password}
        try {
            const response = await axios.post('http://localhost:8081/api/users', data);
            console.log('Response:', response.data);
          } catch (error) {
            console.error('Error:', error);
          }

    }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChangeName} value={name}/>
      <input type="email" name="email" onChange={handleChangeEmail} value={email}/>
      <input type="password" name="password" onChange={handleChangePassword} value={password}/>
      <button type="submit" >Registrarse</button>
    </form>
  );
};
