# nestjs-clean-architecture-demo

[![Build Status](https://travis-ci.org/damienbeaufils/nestjs-clean-architecture-demo.svg?branch=master)](https://travis-ci.org/damienbeaufils/nestjs-clean-architecture-demo)

An example of clean architecture with NestJS

## Foreword

This application is designed using a [Clean Architecture pattern](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) (also known as [Hexagonal Architecture](http://www.maximecolin.fr/uploads/2015/11/56570243d02c0_hexagonal-architecture.png)).
Therefore [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) are used in code, especially the [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) (do not mix up with the classic dependency injection in NestJS for example).

Concretely, there are 3 main packages: `domain`, `use_cases` and `infrastructure`. These packages have to respect these rules:
- `domain` contains the business code and its logic, and has no outward dependency: nor on frameworks (NestJS for example), nor on `use_cases` or `infrastructure` packages.
- `use_cases` is like a conductor. It will depend only on `domain` package to execute business logic. `use_cases` should not have any dependencies on `infrastructure`.
- `infrastructure` contains all the technical details, configuration, implementations (database, web services, etc.), and must not contain any business logic. `infrastructure` has dependencies on `domain`, `use_cases` and frameworks.  

## Install

```
npm install
```

## Test

```
npm test
```

## Run

```
npm run typeorm:migration:run
npm run start:dev
```
