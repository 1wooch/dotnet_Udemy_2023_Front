import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5198/api/';

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog={
    list:()=>request.get('products'),
    details:(id:number)=>request.get(`products/${id}`)
}
const TestErrors = {
    get400: () => request.get('buggy/bad-request'),
    get401: () => request.get('buggy/unauthorized'),
    get404: () => request.get('buggy/not-found'),
    get500: () => request.get('buggy/server-error'),
    getValidationError: () => request.get('buggy/validation-error')
}
const agent = {
    Catalog,
    TestErrors
}



export default agent;