import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const useAxios = async (url:string)=> {
  try {
    const res = await axios({url, method:"GET"})
    // const json = await res.json()
  return res.data
} catch (error) {
    console.log(error)
  }
}

export default useAxios