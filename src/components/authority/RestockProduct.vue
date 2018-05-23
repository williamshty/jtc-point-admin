<template>
  <div>
    <el-dialog v-loading="isFormSubmitting" title="Restock Product" :visible.sync="visible" width="50%" center>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="Stock to Add" required>
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">Add</el-button>
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
         amount: '',
         id: ''
        },
        fileId: '',
        isFormSubmitting: false,
        fileName: ''
      }
    },
    
    methods: {
      onSubmit() {
      },
      submitForm() {
        this.isFormSubmitting = true
        const body = this.form
        console.log('submission starts below')
        this.$http
        .put("admin/restock", body)
        .then(resp => {
          console.log(resp)
          this.isFormSubmitting = false
          // this.addPicToArtwork()
        })
        .catch(err => {
          console.log(err)
        //   this.showError('Error', `Add Artwork Failed Status: ${err}`, 'warning')
          this.isFormSubmitting = false
          console.log(this.isFormSubmitting)
        })
      }
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
