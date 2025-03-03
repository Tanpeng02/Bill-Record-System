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
        // 访问 "bills" 节点
        
        const snapshot = await get(dbRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // 转换数据为数组格式
          const billList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));
  
          dispatch(setBillList(billList)); // 发送数据到 Redux
        } else {
          console.log("No data available");
          dispatch(setBillList([])); // 数据为空
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