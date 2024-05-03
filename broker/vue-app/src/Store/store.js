import { createStore } from "vuex";
const User = createStore({
    state(){
        return{
            nameU: localStorage.getItem('user'),
            money: 0,
            stocks: [],
            admin: false,
            photo: 5
        }
    },
    getters:{
        get_stocks(state){
            return state.stocks;
        },
        get_stock: (state) => (name) => {
            for (const item of state.stocks){
                if(item.stock === name){
                    return{
                        set: true,
                        count: item.count,
                        cost: item.bought
                    }
                }
            }
            return {
                set: false,
                count:0,
                cost: 0
            };
        }
    },
    mutations: {
        set_user (state) {
            state.nameU = localStorage.getItem('user');
            if (!state.nameU){return;}
            fetch('http://localhost:4000/getbroker' + state.nameU)
                .then(res => res.json())
                .then(data => {
                    state.money = data.money;
                    state.stocks = data.stocks;
                    state.admin = data.admin;
                    state.photo = data.photo;
                });
        }
    }
})

export default User