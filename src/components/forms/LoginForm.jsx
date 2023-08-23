import { useState } from "react";


export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    } 
    const handleChangePassword = (e)=>{
        setPassword(e.target.value)
    }    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            email, 
            password
        }
        console.log(data);
    } 
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name='email' onChange={handleChangeEmail} value={email}/>
            <input type="password" name="password" onChange={handleChangePassword} value={password} />
            <button type="submit" >Iniciar Sesion</button>
        </form>
    </div>
  )
}
