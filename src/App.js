import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchRepositories() {
      const resp = await api.get('repositories');
      setRepositories(resp.data);
    }

    fetchRepositories();
  }, [])

  async function handleAddRepository() {
    const resp = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio React",
      techs: ["React", "Node.js"],
    });

    const repository = resp.data;

    setRepositories([ ...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const repositoriesTemp = [...repositories];

    repositoriesTemp.splice(repositoryIndex, 1);

    setRepositories(repositoriesTemp);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
           </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
