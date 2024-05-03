import { createStore } from 'vuex'
import {socket} from "../socket.js";

const stocksS = createStore({
    state () {
        return {
            lastUpdate: []
            /*{
                date: String,
                stock: String,
                cost: String,
                ratio: Number
            }*/
        }
    },
    getters: {
        get_update (state) {
            return state.lastUpdate;
        },
        getLastDate(state) {
            if (state.lastUpdate.length)
                return state.lastUpdate[0].date;
            return '';
        },
        getStockCost: (state) => (name) => {
            for (const stock of state.lastUpdate) {
                if(stock.stock === name)
                    return parseFloat(stock.cost);
            }
            return 0;
        }
    },
    mutations:{
        set_update(state, update) {
            state.lastUpdate = update;
        }
    }
})

socket.on('tradeStarted', (message) => stocksS.commit('set_update', message));

export default stocksS
