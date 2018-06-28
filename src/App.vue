<template>
  <div id="app">
    <search-input @inputChange="search" @selectChange="values => { changePostType(values) }" @focused="suggestionsActive = true" @blurred="suggestionsActive = false" />
    <suggestions-list :active="suggestionsActive" :results="results" :postType="postType" />
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

<style>
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
</style>
