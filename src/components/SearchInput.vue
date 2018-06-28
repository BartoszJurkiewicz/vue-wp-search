<template>
  <div class="search-input-container">
    <el-input v-model="input" placeholder="Search" @input="$emit('inputChange', input)" @focus="$emit('focused')" @blur="$emit('blurred')">
      <el-select v-model="select" slot="prepend" placeholder="Post type" @change="$emit('selectChange', {select: select, input: input})" clearable>
        <el-option label="Page" value="page"></el-option>
        <el-option label="Post" value="post"></el-option>
      </el-select>
      <el-button slot="append" icon="el-search-icon"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data () {
    return {
      input: '',
      select: ''
    }
  }
}
</script>
