<template>
  <li class="suggestion" :class="suggestionData.slug">
    <a :href="suggestionData.permalink">
      {{suggestionData.title}}
    </a>
  </li>
</template>

<script>
export default {
  name: 'Suggestion',
  props: [ 'suggestionData' ]
}
</script>
