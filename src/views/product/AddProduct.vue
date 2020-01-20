<template>
  <div class="products-add-form">
    <b-form-group
      id="input-group-1"
      label="SKU"
      label-for="SKU"
      description="SKU akan terisi secara otomatis apabila kosong"
    >
      <b-form-input
        id="sku"
        v-model="productFields.SKU"
        type="text"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="isSkuValid">
        SKU harus lebih dari 3 huruf
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
      label="Nama produk"
      label-for="input">
      <b-form-input
        id="input-1"
        v-model="productFields.name"
        type="text"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="isProductNameValid">
        Nama produk harus lebih dari 3 huruf
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      label="Jenis kategori"
      label-for="input"
      >
      <div v-if="$apollo.queries.categories.loading">Loading...</div>
      <b-form-select
        v-else
        v-model="productFields.categoryId"
        class="mb-3">
        <option :value="null">Please select an option</option>
        <option
          v-for="(item, index) in categories"
          :key="index"
          :value="item.id">
          {{ item.name }}
        </option>
      </b-form-select>
      <b-form-invalid-feedback :state="isCategoryValid">
        Kategori harus dipilih!
      </b-form-invalid-feedback>
    </b-form-group>

      <!-- Styled -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      accept=".jpg, .png, .gif"
      placeholder="Upload foto produk..."
      drop-placeholder="Lepas disini..."
    ></b-form-file>
    <b-button
      @click="uploadImage()"
      variant="success"
      class="mt-3" 
      block
    >
      Unggah gambar
    </b-button>

    <b-button
      @click="onProductAddConfirmed()"
      variant="success"
      class="mt-3" 
      :disabled="!isFormValid"
      block
    >
      Lanjut input detil produk
    </b-button>
  </div>
</template>

<script>
import {
  queryTypes as categoryQueryTypes,
  queries as categoryQueries
} from '../../commands/categoryCommands'
import FirestoreHelper from '../../network/FirestoreHelper'


const getCategoryQuery = () => {
  const { GET_CATEGORIES } = categoryQueryTypes
  const getCategories = categoryQueries[GET_CATEGORIES]

  return getCategories
}

export default {
  props: [
    'productFields',
    'onProductAddConfirmed',
  ],
  data () {
    return {
      selected: null,
      categories: [],
      file: null,
    }
  },
  apollo: {
    categories: getCategoryQuery(),
  },
  computed: {
    isSkuValid () {
      return this.productFields.SKU.length > 3 || this.productFields.SKU === ''
    },
    isProductNameValid () {
      return this.productFields.name.length > 3
    },
    isCategoryValid () {
      return this.productFields.categoryId !== null
    },
    isFormValid () {
      return (
        this.isSkuValid
        && this.isProductNameValid
        && this.isCategoryValid
      )
    },
  },
  methods: {
    uploadImage () {
      const metadata = {
        contentType: 'image/jpeg',
      }

      FirestoreHelper.uploadImage({
        image: new File([this.file], 'hehe.jpg'),
        metadata,
        onSuccess: (res, url) => {
          console.log(url)
        },
        onError: (res) => {
          console.log('error ajg', res)
        }
      })
    }
  },
}
</script>