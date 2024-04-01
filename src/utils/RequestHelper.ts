import axios from "axios";

const RequestHelper = async (url: string) => {
    console.log(url);
    
    try {
        return await axios.get(url);
    } catch (error) {
        console.log(error);
    }
}

export default RequestHelper;