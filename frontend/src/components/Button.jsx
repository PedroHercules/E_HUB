
import '../styles/Button.css';

export function Button(props) {
  return(
    <button className="button" type={props.type}>{props.text}</button>
  );
}