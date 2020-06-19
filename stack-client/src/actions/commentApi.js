import axios from "axios";

const baseUrl = 'http://localhost:3500/'

export default {
    comment(url = baseUrl + 'comments/') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
}