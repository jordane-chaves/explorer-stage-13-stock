import { FiUser, FiLogOut } from "react-icons/fi";

import { useAuth } from "../../hooks/auth";
import { Container, User } from "./styles";
import { capitalizeText } from "../../utils/capitalize-text";

export function Header() {
  const { signOut, user } = useAuth();

  const role = capitalizeText(user.role);

  return (
    <Container>
      <h1>Menu</h1>

      <aside>
        <User>
          <span>
            Olá, <strong>{user.name}</strong>
          </span>
          <small>
            <FiUser /> Perfil de {role}
          </small>
        </User>
      </aside>

      <button type="button" onClick={signOut}>
        <FiLogOut size={24} />
      </button>
    </Container>
  );
}
