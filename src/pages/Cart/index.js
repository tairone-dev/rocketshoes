import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total, EmptyCart } from './styles';
import emptyCart from '../../assets/images/empty-cart.svg';

export default function Cart() {
  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  function handleBuyItems() {
    dispatch(CartActions.buyAllItems());

    toast.success('Compra finalizada com sucesso!');
  }

  return (
    <Container>
      {cart.length > 0 ? (
        <>
          <ProductTable>
            <thead>
              <tr>
                <th />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.title} />
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(CartActions.decreaseAmount(product.id))
                        }
                      >
                        <MdRemoveCircleOutline size={20} color="#7150c1" />
                      </button>
                      <input type="number" readOnly value={product.amount} />
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            CartActions.increaseAmountRequest(product.id)
                          )
                        }
                      >
                        <MdAddCircleOutline size={20} color="#7150c1" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{product.subtotal}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(CartActions.removeFromCart(product.id))
                      }
                    >
                      <MdDelete size={20} color="#7159c1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>

          <footer>
            <button type="button" onClick={handleBuyItems}>
              Finalizar pedido
            </button>

            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      ) : (
        <EmptyCart>
          <img src={emptyCart} alt="Carrinho de compras vazio." />
          <span>Seu carrinho está vazio!</span>
        </EmptyCart>
      )}
    </Container>
  );
}
