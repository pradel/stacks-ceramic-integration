# stacks-ceramic-integration-demo

Demo application used to test the Stacks integration in ceramic.

## Usage

### 1. Setup updated js-did packages

```sh
git clone https://github.com/pradel/js-did.git
cd js-did
git checkout feature/stacks-integration

pnpm install
pnpm build
cd packages/cacao
pnpm pack --pack-destination ../../../js-ceramic
pnpm pack --pack-destination ../pkh-stacks
```

In `packages/pkh-stacks/package.json` replace `"@didtools/cacao": "workspace:^1.1.0",` with `"@didtools/cacao": "file:./didtools-cacao-1.1.0.tgz",`.

```sh
cd packages/pkh-stacks
pnpm pack --pack-destination ../../../js-ceramic
```

### 2. Setup the local ceramic daemon

```sh
git clone https://github.com/pradel/js-ceramic.git
cd js-ceramic
git checkout feature/stacks-integration

npm install
npm run build
npm link ../js-did/packages/pkh-stacks
npm install
```

The ceramic daemon is now running on port 7007.

### 3. Setup demo application

```sh
git clone https://github.com/pradel/stacks-ceramic-integration.git
cd stacks-ceramic-integration

pnpm install
pnpm dev
pnpm link ../js-did/packages/cacao
pnpm link ../js-did/packages/pkh-stacks
```

Application is now running on port 3000, open it in your browser to see the demo!
