import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter } from "./common"

export const AnswerService = {
	async getDataList(filters) {
		const params = buildFilter(filters);
		return await getMethod('answers', params);
	},
	async getDetailData(id) {
		return await getMethod('answers/' + id);
	},
	async createData(data) {
		return await postMethod('answers', data);
	},
	async putData(id,data) {
		return await putMethod('answers/' + id, data);
	},

	async deleteData(id) {
		return await deleteMethod('answers/' + id);
	},
}