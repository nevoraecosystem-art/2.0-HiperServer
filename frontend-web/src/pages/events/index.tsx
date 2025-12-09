import React from 'react';
import { useNorahService } from '../../services/norahService';

const EventsPage: React.FC = () => {
  const { health } = useNorahService();
  return (
    <div>
      <h2>Eventos</h2>
      <p>Status do ecossistema: {health}</p>
      <button type="button" onClick={() => alert('Criar novo evento')}>Novo Evento</button>
    </div>
  );
};

export default EventsPage;
