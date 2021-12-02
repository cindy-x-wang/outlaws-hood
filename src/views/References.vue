<template>
  <div class="references" style="text-align: center">
    <h1>Literary Sources</h1>
    <article style="text-align: justify">
      <vue-markdown :source='this.referencesMarkdown'></vue-markdown>
    </article>

    <h1>Image Sources</h1>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { references } from '../text/references'

export default {
  name: 'References',
  components: { VueMarkdown },
  data: function () {
    return {
      referencesMarkdown: references
    }
  }
}
</script>