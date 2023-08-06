import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter } from "./common"

export const TopicService = {
	async getDataList(filters) {
		const params = buildFilter(filters);
		return await getMethod('topics', params);
	},
	async getDataListByUser(filters) {
		const params = buildFilter(filters);
		return await getMethod('topics/user', params);
	},
	async getDetailData(id) {
		return await getMethod('topics/' + id);
	},
	async createData(data) {
		return await postMethod('topics', data);
	},
	async putData(id,data) {
		return await putMethod('topics/' + id, data);
	},
	async deleteData(id) {
		return await deleteMethod('topics/' + id);
	},
}