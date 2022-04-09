
import '../styles/Button.css';

export function Button(props) {
  return(
    <button className="button" id={props.id} type={props.type}>{props.text}</button>
  );
}