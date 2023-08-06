import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import RightSideContent from "./RightSideContent";
import Section from "./Section";
import { message } from "antd";
import { AUTH_SERVICE } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../../redux/actions/common";

const MyProfile = () =>
{
	document.title = "Tài khoản";

	const [ userInfo, setUserInfo ] = useState();
	const dispatch = useDispatch();

	useEffect( () =>
	{
		getProfile();
	}, [] );

	const getProfile = async () =>
	{
		dispatch(toggleShowLoading(true));
		const response = await AUTH_SERVICE.getProfile();
		if ( response.status == 'success' )
		{
			setUserInfo( response.data );
		} else
		{
			message.error(response.message);
		}
		dispatch(toggleShowLoading(false));
	};

	const updateProfile = async () =>
	{
		

		// const response = await AUTH_SERVICE.updateProfile( data );
		// if ( response.status == 'success' )
		// {
		// 	message.success( 'Cập nhật thông tin cá nhân thành công!' );
		// } else
		// {
		// 	message.error( response?.message || 'error' );
		// }
	}

	return (
		<React.Fragment>
			<Section />

			{
				userInfo &&
				<section className="section">
					<Container>
						<Row>
							<Col md={ 2 }></Col>
							<RightSideContent
								userInfo={ userInfo }
							/>
							<Col md={ 2 }></Col>
						</Row>
					</Container>
				</section>
			}

		</React.Fragment>
	);
};

export default MyProfile;
