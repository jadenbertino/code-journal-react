import { useEffect, useState } from 'react'
import { useSignUp } from '../../hooks/useSignUp'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useLogIn } from '../../hooks/useLogIn'

// styles
import './SignUp.css'

export default function SignUp() {
  const { user } = useAuthContext()
  const { error, pending, signup } = useSignUp()
  const nav = useNavigate()

  // form controls
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // redirect user to homepage if signed in
  useEffect(() => {
    if (user) nav("/")
  }, [])
  
  async function handleSubmit(e) {
    e.preventDefault()
    await signup(displayName, email, password)
    e.target.reset()
    nav("/")
  }

  return (
    <main>
      <div className="container sign-up">
        <div className="row">
          <form id="sign-up-form" onSubmit={handleSubmit}>
            <label>
              <span>First Name</span>
              <input
                type="text"
                required
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              />
            </label>
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