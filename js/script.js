import { contactList } from "./data.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: contactList,
    };
  },
  methods: {},
  computed: {},
}).mount("#app");
