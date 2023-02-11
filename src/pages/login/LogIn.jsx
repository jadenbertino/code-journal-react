import { useState } from "react"
import { useLogIn } from "../../hooks/useLogIn"
import { useNavigate } from "react-router-dom"

// styles come from SignUp.css

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {error, pending, login} = useLogIn()
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await login(email, password)
    e.target.reset()
    nav("/")
  }

  return (
    <main>
      <div className="container sign-up">
        <div className="row">
          <form id="sign-up-form" onSubmit={handleSubmit}>
            <label>
              <span>Email</span>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            <button className="btn submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </main>
  )
}