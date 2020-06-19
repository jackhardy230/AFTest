import axios from "axios";

const baseUrl = 'http://localhost:3500/'

export default {

    product(url = baseUrl + 'product/') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update_quantity: (id, record) => axios.put(url+"cart/" + id, record),
            update: (id, record) => axios.put(url + id, record),
            delete: id => axios.delete(url + id)
        }
    }

}