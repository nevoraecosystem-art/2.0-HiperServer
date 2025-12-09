import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, ScrollView } from 'react-native';

const API = 'http://localhost:4000';

export default function App() {
  const [health, setHealth] = useState('pending');
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API}/health`).then((res) => res.json()).then((data) => setHealth(data.status)).catch(() => setHealth('offline'));
  }, []);

  const loadEvents = () => {
    fetch(`${API}/events`).then((res) => res.json()).then((data) => setEvents(data.events ?? []));
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Norah Lite</Text>
      <Text>Saúde do ecossistema: {health}</Text>
      <Button title="Carregar eventos" onPress={loadEvents} />
      <ScrollView style={{ marginTop: 16 }}>
        {events.map((event, idx) => (
          <Text key={`${event}-${idx}`}>{event}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
