
<template>
<div class="w-[100%] bg-gray-400">

  <div class="w-[100%]  flex items-center justify-center flex-col mx-auto container font-bold pt-[40px]"  >

    <span class="pb-[20px]">به صفحه محصولات خوش آمدید</span>
    <div class="flex gap-[5px] items-center justify-center pb-[10px] pr-[70%] search-container">
      <input class="search-input" v-model="searchQuery" type="text" placeholder="Search products" >
      <button class="search-button" @click="searchProducts">Search</button>


    </div>
    <button @click="addProduct()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:mr-[90%] sm:mr-[80%]">
      Add
    </button>
    <table   class="table-auto w-full mb-[60px]">
      <thead>
      <tr>
        <th class="px-4 py-2">options</th>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Category</th>
        <th class="px-4 py-2">Price</th>
      </tr>
      </thead>
      <tbody v-for="(item, i) in localProducts" :key="i">
      <tr >
        <td class="border md:px-4 md:py-2 flex flex-col  items-center justify-center gap-[4px]">
          <button  @click="deleteProduct(item.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold md:py-2 md:px-4 rounded  ">
            Delete
          </button>
          <button @click="editProduct(item)"  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold md:py-2 md:px-4 rounded ">
            Put
          </button>

        </td>
        <td class="border md:px-4 md:py-2">{{ item.title }}</td>
        <td class="border md:px-4 md:py-2">{{ item.category }}</td>
        <td class="border md:px-4 md:py-2 ">{{ item.price }}</td>


     <td>


     </td>


      </tr>

      </tbody>
    </table>
    <div class="w-[100%] bg-gray-400">
      <modalProduct
          :isOpen="isModalOpen"
          :product="selectedProduct"
          @submit="updateProduct"
          @close="closeModal"
      />
      <modalProduct
          :isOpen="ModalOpens"
          :product="moreProduct"
          @submit="plusProduct"
          @close="closeModals"
      />
    </div>

  </div>

</div>
</template>



<script setup lang="ts">
 import {useMarvelStore} from "~/stores/useMarvelStore ";
 import modalProduct from  '../../components/modalProduct/modalProduct.vue'
 import { watchEffect } from 'vue';
 import { onMounted, ref } from 'vue';
 const marvelStores=useMarvelStore();
 const data = ref([]);
 const localProducts = ref([]);
 const isDeletingProduct = ref(false);
 const isModalOpen = ref(false);
 const ModalOpens = ref(false);
 const selectedProduct = ref({});
 const moreProduct = ref({});
 const searchQuery=ref('')
 const searchProduct = ref([]);


 const searchProducts=()=>{
   marvelStores.searchProducts(searchQuery.value)
   localProducts.value = marvelStores.searchResults.products;
 }
 watch(searchQuery, () => {
   searchProducts();
 });


 const closeModal = () => {
   isModalOpen.value = false;
 };
 const closeModals = () => {
   ModalOpens.value = false;
 };

 onMounted(async () => {

   await  marvelStores.product();
   localProducts.value = marvelStores.products.products;

 });

 const deleteProduct = async (id) => {
   isDeletingProduct.value = true;
   try {
     await marvelStores.productDelete(id);
     await marvelStores.product(id);
     localProducts.value = localProducts.value.filter(product => product.id !== id);
   } catch (error) {
     console.error('Error deleting product:', error);
   } finally {
     isDeletingProduct.value = false;
   }
 };
 const addProduct = () => {
   moreProduct.value = {};
   ModalOpens.value = true;
 };
 const editProduct = (product) => {
   selectedProduct.value = product;
   isModalOpen.value = true;
 };

 const updateProduct = async () => {
   if (!selectedProduct.value) {
     console.error('Selected product is not defined');
     return;
   }
   try {
     await marvelStores.productPut(selectedProduct.value.id, selectedProduct.value);
     isModalOpen.value = false;
     localProducts.value = localProducts.value.map(product => product.id === selectedProduct.value.id ? selectedProduct.value : product);
   } catch (error) {
     console.error('Error updating product:', error);
   }
 };

 const plusProduct = async () => {
   try {
     await marvelStores.productAdd(moreProduct.value.title, moreProduct.value.category, moreProduct.value.price);
     const newProduct = {
       id: localProducts.value.length + 1,
       title: moreProduct.value.title,
       category: moreProduct.value.category,
       price: moreProduct.value.price,
     };
     localProducts.value.push(newProduct);
     ModalOpens.value = false;
     marvelStores.product();
   } catch (error) {
     console.error('Error adding product:', error);
   }
 };


</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%; /* تعیین عرض مودال */
  max-width: 500px; /* حداکثر عرض مودال */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); /* افزودن سایه به مودال */
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}


.btn_style{
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.close-modal-btn {
  margin-top: 10px; /* فاصله بالا */
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #dc3545; /* رنگ پس‌زمینه */
  color: white; /* رنگ متن */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-modal-btn:hover {
  background-color: #c82333;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

.search-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #0056b3;
}

</style>