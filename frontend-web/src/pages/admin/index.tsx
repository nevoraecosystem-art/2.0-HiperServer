import React from 'react';
import { useNorahService } from '../../services/norahService';

const AdminPage: React.FC = () => {
  const { triggerEvolution } = useNorahService();
  return (
    <div>
      <h2>Administração</h2>
      <p>Controle de Norah e Sub-IAs.</p>
      <button type="button" onClick={triggerEvolution}>Rodar auto-evolução</button>
    </div>
  );
};

export default AdminPage;
