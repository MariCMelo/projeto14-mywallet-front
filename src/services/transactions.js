import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// dotenv.config();
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


export function useGetTransactions() {
    const [transactions, setTransactions] = useState([])
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    const config = { headers: { Authorization: `Bearer ${token}` } }

    function getTransactions() {
        axios.get(`${baseUrl}/transactions`, config)
            .then(res => setTransactions(res.data))
            .catch(err => alert(err.response.data))
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return { transactions, getTransactions }
}

export function useAddTransaction() {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const addTransaction = (body) => {
        axios.post(`${baseUrl}/transactions`, body, config)
            .then(res => navigate("/home"))
            .catch(err => alert(err.response.data))

        return { addTransaction }
    }
}