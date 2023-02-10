import { useState } from 'react'

// styles
import './SignUp.css'

export default function SignUp() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main>
      <div className="container sign-up">
        <div className="row">
          <form id="sign-up-form">
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