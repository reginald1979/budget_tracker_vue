<template>
    <div class="panel">
       <form>  
           <div class="form-group">
               <label for="type">Choose line item type:</label>
               <select v-model="lineItem.type" class="form-control">
                   <option v-for="(option, i) in types" :value="option.value" :key="i">{{option.text}}</option>
               </select>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" v-model="lineItem.description" />
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <input type="text" class="form-control" v-model="lineItem.category" />
            </div>
            <div class="form-group">
                <label for="amount">Amount</label>
                <input type="number" class="form-control" v-model="lineItem.amount" />
            </div>
            <!--<button class="btn btn-primary" @click.prevent="handleSubmit">Save</button> <button class="btn btn-danger">Cancel</button>-->
        </form>
        
    </div>
    
</template>

<script>

import dataService from '../service/budgetService.js';

export default {

    name: 'Budget',
    data: ()=> {
        return {
            types: [
                {
                    text: "Income",
                    value: "income"
                },
                {
                    text: "Expense",
                    value: "expense"
                }
            ],
            lineItem: {
                description: "",
                amount: 0,
                category: "",
                type: ""
            },
            message: null
        }
    },
    methods: {
        async handleSubmit() {

            let response = await dataService.addBudgetLineItem(this.lineItem);
            //console.log(response);
            let message = response.data;
            this.clearData();
            return message;
        },
        clearData() {
            //alert("clearing data")
            this.lineItem.description = "";
            this.lineItem.amount = 0;
            this.lineItem.category = "";
            this.lineItem.type = "";
        }
    }
}
</script>

<style scoped>
    .panel {
        padding: 16px;
    }
</style>