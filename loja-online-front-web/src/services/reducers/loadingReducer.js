const loadingReducer = (state = false, action) => {
   switch (action.type) {
       case 'LOADING/SET':
           return action.payload;
       default:
           return state;
   }
}

export default loadingReducer;