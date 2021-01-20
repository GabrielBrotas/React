# React

- Biblioteca para construção de interfaces;
- Utilizado para construção de Single-Page Applications (SPA);

## Vantagens

1. Organização do código;
    1. Componenetização;
2. Divisão de responsabilidades;
    1. Back-end: Regra de negócio; (manipular os dados)
    2. Front-end: Interface; (mostrar os dados)
3. Uma API, multiplos clientes;
4. Programação declarativa;

### JSX

1. Escrever HTML dentro do JavaScript;
2. Com o React podemos criar nossos próprios elementos;

## Imperativo vs declarativo

- Imperativo

    Tem que fazer diversas verificações e validações para uma ação vinda do backend;

    Fala para o browser o passo a passo do que fazer cada aconteça qualquer ação;

- Declarativo

    Não precisa fazer verificações e comparações com o estado anterior;

    Nao diz o passo a passo para o browser pois é declarativo;

## Babel / Webpack

- O browser nao entendo todo o codigo jsx
- o Babel converte o codigo JS de uma forma que o browser entenda;
- O webpack possui varias funções:
    1. Criação do bundle, arquivo com todo código da aplicação ;
    2. Ensinar ao Javascript como importar arquivos CSS, imagens e etc;
    3. Live reload com Webpack Dev Server, sempre que a gnt altera o codigo JS ele da um reload/refresh na pagina

## Criando projeto

- yarn init -y
- yarn add react react-dom

1. Fazer o browser entender o react
    1. criar uma pasta public 
    2. criar arquivo index.html e colocar a estrutura html5

2. Babel e Webpack;

→ Babel = converter (transpilar) código react para um código que o browser entenda;

→ Webpack = para cada tipo de arquivo (.js, .css, .png) eu vou converter o código de maneira diferente

pacotes do webpack para converter os arquivos:

→ Loaders: babel-loader, css-loader, image-loader;

- Instalando

yarn add @babel/core  @babel/preset-env @babel/preset-react webpack webpack-cli 

yarn add @babel/plugin-transform-runtime

- **Configuração do babel**

    na raiz do projeto criar o arquivo **babel.config.js**

    → no site do babel tem diversas configurações para ele;

    dentro do arquivo exportar o modulo

    ```jsx
    module.exports = {
    	presets: [
    	'@babel/preset-env',
    	'@babel/preset-react'
    	],
    	plugins: [
            '@babel/plugin-transform-runtime'
      ]
    }
    ```

    - Configurações padroes
    1. @babel/preset-env = converte o código mais moderno para um mais antigo para converter os comandos que os browser nao entende para um em que os browser entendam, o node por exemplo já tem mais funcoes que o browser como o async, import, etc.

     2. @babel/preset-react = adicionar as funcionalidades do react na conversao

    3. @babel/plugin-transform-runtime = permite funções assincronas (async/await)

    → para testar se está funcionando vamos criar um arquivo index.js na pasta src/ e criar uma arrow function (os navegadores ainda nao entendem esse tipo de função) 

    ```jsx
    const soma = (a, b) => {
    	return a + b;
    }

    console.log(soma(1,3))
    ```

    → vamos instalar o pacote **@babel/cli** para usar o comando do babel cli no terminal

    → yarn babel src/index.js —out-file public/bundle.js

    —out-file vai jogar o arquivo convertido em outra pasta 

    → agora é só colocar o script no index.html

    ```jsx
    <script src="bundle.js"></script>
    ```

    → e abrir no navegador para verificar se está funcionando

- **Configuração do webpack**

    criar o arquivo webpack.config.js na raiz do projeto

    1. instalar o babel loader

        >yarn add babel-loader

    ```jsx
    const path = require('path')

    module.exports = {
    // arquivo de entrada
    	entry: path.resolve(__dirname, 'src', 'index.js'), 
    //qual arquivo vai ser gerado depois que ser convertido
    	output: { 
    		path: path.resolve(__dirname, 'public'),
    		filename: 'bundle.js'
    	},
    	// regras
    	module: {
    // cada objeto vai ser um loader diferente
    		rules: [
    			// nesse objeto vamos configurar os arquivos .js
    			{
    				// expressão regular: o '.' dentro da re significa qualquer coisa então tem que vim acompanhado da barra invertida
    				test: /\.js$/, // \.js$ qualquer string que termine com .js
    				exclude: /node_modules/, //quando importar um arquivo .js dentro da pasta node_modules ele nao vai passar pelo processo do babel pois é trabalho da propria biblioteca fazer a conversao com o babel, não nossa
    				use: {
    					loader: 'babel-loader' // converter para o babel
    				}
    			}
    		]
    	}
    }
    ```

2. outros pacotes do webpack: 

1. file-loader // ler arquivos
2. style-loader // injetar html no css
3. css-loader // ler os arquivos de css e fazer importaçoes como de imagens
- converter o arquivo criado para o bundle.js

    >yarn webpack —mode development 

- o arquivo criado vai verificar todos modulos que vamos importar para fazer a conversão;
- o webpack nao fica monitorando as mudanças que fazemos no server então para consertar isso vamos ter que instalar o webpack-dev-server -D

       >yarn add webpack-dev-server -D

    agora dentro do webpack.config.js vamos criar outra configuração:

    ```jsx
    devServer: {
    // caminho para o diretorio que contem os arquivos publicos da aplicação
    	contentBase: path.resolve(__dirname, 'public')
    }
    ```

>yarn webpack-dev-server  —mode development

a partir de agora vai acionar o **live reloading** e o arquivo vai identificar todas as mudanças dos arquivos.

### Conceitos do React

1. Componentes =  partes independentes, reutilizáveis, ou seja, trata cada parte da aplicação como um bloco isolado, livre de outras dependências externas
2.  Propriedades = informação passada de um componente pai para um componente filho
3. Estado = informação dentro do proprio componente
4. Imutabilidade = em uma função .push de um array, essa função apenas adicionar/altera o array com o novo valor;

no react a gente evita qualquer metodo que altere o valor inicial de uma variavel, sempre temos que recriar uma nova informação para substituir pelo valor original, ex: setProjects([...projects, `novo projecto ${Date.now()}`])

### Inicialização do App

- Adicionar script no package.json

    ```jsx
    "scripts": {
        "dev": "yarn webpack-dev-server --mode development", // modo desenvolvimento
        "build": "webpack --mode production" // modo produção
      },
    ```    
