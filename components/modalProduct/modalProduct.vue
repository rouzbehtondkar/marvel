<!-- ProductModal.vue -->
<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content">
      <h2>ویرایش محصول</h2>
      <form @submit.prevent="submitForm">
        <label>
          عنوان:
          <input v-model="product.title" type="text" required class="w-[100%]" />
        </label>
        <label>
          دسته‌بندی:
          <input v-model="product.category" type="text" required class="w-[100%]" />
        </label>
        <label>
          قیمت:
          <input v-model="product.price" type="number" required class="w-[100%]" />
        </label>
        <button class="btn_style" type="submit">به‌روزرسانی</button>
        <button type="button" @click="closeModal" class="close-modal-btn">بستن</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  product: Object,
  onSubmit: Function,
  onClose: Function,
});

const closeModal = () => {
  props.onClose();
};

const submitForm = () => {
  props.onSubmit(props.product);
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

</style>
