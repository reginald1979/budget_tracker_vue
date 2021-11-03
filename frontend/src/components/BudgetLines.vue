<template>
    <div class="wrapper">
        <div class="alert alert-success alert-dismissible fade show" v-if="message">
                {{message}}
            <button type="button" class="btn-close" @click.prevent="clearMessage" data-bs-dismiss="alert"></button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="(item, i) in budgetLines" :key="i">
                <td>{{item.type}}</td>
                <td>{{item.description}}</td>
                <td :style="[item.type=='expense'? {'color':'red'} : '']">${{item.amount}}</td>
                <td>{{item.createdAt}}</td>
                <td><b-icon icon="trash" @click.prevent="handleDelete(item._id)"></b-icon></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td><strong>Total</strong></td>
                    <td>${{total}}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>

       <div>
        <b-button v-b-modal.new-line-modal class="btn-success"><b-icon icon="cash-stack" @click.prevent="handleDelete(item._id)"></b-icon>&nbsp;&nbsp;Add Line</b-button>

        <b-modal id="new-line-modal" title="Add Line">
            <div>
                <budget ref="budgetRef"></budget>
            </div>
            <template #modal-footer="{ cancel}">
      
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="sm" variant="success" @click="submitBudget()">
                    Save
                </b-button>
                <b-button size="sm" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
     
            </template>
        </b-modal>
        </div>

    </div>
</template>

<script>

import budgetService from '../service/budgetService'
import Budget from './Budget.vue'

export default {
  components: { Budget },
    name: 'BudgetLines',
    data: ()=> {
        return {
            budgetLines: [],
            showNewModal: false,
            total: 0,
            message: ""
        }
    },
    methods: {
        handleNewLine() {
            this.showNewModal = !this.showNewModal;
        },
        async handleDelete(id) {
            let value = await this.$bvModal.msgBoxConfirm('Are you sure you want to delete this budget line?');
            if(value) {
                this.message = await budgetService.deleteBudgetLine(id);
                await this.refreshData();
            }
        },
        async submitBudget() {    
            let message = await this.$refs.budgetRef.handleSubmit();
            this.message = message;
            this.$bvModal.hide('new-line-modal');
            this.refreshData();
        },
        async refreshData() {
            this.budgetLines = await budgetService.getBudgetLines();
            this.sumAllLines();
        },
        sumAllLines() {
            let sum = 0;
            this.budgetLines.forEach(element => {
                sum += element.amount;
            });
            sum = sum.toFixed(2);
            this.total = sum;
        },
        clearMessage() {
            this.message = "";
        }
    },
    async created() {
        this.budgetLines = await budgetService.getBudgetLines();
        this.sumAllLines();
        //console.log(this.budgetLines);
    }
}
</script>

<style scoped>
    .wrapper {
        margin:20px;
    }

</style>