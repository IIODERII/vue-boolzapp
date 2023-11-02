import { contactList } from "./data.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: contactList,
      lastID: 8,
      activeContact: 1,
    };
  },
  methods: {},
  computed: {},
}).mount("#app");
