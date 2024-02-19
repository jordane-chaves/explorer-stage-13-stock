import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { USER_ROLES } from "../../utils/roles";
import { Container, Header, Item } from "./styles";

export function Product() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const products = Array(20)
    .fill({ name: "Produto" })
    .map((item, index) => `${item.name} ${index + 1}`);

  return (
    <Container>
      <Header>
        <h1>Produtos</h1>

        <nav>
          {[USER_ROLES.ADMIN].includes(user.role) && (
            <Button title="Cadastrar" />
          )}

          <Button title="Voltar" onClick={() => navigate("/")} />
        </nav>
      </Header>

      {products.map((product) => (
        <Item key={product}>
          <span>{product}</span>
        </Item>
      ))}
    </Container>
  );
}
