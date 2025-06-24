# Introduction

We know that `IOC`(Inversion of Control) is an effective architectural design for system decoupling, and is also a supporting tool for the development of large-scale business systems

## IOC Containers

There are two types of ioc containers in Vona:

1. `global ioc container`(referred to as app container): During system initialization, a unique global bean container will be automatically created. Bean instances created in this container are all singleton mode
2. `request ioc container`(referred to as ctx container): When requests coming, the system will create a bean container for each of them

## Bean Class

Vona adopts a modular system, and Bean Classes are provided by different modules. When using the Bean Class inside the same module, you can directly resolve it based on `Class type`. When using cross-module, you can resolve it based on `Bean identifier` instead of `Class type/file path`, which is conducive to achieving loose coupling between modules

## Injection Scope

Vona provides the following injection scopes:

1. `app`: Inject in the app container

2. `ctx`: Inject in the ctx container

3. `new`: Always create a new bean instance

## Injection method

Vona provides two injection methods:

1. `Dependency injection`: Provides attribute-based dependency injection through the `@Use` decorator

2. `Dependency lookup`: Directly lookup the required bean instance through the ioc container, and automatically create it if it does not exist