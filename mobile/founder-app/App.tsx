import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, Button, ScrollView } from 'react-native';

const API = 'http://localhost:4000';

export default function App() {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [health, setHealth] = useState('pending');

  useEffect(() => {
    fetch(`${API}/health`).then((res) => res.json()).then((data) => setHealth(data.status)).catch(() => setHealth('offline'));
  }, []);

  const sendCommand = () => {
    fetch(`${API}/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    })
      .then((res) => res.json())
      .then((data) => setLogs((prev) => [`${new Date().toISOString()}: ${data.result}`, ...prev]));
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Founder Console</Text>
      <Text>Health: {health}</Text>
      <TextInput
        placeholder="Enviar comando para Norah"
        value={command}
        onChangeText={setCommand}
        style={{ borderWidth: 1, padding: 8, marginVertical: 12 }}
      />
      <Button title="Executar" onPress={sendCommand} />
      <ScrollView style={{ marginTop: 16 }}>
        {logs.map((log) => (
          <Text key={log}>{log}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
