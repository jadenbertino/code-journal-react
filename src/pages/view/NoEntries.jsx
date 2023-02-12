import { Link } from "react-router-dom";

export default function NoEntries() {
  return (
    <div className="no-entries">
      <p>No Entries</p>
      <Link to="/create">
        <button className="btn">Click Here To Create A New Entry</button>
      </Link>
    </div>
  );
}
