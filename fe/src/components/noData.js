import React, { useEffect, useState } from "react";
import { EMPTY_IMG } from "../services/common";
//import React and Empty image from common.js

const NoDataPage = ( props ) =>
{
	//component accept props.total from parent component. If total <= 0, show no data component.
	// If no data, show no data component. Show empty image and text "Không có dữ liệu".
	return <>
		{
			( props.total <= 0 ) &&
			<div style={ { textAlign: "center", backgroundColor: '#ffff' } }>
				<img className="text-center" src={ EMPTY_IMG } style={ { width: "300px", height: "300px" } } />
				<div style={ { color: "#9A9A9A" } }>Không có dữ liệu</div>
			</div>
		}
	</>
};

export default NoDataPage;
