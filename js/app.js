const App = {
  data() {
    return {
      title: "Programmer memes",
      subTitle: "Make programmer memes great again!",
      allMemes: [],
      currentUserMemes: [],
    };
  },
  async created() {
    await this.fetchMemes();
    this.generateMemes();
  },
  methods: {
    async fetchMemes() {
      response = await fetch("./db/db.json", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      data = await response.json();
      // console.log("data: ", data.memes);
      this.allMemes = data.memes;
    },
    generateMemes() {
      const chosenMemesId = new Set();
      const chosenMemes = new Set();
      const allMemesId = this.allMemes.map((item) => item.id);

      let memeId = 0;
      while (chosenMemesId.size !== 6) {
        memeId++;
        if (!chosenMemesId.has(this.allMemes[memeId].id)) {
          chosenMemesId.add(this.allMemes[memeId].id);
          chosenMemes.add(this.allMemes[memeId]);
        }
      }
      
      const arrayChosenMemes = [...chosenMemes];
      // console.log("arrayChosenMemes: ", arrayChosenMemes);
      this.currentUserMemes = arrayChosenMemes;
    },
  },
};

const app = Vue.createApp(App);

app.mount("#app");
