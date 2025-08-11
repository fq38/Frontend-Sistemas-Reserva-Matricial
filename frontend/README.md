Sistema de Reserva de Salas - Front-end (Matricial)

Este é o projeto de front-end para o Sistema de Reserva de Salas, desenvolvido como parte de um desafio técnico. A aplicação foi construída com React e TypeScript, oferecendo uma interface de usuário moderna e reativa para interagir com a API de back-end.
O objetivo é permitir que os usuários da empresa visualizem, criem, editem e excluam reservas de salas de reunião de forma intuitiva e eficiente.

✨ Funcionalidades
Listagem Completa de Reservas: Visualização de todas as reservas ativas em uma tabela clara e organizada.
CRUD de Reservas: Funcionalidades completas para Criar, Ler, Atualizar e Excluir (CRUD) reservas.
Validação de Conflitos: A interface informa ao usuário caso uma reserva não possa ser criada devido a um conflito de horário, recebendo a validação diretamente da API.
Formulário Inteligente: O formulário de cadastro/edição filtra as salas disponíveis com base no local selecionado.
Confirmação de Ações Destrutivas: Um modal de confirmação é exibido antes de excluir uma reserva para prevenir ações acidentais.
Interface Responsiva e Intuitiva: Foco na usabilidade, com feedback visual para o usuário (indicadores de carregamento, mensagens de erro e botões com cores contextuais).

🚀 Tecnologias e Padrões Utilizados
A seleção de tecnologias visou a produtividade, robustez e uma excelente experiência de desenvolvimento.
Tecnologia e Justificativa

React	Biblioteca líder para a construção de interfaces de usuário, escolhida por sua arquitetura baseada em componentes, ecossistema maduro e vasta documentação. Permite a criação de UIs complexas de forma declarativa e eficiente.

TypeScript	Adiciona um sistema de tipos estáticos ao JavaScript. Foi utilizado para garantir a segurança dos tipos em todo o projeto, reduzindo bugs em tempo de execução, melhorando a manutenibilidade do código e o autocompletar do editor.

Vite	Ferramenta de build moderna que oferece uma experiência de desenvolvimento extremamente rápida (Hot Module Replacement - HMR) e um processo de build otimizado para produção.

Axios	Cliente HTTP baseado em Promises para realizar requisições à API RESTful. Foi escolhido por sua simplicidade, API intuitiva e facilidade no tratamento de requisições e respostas.

CSS Padrão	Para a estilização, foi utilizado CSS puro com uma metodologia organizada em um único arquivo (App.css). Para a escala deste projeto, essa abordagem é simples, direta e eficaz, sem a necessidade de bibliotecas de CSS-in-JS ou frameworks de UI.

⚙️ Como Rodar a Aplicação
Para executar este projeto em seu ambiente local, siga os passos abaixo.
Pré-requisitos

Node.js (versão 18 ou superior)
npm ou yarn instalado
API de Back-end em execução: Este projeto de front-end precisa que a API de back-end Acesse o [github do backend](https://github.com/fq38/Backend-Sistemas-Reserva-Matricial.git) esteja rodando, pois é ela quem fornece todos os dados.

Instalação e Execução
Clone o repositório:

git clone https://github.com/fq38/Frontend-Sistemas-Reserva-Matricial.git
cd sistema-reserva-salas-frontend

Instale as dependências:

npm install

ou, se estiver usando yarn:

yarn install

Configure a URL da API:
Abra o arquivo src/services/api.ts. Verifique se a baseURL corresponde à URL e porta em que sua API de back-end está rodando.


// src/services/api.ts
const apiClient = axios.create({
  baseURL: 'https://localhost:7036/api', // <-- VERIFIQUE ESTA LINHA
  // ...
});

Inicie o servidor de desenvolvimento:

npm run dev

ou, se estiver usando yarn:

yarn dev

Acesse a aplicação:
Abra seu navegador e acesse http://localhost:5173 (ou a porta que for indicada no seu terminal).

📂 Estrutura do Projeto
O projeto foi organizado com uma estrutura clara para separar as responsabilidades:

src/
├── components/       # Componentes React reutilizáveis (Formulário, Tabela, Modal)
├── services/         # Lógica de comunicação com a API (configuração do Axios)
├── types/            # Definições e interfaces do TypeScript (Reservation, Room, etc.)
├── App.css           # Estilos globais da aplicação
├── App.tsx           # Componente principal que gerencia o estado e a lógica da aplicação
└── main.tsx          # Ponto de entrada da aplicação React

📝 Outras Informações Importantes
Tratamento de Datas: Para garantir a consistência da validação de conflitos, o sistema opera com uma lógica de datas simplificada ("o que você vê é o que você obtém"), onde as datas são enviadas e recebidas da API sem conversões de fuso horário, eliminando complexidades e bugs comuns.
Arquitetura:
Estado Centralizado: O estado principal da aplicação (lista de reservas, estado dos modais, etc.) é gerenciado no componente raiz App.tsx e distribuído para os componentes filhos via props.
Abstração de Serviços: Toda a lógica de chamadas HTTP está isolada no arquivo services/api.ts, mantendo os componentes da UI focados apenas na apresentação e na interação do usuário.