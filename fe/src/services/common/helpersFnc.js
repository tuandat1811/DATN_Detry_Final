import { uploadFile } from "../apiService";
import { DEFAULT_USER, URL_IMG } from "../common";

// @ts-nocheck
export const onFileChanged = ( event, oldFile, setFile, setErrorFile ) =>
{
	if ( event )
	{
		let fileName = event.target.files[ 0 ].name;
		let extFile = fileName.split( '.' ).pop();
		let allowExt = [ 'png', 'jpg', 'jpeg', 'gif' ];
		if ( !allowExt.includes( extFile?.toLowerCase() ) )
		{
			setErrorFile( 'Không hỗ trợ định dạng này' );
			return;
		}

		if ( event.target.files[ 0 ].type.indexOf( 'image' ) < 0 )
		{
			setErrorFile( 'File upload must be image!' );
		} else
		{
			setFile( { ...oldFile, file: { file: event.target.files[ 0 ], file_name: event.target.files[ 0 ].name } } )
			readFile( event.target, oldFile, setFile );
		}
	}
}

export const readFile = ( inputValue, oldFile, setFile ) =>
{
	const file = inputValue.files[ 0 ];
	const myReader = new FileReader();

	myReader.onloadend = ( e ) =>
	{
		setFile( { ...oldFile, base64: myReader.result } );
		if ( !( myReader?.result?.includes( 'data:image', 'base64' ) ) )
		{
			setFile( { file: null, base64: null } );
		}
	};
	myReader.readAsDataURL( file );
}

export const appendForm = async ( data, form, setFile, hasFile = false ) =>
{
	if ( data )
	{
		if ( data.created_at ) delete data.created_at;
		if ( data.updated_at ) delete data.updated_at;
		let formValue = { ...data };
		if ( hasFile && data.avatar)
		{
			let file = [];
			file.push( {
				uid: file.length,
				name: data.avatar,
				status: 'done',
				url: URL_IMG + data.avatar,
				default: true
			} );
			formValue.image = file;
			setFile( file );
		}
		form.setFieldsValue( formValue )
	}
}


export const uploadFileAvatar = async ( files ) =>
{
	try
	{
		let avatar = null;
		if ( files.length > 0 && files[ 0 ] )
		{
			if ( !files[ 0 ].default )
			{

				const res = await uploadFile( files[ 0 ].originFileObj );
				let data = res.data;
				if ( res?.status === 'success' )
				{
					avatar = data.filename;
				}
			}
		}
		return avatar;

	} catch ( error )
	{

	}

}

export const genStatusClass = ( status ) =>
{
	if ( status === 'ACTIVE') return <div className="text-success">ACTIVE</div>;
	else if (status === 'INACTIVE') return <div className="text-danger">INACTIVE</div>;
	else return 'N/A';
}

export const genUserType = ( type ) =>
{
	if ( type === 'ADMIN') return <div className="text-success">ADMIN</div>;
	else if (type === 'USER') return <div className="text-info">User vip</div>;
	else return <div className="text-warning">User Default</div>;
}
