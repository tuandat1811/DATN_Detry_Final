import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter } from "./common"

export const UserService = {
	async getDataList(filters) {
		const params = buildFilter(filters);
		return await getMethod('user', params);
	},
	async getDetailData(id) {
		return await getMethod('user/' + id);
	},
	async createData(data) {
		return await postMethod('user', data);
	},
	async putData(id,data) {
		return await putMethod('user/' + id, data);
	},
	async deleteData(id) {
		return await deleteMethod('user/' + id);
	},
}