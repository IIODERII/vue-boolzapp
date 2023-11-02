import { contactList } from "./data.js";
import { autoAnswers } from "./data.js";
import { getRndInteger } from "./utility.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: contactList,
      activeContact: 1,
      newMessage: "",
      answers: autoAnswers,
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
      setTimeout(() => {
        this.autoAnswer();
      }, 1000);
    },

    autoAnswer() {
      this.contacts[this.activeIndex].messages.push({
        date: new Date().toLocaleString(),
        message: this.answers[getRndInteger(0, this.answers.length - 1)],
        status: "received",
      });
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
