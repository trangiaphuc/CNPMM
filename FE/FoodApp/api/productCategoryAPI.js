class productCategoryAPI {
    getAll = (params) => {
        const url = '/productcategory';
        return axiosClient.get(url, { params });
    };
}
const productCategoryAPI=new ProductCategoryAPI();
export default productCategoryAPI;