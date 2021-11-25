# docker常用指令

## 镜像命令

### 拉取镜像

```shell
docker image pull <reponsitory>:<tag>
docker image pull alpine:latest
docker image pull ubuntu:latest
```

加上`-a`参数拉取全部镜像

### 查看镜像

```shell
docker image ls
# 通过--digests参数查看SHA256签名
docker image ls --digests alpine
```

### 查看镜像详情

该命令完美展示了镜像的细节，包括镜像层数据和元数据。

```shell
docker image inspect
```

### 过滤docker image ls输出

通过`--filter`过滤`docker image ls`返回的结果。

返回悬虚镜像。
> 没有标签的镜像成为悬虚镜像，在列表中展示为`<none>:<none>`。通常是因为构建了一个新镜像，镜像打了一个已存在的标签。

```shell
docker image ls --filter dangling=true 
```

通过`docker image prune`移除全部悬虚镜像。添加`-a`参数，Docker会额外移除没有被使用的镜像。

```shell
# 移除全部悬虚镜像
docker image prune
# 移除全部悬虚镜像，额外移除没被使用的镜像
docker image prune -a
```

过滤器：

- dangling：指定值为`false`或者`true`，仅返回悬虚镜像（true），或者非悬虚镜像（false）
- before：需要镜像名称或者ID作为参数，返回在之前被创建的全部镜像
- since：返回指定镜像之后创建的镜像
- label：根据标注的名称或者值，`docker image ls`不显示标注内容。
- is-official：是否是官方镜像
- is-automated：自动创建的仓库

其他过滤方式用`reference`。

```shell
# 仅显示标签为latest的示例
docker image ls --filter=reference="*:latest"
```

通过`--format`参数使用Go模板对输出内容进行格式化。

```shell
# 只返回镜像大小属性
docker image ls --format "{{.Size}}"
# 只返回仓库、标签和大小信息。
docker image ls --format "{{.Repository}}:{{.Tag}}:{{.Size}}"
```

获取全部镜像ID

```shell
docker image ls -q
```

### 通过CLI搜索Docker Hub

`docker search`命令允许通过CLI的方式搜索`Docker Hub`。

```shell
# --limit限制搜索结果
docker search nginx --limit=2
```

### 显示镜像的构建历史记录

```shell
docker image history ubuntu:latest
```

### 删除镜像

> 当读者不再需要某个镜像的时候，可以通过`docker image rm`命令从Docker主机删除该镜像。其中，rm是remove的缩写。

当镜像存在关联的容器，并且容器处于运行（Up）或者停止（Exited）状态时，不允许删除该镜像。

```shell
docker image rm 02674b
```

快捷删除全部镜像。

```shell
docker image rm $(docker image ls -q) -f
```

-----------------------

## 容器

### 检查docker daemon是否运行

```shell
docker version;

service docker status;

systemctl is-active docker;
```

### 启动容器

```shell
docker container run -it ubuntu:latest /bin/bash

docker container exec -it xxxxxxxxxx bash
# 这就是新建的容器，名称为“percy”，意指持久化（persistent）
docker container run --name percy -it ubuntu:latest /bin/bash
# 长格式的形式查看当前目录下所有可见文件的详细属性。
ls -l

```

杀死容器中的主进程，则容器也会被杀死。

### linux查看进程

```shell
ps -elf
```

### 停止容器

```shell
docker container stop xxxxxxxxxx
```

### 删除容器

```shell
docker container rm xxxxxxxxxx
# 删除全部容器
docker container rm $(docker container ls -aq) -f
```

|名称|默认|描述|
|---|---|---|
|--all, -a| |列出所有容器，默认显示运行中的容器|
|--filter, -f| |根据条件过滤显示内容|
|--format| |通过模板展示容器信息|
|--last, -n|-1| 显示最近创建的n个容器（包含所有容器状态）|
|--latest, -l| |显示最近创建的容器（包含所有容器状态）|
|--no-trunc| |不截断输出|
|--quiet, -q| |'静默模式'，只展示容器ID|
|--size, -s| |显示容器总的文件大小|

### 查看容器

```shell
docker container ls
#-a参数显示出全部的容器
docker container ls -a
```

### 启动容器2

```shell
docker container start percy
```

### 重启策略

创建两个新容器，其中“always”容器指定--restart always策略，另一个“unless- stopped”容器指定了--restart unless-stopped策略。

