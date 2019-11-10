import axios from 'axios'
import { 
  IMGUR_BASE_URL,
  UPLOAD_IMAGE
} from '../constants/imgurApi'

class ImgurEndpoints {
  static postImage ({ image, onSuccess, onError }) {
    axios.post(UPLOAD_IMAGE, { image })
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

export default ImgurEndpoints