import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Bestelluebersicht = () => {
  const { cart, getTotal } = useCart();

  return (
    <PageContainer>
      <PageTitle>Bestellübersicht</PageTitle>

      <CheckoutGrid>
        <OrderDetails>
          <SectionTitle>Ihre Bestellung</SectionTitle>
          <OrderItems>
            {cart.map(item => (
              <OrderItem key={item.id}>
                <ItemImage>
                  <img src={item.image} alt={item.name} />
                </ItemImage>
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemQuantity>Menge: {item.quantity}</ItemQuantity>
                  <ItemPrice>{item.price}</ItemPrice>
                </ItemDetails>
              </OrderItem>
            ))}
          </OrderItems>
        </OrderDetails>

        <OrderSummary>
          <SectionTitle>Zusammenfassung</SectionTitle>
          <SummaryContent>
            <SummaryRow>
              <span>Zwischensumme:</span>
              <span>{getTotal()} €</span>
            </SummaryRow>
            <SummaryRow>
              <span>Versandkosten:</span>
              <span>0,00 €</span>
            </SummaryRow>
            <Total>
              <span>Gesamtbetrag:</span>
              <span>{getTotal()} €</span>
            </Total>
            <SubmitButton>Jetzt bestellen</SubmitButton>
            <BackButton to="/warenkorb">Zurück zum Warenkorb</BackButton>
          </SummaryContent>
        </OrderSummary>
      </CheckoutGrid>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 3.6rem;
  margin-bottom: 40px;
  color: var(--text-primary);
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const OrderDetails = styled.div`
  background-color: var(--card-background);
  border-radius: 12px;
  padding: 30px;
  box-shadow: var(--card-shadow);
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 30px;
  color: var(--text-primary);
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
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

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: var(--text-primary);
`;

const ItemQuantity = styled.p`
  font-size: 1.4rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
`;

const ItemPrice = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const OrderSummary = styled.div`
  background-color: var(--card-background);
  border-radius: 12px;
  padding: 30px;
  box-shadow: var(--card-shadow);
  height: fit-content;
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  color: var(--text-secondary);
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 20px 0;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
  }
`;

const BackButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 15px;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  text-align: center;
  text-decoration: none;
  font-size: 1.6rem;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--background-secondary);
  }
`;

export default Bestelluebersicht;