```shell
# 使用-d参数使容器在后台运行，不会连接到容器中
docker container run -d --name always --restart always alpine sleep 1d
docker container run -d --name unless-stopped --restart unless-stopped alpine sleep 1d
```

重启docker，always”容器（启动时指定了--restart always策略）已经重启了，但是“unless-stopped”容器（启动时指定了--restart unless-stopped策略）并没有重启。

on-failure策略会在退出容器并且返回值不是0的时候，重启容器。就算容器处于stopped状态，在Docker daemon重启的时候，容器也会被重启。

### 容器命令

- docker container run是启动新容器的命令。

- Ctrl-PQ会断开Shell和容器终端之间的链接，并在退出后保持容器在后台处于运行（UP）状态。

- docker container ls用于列出所有在运行（UP）状态的容器。如果使用-a标记，还可以看到处于停止（Exited）状态的容器。

- docker container exec允许用户在运行状态的容器中，启动一个新进程。

- docker container stop命令会停止运行中的容器，并将状态置为Exited(0)。

- docker container stop命令会停止运行中的容器，并将状态置为Exited(0)。

- docker container rm会删除停止运行的容器。

- docker container inspect命令会显示容器的配置细节和运行时信息。

## 容器化

将应用整合到容器中并且运行起来的这个过程，称为“容器化”（Containerizing），有时也叫作“Docker化”（Dockerizing）。

1. 编写应用代码。
2. 创建一个Dockerfile，其中包括当前应用的描述、依赖以及该如何运行这个应用。
3. 对该Dockerfile执行docker image build命令。
4. 等待Docker将应用程序构建到Docker镜像中。

### 命令

- docker image build命令会读取Dockerfile，并将应用程序容器化。使用-t参数为镜像打标签，使用-f参数指定Dockerfile的路径和名称，使用-f参数可以指定位于任意路径下的任意名称的Dockerfile。构建上下文是指应用文件存放的位置，可能是本地Docker主机上的一个目录或一个远程的Git库。

- Dockerfile中的FROM指令用于指定要构建的镜像的基础镜像。它通常是Dockerfile中的第一条指令。

- Dockerfile中的RUN指令用于在镜像中执行命令，这会创建新的镜像层。每个RUN指令创建一个新的镜像层。

- Dockerfile中的COPY指令用于将文件作为一个新的层添加到镜像中。通常使用COPY指令将应用代码赋值到镜像中。

- Dockerfile中的EXPOSE指令用于记录应用所使用的网络端口。

- Dockerfile中的ENTRYPOINT指令用于指定镜像以容器方式启动后默认运行的程序。

- 其他的Dockerfile指令还有LABEL、ENV、ONBUILD、HEALTHCHECK、CMD等。

## Docker Compose

```shell
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.1.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

```

- docker-compose up

`-d` 再次启动

- docker-compose down

- 使用docker-compose top命令列出各个服务（容器）内运行的进程

- 使用docker-compose ps命令来查看应用的状态。

- docker-compose stop命令会停止应用，但并不会删除资源

- 对于已停止的Compose应用，可以使用docker-compose rm命令来删除。

- 执行docker-compose restart命令重启应用。

- 使用docker volume ls命令手动查看

- 使用docker volume inspect命令可以查看卷位于Docker主机的什么位置。

## 命令2

- docker-compose up命令用于部署一个Compose应用。默认情况下该命令会读取名为docker-compose.yml或docker-compose.yaml的文件，当然用户也可以使用-f指定其他文件名。通常情况下，会使用-d参数令应用在后台启动。

- docker-compose stop命令会停止Compose应用相关的所有容器，但不会删除它们。被停止的应用可以很容易地通过docker-compose restart命令重新启动

- docker-compose rm命令用于删除已停止的Compose应用。它会删除容器和网络，但是不会删除卷和镜像。

- docker-compose restart命令会重启已停止的Compose应用。如果用户在停止该应用后对其进行了变更，那么变更的内容不会反映在重启后的应用中，这时需要重新部署应用使变更生效。

- docker-compose ps命令用于列出Compose应用中的各个容器。输出内容包括当前状态、容器运行的命令以及网络端口。

- docker-compose down会停止并删除运行中的Compose应用。它会删除容器和网络，但是不会删除卷和镜像。
