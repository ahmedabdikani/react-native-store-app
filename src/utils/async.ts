const asyncCode = async <T extends {}>(asyncCode:Promise<T>) =>{
  let isLoading = true, data,error
  try {
    data = await asyncCode
    isLoading = false
    error = null
  } catch (error) {
    data=null;
    error = error;
    isLoading = false
  }
  return{isLoading, data, error}
}