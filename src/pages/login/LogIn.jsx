import { useState } from "react"
import { useLogIn } from "../../hooks/useLogIn"

// styles come from SignUp.css

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {error, pending, login} = useLogIn()
  async function handleSubmit(e) {
    e.preventDefault()
    await login(email, password)
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