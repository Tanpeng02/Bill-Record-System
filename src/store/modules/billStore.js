import { createSlice } from "@reduxjs/toolkit"
import { database, ref, get , push} from "@/firebase"

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
const dbRef = ref(database, "ka");

const fetchBillList = () => {
    return async (dispatch) => {
      try {
        // Get data from Firebase
        
        const snapshot = await get(dbRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // Change the format of the data
          const billList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));
  
          dispatch(setBillList(billList)); //Send to Redux
        } else {
          console.log("No data available");
          dispatch(setBillList([]));  //Data is empty
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  };

const postBillList=(data)=>{
    return async (dispatch)=>{
        
        await push(dbRef,data)
        dispatch(updateBill(data))
        
        
    }
}
export {fetchBillList,postBillList}
export default reducer