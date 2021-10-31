class signinAPI {
    getAll = (params) => {
        const url = '/auth/signin';
        return axiosClient.get(url, { params });
    };
}
const signinAPI = new signin();
export default signinAPI;