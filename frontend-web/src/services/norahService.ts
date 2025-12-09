import { useEffect, useState } from 'react';

export const useNorahService = () => {
  const [health, setHealth] = useState('desconhecido');

  useEffect(() => {
    fetch('http://localhost:4000/health')
      .then((res) => res.json())
      .then((data) => setHealth(data.status))
      .catch(() => setHealth('offline'));
  }, []);

  const triggerEvolution = () => {
    fetch('http://localhost:4000/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: 'evolve-now' }),
    });
  };

  return { health, triggerEvolution };
};
