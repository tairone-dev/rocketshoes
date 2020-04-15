export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function increaseAmount(id) {
  return {
    type: '@cart/INCREASE_AMOUNT',
    id,
  };
}

export function decreaseAmount(id) {
  return {
    type: '@cart/DECREASE_AMOUNT',
    id,
  };
}
