<template>
  <div class="home">
    <div class="togglebox">

      <!-- Rounded switch -->
      <span style="text-align: center; vertical-align: middle; font-size: 20px">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outlaws of the Marsh &nbsp; &nbsp;
      </span>
      <label class="switch">
        <input type="checkbox" v-model="viewRobinhoodVersion" @change="refreshPerspectiveQuery">
        <span class="slider round"></span>
      </label>
      <span style="text-align: center; vertical-align: middle; font-size: 20px">
        &nbsp; The Merry Adventures of Robin Hood
      </span>
    </div>
    <div v-if="selectedStory">
      <div 
        class="back-button icon" 
        @click="$router.push({name: 'Home'})">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
        <span style="margin: 5px">Back to Home</span>
      </div>
      
      <h1 v-if="viewRobinhoodVersion">
          {{this.selectedStory.name.robinhood}}
      </h1>
      <h1 v-else>
          {{this.selectedStory.name.outlaw}}
      </h1>
      <h3 v-if="viewRobinhoodVersion">
        bolded text from <i>Outlaws of the Marsh</i>
      </h3>
      <h3 v-else>
        bolded text from <i>The Merry Adventures of Robin Hood</i>
      </h3>
      <div class="float-container">
        <div class="float-child" style="text-align: justify">
          <vue-markdown :source='this.effectiveStorySet.outlaw'></vue-markdown>
        </div>
        <div class="float-child" style="text-align: justify">
          <vue-markdown :source='this.effectiveStorySet.robinhood'></vue-markdown>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
          <div class="callout primary" 
          :class="'grid-' + Number(index+1) + ' grid-child'" 
          v-for="(story, index) in this.stories" 
          v-bind:key="story.name.robinhood"
          style=" background-position: center;"
          v-bind:style="{ 'background-image': 'url(' + (viewRobinhoodVersion ? story.images.robinhood : story.images.outlaw) + ')' }"
          @click="selectStoryIndex(index)"
          >
            <div class="hover-text">
              <span v-if="viewRobinhoodVersion">{{story.name.robinhood}}</span>
              <span v-else>{{story.name.outlaw}}</span>
            </div>
          </div>
      </div>

    </div>
    <!-- <div v-if="viewingChar">
        <h1>
          {{this.viewingChar.name}}
        </h1>
        <div class="float-container">
          <div class="float-child" style="text-align: justify">
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
    </div> -->
  </div>
</template>

<script>
// import CharacterButton from '../components/CharacterButton.vue';
import { eventBus } from '../main';
import { sagaciousLuPummels, sagaciousLuPummels_RobinStyle, robinHood_becomeOutlaw, robinPummels_SagaciousStyle } from '../text/SagaciousLuPummels';
import { WillStutely_robin, ChaoGai, WillStutely_outlaws, ChaoGai_robin } from '../text/WillStutely';
import { SagaciousMeat, FriarTuck, SagaciousMeat_friar, FriarTuck_outlaw } from '../text/FriarTuck';
import { SagaciousTree, RobinFeast, WillowTree_robin, RobinFeast_sagacious } from '../text/WillowTree';
import VueMarkdown from 'vue-markdown';
// import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';


