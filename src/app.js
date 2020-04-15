const cors = require('cors');
const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

const repositories = [];

app.get('/repositories', (req, res) => {
  return res.status(200).json(repositories);
});

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body;
  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(project);
  return res.status(201).json(project);
});

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const index = repositories.findIndex((p) => p.id === id);

  if (index < 0) {
    return res.status(400).send();
  }

  const project = {
    id,
    title,
    url,
    techs,
    likes: repositories[index].likes,
  };
  repositories[index] = project;
  return res.status(200).json(project);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const index = repositories.findIndex((p) => p.id === id);

  if (index < 0) {
    return res.status(400).json({ error: 'Repository does not exists.' });
  }

  repositories.splice(index, 1);
  return res.status(204).send();
});

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params;
  const index = repositories.findIndex((p) => p.id === id);

  if (index < 0) {
    return res.status(400).send();
  }

  const likes = repositories[index].likes + 1;

  const project = {
    id,
    title: repositories[index].title,
    url: repositories[index].url,
    techs: repositories[index].techs,
    likes,
  };

  repositories[index] = project;
  return res.status(201).json(project);
});

module.exports = app;
