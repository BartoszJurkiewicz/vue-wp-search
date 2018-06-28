<template>
  <transition name="fade">
    <el-card v-if="active && resultsLength > 0" class="suggestions-container">
      <ul>
        <li v-if="results.categories.length > 0">
          <p class="title">Categories</p>
          <ul class="categories">
            <suggestion v-for="category in results.categories" :key="category.slug" :suggestion-data="category" />
          </ul>
        </li>
        <li v-if="results.posts.length > 0">
          <p class="title">{{postType || 'Pages/posts'}}</p>
          <ul class="posts">
            <suggestion v-for="post in results.posts" :key="post.slug" :suggestion-data="post" />
          </ul>
        </li>
      </ul>
    </el-card>
  </transition>
</template>

<script>
import Suggestion from './Suggestion'

export default {
  name: 'SuggestionsList',
  props: [ 'active', 'results', 'postType' ],
  components: { Suggestion },
  computed: {
    resultsLength () {
      return Object.keys(this.results).map(type => {
        return this.results[type].length
      }).reduce((a,b) => {
        return a + b
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.suggestions-container {
  font-size: 1.4rem;
  ul {
    list-style-type: none;
  }
  .title {
    margin: 1rem 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
    text-transform: capitalize;
    font-size: 2rem;
  }
}
</style>
