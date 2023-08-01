<template>
  <div>
    <slot />

  </div>
</template>

<script setup>

useHead({ 
  title: "EasyNutrition", 
  meta: [
    {name: 'theme-color', content: '#121214'},
    {name: 'description', content: 'App web to calculate diet'},
    {name: 'author', content: ''},
    {name: 'keywords', content: 'diet,food,nutrition,fit,fitness,bodybuilding'},
    { httpEquiv: 'Content-Language', content: 'pt-BR' }
  ]
})

</script>

<style lang="scss" scoped>

</style>