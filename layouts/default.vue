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
    {name: 'description', content: 'Aplicativo simples que calcula os macronutrientes necessários que devem ser ingeridos diariamente.'},
    {name: 'author', content: 'Luiz'},
    {name: 'keywords', content: 'dieta,comida,nutricao,fitness,,bodybuilding'},
    {httpEquiv: 'content-language', content: 'pt-BR'}
  ]
})
</script>