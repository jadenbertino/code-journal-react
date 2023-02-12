import { useState } from "react"
import { useLogIn } from "../../hooks/useLogIn"
import { useNavigate, Link } from "react-router-dom"

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
      <div className="container login">
        <div className="row">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Log In</h1>
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
            <Link to="/signup" className="switch-auth-link">
              Don't have an account yet? Click here to sign up.
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}