import ReactDOM from 'react-dom';

export default function Modal({children}) {
  const root = document.querySelector('#root');

  return ReactDOM.createPortal((
    <div className="modal-backdrop">
      <div className="modal">
        {children}
      </div>
    </div>
  ), root);

}