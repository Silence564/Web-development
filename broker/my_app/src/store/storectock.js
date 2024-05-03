import {createSlice, configureStore} from "@reduxjs/toolkit";

const stockSlice = createSlice({
    name: 'stocks',
    initialState: [],
    reducers: {
        addStock: (state, action)=>{
            state.push(action.payload);
        },
        delStock: (state, action)=>{
            let i =0;
            for (let stock of state){
                if (stock === action.payload){ break;}
                ++i;
            }
            state.splice(i, 1);
        }
    }
});

const {addStock, delStock} = stockSlice.actions
const storeStocks = configureStore({
    reducer: stockSlice.reducer
});
storeStocks.subscribe(()=> console.info(storeStocks.getState()))

export {addStock, delStock, storeStocks}