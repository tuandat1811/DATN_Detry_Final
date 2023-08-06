import defaultImg from '../assets/images/image_faildoad.png';
// import defaultUser from '../../assets/img/default-avatar.png';
import defaultUser from '../assets/images/default-avatar.png';
import notfound from '../assets/images/404.png';
import emtyImg from '../assets/images/process-02.png';
import moment from 'moment';
export const DEFAULT_IMG = defaultImg;
export const NOT_FOUND = notfound;
export const DEFAULT_USER = defaultUser;

export const EMPTY_IMG = emtyImg;
export const getItem = ( key ) =>
{
	return localStorage.getItem( key ) || null;
}

export const setItem = ( key, value ) =>
{
	localStorage.setItem( key, value );
}

export const checkLogin = () => {
	return getItem('access_token') || false
}

export const checkIsAdmin = () => {
	return checkLogin() && getItem('type') == 'ADMIN' || false
}

export const checkIsUser = () => {
	return checkLogin() && getItem('type') == 'USER' || false
}

export const customDate = ( date, formatValue ) =>
{
	return moment( date ).format( formatValue );
}

export const removeItem = ( key ) =>
{
	localStorage.removeItem( key );
}

export const setField = (form,field, value, setForm) => {
	setForm({
		...form,
		[field]: value
	});
};

export const buildFilter = (values) => {
	delete values.total;
	delete values.total_page;
	let params = {};
	if (values) {
		let arrCondition = Object.entries(values);
		
		params = arrCondition.reduce((param, item) => {
			if(item[1] != null) {
				param = {...param, ...buildItemParam(item[0], item[1], param)}
			}
			return param;
		}, {});
	}
	return params;
}

export const buildItemParam = (key, value, params) => {
	if(key === 'page' && !value) {
		params['page'] = value;
	} else if (value) {
		params[`${key}`] = value;
	}
	return params;
}

export const timeDelay = async (delay) => {
	return new Promise(res => setTimeout(res, delay))
}


export const VALIDATE_FORM = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};

export const onErrorImg = (e) => {
	e.currentTarget.src = DEFAULT_IMG
}

export const onErrorUser = (e) => {
	e.currentTarget.src = DEFAULT_USER
}


export const validateMessages = {
	required: '${label} không được để trống!',
	types: {
		email: '${label} không đúng định dạng email!',
		number: '${label} không đúng định dạng số!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};

export const toSlug = ( str, space = '-' ) =>
{
	// Chuyển hết sang chữ thường
	if ( str )
	{
		str = str.toLowerCase();

		// xóa dấu
		str = str
			.normalize( 'NFD' ) // chuyển chuỗi sang unicode tổ hợp
			.replace( /[\u0300-\u036f]/g, '' ); // xóa các ký tự dấu sau khi tách tổ hợp

		// Thay ký tự đĐ
		str = str.replace( /[đĐ]/g, 'd' );

		// Xóa ký tự đặc biệt
		str = str.replace( /([^0-9a-z-\s])/g, '' );

		// Xóa khoảng trắng thay bằng ký tự -
		str = str.replace( /(\s+)/g, space );

		// Xóa ký tự - liên tiếp
		str = str.replace( /-+/g, space );

		// xóa phần dư - ở đầu & cuối
		str = str.replace( /^-+|-+$/g, '' );
	}


	// return
	return str;
}

export const resetForm = (form) =>
{
	form.resetFields();
}

export const onFieldsChange = ( e, form, setIsTeacher ) =>
{
	if ( e.length > 0 )
	{
		let value = typeof e[ 0 ].value === 'string' ? e[ 0 ].value : e[ 0 ].value;
		if ( e[ 0 ].name[ 0 ] === 'name' && value != '' )
		{
			let slug = toSlug( value );
			form.setFieldsValue( { code: slug } );
		}
		if(e[0].name[0] === 'role' && value === 2) {
			setIsTeacher(true)
		}
		let fieldValue = {
			[ String( e[ 0 ].name[ 0 ] ) ]: value
		}
		form.setFieldsValue( fieldValue );
	}
}

export const normFile = ( e, setFiles ) =>
{
	if ( e?.fileList )
	{
		let fileChoose = e?.fileList.map( item => {
			if(item.default) return item;
			item.status = 'done';
			return item;
		} );
		setFiles( fileChoose );
	}
	return e?.fileList;
}
