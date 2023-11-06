import { contactList } from "./data.js";
import { autoAnswers } from "./data.js";
import { emoji } from "./data.js";
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
      size: 16,
      theme: "light",
      emojis: emoji,
      filterMessage: "",
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

        this.userOnline[this.activeIndex] = 2;

        setTimeout(() => {
          this.userOnline[this.activeIndex] = 1;
        }, 1000);

        this.$nextTick(() => {
          this.scrollDown();
        });

        setTimeout(() => {
          this.autoAnswer();
        }, 2500);
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

      this.$nextTick(() => {
        this.scrollDown();
      });
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

        const currentEmoji = this.$refs.emoji;
        currentEmoji.classList.add("d-none");

        const currentSearchMessage = this.$refs.searchMessage;
        currentSearchMessage.classList.add("d-none");
        this.filterMessage = "";
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

    bigger() {
      if (this.size < 30) {
        this.size++;
      }
    },

    smaller() {
      if (this.size > 8) {
        this.size--;
      }
    },

    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },

    toggleEmoji() {
      const currentEmoji = this.$refs.emoji;
      currentEmoji.classList.toggle("d-none");
    },

    toggleSearchMessage() {
      const currentSearchMessage = this.$refs.searchMessage;
      currentSearchMessage.classList.toggle("d-none");
    },

    filteredMessages() {
      return this.contacts[this.activeIndex].messages.filter((message) =>
        message.message.toLowerCase().includes(this.filterMessage.toLowerCase())
      );
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
