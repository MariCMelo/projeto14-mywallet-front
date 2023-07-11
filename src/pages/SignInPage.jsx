import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useSignin } from "../services/auth"
import useAuthenticated from "../hooks/useAuthenticated"

export default function SignInPage() {
  const { form, handleForm } = useForm({ email: "", password: "" })
  const signin = useSignin()

  useAuthenticated()

  function submitForm(e) {
    e.preventDefault()
    signin(form)
  }

  return (
    <SingInContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          required
          type="email"
          autoComplete="username"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
        />
        <input
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="Senha"
          name="password"
          value={form.password}
          onChange={handleForm}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
