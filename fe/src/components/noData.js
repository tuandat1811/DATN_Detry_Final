import React, { useEffect, useState } from "react";
import { EMPTY_IMG } from "../services/common";





const NoDataPage = ( props ) =>
{


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
