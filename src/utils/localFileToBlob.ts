
export default async function localFileToBlob (url: string){
    const res = await fetch(url)
    const blob = await res.blob();
    return blob
}