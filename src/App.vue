<template>
  <div id="app">
    <el-button icon="el-icon-search" @click="searchActive = true" circle></el-button>
    <transition name="fade">
      <div v-if="searchActive" class="search-container">
        <div class="close">
          <el-button icon="el-icon-close" @click="searchActive = false" circle></el-button>
        </div>
        <search-input ref="searchInput" @inputChange="search" @selectChange="values => { changePostType(values) }" @focused="suggestionsActive = true" @blurred="suggestionsActive = true" />
        <suggestions-list :active="suggestionsActive" :results="results" :postType="postType" />
      </div>
    </transition>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import SuggestionsList from './components/SuggestionsList'

export default {
  name: 'app',
  components: { SearchInput, SuggestionsList },
  data () {
    return {
      postType: '',
      results: {},
      suggestionsActive: false,
      searchActive: false,
      timeout: null
    }
  },
  computed: {
    postTypeUrl () { 
      return this.postType ? `?type=${this.postType}` : ''
    }
  },
  methods: {
    search (value) {
      clearTimeout(this.timeout)
      if(value) {
        this.timeout = setTimeout(() => {
          fetch(`http://bartoszjurkiewicz.com.pl/dev/vue-search/wp-json/vuesearch/v1/search/${value}${this.postTypeUrl}`)
          .then(res => {
            res.json().then(data => {
              this.suggestionsActive = true
              this.$set(this, 'results', data)
            })
          })
        }, 300)
      } else {
        this.suggestionsActive = false
        this.$set(this, 'results', {})
      }
    },
    changePostType (values) {
      this.postType = values.select
      this.search(values.input)
    }
  }
}
</script>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/element-ui@1.4.2/lib/theme-default/index.css");
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-select .el-input {
  width: 110px;
}
.search-container {
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 15rem 30rem;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: rgba(0,0,0,.6);
  z-index: 99;
  .close {
    align-self: flex-end;
    margin-bottom: 2rem;
  }
}
</style>
