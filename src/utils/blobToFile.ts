
export default function blobToFile(blob:Blob, fileName:string){
  return {...blob,lastModifiedDate:new Date(),name: fileName};
}