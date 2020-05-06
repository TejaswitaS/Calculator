import React from 'react';
import "./index.css";

const Button = (props) => {
  const { onClick, value, ...others} = props;
  return(
    <button {...others} className='button' onClick={() => onClick(props.children)}>{value}</button>
  )
}

export default Button;