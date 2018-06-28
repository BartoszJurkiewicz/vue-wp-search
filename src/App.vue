<template>
  <div id="app">
    <search-input @inputChange="search" @selectChange="val => { postType = `?type=${val}` }" />
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
export default {
  name: 'app',
  components: { SearchInput },
  data () {
    return {
      postType: '',
      results: {},
      timeout: null
    }
  },
  methods: {
    search (value) {
      clearTimeout(this.timeout)
      if(value) {
        this.timeout = setTimeout(() => {
          fetch(`http://bartoszjurkiewicz.com.pl/dev/vue-search/wp-json/vuesearch/v1/search/${value}${this.postType}`)
          .then(res => {
            res.json().then(data => {
              this.$set(this, 'results', data)
            })
          })
        }, 300)
      }
    }
  }
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/element-ui@1.4.2/lib/theme-default/index.css");
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
