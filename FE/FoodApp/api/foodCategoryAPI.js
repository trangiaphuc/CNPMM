class foodCategoryAPI {
    getAll = (params) => {
        const url = '/foodcategory';
        return axiosClient.get(url, { params });
    };
}
const foodCategoryAPI = new foodCategoryAPI();
export default foodCategoryAPI;