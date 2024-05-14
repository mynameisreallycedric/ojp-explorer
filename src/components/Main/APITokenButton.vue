<script setup lang="ts">

import {computed, ref} from "vue";
import Modal from "@/components/Main/Modal.vue";
import {useAuthStore} from "@/stores/auth";
import Button from "@/components/Main/Controls/MainButton.vue";
import MainButton from "@/components/Main/Controls/MainButton.vue";

const authStore = useAuthStore();

const validateToken = computed(() => ({
  isTokenSet: !!authStore.ojpToken,
  response: ( authStore.ojpToken ? "API Key" : " Set API Key" ),
  imageUrl: ( authStore.ojpToken ? "/src/assets/icons/bubble_valid.svg" : undefined )
}));

const isModalOpened = ref<boolean>(false);

const openModal = () => {
  isModalOpened.value = true;
  document.body.style.overflow = "hidden";
};
const closeModal = () => {
  isModalOpened.value = false;
  document.body.style.overflow = "visible";
};

</script>

<template>
  <MainButton mainIconURL="/src/assets/icons/key_outline.svg"
              :text="validateToken.response"
              @click="openModal"
              :secondaryIconURL="validateToken.imageUrl" />
  <Modal :show-modal="isModalOpened" @modal-close="closeModal">
    <div class="modal__token_input">
      <h3>Your API Key</h3>
      <p>For the API to work you need to create an API Key on the OJP Developer Portal</p>
      <input class="token-input" type="text" v-model="authStore.ojpToken" placeholder="ojp-token" />
      <a href="https://opentransportdata.swiss/en/dev-dashboard/">Get a new Token</a>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.button_container {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  background: $pt-main-white;
  padding: 8px;
  gap: 10px;
  font-family: 'Inter Bold';
}

.modal__token_input{
  padding: 2rem;
  background: $pt-main-white;
  border-radius: 15px;
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
}

.token-input {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  padding: 9px;
  width: 500px;
  margin-bottom: 2rem;
}



</style>