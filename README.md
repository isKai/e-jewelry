# e-jewelry

基于区块链技术之可溯源珠宝电商平台



### **使用环境**

1. Truffle v5.1.45 (core: 5.1.45)
2. Solidity v0.5.16 (solc-js)
3. Node v12.14.1
4. Web3.js v1.2.1

### **快速上手**

如果已经在机器上搭建好了以太坊环境的话，则可以直接通过以下命令将项目运行起来。如果还没搭建的话可以先根据**环境部署**部分先搭建以太坊环境。

```shell
# 将源码下载到本地
git clone https://github.com/isKai/e-jewelry.git

# 进入项目目录
cd e-jewelry

# 编译（可能需要使用代理，即我们常说的翻墙）
truffle compile

# 部署（Ganache端口和truffle-config.js配置的端口一致）
truffle migrate

# 运行前端
npm run dev
```

### **环境部署**

该项目是搭建在Windows系统上，为了更良好的开发体验，建议安装[Git客户端](https://git-scm.com/download/win)工具，本项目在构建过程中使用的命令全部都是在Git客户端使用。

#### 1. 安装Node.js

Windows的安装很简单，直接到[Node.js官网](https://nodejs.org/en/)下载安装包，安装好后配置环境变量即可。

```shell
# 测试安装
node -v

# nodejs自带npm，一起测试下
npm -v
```

#### 2. 安装Truffle

```shell
# 使用npm安装Truffle(@后面是版本号，不加默认安装最新版）
npm install -g truffle@5.1.45

# 查看版本号
truffle version
```

其他工具在首次编译的时候会自动安装，如果提示缺少对应工具的话再手动安装即可。应该都是`npm install -g <名称>`的方式安装。

#### 3. 安装Ganache

[Ganache](https://www.trufflesuite.com/ganache)是一种用于以太坊开发的个人区块链，可用于部署合同，开发应用程序和运行测试。

### 项目构建完整过程

#### 1. 创建项目工程

该项目使用了Truffle Boxes提供的pet-shop模板，所以直接将模板下载下来。宠物商店（pet-shop）是一个去中心化的区块链应用，通常作为区块链学习的入门应用，阅读其[官方文档](https://www.trufflesuite.com/tutorials/pet-shop)可以对以太坊的开发以及本项目有个大致的了解。

```shell
# 项目目录
mkdir e-jewelry && cd e-jewelry

# 下载（unbox）pet-shop模板
truffle unbox pet-shop
```

下载完成后，会出现以下目录结构

- `contracts/` 智能合约的文件夹，所有的智能合约文件都放置在这里，里面包含一个重要的合约 Migrations.sol
- `migrations/` 用来处理部署（迁移）智能合约 ，迁移是一个额外特别的合约用来保存合约的变化。
- `test/` 智能合约测试用例文件夹
- `truffle.js/` 配置文件

