import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex(
          (product) => product.id === action.product.id
        );

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
          return;
        }

        draft.push({
          ...action.product,
          amount: 1,
        });
      });
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex(
          (product) => product.id === action.id
        );

        if (productIndex < 0) {
          return;
        }

        draft.splice(productIndex, 1);
      });
    case '@cart/INCREASE_AMOUNT':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex(
          (product) => product.id === action.id
        );

        if (productIndex < 0) {
          return;
        }

        draft[productIndex].amount += 1;
      });
    case '@cart/DECREASE_AMOUNT':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex(
          (product) => product.id === action.id
        );

        const product = draft[productIndex];

        if (productIndex < 0 || !product || product.amount <= 1) {
          return;
        }

        product.amount -= 1;
      });
    default:
      return state;
  }
}
