# Nextjs & Nestjs administration system template

## About repository
This repository is meant to be starting point for modern administration system. 
To get started you need to follow only few easy steps.

## System requirements
- Node 12.14
- Yarn - version 1 
- Mysql 

## Setup new project
1. Clone this repository
2. Remove `.git` folder
3. Rename `template` word to name of your project
4. Run `yarn install`
5. In `api` folder create `ormconfig.json` from `ormconfig.example.json` and fill database connection details
6. In `api` folder run `yarn conf`
7. In `shared` folder create `api/index.ts` and `app/index.ts` from examples
