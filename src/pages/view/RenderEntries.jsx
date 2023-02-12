import { Link } from "react-router-dom"

export default function RenderEntries({ entries, searchQuery }) {

  return (<ul>
    {entries.map(entry => (<li className="entry" key={entry.id}>
      <div className="img-wrapper">
        <img src={entry.imgSrc} alt="entry-img" />
      </div>
      <div className="text-wrapper">
        <div className="title-wrapper">
          <h3 className="entry-title">{entry.title}</h3>
          <Link to={`/edit/${entry.id}`}>
            <button className="btn pencil">
              <i className="fa-solid fa-pencil"></i>
            </button>
          </Link>
        </div>
        <p>{entry.notes}</p>
      </div>
    </li>))}
  </ul>)

}

/*


*/