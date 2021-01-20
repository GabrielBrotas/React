import React, {useState, useEffect} from 'react'
import api from './services/api'

import Header from './components/Header'

import './App.css'

/*
    Componentes =  partes independentes, reutilizáveis, ou seja, trata cada parte da aplicação como um bloco isolado, livre de outras dependências externas

    Propriedades = informação passada de um componente pai para um componente filho
    
    Estado = informação dentro do proprio componente

    Imutabilidade = em uma função .push de um array, essa função apenas adicionar/altera o array com o novo valor;
    no react a gente evita qualquer metodo que altere o valor inicial de uma variavel, sempre temos que recriar uma nova informação para substituir pelo valor original, ex: setProjects([...projects, `novo projecto ${Date.now()}`])
*/


function App() {

    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');

    // disparar uma função sempre que algo dentro dos arrays de independencia forem alteradas
    useEffect(() => {
        api.get('/projects').then( res => {
            setProjects(res.data)
        })
    }, [])

    async function handleAddNewProject() {
        const data = {title, owner}
        const response = await api.post('/projects', data)
        console.log(response)
        // para nao ter que fazer a requisição de todos os dados de novo e pesar a aplicação vamos apenas adicionar o projeto criado ao nosso array atual
        const project = response.data;
        setProjects([...projects, project])
    }

    return (
        <>
            <Header title="Projects" />
            
            <ul>
                {projects.map( (project) => (
                    <li key={project.id}>{project.title} - {project.owner}</li>
                ))}
            </ul>

            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
            
            <input type="text" value={owner} onChange={e => setOwner(e.target.value)} placeholder="Owner" />

            <button type="button" onClick={handleAddNewProject}>adicionar projeto</button>
        </>
    )
}

export default App