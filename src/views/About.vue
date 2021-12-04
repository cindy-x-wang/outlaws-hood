<template>
  <div class="about">
    <h1>About This Site</h1>
    <article style="text-align: justify">
      <vue-markdown :source='this.aboutMarkdown'></vue-markdown>
    </article>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { aboutText } from '../text/about'

export default {
  name: 'About',
  components: { VueMarkdown },
  data: function () {
    return {
      aboutMarkdown: aboutText
    }
  }
}
</script>