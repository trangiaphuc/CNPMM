class signupAPI {
    getAll = (params) => {
        const url = '/auth/signup';
        return axiosClient.get(url, { params });
    };
}
const signupAPI = new signupAPI();
export default signupAPI;