import * as axios from 'axios';

const budgetService = {
    getBudgetLines: async () => {
        try {
            let response = await axios.get(`http://localhost:5000/budgetLines`);

            let data = [];
            if(response.status != 200 || !response.data)
                return data;
            else
                data = response.data.map(i => {
                    i.createdAt = new Date(i.createdAt).toDateString();
                    i.amount = i.type == 'expense' ? i.amount * -1 : i.amount;
                    return i;
                })

            return response.data;

        }
        catch(err) {
            console.log(err);
            return null;
        }
    },
    getBugetLinesForUser: () => {
        return undefined;
    },
    deleteBudgetLine: async (id) => {
        try {
            let response = await axios.delete(`http://localhost:5000/budgetLines/${id}`);
            return response.data;
        }
        catch(err) {
            console.log(err);
            return null;
        }
    },
    addBudgetLineItem: async (lineItem) => {
        try {
            let response = await axios({
                method: 'post',
                url: 'http://localhost:5000/budgetlines/add',
                data: {
                    type: lineItem.type,
                    description: lineItem.description,
                    category: lineItem.category,
                    amount: lineItem.amount,
                    user_id: "6179b842b8873f1c8ec6b24f"
                }
            });
            
            return response;
        }
        catch(err) {
            console.log(err);
            return null;
        }
    }
}



export default budgetService;

