import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useLogout } from "../services/auth"
import useUnauthenticated from "../hooks/useUnauthenticated"

export default function HomePage() {
  const { userName } = useContext(AuthContext)
  const navigate = useNavigate()
  const logout = useLogout()
  useUnauthenticated()

  function calcBalance() {
    const balance = transactions.reduce((acc, cur) => acc + cur.value, 0);
    return balance.toFixed(2);
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userName}</h1>
        <BiExit onClick={logout} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction, index) => (
            <ListItemContainer key={index}>
              <div>
                <span>{transaction.date}</span>
                <strong>{transaction.description}</strong>
              </div>
              <Value color={transaction.value >= 0 ? "positivo" : "negativo"}>
                {transaction.value.toFixed(2)}
              </Value>
            </ListItemContainer>
          ))}
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value color={calcBalance() >= 0 ? "positivo" : "negativo"}>
            {calcBalance()}
          </Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`