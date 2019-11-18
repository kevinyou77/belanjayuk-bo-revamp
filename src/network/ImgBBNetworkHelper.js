import axios from 'axios'
import { 
  IMGBB_API,
  UPLOAD_IMAGE
} from '../constants/imgBBApi'

class ImgBBNetworkHelper {
  static uploadImage ({ image, onSuccess, onError }) {
    axios.post(UPLOAD_IMAGE, {
      proxy: {
        host: '104.236.174.88',
        port: 3128
      },
      params: {
        key: IMGBB_API,
        image,
      }
    })
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

export default ImgBBNetworkHelper