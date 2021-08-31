- 本地仓库命令(***提交什么放在了提交***)

  ```sh
  # 初始化仓库
  git init 
  # 查看状态
  git status
  ```

- 远程仓库相关(remote)

  ```sh
  # 查看远程仓库
  git remote
  # 删除远程仓库
  git remote rm xxx
  # 添加远程仓库
  git remote add origin https://github.com/xupengchong/uni-app-frame.git
  ```

- 拉取相关

  ```sh
  # 指定合并冲突默认策略
  git config pull.rebase false
  # 基础拉取代码
  git pull
  # 指定源跟分支拉取
  git pull origin master
  # 指定源跟分支并允许无关历史合并
  git pull origin master --allow-unrelated-histories
  ```

- 提交相关

  ```sh
  # 添加所有修改到缓存区
  git add .
  # 提交缓存区所有修改到本地仓库
  git commit -m "commit-message"
  # 基础提交
  git push
  # 提交并将当前本地分支绑定到远程源与分支
  git push -u origin master
  ```

- 分支管理

  ```sh
  # 查看分支
  git branch
  # 创建分支
  git branch xxx
  # 删除分支
  git branch -d xxx
  # 分支更名
  git branch -M xxx
  # 分支切换
  git checkout xxx
  # 将当前分支绑定指定的远程仓库源跟分支
  git branch --set-upstream-to=origin/xxx master
  ```

- 配置相关(***--global 全局设置***)

  ```sh
  # 查看用户名
  git config user.name
  # 查看邮箱
  git config user.email
  # 查看密码
  git config user.password
  # 查看代理
  git config http.proxy
  git config https.proxy
  # 修改用户名
  git config user.name 'username'
  # 修改邮箱
  git config user.email 'email@email.com'
  # 修改密码
  git config user.password 'password'
  # 清除代理
  git config --unset http.proxy
  git config --unset https.proxy
  # 清除用户记录账户信息
  git config --system --unset credential.helper
  git config --global credential.helper store
  ```

- 合并相关

  ```sh
  # 这个不写命令行了，一个是懒，第二个合并代码尽量使用ide。大多数ide对git都有兼容
  ```

  

- 其他

  ```sh
  # 生成公密钥(公钥地址在~/.ssh/id_rsa.pub,windows的~ = C:Users/当前用户名/)
  ssh-keygen -t rsa
  ```

  