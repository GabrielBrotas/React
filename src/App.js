import React, {useState} from 'react'

import Header from './components/Header'
import backgroundImg from './assets/image-one.jpg'

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

    function handleAddNewProject() {
        setProjects([...projects, `novo projecto ${Date.now()}`])
    }

    return (
        <>
            <Header title="Projects" />
            <img src={backgroundImg} width={200} />
            <ul>
                {projects.map( (project, index) => (
                    <li key={index}>{project}</li>
                ))}
            </ul>

            <button type="button" onClick={handleAddNewProject}>adicionar projeto</button>
        </>
    )
}

export default App