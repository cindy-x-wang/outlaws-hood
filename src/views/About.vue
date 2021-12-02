<template>
  <div class="about">
    <h1>This is an about page</h1>
    <article>
      <vue-markdown :source='this.aboutMarkdown'></vue-markdown>
    </article>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'About',
  components: { VueMarkdown },
  data: function () {
    return {
      aboutMarkdown: `# important!
       blah.`
    }
  }
}
</script>