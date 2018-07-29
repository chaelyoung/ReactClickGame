import React from "react";
import "./Pics.css";

const Pics = props => (
	<div onClick={() => props.setClicked(props.id)}>
		<div>
      		<img alt={props.name} src={props.image} />
    	</div>
  </div>
);

export default Pics;
