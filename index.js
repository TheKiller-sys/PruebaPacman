const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'contactos.json');

app.use(express.json());

// Helper para leer contactos
const readContacts = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper para escribir contactos
const writeContacts = (contacts) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
};

// GET /api/contactos - Obtener todos los contactos
app.get('/api/contactos', (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

// POST /api/contactos - Crear un contacto
app.post('/api/contactos', (req, res) => {
  const { nombre, telefono } = req.body;

  if (!nombre || !telefono) {
    return res.status(400).json({ error: 'Nombre y teléfono son requeridos' });
  }

  const contacts = readContacts();
  const newContact = { id: Date.now(), nombre, telefono };
  
  contacts.push(newContact);
  writeContacts(contacts);

  res.status(201).json(newContact);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
