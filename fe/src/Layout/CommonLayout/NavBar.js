import React, { useState, useEffect } from "react";
import
{
	Col,
	Row,
	Container,
	Collapse,
	NavbarToggler,
	NavItem,
	NavLink,
	Dropdown,
	DropdownToggle,
	DropdownMenu
} from "reactstrap";

import { Link } from "react-router-dom";
import withRouter from "../../components/withRouter"

import logoGlobal from "../../assets/images/logo.png";
import { DEFAULT_USER, checkIsAdmin, checkIsUser, checkLogin, getItem, onErrorUser } from "../../services/common";

const NavBar = ( props ) =>
{
	const [ isOpen, setIsOpen ] = useState( false );
	const toggle = () => setIsOpen( !isOpen );

	const [ home, setHome ] = useState( false );
	const [ company, setCompany ] = useState( false );
	const [ pages, setPages ] = useState( false );
	const [ blog, setBlog ] = useState( false );



	//user Profile Dropdown
	const [ openDropDown, setOpenDropdown ] = useState( false );
	const dropDownuserprofile = () => setOpenDropdown( ( prevState ) => !prevState );

	//scroll navbar
	const [ navClass, setnavClass ] = useState( false );

	useEffect( () =>
	{
		window.addEventListener( "scroll", scrollNavigation, true );
	} );

	function scrollNavigation ()
	{
		var scrollup = window.pageYOffset;
		if ( scrollup > 0 )
		{
			setnavClass( "nav-sticky" );
		} else
		{
			setnavClass( "" );
		}
	}
	//menu activation
	useEffect( () =>
	{
		window.scrollTo( { top: 0, behavior: "smooth" } );
		const pathName = props.router.location.pathname;
		var matchingMenuItem = null;
		var ul = document.getElementById( "navbarCollapse" );
		var items = ul.getElementsByTagName( "a" );
		removeActivation( items );
		for ( var i = 0; i < items.length; ++i )
		{
			if ( pathName === items[ i ].pathname )
			{
				matchingMenuItem = items[ i ];
				break;
			}
		}
		if ( matchingMenuItem )
		{
			activateParentDropdown( matchingMenuItem );
		}
	}, [ props.router.location.pathname ] );

	const removeActivation = ( items ) =>
	{
		for ( var i = 0; i < items.length; ++i )
		{
			var item = items[ i ];
			const parent = items[ i ].parentElement;
			if ( item && item.classList.contains( "active" ) )
			{
				item.classList.remove( "active" );
			}
			if ( parent )
			{
				if ( parent.classList.contains( "active" ) )
				{
					parent.classList.remove( "active" );
				}
			}
		}
	};

	function activateParentDropdown ( item )
	{
		item.classList.add( "active" );
		const parent = item.parentElement.parentElement.parentElement;

		if ( parent )
		{
			parent.classList.add( "active" ); // li
			const parent2 = parent.parentElement;
			parent2.classList.add( "active" ); // li
			const parent3 = parent2.parentElement;
			if ( parent3 )
			{
				parent3.classList.add( "active" ); // li
				const parent4 = parent3.parentElement;
				if ( parent4 )
				{
					parent4.classList.add( "active" ); // li
					const parent5 = parent4.parentElement;
					if ( parent5 )
					{
						parent5.classList.add( "active" ); // li
						const parent6 = parent5.parentElement;
						if ( parent6 )
						{
							parent6.classList.add( "active" ); // li
						}
					}
				}
			}
		}
		return false;
	}

	const avatar = getItem( 'avatar' );
	const name = getItem( 'name' );

	return (
		<React.Fragment>
			<nav
				className={ "navbar navbar-expand-lg fixed-top sticky p-0 " + navClass }
				id="navigation"
			>
				<Container fluid className="custom-container">
					<Link className="navbar-brand text-dark fw-bold me-auto" to="/">
						<img src={ logoGlobal } height="44" alt="" className="logo-dark" />
						<img src={ logoGlobal } height="22" alt="" className="logo-light" />
					</Link>
					<div>
						<NavbarToggler
							className="me-3"
							type="button"
							onClick={ () => toggle() }
						>
							<i className="mdi mdi-menu"></i>
						</NavbarToggler>
					</div>
					<Collapse
						isOpen={ isOpen }
						className="navbar-collapse"
						id="navbarCollapse"
					>
						<ul className="navbar-nav mx-auto navbar-center">
							<NavItem className="dropdown dropdown-hover">
								<Link className="nav-link" to="/">
									Trang chủ
								</Link>
							</NavItem>
							{
								!checkIsAdmin &&
								<>
									<NavItem className="dropdown dropdown-hover">
										<Link className="nav-link" to="/companies">
											Công ty
										</Link>
									</NavItem>
									<NavItem className="dropdown dropdown-hover">
										<Link className="nav-link" to="/topics">
											Chủ đề
										</Link>
									</NavItem>
								</>
							}
							{ !checkLogin() &&
								<>
									<NavItem className="dropdown dropdown-hover">
										<Link className="nav-link" to="/signup">
											Đăng ký
										</Link>
									</NavItem>
									<NavItem className="dropdown dropdown-hover">
										{/*<NavItem>*/ }
										<Link className="nav-link" to="/signin">
											Đăng nhập
										</Link>
										{/*</NavItem>*/ }
									</NavItem>
								</>
							}
							{ checkLogin() && checkIsUser() &&
								<NavItem className="dropdown dropdown-hover">
									<Link className="nav-link" to="/user-vip">
										Quản lý nghiệp vụ
									</Link>
								</NavItem>
							}

							{ checkLogin() && checkIsAdmin() &&
								<NavItem className="dropdown dropdown-hover">
									<Link className="nav-link" to="/admin/users">
										Quản lý hệ thống
									</Link>
								</NavItem>
							}
						</ul>
					</Collapse>

					{ checkLogin() &&
						<ul className="header-menu list-inline d-flex align-items-center mb-0">
							<Dropdown
								className="list-inline-item"
								onClick={ () => setOpenDropdown( !openDropDown ) }
								isOpen={ openDropDown }
								toggle={ dropDownuserprofile }
							>
								<DropdownToggle
									to="#"
									className="header-item"
									id="userdropdown"
									type="button"
									tag="a"
									aria-expanded="false"
								>
									<img
										src={ avatar || DEFAULT_USER }
										alt="mdo"
										width="35"
										height="35"
										onError={ onErrorUser }
										className="rounded-circle me-1"
									/>{ " " }
									<span className="d-none d-md-inline-block fw-medium">
										Hi, { name }
									</span>
								</DropdownToggle>
								<DropdownMenu
									className="dropdown-menu-end"
									aria-labelledby="userdropdown"
									end
								>

									<li>
										<Link className="dropdown-item" to="/myprofile">
											Thông tin cá nhân
										</Link>
									</li>

									<li>
										<Link className="dropdown-item" to="#"
											onClick={ () =>
											{
												localStorage.clear();
												window.location.href = '/'
											}
											}
										>
											Đăng xuất
										</Link>
									</li>
								</DropdownMenu>
							</Dropdown>
						</ul>
					}

				</Container>
			</nav>
		</React.Fragment>
	);
};

export default withRouter( NavBar );
