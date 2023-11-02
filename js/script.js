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
      searchContact: "",
      showMenu: false,
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
      if (this.newMessage !== "") {
        this.contacts[this.activeIndex].messages.push({
          date: new Date().toLocaleString(),
          message: this.newMessage,
          status: "sent",
        });
        this.newMessage = "";

        setTimeout(() => {
          this.scrollDown();
        }, 10);

        setTimeout(() => {
          this.autoAnswer();
        }, 1000);
      }
    },

    autoAnswer() {
      this.contacts[this.activeIndex].messages.push({
        date: new Date().toLocaleString(),
        message: this.answers[getRndInteger(0, this.answers.length - 1)],
        status: "received",
      });

      setTimeout(() => {
        this.scrollDown();
      }, 10);
    },

    filteredContacts() {
      return this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.searchContact.toLowerCase())
      );
    },

    scrollDown() {
      const element = document.querySelector(".chat");
      element.scroll({ top: element.scrollHeight, behavior: "smooth" });
    },

    toggleMenu(i) {
      const currentMenu = document.getElementsByClassName("menu")[i];
      currentMenu.classList.toggle("d-none");
    },

    removeMessage(i) {
      this.contacts[this.activeIndex].messages.splice(i, 1);
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
