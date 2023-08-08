import React from "react";
import { Modal } from "react-bootstrap";

export const DeleteConfirm = ( props ) =>
{

	return (
		<Modal show={ props.showModal } size="sm" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div className="fs-21 text-center">Bạn có chắc muốn xóa { props.title } hay không?</div>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex justify-content-center">
					<button className="btn btn-primary" onClick={ () =>
					{
						props.deleteData( props.id );
						props.setShowModal( false );
						props.setId( null );
					} }>Có</button>
					<button className="btn btn-danger ms-2" onClick={ () =>
					{
						props.setId( null );
						props.setShowModal( false )
					} }>Không</button>
				</div>
			</Modal.Body>
		</Modal>
	);
}
