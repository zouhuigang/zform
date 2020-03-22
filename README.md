### 原则

1.可扩展性。

2.解耦，灵活性。

3.未来方便迁移。

4.简单易用。

### 版本控制

构思采用类似Jquery的版本控制:

	https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
	https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js
	
=>
	
	http://{cdn地址}/版本控制/压缩版.js
	http://{cdn地址}/版本控制/开发版.js
	
### 快速开始

    git clone git@github.com:zouhuigang/zform.git
    git checkout dev
    nvm install v10.9.0
    nvm use
    npm install
    npm run dev


### 软件安装

nvm(mac):

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

### 问题汇总

	https://blog.csdn.net/mrlmx/article/details/83042610?utm_source=blogxgwz8