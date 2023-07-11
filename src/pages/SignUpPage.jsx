import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import useForm from "../hooks/useForms"
import useAuthenticated from "../hooks/useAuthenticated"
import { useSignup } from "../services/auth"

export default function SignUpPage() {
  const { form, handleForm } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const signUp = useSignup()

  useAuthenticated()

  function submitForm() {
    if (form.password !== form.confirmPassword) {
      alert("As senhas não são iguais!")
      return
    }
    signUp(form)
  }

  return (
    <SignUpContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          required
          placeholder="Nome"
          name="name"
          value={form.name}
          onChange={handleForm}
        />
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
        <input
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="Confirme a senha"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleForm}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SignUpContainer>
  )
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
