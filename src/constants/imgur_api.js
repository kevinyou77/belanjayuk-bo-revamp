import axios from 'axios'

class ImgurEndpoints {
  static BASE_URL = 'https://api.imgur.com/3'
  static UPLOAD_IMAGE = `${this.BASE_URL}/upload`
  
  static postImage ({ image, onSuccess, onError }) {
    axios.post(this.UPLOAD_IMAGE, { image })
      .then(res => {
        onSuccess(res)
      })
      .catch (err => {
        onError(err)
      })
  }

  static getImage ({ imageId, onSuccess, onError }) {
  }

}