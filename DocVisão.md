# Documento de Visão: Sistema de Controle de Inventário

## 1. Objetivo
O **Sistema de Controle de Inventário** tem como objetivo gerir e monitorar os produtos em stock de maneira automatizada e eficiente. O sistema permitirá o acompanhamento de entradas e saídas de itens(carros), fornecendo relatórios em tempo real e notificações sobre níveis críticos de stock.

## 2. Escopo
O sistema poderá ser implementado em:
- Pequenas, médias e grandes empresas que necessitam de controle de stock.
- Centros de distribuição, armazéns e farmácias.

## 3. Partes Interessadas
- **Usuários**: Gerentes de estoque, operadores de depósito e administradores.
- **Beneficiários**: Empresas que buscam melhorar a eficiência no gerenciamento de inventários e reduzir perdas de produtos.

## 4. Equipe do Projeto
- João Custódio 
- Bernardo Granadas 
- Rodrigo Vicente 
- Tomas Ribalonga 
- Daniel Amaral


## 5. Características do Sistema
- Registro e acompanhamento de produtos em tempo real.
- Relatórios automáticos sobre o status do inventário.
- Controle de entradas e saídas de stock.
- Notificações de baixo stock.

## 6. Arquitetura de Referência
O sistema será baseado em uma arquitetura cliente-servidor, utilizando React.js no front-end, Node.js no back-end e MongoDB para gerenciamento de dados.

## 7. Restrições do Produto
- O sistema depende de uma conexão estável à internet para sincronização de dados.
- Necessidade de dispositivos compatíveis com o navegador para acesso ao sistema.

## 8. Integração LLM
Pretende-se utilizar um modelo de linguagem para automatizar a análise de relatórios e oferecer recomendações inteligentes para reabastecimento de estoque.

## 9. Requisitos do Sistema de Controle de Inventário
1. Requisitos Funcionais
Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve ter para atender às necessidades do usuário e garantir que o controle de inventário seja eficiente e preciso.

1.1 Cadastro de Produtos

O sistema deve permitir o cadastro de novos produtos no inventário, com os seguintes dados:
Código do produto
Nome do produto
Descrição
Quantidade inicial em estoque
Preço unitário
Categoria
Data de validade (para produtos perecíveis)
Localização no estoque

1.2 Controle de Movimentação de Estoque

O sistema deve permitir o registro de entradas e saídas de produtos, com a seguinte funcionalidade:
Entrada de produtos por compra ou transferência interna.
Saída de produtos por vendas ou transferências para outras localizações.
Registro de quantidade e data de movimentação.
O sistema deve atualizar automaticamente o saldo de estoque após cada movimentação.

1.3 Relatórios Automáticos

O sistema deve gerar relatórios em tempo real, incluindo:
Relatório de produtos com baixo estoque (abaixo do ponto de reposição).
Relatório de histórico de movimentação de cada produto (entradas e saídas).
Relatório de vendas por período (diário, semanal, mensal).
Relatório de valor total de estoque (por categoria e por produto).
Relatório de itens expirados ou com vencimento próximo (para produtos com data de validade).

1.4 Notificações de Baixo Estoque

O sistema deve enviar alertas para os usuários quando a quantidade de um produto atingir um nível crítico, configurável, definido como ponto de reposição.

1.5 Busca e Filtros de Produtos

O sistema deve permitir que os usuários busquem produtos por diversos critérios, como:
Nome do produto
Código do produto
Categoria
Localização no estoque
Faixa de preço

1.6 Controle de Permissões

O sistema deve ter um controle de permissões que permita configurar diferentes níveis de acesso, como:
Administradores: Acesso total ao sistema, incluindo configurações e relatórios completos.
Gerentes de Estoque: Acesso para gerenciar inventário, visualizar relatórios e configurar notificações.
Operadores de Depósito: Acesso para registrar entradas e saídas de estoque.

1.7 Histórico de Movimentações

O sistema deve manter um histórico completo e rastreável de todas as movimentações de estoque realizadas, com as informações de quem, quando e por qual motivo ocorreu a movimentação.

2. Requisitos Não Funcionais
Os requisitos não funcionais descrevem características gerais do sistema, como desempenho, segurança e usabilidade.

2.1 Desempenho

O sistema deve ser capaz de processar e atualizar grandes volumes de dados em tempo real, sem apresentar falhas de desempenho.
O tempo de resposta das requisições deve ser inferior a 2 segundos para a maioria das operações.

2.2 Escalabilidade

O sistema deve ser escalável para suportar o aumento do volume de dados conforme a empresa cresce, podendo ser usado em pequenas, médias ou grandes empresas.

2.3 Segurança

O sistema deve garantir a segurança dos dados por meio de criptografia de dados sensíveis, como informações de login e registros financeiros.
A autenticação de usuários deve ser feita por meio de login e senha, com suporte a autenticação de dois fatores (2FA) para aumentar a segurança.
Acesso a dados confidenciais deve ser restrito a usuários autorizados, conforme as permissões definidas.

2.4 Usabilidade

O sistema deve ser intuitivo e de fácil navegação, com interface gráfica amigável.
A interface deve ser responsiva, adaptando-se bem a diferentes dispositivos (desktops, tablets e smartphones).
O sistema deve fornecer feedbacks claros sobre ações executadas (como sucesso ou erro em um cadastro).

2.5 Compatibilidade

O sistema deve ser acessível através de navegadores modernos (Chrome, Firefox, Edge).
O sistema deve ser compatível com os sistemas operacionais Windows, macOS e Linux.

2.6 Disponibilidade e Confiabilidade

O sistema deve ter alta disponibilidade, com tempo de inatividade (downtime) mínimo.
O sistema deve ser capaz de recuperar dados automaticamente após uma falha ou desconexão inesperada.

3. Requisitos de Integração com LLM (Modelo de Linguagem)
Os requisitos relacionados à integração de modelos de linguagem com o sistema envolvem o uso de inteligência artificial para otimizar o controle de inventário.

3.1 Análise de Relatórios

O sistema deve integrar um modelo de linguagem para analisar os relatórios gerados automaticamente, identificando padrões de consumo, sazonalidade de produtos e tendências de vendas.

3.2 Recomendações Inteligentes

O sistema deve usar o modelo de linguagem para fornecer recomendações automáticas sobre:
Reabastecimento de produtos (baseado em dados históricos de vendas e entrada de produtos).
Produtos com maior risco de ruptura de estoque.
Ajustes no ponto de reposição para diferentes produtos, de acordo com a demanda.

3.3 Respostas Automáticas

O modelo de linguagem deve ser capaz de responder a perguntas sobre o estado do estoque, como:
"Qual o item mais vendido no último mês?"
"Quantos itens de X estão previstos para chegar?"
"Qual o nível de estoque atual de Y?"
"Quais itens têm vencimento próximo?"
4. Requisitos de Interface de Usuário
Os requisitos de interface envolvem a experiência do usuário ao interagir com o sistema.

4.1 Dashboard Principal

O sistema deve ter um painel de controle (dashboard) que forneça uma visão geral do estado do inventário, incluindo:
Produtos em baixo estoque.
Relatório de movimentações recentes.
Resumo financeiro do estoque.
4.2 Interface de Cadastro de Produtos

O cadastro de produtos deve ser simples e permitir a entrada rápida de dados. Campos obrigatórios e sugestões de preenchimento devem ser destacados.

4.3 Interface de Relatórios

A visualização de relatórios deve ser clara e permitir exportação para formatos como PDF e Excel.

4.4 Notificações

O sistema deve exibir notificações claras sobre itens com estoque baixo, produtos expirando ou movimentações pendentes.
