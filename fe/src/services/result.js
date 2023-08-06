import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter } from "./common"

export const ResultService = {
	async getDataList(filters) {
		const params = buildFilter(filters);
		return await getMethod('results', params);
	},
	async getDetailData(id) {
		return await getMethod('results/' + id);
	},
	async createData(data) {
		return await postMethod('results', data);
	},
	async putData(id,data) {
		return await putMethod('results/' + id, data);
	},

	async deleteData(id) {
		return await deleteMethod('results/' + id);
	},
}