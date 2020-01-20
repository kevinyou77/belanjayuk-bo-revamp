import { storage } from '@/main'

class FirestoreHelper {
  static uploadImage ({ image, metadata, onSuccess, onError }) {
    storage
        .child('images/' + image.name)
        .put(image, metadata)
        .then(snapshot => {
            snapshot.ref.getDownloadURL().then((downloadUrl) => {
              onSuccess(snapshot, downloadUrl)
            })
        })
        .catch(err => {
            onError(err)
            console.log(err)
        })
  }
}

export default FirestoreHelper