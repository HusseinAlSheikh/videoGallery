import axios from 'axios';
const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
    headers : {
        Accept:'application/json' ,
    }
});

axiosClient.interceptors.request.use( async (config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization =`Bearer ${token}`;
    if(config.method=='get')
       return config;
    let csrf = getCookie('XSRF-TOKEN');
    if(!csrf){
        //-------- get new csrf
        await axios.get('/sanctum/csrf-cookie');
        csrf = getCookie('XSRF-TOKEN');

    }
    config.headers['X-XSRF-TOKEN'] = csrf;
    return config;
});


axiosClient.interceptors.response.use((response)=>{
    return response;
},(error)=>{
   
    try {
        const {response} = error;
        if (response.status == 401){
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }catch (e) {
        console.error(e)
    }

    throw error;
});


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default axiosClient;