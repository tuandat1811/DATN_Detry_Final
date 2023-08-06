import React from "react";
import { Link } from "react-router-dom";

const MenuLeft = ( props ) =>
{

	return (
		<>
			{
				props.menu &&
				<React.Fragment>
					<div className="mt-4 pt-2">
						<div className="sd-title">
							<h6 className="fs-16 mb-3">MENU</h6>
						</div>
						<ul className="list-unstyled menu-admin mb-0 mt-3">
							{ props.menu.map( ( archivesDetails, key ) =>
							{
								if(archivesDetails.type === props.type) {
									return (
										<li className="py-2 menu active" key={ key }>
											<Link className="me-2 active" to={ archivesDetails.path }>
												<i className="uil uil-angle-right-b"></i> { archivesDetails.name }
											</Link>{ " " }
										</li>
									)
								}
								return (
									<li className="py-2 menu" key={ key }>
										<Link className="me-2 text-muted" to={ archivesDetails.path }>
											<i className="uil uil-angle-right-b"></i> { archivesDetails.name }
										</Link>{ " " }
									</li>
								)
							} )
							}
						</ul>
					</div>
				</React.Fragment>
			}
		</>


	);
};

export default MenuLeft;
