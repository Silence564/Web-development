import {createSlice, configureStore} from "@reduxjs/toolkit";

const brokerSlice = createSlice({
    name: 'brokers',
    initialState: [],
    reducers: {
        load: (state, action) => {
            for (let key in action.payload){
                state.push({id: key, value: action.payload[key]});
            }
        }
    }
});

const { load } = brokerSlice.actions

const storeBrokers = configureStore({
    reducer: brokerSlice.reducer
});

export {brokerSlice, load, storeBrokers}