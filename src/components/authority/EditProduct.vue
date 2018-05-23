<template>
  <div>
    <el-dialog v-loading="isFormSubmitting" title="Edit Product" :visible.sync="visible" width="50%" center>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="Product Name" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Product Price" required>
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Product Stock" required>
          <el-input v-model="form.inventory"></el-input>
        </el-form-item> -->
        <el-form-item label="Product Description" required>
          <el-input v-model="form.description" type="textarea" rows="4"></el-input>
        </el-form-item>
        <!-- <el-form-item>
        <el-button type="success">
            <label for="upload-photo">
              Upload Your Picture Here</label>
            </el-button>
          <input type="file" @change="onFileChange" id="upload-photo" v-show="false">
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">Update</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable */
  export default {
    props:[
          "show","product"
      ],
    data() {
      return {
       form: {
         name: '',
         price: '',
         description: '',
         id:''
        },
        fileId: '',
        // artworkId: '',
        isFormSubmitting: false,
        fileName: ''
      }
    },
    
    methods: {
      onSubmit() {
      },
      onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) console.log('image wrong')
      else console.log(files)
      this.fileName = files[0].name
      const file = files[0]
      let formData = new FormData()
      formData.append('avatar', file)
      console.log(formData)
      this.$http
      .post('/admin/productAvatar', formData)
      .then(resp => {
            console.log(resp.data)
      })
      .catch(err => {
            console.log(err)
      })
      },
      
      submitForm() {
        // console.log('submit!')
        this.isFormSubmitting = true
        const body = this.form
        console.log('submission starts below')
        this.$http
        .put("admin/product", body)
        .then(resp => {
          console.log(resp)
          this.isFormSubmitting = false
          // this.addPicToArtwork()
        })
        .catch(err => {
          console.log(err)
          this.showError('Error', `Add Artwork Failed Status: ${err}`, 'warning')
          this.isFormSubmitting = false
          console.log(this.isFormSubmitting)
        })
      },
      // addPicToArtwork () {
      //   const body = {
      //     artworkId: this.artworkId,
      //     fileId: this.fileId
      //   }
      //   this.$http
      //   .put("/admin/productAvatar", body)
      //   .then(resp => {
      //     console.log(resp)
      //     console.log('added pic to artwork')
      //     this.isFormSubmitting = true
      //     this.$message({
      //           message: 'Artwork added successfully.',
      //           type: 'success'
      //       })
      //     setTimeout(function(){window.location.reload(true)}, 4000)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     this.isFormSubmitting = true
      //     this.showError('Error', `Add Artwork Failed Status: ${err}`, 'warning')
      //   })
      // }
    },
    computed: {
      visible: {
        get() {
            return this.show;
        },
        set(newValue) {
            this.$emit("close") // let parent set this dialog to invisible
        }
      },
        isProductUpdated() {
            return this.product
        }
    },
    watch: {
        isProductUpdated (product) {
            console.log('productUpdated')
            this.form.name = product.name
            this.form.description = product.description
            this.form.price = product.price
            this.form.id = product.productId
        }
  },
    beforeMount () {
    this.$http.defaults.headers.common = {
      'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
    }
    console.log(this.$http.defaults.headers.common)
    console.log(this.product)
  }
}
</script>
