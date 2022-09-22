export default 
`
import * as API from '../services/api';

export default {
  namespace:'menu',

  state:{
    menu:[],
  },

  effects:{
  //fetchMenus给到services/apis/menus.js的
    *fetchMenus({callback},{call ,put}){
      const response =yield call(API.fetchMenus);
      yield put({
      //public是写在下面reducers里,携带的参数是固定的(也就是修改数据)
        type:'public',
        payload:{...response, name:'menu'},
      });
      if(response.code===0){
        if(callback) callback(response.data);
      }
    },
  },

  reducers:{
    public(state, action){
      return{
        ...state,
        [action.payload.name]:action.payload.data,
      }
    },
    clearData(){
      return{
        menu:[],
      }
    },
  },
}
`;