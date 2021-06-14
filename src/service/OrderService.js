import axios from 'axios';


export class OrderService {
    baseurl = "http://localhost:8082/api/v2/";

    getAll() {
        return axios.get(this.baseurl + "orders").then(res => res.data);
    }
    save(order) {
        return axios.post(this.baseurl + "order", order).then(res => res.data);
    }
    edit(id, order) {
        return axios.put(this.baseurl + "order/" + id, order).then(res => res.data);
    }
    delete(id) {
        return axios.delete(this.baseurl + "order/" + id).then(res => res.data);
    }
    getById(id) {
        return axios.get(this.baseurl + "order/" + id).then(res => res.data);
    }

}