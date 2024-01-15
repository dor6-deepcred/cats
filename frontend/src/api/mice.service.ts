// COMMENT: you can remove this file
import axios from "axios"

const miceApi = axios.create({
    baseURL: "http://localhost:3000/api/v1/mice"
})

export const getMice = () => miceApi('');

