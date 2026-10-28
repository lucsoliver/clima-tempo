<h1 align="center">☀️ Clima Tempo 🌧️</h1>
<br>
<img src="src/images/video/site.gif" alt="Screenshot Site" style="width:auto; height:auto;" align="center">
<br>

# Clima Tempo

Projeto convertido para React + TypeScript, mantendo a mesma interface e a lógica de busca climática original.

## Sobre

Este app exibe informações meteorológicas em tempo real de qualquer cidade usando a API do [OpenWeatherMap](https://openweathermap.org/).

Ele mostra:

- Temperatura atual;
- Umidade;
- Porcentagem de chuva estimada;
- Velocidade do vento;
- Condição do tempo;
- Mudança do fundo conforme o clima

## Pré-requisitos

- Node.js e npm instalados;
- Chave da API do OpenWeatherMap;
- Conexão com a internet

## Configuração local da API key

Crie um arquivo `.env` na raiz do projeto com a sua chave:

```bash
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
```

O arquivo `.env` fica local no seu computador e não deve ser enviado para o GitHub. Já incluímos `.env.example` como referência.

## Instalação

```bash
npm install
npm run dev
```

### Build de produção

```bash
npm run build
```

## Licença

Este projeto está licenciado sob os termos da licença [MIT](https://github.com/lucsoliver/clima-tempo/blob/main/LICENSE).

