import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter } from "./common"

export const CompanyService = {
	async getDataList(filters) {
		const params = buildFilter(filters);
		return await getMethod('company', params);
	},
	async getDataListByUser(filters) {
		const params = buildFilter(filters);
		return await getMethod('company/user', params);
	},
	async getDetailData(id) {
		return await getMethod('company/' + id);
	},
	async createData(data) {
		return await postMethod('company', data);
	},
	async putData(id,data) {
		return await putMethod('company/' + id, data);
	},
	async deleteData(id) {
		return await deleteMethod('company/' + id);
	},
}