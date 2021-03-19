import axios from "axios"

const useAxios = async ()=> {

  const get = async (uri:string)=> {
    try {
      return await axios.get(uri,);
    } catch (error) {
    throw error  
    }
    }

  const post = async <T extends {}>(uri:string, body:T, options:any)=> {
    try {
      return await axios.post(uri,options)
    } catch (error) {
      throw error
    }
  }

  return {get, post}

}

export default useAxios