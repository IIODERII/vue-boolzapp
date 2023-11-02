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
  methods: {
    onlyHour(date) {
      return date.slice(11, 16);
    },
  },
  computed: {
    activeIndex() {
      return this.contacts.findIndex(
        (contact) => contact.id === this.activeContact
      );
    },
  },
}).mount("#app");
