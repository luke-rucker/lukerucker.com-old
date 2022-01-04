# lukerucker.com

My slice of the internet!

## Getting Started

- Clone the repo

- Install the project's dependencies

```sh
$ npm install
```

- Start the dev processes

```sh
# There are race conditions between the remix build and the worker bundle command.
# So, for the first time, it is necessary to run this before starting the dev processes.
$ npm run build:css && npx remix build

# Now start the dev processes
$ npm run dev
```

Open up [http://localhost:8787](http://localhost:8787) and you should be ready to go!

## Environments

- [lukerucker.com (production)](https://lukerucker.com)
- [staging.lukerucker.com](https://staging.lukerucker.com)
