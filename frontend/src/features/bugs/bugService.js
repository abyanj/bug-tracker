import axios from 'axios'

const API_URL = '/api/bugs/'

//Create new goal
const createBug = async(bugData, token) => {
    console.log('nigga')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, bugData, config)

    return response.data
}

const bugService = {
    createBug
}

export default bugService