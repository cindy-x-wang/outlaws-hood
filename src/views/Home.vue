<template>
  <div class="home">
    <div v-if="viewingChar">
        <h1>
          {{this.viewingChar.name}}
        </h1>
        <div class="float-container">
          <div class="float-child">
            <vue-markdown :source='this.viewingChar.description'></vue-markdown>
          </div>
          <div class="float-child">
            <vSelect :options='this.viewingChar.dropdown' v-model="selected" style="width: 90%"></vSelect>
            <div v-if="selected">
              <vue-markdown :source="selected.description"></vue-markdown>
            </div>
          </div>
        </div>
    </div>
    <div v-else class="button-grid">
      <article class="character-button" v-for="(character, index) of characters" :key="character.charID">
        <CharacterButton 
          :character='character'
          :index=index
          :style="{ backgroundImage: 'url(' + character.image + ')' }"
        />
      </article>
    </div>
  </div>
</template>

<script>
import CharacterButton from '../components/CharacterButton.vue';
import { eventBus } from '../main';
import VueMarkdown from 'vue-markdown'
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';


export default {
  name: 'Home',
  components: { CharacterButton, VueMarkdown, vSelect },
  mounted: function() {
    this.refreshView();

    eventBus.$on('show-character-page', (data) => {
      //this.$router.push({ name: 'Freets', query: { following: data.following, sort: this.selectedSort } }).catch(()=>{});
      this.setViewingChar(data.character);
      console.log(data);
    });
  },
  beforeDestroy() {
    // removing eventBus listener
    eventBus.$off('show-character-page')
  },
  data () {
    return {
      selected: null,
      characters: [
        {
          name: "Sagacious Lu",
          description: "Sample story something something",
          dropdown: [
            {
              label: "a",
              description: "# header \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blahheader \n blah."
            },
            {
              label: "b",
              description: "# i'm b! \n blah **blah**."
            }
          ],
          charID: '1',
          image: "https://cdnb.artstation.com/p/assets/images/images/015/070/361/medium/shiwei-he-asset.jpg?1546950166",
        },
        {
          name: "Wu Song",
          description: "# **test** \n Sample storyyyyyy",
          charID: '2',
          image: "https://cdna.artstation.com/p/assets/images/images/033/028/544/medium/lee-yongchao-10.jpg?1608176909",
        },
        {
          name: "Robin Hood",
          description: "Sample storyyyyyy",
          charID: '3',
          image: "https://render.fineartamerica.com/images/rendered/default/print/7.5/8/break/images/artworkimages/medium/1/robin-hood-james-edwin-mcconnell.jpg",
        },
      ],
      viewingChar: undefined,
    }
  },
  methods: {
    refreshView() {
      let q = {};
      if (this.$route) {
        q = this.$route.query;
      }

      if (q.character) {
        let currentChar = this.characters.filter(char => char.charID === q.character)[0];
        if (currentChar) {
          this.viewingChar = currentChar;
        }
      } else {
        this.viewingChar = undefined;
      }
    },
    setViewingChar(character) {
      this.selected = null;
      this.viewingChar = character;
    },
  },
  watch:{
    $route (){
        this.refreshView();
    }
  },
}
</script>

<style scoped>
.button-grid {
  display: flex;  
  flex-wrap: wrap;
}
.float-container {
  display: flex;
}

.float-child {
  flex: 1;
}  
.float-child:first-child {
    margin-right: 20px;
} 
</style>
