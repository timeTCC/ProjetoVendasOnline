const editingProductReducer = (state = null, action) => {
   switch (action.type) {
      case 'PRODUCT/SET':
         return action.payload;
         break;
      case 'PRODUCT/UNSET':
         return null;
         break;
      case 'PRODUCT/SET_CAT_NAME':
         return { ...state, 'prodCatName': action.payload};
         break;
      default:
         return state;
         break;
   }
}

export default editingProductReducer;