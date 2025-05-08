import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Warenkorb = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  if (cart.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <h2>Ihr Warenkorb ist leer</h2>
          <p>Entdecken Sie unsere Produkte und füllen Sie Ihren Warenkorb.</p>
          <ShopButton to="/produkte">Zu den Produkten</ShopButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>Ihr Warenkorb</CartTitle>
      
      <CartContent>
        <CartItems>
          {cart.map(item => (
            <CartItem key={item.id}>
              <ItemImage>
                <img src={item.image} alt={item.name} />
              </ItemImage>
              
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}</ItemPrice>
              </ItemInfo>

              <QuantityControls>
                <QuantityButton 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{item.quantity}</QuantityDisplay>
                <QuantityButton 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </QuantityButton>
              </QuantityControls>

              <ItemTotal>
                {(parseFloat(item.price.replace('€', '').replace(',', '.')) * item.quantity).toFixed(2)} €
              </ItemTotal>

              <RemoveButton onClick={() => removeFromCart(item.id)}>
                ✕
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Zusammenfassung</SummaryTitle>
          <SummaryRow>
            <span>Zwischensumme:</span>
            <span>{getTotal()} €</span>
          </SummaryRow>
          <SummaryRow>
            <span>Versand:</span>
            <span>0,00 €</span>
          </SummaryRow>
          <Total>
            <span>Gesamtsumme:</span>
            <span>{getTotal()} €</span>
          </Total>
          <CheckoutButton to="/bestelluebersicht">
            Zur Kasse
          </CheckoutButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const CartTitle = styled.h1`
  font-size: 3.6rem;
  margin-bottom: 40px;
  color: var(--text-primary);
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemName = styled.h3`
  font-size: 1.8rem;
  color: var(--text-primary);
`;

const ItemPrice = styled.span`
  font-size: 1.6rem;
  color: var(--text-secondary);
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: none;
  color: var(--text-primary);
  cursor: pointer;
  
  &:hover {
    background-color: var(--background-secondary);
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.6rem;
  color: var(--text-primary);
  min-width: 30px;
  text-align: center;
`;

const ItemTotal = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.8rem;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const CartSummary = styled.div`
  padding: 30px;
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.6rem;
  color: var(--text-secondary);
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: var(--accent-color);
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.8rem;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;

  h2 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    color: var(--text-primary);
  }

  p {
    font-size: 1.8rem;
    color: var(--text-secondary);
    margin-bottom: 30px;
  }
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background-color: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.8rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
  }
`;

export default Warenkorb;