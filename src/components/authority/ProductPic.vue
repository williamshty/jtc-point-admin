<template>
  <div>
    <el-dialog title="Product Picture" :visible.sync="visible" width="30%" center>
    <img :src="this.$http.defaults.baseURL+'product/avatar/'+this.product.productId" width="80%" style="margin-left:10%">
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
      }
    },
    
    methods: {
      onSubmit() {
      },
      submitForm() {
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
