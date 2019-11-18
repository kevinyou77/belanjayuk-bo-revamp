import { storage } from '../../src/main'

class ImgurEndpoints {
  static uploadImage ({ image, onSuccess, onError }) {
    // axios.post(UPLOAD_IMAGE, {
    //     headers: {
    //       'Authorization': AUTHORIZED_CLIENT_ID,
    //       'Content-Type': 'multipart/form-data',
    //       'Access-Control-Allow-Origin': '*' ,
    //       'Origin': 'https://backoffice-belanjayuk.herokuapp.com/'
    //     },
    //     params: {
    //       image
    //     }
    //   })
    //   .then(res => {
    //     onSuccess(res)
    //   })
    //   .catch (err => {
    //     onError(err)
    //   })
    storage.child('images')
    storage.child('images/' + image.name)
    .put(image)
    .then(snapshot => console.log(snapshot))
    .catch(err => console.log(err))
  }
}

export default ImgurEndpoints