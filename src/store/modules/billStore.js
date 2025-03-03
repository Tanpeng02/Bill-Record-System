import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const billStore = createSlice({
    name:'bill',
    initialState:{
        billList: []
    },
    reducers:{
        setBillList(state,action){
            state.billList = action.payload
        },
        updateBill(state,action){
            state.billList.push(action.payload)
        }
    }
})

const {setBillList,updateBill} = billStore.actions
const reducer = billStore.reducer

const fetchBillList= ()=>{
    return async (dispatch)=>{
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
        
    }
}

const postBillList=(data)=>{
    return async (dispatch)=>{
        
        const res = await axios.post('http://localhost:8888/ka',data)
        
        console.log("Response from server:", res.data);
        dispatch(updateBill(res.data))
    }
}
export {fetchBillList,postBillList}
export default reducer