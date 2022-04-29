<template>
  <div class="home">
    <img style="display: none;" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld style="display: none;" msg="Welcome to Your Vue.js + TypeScript App"/>
    <p>Select either the Primals or Subprimals game to get started.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
});
</script>
