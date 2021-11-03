<template>
  <div id="app">
    
    <!--<Budget />-->
    <budget-lines></budget-lines>
  </div>
</template>

<script>
//import Budget from './components/Budget.vue'
import BudgetLines from './components/BudgetLines.vue'

export default {
  name: 'App',
  components: {
    //Budget
    BudgetLines
  }
}
</script>

<style>

</style>
