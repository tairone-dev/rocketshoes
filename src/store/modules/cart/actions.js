export function addToCart(product) {
  return {
    type: '@cart/ADD',
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
