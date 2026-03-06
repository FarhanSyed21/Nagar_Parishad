import { useState } from "react";
import api from "../Services/Api";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await api.post("/auth/login",{
        username,
        password
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      navigate("/dashboard");

    } catch (error) {

      setError("Invalid username or password");

    }

  }

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh"
    }}>

      <div style={{width:"300px"}}>

        <h2>Login</h2>

        {error && <p style={{color:"red"}}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>

  )
}