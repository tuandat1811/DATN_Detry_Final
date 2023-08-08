import axios  from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_URL_API,
	headers: {
		'Content-Type': 'application/json',
	},
})

if (localStorage.getItem('access_token')) {
	axiosClient.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('access_token');
}
axiosClient.interceptors.response.use(
	(response) => {
	   let data = response.data;
	   if ((data && data.code === 'LG0401')) {
		//    localStorage.clear();
		//    window.location.href = `/`;
		console.log(401);
	   } else if(data.code === 'LG0403') {
		// 	localStorage.clear();
		//    window.location.href = `/403`;
		console.log(401);
	   }
	   return response.data;
   },
	(error) => {
	   console.log('error--------> ', error);
	   if (error?.response?.status === 401 && error?.response?.data?.statusCode === 401) {
		//    localStorage.clear();
		//    window.location.href = `/`;
		console.log(401);
	   }

	   let dataError = error.response?.data || null;
	   if ((dataError && dataError.code === 'LG0401')) {
		//    localStorage.clear();
		//    window.location.href = `/`;
		console.log(401);
	   } else if(dataError.code === 'LG0403') {
		console.log('403');
		// localStorage.clear();
		// window.location.href = `/403`;
	   }
	   return dataError;
   }
)


export const postMethod =  (path, data) => {
	return  axiosClient.post(`${process.env.REACT_APP_API}${path}`, data)
		.then(response => response)
		.catch(error => {
			return {
				status: 'error',
				message: 'Error create data'
			}
		});
}

export const getMethod =  async (path, params) => {
	return await axiosClient.get(`${process.env.REACT_APP_API}${path}`, { params: params})
		.then(response => {
			return response;
		})
		.catch(error => {
			return {
				status: 'error',
				message: 'Error get data'
			}
		});
		
}

export const putMethod =  (path, data) => {
	return  axiosClient.put(`${process.env.REACT_APP_API}${path}`, data)
		.then(response => response)
		.catch(error => {
			return {
				status: 'error',
				message: 'Error update data'
			}
		});
		
}

export const deleteMethod =  (path) => {
	return  axiosClient.delete(`${process.env.REACT_APP_API}${path}`)
		.then(response => response)
		.catch(error => {
			return {
				status: 'error',
				message: 'Error delete data'
			}
		});
}

export const uploadFile = async (file) => {
	const formData = new FormData();
	formData.append( 'file', file);

	return  axios.post(`${process.env.REACT_APP_API}upload/image`, formData, {headers: { 'Accept': 'multipart/form-data' }})
		.then(response => response.data)
		.catch(error => {
			return {
				status: 'error',
				message: 'Error upload file'
			}
		});
}