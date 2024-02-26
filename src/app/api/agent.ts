import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep =()=>new Promise(resolve=>setTimeout(resolve,500)); 


axios.defaults.baseURL = 'http://localhost:5198/api/';
//axios.defaults.withCredentials=true;
//credential disabled for now

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response
},(error:AxiosError)=>{
    const {data,status}=error.response as AxiosResponse;
    switch(status){
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error',{state:{error:data}}); //pass parameters to the route
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
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
const Basket={
    get:()=>request.get('basket'), 
    addItem: (productId:number,quantity=1)=>request.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    deleteItem: (productId:number,quantity=1)=>request.del(`basket?productId=${productId}&quantity=${quantity}`)

}

const agent = {
    Catalog,
    TestErrors,
    Basket
}



export default agent;