# e-jewelry

基于区块链技术之可溯源珠宝电商平台



### **使用环境**

1. Truffle v5.1.45 (core: 5.1.45)
2. Solidity v0.5.16 (solc-js)
3. Node v12.14.1
4. Web3.js v1.2.1

### **快速上手**

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