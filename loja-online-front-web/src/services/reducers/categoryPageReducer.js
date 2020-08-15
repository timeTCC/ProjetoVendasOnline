const categoryPageReducer = (state = null, action) => {
   switch (action.type) {
       case 'CATEGORY_PAGE/SET':
           return action.payload;
       default:
           return state;
   }
}

export default categoryPageReducer;