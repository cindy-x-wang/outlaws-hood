<template>
  <div class="character-button" @click="showCharacterPage">
    <div class="hover-text">
      {{this.character.name}}
    </div>
    
  </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    name: 'CharacterButton',
    components: {
      
    },
    props: ["character"],
    data () {
        return {
            errorMessage: '',
            details: "hi",
            status: "bye",
        }
    },
    mounted() {
      
    },
    methods: {
      showCharacterPage() {
        // this.$router.push({ path: `/user/${this.character.charID}` }) 
        this.$router.push({ name: 'Home', query: { character: this.character.charID}}).catch(()=>{});
        eventBus.$emit('show-character-page', {character: this.character});
      }
    }
}
</script>

<style>
.character-button {
  width: 260px;
  height: 260px;
  margin: 12px 0px;
  background: skyblue;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
}

.hover-text {
  display: none;
  width: 100%;
  height: 100%;
  background: white;
  opacity: .5;
  font-size: 30px;
}

.character-button:hover .hover-text {
  display: block;
}
</style>
