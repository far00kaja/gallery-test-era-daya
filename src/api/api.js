import http from '../helper/axios'
export async function getImage() {
  try {
    let request //= await http.
    return request
  } catch (error) {
    return error
  }
}

export async function postImage(reqPostImage) {
  console.log('masuk')
  try {
    let request = await http.post('/1/upload', reqPostImage, {
      params: {
        key: import.meta.env.VITE_API_KEY ? import.meta.env.VITE_API_KEY : null,
        limit: import.meta.env.VITE_IMAGE_EXPIRATION ? import.meta.env.VITE_API_KEY : 300
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return request
  } catch (error) {
    return error
  }
}
