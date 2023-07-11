import axios from "axios"
// import dotenv from "dotenv"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";

// dotenv.config();
console.log("oiiiiiiiiiiiiiiiiiiiiii")
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

console.log(baseUrl)


export function useSignup() {
  const navigate = useNavigate();

  return async (body) => {
    try {
      const response = await axios.post(`${baseUrl}/sign-up`, body);
      if (response.status === 201) {
        navigate('/');
      } else {
        alert('Erro durante o cadastro. Por favor, tente novamente.');
      }
    } catch (err) {
      alert(err.response.data);
    }
  }
}

export function useSignin() {
  const navigate = useNavigate()
  const { setToken, setUserName } = useContext(AuthContext)

  return (body) => {
    axios.post(`${baseUrl}/login`, body)
      .then(res => {
        setToken(res.data.token)
        setUserName(res.data.userName)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userName", res.data.userName)
        navigate("/home")
      })
      .catch((err) => alert(err.response.data))
  }
}

export function useLogout() {
  const { token, setToken, setUserName } = useContext(AuthContext)
  const navigate = useNavigate()
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return () => {
    axios.post(`${baseUrl}/logout`, {}, config)
      .then(() => {
        setToken(undefined);
        setUserName(undefined);
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => alert(err.response.data));
  }
}