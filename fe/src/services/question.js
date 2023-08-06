import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter } from "./common"

export const QuestionService = {
	async getDataList(filters) {
		const params = buildFilter(filters);
		return await getMethod('questions', params);
	},
	async getDataListByDefaultUser(filters) {
		const params = buildFilter(filters);
		return await getMethod('questions/default-user', params);
	},
	async getDataListBySupperUser(filters) {
		const params = buildFilter(filters);
		return await getMethod('questions/user', params);
	},
	async getDetailData(id) {
		return await getMethod('questions/' + id);
	},
	async createData(data) {
		return await postMethod('questions', data);
	},
	async putData(id,data) {
		return await putMethod('questions/' + id, data);
	},
	async deleteData(id) {
		return await deleteMethod('questions/' + id);
	},
}