<template>
    <div>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { useMainStore } from '../stores/store.js';
  
  export default {
    setup() {
      const mainStore = useMainStore();
      return { ...mainStore };
    }
  };
  </script>