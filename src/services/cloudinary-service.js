// FETCH
export const uploadImg = async (ev) => {
    // Defining our variables
    const CLOUD_NAME = 'dkbts8x37' // Insert yours
    const UPLOAD_PRESET = 'euqmhsvn' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    // Sending a post method request to Cloudniarys' API
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA
        })
        const { url } = await res.json()
        return url;
    } catch (err) {
        console.error('ERROR!', err)
    }
}