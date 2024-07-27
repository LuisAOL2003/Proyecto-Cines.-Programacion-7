import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    message: 'Hello Pinia!'
  })
});