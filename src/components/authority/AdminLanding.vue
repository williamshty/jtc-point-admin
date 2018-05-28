<template>
  <div class="" v-loading="isLoading">
    <authority-header></authority-header>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content">
          <el-button class="btn--add" type="primary" icon="el-icon-plus" @click="displayAddProduct = true">Add New Product</el-button>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="productId" label="Product ID" sortable>
            </el-table-column>
            <el-table-column prop="name" label="Product Name" sortable>
            </el-table-column>
            <el-table-column prop="inventory" label="Stock" sortable>
            </el-table-column>
            <el-table-column prop="price" label="Price" sortable>
            </el-table-column>
            <el-table-column label="View Picture">
              <template slot-scope="scope">
                <el-button class="btn--show"
                @click="showProductPic(scope.row)">
                Show</el-button>
              </template>
            </el-table-column>
            <el-table-column label="Update">
              <template slot-scope="scope">
                <el-button class="btn--update"
                @click="editProduct(scope.row)">
                Update</el-button>
              </template>
            </el-table-column>
            <el-table-column label="Restock">
              <template slot-scope="scope">
                <el-button class="btn--restock"
                @click="restockProduct(scope.row)">
                Add</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <add-new-product
    :show="displayAddProduct"
    @close="closeDialogs()"
    ></add-new-product>
    <edit-product
    :show="displayEditProduct"
    :product="productToEdit"
    @close="closeDialogs()">
    </edit-product>
    <restock-product
    :show="displayRestockProduct"
    :product="productToEdit"
    @close="closeDialogs()">
    </restock-product>
    <product-pic
    :show="displayProductPic"
    :product="productToEdit"
    @close="closeDialogs()">
    </product-pic>
  </div>
</template>
<script>
import AuthorityHeader from './AuthorityHeader'
import AddNewProduct from './AddNewProduct'
import EditProduct from './EditProduct'
import RestockProduct from './RestockProduct'
import ProductPic from './ProductPic'
export default {
  data () {
    return {
      isLoading: true,
      displayAddProduct: false,
      tableData: [],
      currentProductId: '',
      displayEditProduct: false,
      displayRestockProduct: false,
      productToEdit: '',
      displayProductPic: false
    }
  },
  methods: {
    showProductPic (product) {
      console.log(product)
      this.productToEdit = product
      this.displayProductPic = true
    },
    restockProduct (product) {
      console.log(product)
      this.productToEdit = product
      this.displayRestockProduct = true
    },
    editProduct (product) {
      console.log(product)
      this.productToEdit = product
      this.displayEditProduct = true
    },
    viewHistory (productId) {
      console.log(`History for ID: ${productId}`)
    },
    viewDetails (productId) {
      console.log('view details')
      this.$router.push(`/product/${productId}`)
    },
    addDocument (productId) {
      console.log(`Add document for ID: ${productId}`)
      this.currentProductId = productId
      this.displayEditProduct = true
    },
    loadAllProducts () {
      console.log(`Loading All Products`)
      this.$http
        .get('/product')
        .then(resp => {
          console.log(resp)
          this.tableData = resp.data
          for (let entry of this.tableData) {
            entry['updateStock'] = false
          }
          console.log(this.tableData)
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    closeDialogs () {
      this.displayAddProduct = false
      this.displayEditProduct = false
      this.displayRestockProduct = false
      this.displayProductPic = false
      // window.location.reload(true)
    }
  },
  components: {
    AuthorityHeader,
    AddNewProduct,
    EditProduct,
    RestockProduct,
    ProductPic
  },
  beforeMount () {
    this.$http.defaults.headers.common = {
      'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
    }
    console.log(this.$http.defaults.headers.common)
    this.loadAllProducts()
  }
}
</script>
<style>
html{
}
</style>

<style scoped>
.el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .btn--add {
    position: relative;
    padding-bottom: 0;
    left: 50%;
    transform: translate(-50%,50%);
    background-color: #68C3A3;
    color: #ffffff;
    border-color: #68C3A3;
  }
  .btn--show {
    background-color: #913D88;
    color: #ffffff;
    border-color: #913D88;
  }
  .btn--update {
    background-color: #96281B;
    color: #ffffff;
    border-color: #96281B;
  }
  .btn--restock {
    background-color: #D35400;
    color: #ffffff;
    border-color: #D35400;
  }
</style>
