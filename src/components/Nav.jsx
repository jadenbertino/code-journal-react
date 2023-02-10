import "./Nav.css";

export default function Nav() {
  return (
    <nav>
      <div className="container">
        <div className="title">
          <h3>Code Journal</h3>
          <button className="btn">Entries</button>
        </div>
        <div className="auth">
          <button className="btn sign-up">Sign Up</button>
          <button className="btn log-in">Log In</button>
          <button className="btn sign-out">Sign Out</button>
        </div>
      </div>
    </nav>
  );
}
