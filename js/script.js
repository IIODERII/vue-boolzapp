import { contactList } from "./data.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: contactList,
      lastID: 8,
      activeContact: 1,
      newMessage: "",
    };
  },
  methods: {
    onlyHour(date) {
      return date.slice(11, 16);
    },

    isActive(id) {
      return id === this.activeContact ? true : false;
    },

    sendMessage() {
      this.contacts[this.activeIndex].messages.push({
        date: new Date().toLocaleString(),
        message: this.newMessage,
        status: "sent",
      });
      this.newMessage = "";
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
