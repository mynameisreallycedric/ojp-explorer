<script setup lang="ts">
interface Props {
  showDevMode: boolean
}

const props = defineProps<Props>();
</script>

<template>
  <div class="demo_layout--container grid grid-flow-col justify-center w-full mt-4">
    <div class="demo_layout--main_container">
      <div class="demo_layout--main_content">
        <slot name="main"></slot>
      </div>
    </div>
    <Transition name="transition-devmode">
    <div v-if="showDevMode" class="demo_layout--devMode_container">
      <div  class="demo_layout--devMode_content">
        <slot name="devMode"></slot>
      </div>
    </div>
    </Transition>
  </div>
</template>
<style scoped lang="scss">
@import "src/assets/scss/variables";

.demo_layout--container {
  grid-template-columns: 1fr 1fr;
}

.demo_layout--main_container{
  display: flex;
  justify-content: right;
}

.demo_layout--main_content{
  width: 700px;

}

.demo_layout--devMode_content {
  width: 700px;
}

.demo_layout--devMode_container {
  background: $pt-main-gray;
  display: flex;
  justify-content: left;
}

.transition-devmode-enter-active {
  transition: all 0.1s ease-in;
}

.transition-devmode-leave-active {
  transition: all 0.1s ease-out;
}

.transition-devmode-enter-to {
  opacity: 1;
}

.transition-devmode-enter-from,
.transition-devmode-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>