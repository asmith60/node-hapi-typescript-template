# Node Hapi.js Typescript Template


## Build

#### Development

```bash
npm install
npm run build
```

#### Production

```bash
npm install --production
npm run build
```

#### Docker

```bash
npm install
npm run build
docker build -t $ORG/$IMAGE_NAME:$TAG .
```

## Lint

```bash
npm run lint
```

## Test

#### Locally

```bash
npm test
```

#### Docker

```bash
npm run docker:test
```

## Run

#### Development

```bash
npm run dev
```

#### Production

```bash
npm start
```

## Debug

#### Locally

```bash
npm run dev:debug
```

#### Debug in Docker

```bash
npm run docker:debug
```
