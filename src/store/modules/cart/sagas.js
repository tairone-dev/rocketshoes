import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, increaseAmount } from './actions';

function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  if (currentAmount + 1 > stockAmount) {
    toast.error('Quantidade solicitada indisponível em estoque.');
    return;
  }

  if (productExists) {
    yield put(increaseAmount(id));
    return;
  }

  const response = yield call(api.get, `/products/${id}`);

  const data = {
    ...response.data,
    amount: 1,
    priceFormatted: formatPrice(response.data.price),
  };

  yield put(addToCartSuccess(data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