export default {
  name: 'Home',
  components: { VueMarkdown },
  mounted: function() {
    this.refreshView();

    eventBus.$on('reset', () => {
      this.selectedStory = null;
    });

    eventBus.$on('show-character-page', (data) => {
      //this.$router.push({ name: 'Freets', query: { following: data.following, sort: this.selectedSort } }).catch(()=>{});
      this.setViewingChar(data.character);
      console.log(data);
    });
  },
  beforeDestroy() {
    // removing eventBus listener
    eventBus.$off('show-character-page')
    eventBus.$off('reset')
  },
  data () {
    return {
      selected: null,
      selectedStory: null,
      viewRobinhoodVersion: false,
      stories: [
        {
          name: {
            robinhood: "How Robin Hood Came to Be an Outlaw",
            outlaw: "Major Lu Pummels the Lord of the West"
          },
          quotes: {
            outlaw: {
              original: sagaciousLuPummels,
              translated: sagaciousLuPummels_RobinStyle
            },
            robinhood: {
              original: robinHood_becomeOutlaw, 
              translated: robinPummels_SagaciousStyle
            }
          },
          images: {
            outlaw: "https://cdnb.artstation.com/p/assets/images/images/015/070/361/medium/shiwei-he-asset.jpg?1546950166",
            robinhood: "https://cdn.shopify.com/s/files/1/0350/3446/4395/products/RobinHood-ColoringBookRachelMintz1_5_grande.jpg?v=1601717007"
          }
        },
        {
          name: {
            robinhood: "Robin Hood’s Feast",
            outlaw: "The Tattooed Monk and His Band"
          },
          quotes: {
            outlaw: {
              original: SagaciousTree,
              translated: WillowTree_robin
            },
            robinhood: {
              original: RobinFeast, 
              translated: RobinFeast_sagacious
            }
          },
          images: {
            outlaw: "https://alchetron.com/cdn/lu-zhishen-076ba24d-8d39-4cbb-9073-42ffbd4a643-resize-750.jpg",
            robinhood: "https://media.britishmuseum.org/media/Repository/Documents/2014_11/8_18/55b7e19c_b32f_46d6_aee6_a3dd012d4535/preview_01392619_001.jpg"
          }
        },
        {
          name: {
            robinhood: "Will Stutely Rescued by His Companions",
            outlaw: "Song Jiang Secretly Helps Ward Chief Chao Flee"
          },
          quotes: {
            outlaw: {
              original: ChaoGai,
              translated: ChaoGai_robin
            },
            robinhood: {
              original: WillStutely_robin, 
              translated: WillStutely_outlaws
            }
          },
          images: {
            outlaw: "https://cdnb.artstation.com/p/assets/images/images/015/064/617/large/shiwei-he-asset.jpg?1546924155",
            robinhood: "https://media.britishmuseum.org/media/Repository/Documents/2014_11/8_18/4371b2aa_d233_400b_a766_a3dd012da65d/mid_01392627_001.jpg"
          }
        },
        {
          name: {
            robinhood: "Robin Hood Seeks the Curtal Friar",
            outlaw: "Sagacious Lu Puts Mount Wutai in an Uproar"
          },
          quotes: {
            outlaw: {
              original: SagaciousMeat,
              translated: SagaciousMeat_friar
            },
            robinhood: {
              original: FriarTuck, 
              translated: FriarTuck_outlaw
            }
          },
          images: {
            outlaw: "https://alchetron.com/cdn/lu-zhishen-c1a5c2f8-b3e9-40c9-9982-5e0a6d249c4-resize-750.jpeg",
            robinhood: "https://media.britishmuseum.org/media/Repository/Documents/2014_10/12_21/b83f5cfc_8191_462c_9fc6_a3c20168fa8c/mid_00767199_001.jpg"
          }
        }
      ],
      characters: [
        {
          name: "Sagacious Lu",
          description: sagaciousLuPummels,
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
    refreshPerspectiveQuery () {
      this.$nextTick(function () {
        this.$router.push({ query: { perspective: this.viewRobinhoodVersion ? 'robinhood' : 'outlaw' } })
      });
    },
    selectStoryIndex (index) {
      this.$router.push({ name: 'Story', params: { id: index+1 } })
    },
    refreshView() {
      let q = {};
      if (this.$route) {
        q = this.$route.query;
      }

      if (this.$route.params.id) {
        this.selectedStory = this.stories[Number.parseInt(this.$route.params.id)-1]
      } else {
        this.selectedStory = null;
      }

      if (q.perspective) {
        this.viewRobinhoodVersion = q.perspective === 'robinhood';
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
  computed: {
    effectiveStorySet: function() {
      if (!this.selectedStory) {
        return false;
      }
      if (this.viewRobinhoodVersion) {
        return {
          outlaw: this.selectedStory.quotes.outlaw.translated,
          robinhood: this.selectedStory.quotes.robinhood.original
        }
      } else {
        return {
          outlaw: this.selectedStory.quotes.outlaw.original,
          robinhood: this.selectedStory.quotes.robinhood.translated
        }
      }
    },
  }
}
</script>

<style scoped>


.container {
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: (1fr)[2];
      grid-template-rows: repeat(2, 1fr);
  -ms-grid-columns: (1fr)[4];
      grid-template-columns: repeat(4, 1fr);
  width: calc(100vw-200px);
  height: 80vh;
}

@media screen and (max-width: 60em) {
  .container {
    -ms-grid-rows: (1fr)[4];
        grid-template-rows: repeat(4, 1fr);
  }
}

.grid-1 {
  -ms-grid-column: 1;
      grid-column-start: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
      grid-row: 1;
}

@media screen and (max-width: 60em) {
  .grid-1 {
    -ms-grid-column: 1;
        grid-column-start: 1;
    grid-column-end: 5;
    -ms-grid-row: 1;
        grid-row: 1;
  }
}

.grid-2 {
  -ms-grid-column: 3;
      grid-column-start: 3;
  grid-column-end: 5;
  -ms-grid-row: 1;
      grid-row: 1;
}

@media screen and (max-width: 60em) {
  .grid-2 {
    -ms-grid-column: 1;
        grid-column-start: 1;
    grid-column-end: 5;
    -ms-grid-row: 2;
        grid-row: 2;
  }
}

.grid-3 {
  -ms-grid-column: 1;
      grid-column-start: 1;
  grid-column-end: 3;
  -ms-grid-row: 2;
      grid-row: 2;
}

@media screen and (max-width: 60em) {
  .grid-3 {
    -ms-grid-column: 1;
        grid-column-start: 1;
    grid-column-end: 5;
    -ms-grid-row: 3;
        grid-row: 3;
  }
}

.grid-4 {
  -ms-grid-column: 3;
      grid-column-start: 3;
  grid-column-end: 5;
  -ms-grid-row: 2;
      grid-row: 2;
}

@media screen and (max-width: 60em) {
  .grid-4 {
    -ms-grid-column: 1;
        grid-column-start: 1;
    grid-column-end: 5;
    -ms-grid-row: 4;
        grid-row: 4;
  }
}

.callout {
  margin: 0;
  background-size: cover;
  background-repeat: no-repeat;
}

.button-grid {
  display: flex;  
  flex-wrap: wrap;
}
.float-container {
  display: flex;
  margin: 36px;
}

.float-child {
  flex: 1;
  margin: 24px;
  border: thick double #32a1ce;
  padding: 12px;
}  
.float-child:first-child {
    margin-right: 20px;
} 

.hover-text {
  display: none;
  width: 100%;
  height: 100%;
  background: white;
  opacity: .5;
  font-size: 30px;
}

.callout:hover .hover-text {
  display: block;
}

.back-button {
  display: flex;
  align-items: center;
  line-height: 20px;
  cursor: pointer;
  max-width: 140px;
  opacity: .8;
}

.back-button:hover {
  cursor: pointer;
  text-decoration: underline;
  opacity: 1;
}

.grid-child {
  border-radius: 15px;
  margin: 8px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.togglebox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

</style>
