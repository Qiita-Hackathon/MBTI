# 環境構築

`.env`ファイルを作成

```sh
touch .env
# Windowsは ni .env
```

内容を以下に編集

```.env
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PORT=3306
MYSQL_PASSWORD=password
MYSQL_DATABASE=my_db
TZ=Asia/Tokyo
NEXTJS_PORT=3000
GO_PORT=8080
```

モジュールインストール
```sh
npm i # ルートのnode_modulesのインストール
docker compose run --rm app npm i # appフォルダ内のルートのnode_modulesのインストール
```

起動は以下を実行

```sh
docker compose up --build -d
```

フロントエンドでライブラリをインストールする時はコンテナ内でインストールする

```sh
docker compose run --rm app npm i
# もしくは
docker exec -it app bash
npm i # ライブラリ名
```

データベースを見る方法

```sh
docker exec -it db bash
mysql -u root -p
# パスワードを入力

# データベースの選択
use my_db;
```
