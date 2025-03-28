import axiosInstance from './axios'
const fetcher = async (url) => await axiosInstance.get(url).then((res) => res.data)

export default fetcher