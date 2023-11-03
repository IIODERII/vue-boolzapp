import { contactList } from "./data.js";
import { autoAnswers } from "./data.js";
import { getRndInteger } from "./utility.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: contactList,
      activeContact: null,
      newMessage: "",
      answers: autoAnswers,
      searchContact: "",
      viewContacts: true,
      userOnline: [],
      newName: "",
      newAvatar: "",
      lastID: 8,
    };
  },
  methods: {
    onlyHour(date) {
      return date.slice(11, 16);
    },

    isActive(id) {
      return id === this.activeContact ? true : false;
    },

    lastMessage(contact) {
      if (contact.messages.length > 0) {
        return contact.messages[contact.messages.length - 1].message;
      } else {
        return "";
      }
    },

    lastDate(contact) {
      if (contact.messages.length > 0) {
        return contact.messages[contact.messages.length - 1].date;
      } else {
        return "";
      }
    },

    sendMessage() {
      if (this.newMessage !== "" && this.newMessage.trim().length > 0) {
        this.contacts[this.activeIndex].messages.push({
          date: new Date().toLocaleString(),
          message: this.newMessage,
          status: "sent",
        });
        this.newMessage = "";

        this.userOnline[this.activeIndex] = 1;

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

      this.userOnline[this.activeIndex] = 2;

      setTimeout(() => {
        this.userOnline[this.activeIndex] = 0;
      }, 2000);

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
      const element = this.$refs.chat;
      element.scroll({ top: element.scrollHeight, behavior: "smooth" });
    },

    toggleMenu(i) {
      const currentMenu = this.$refs.menu;
      for (let c = 0; c < currentMenu.length; c++) {
        currentMenu[c].classList.add("d-none");
      }
      currentMenu[i].classList.toggle("d-none");
    },

    toggleDelete() {
      const currentDelete = this.$refs.delete;
      if (this.activeContact !== null) {
        currentDelete.classList.toggle("d-none");
      }
    },

    removeDropDown() {
      if (this.activeContact !== null) {
        const currentMenu = this.$refs.menu;
        for (let c = 0; c < currentMenu.length; c++) {
          currentMenu[c].classList.add("d-none");
        }

        const currentDelete = this.$refs.delete;
        currentDelete.classList.add("d-none");
      }
    },

    removeMessage(i) {
      this.contacts[this.activeIndex].messages.splice(i, 1);
      this.toggleMenu(i);
    },

    emptyChat() {
      this.contacts[this.activeIndex].messages = [];
    },

    deleteContact() {
      this.contacts.splice(this.activeIndex, 1);
      this.activeContact = null;
    },

    addContact() {
      if (
        this.newAvatar !== "" &&
        this.newAvatar.trim().length > 0 &&
        this.newName !== "" &&
        this.newName.trim().length > 0
      ) {
        this.lastID++;
        this.contacts.push({
          id: this.lastID,
          name: this.newName,
          avatar: this.newAvatar,
          messages: [],
        });
        this.newName = "";
        this.newAvatar = "";

        setTimeout(() => {
          this.activeContact = this.lastID;
        }, 100);

        this.closePopup();
      }
    },

    closePopup() {
      const popup = this.$refs.popup;
      popup.classList.add("d-none");
    },

    openPopup() {
      const popup = this.$refs.popup;
      popup.classList.remove("d-none");
    },
  },
  mounted() {
    for (let i = 0; i < this.contacts.length; i++) {
      this.userOnline.push(0);
    }

    const splash = this.$refs.splash;
    setTimeout(() => {
      splash.classList.add("d-none");
    }, 1000);
  },
  computed: {
    activeIndex() {
      return this.contacts.findIndex(
        (contact) => contact.id === this.activeContact
      );
    },
  },
}).mount("#app");
