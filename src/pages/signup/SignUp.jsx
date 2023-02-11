import { useEffect, useState } from 'react'
import { useSignUp } from '../../hooks/useSignUp'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate, Link } from 'react-router-dom'
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
      <div className="container signup">
        <div className="row">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
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
            <Link to="/login" className="switch-auth-link">
              Already have an account? Click here to login.
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}