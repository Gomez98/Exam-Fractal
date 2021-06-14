import axios from 'axios';


export class ProductService{
    baseurl = "http://localhost:8082/api/v1/";

    getAll(){
        return axios.get(this.baseurl + "products").then(res => res.data);
    }
    save(product){
        return axios.post(this.baseurl + "product", product).then(res => res.data);
    }
    edit(id,product){
        return axios.put(this.baseurl + "product/" + id,product).then(res => res.data);
    }
    delete(id){
        return axios.delete(this.baseurl + "product/"+id).then(res => res.data);
    }

}