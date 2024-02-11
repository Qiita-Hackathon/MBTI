-- Windows環境で文字化け表示のために必要
SET CHARACTER SET utf8mb4;

-- ユーザーテーブル
create table users (
    user_id int auto_increment primary key, -- id（主キー）
    user_name varchar(255) not null, -- ユーザー名（一意キーにしても良い）
    email varchar(255) not null unique, -- メールアドレス（同じく一意キーにしても良い）
    password varchar(255) not null, -- パスワード（ハッシュ化してもそのままでも良し）
    age int not null,
    gender int not null,
    occupation varchar(255) default '',
    self_introduction varchar(255) default '',
    icon_path varchar(255) default '', -- アイコン画像のパス
    mbti int not null
);

-- ユーザーの初期データ追加
insert into users (user_name, email, password, age, gender, mbti) values
('Yusuke', 'tanaka@email.com', SHA2('password', 256), 25, 1, 1),
('toku', 'takeda@email.com', SHA2('password', 256), 25, 1, 1),
('Umi',  'satou@email.com', SHA2('password', 256), 25, 1, 0),
('Lucky', 'asou@email.com', SHA2('password', 256), 25, 1, 0),
('Kazuki', 'minami@email.com', SHA2('password', 256), 25, 1, 1);

-- アクセストークンの管理テーブル
CREATE TABLE access_tokens (
    token_id INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    expiry_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 投稿の管理テーブル
CREATE TABLE posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    image_path VARCHAR(255),
    like_count INT DEFAULT 0,
    repost_count INT DEFAULT 0,
    reply_count INT DEFAULT 0,
    created_at DATETIME NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- いいねの管理テーブル
CREATE TABLE likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- リポストの管理テーブル
CREATE TABLE reposts (
    repost_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- リプライの管理テーブル
CREATE TABLE replies (
    reply_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    parent_reply_id INT, -- 親リプライのID
    reply_text TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (parent_reply_id) REFERENCES replies(reply_id)
);

-- category_tagsの管理テーブル
create table category_tags (
    tag_id int primary key auto_increment,
    category_group varchar(255) not null,
    tag_name varchar(255) unique not null
);

-- category_tagsの初期データ追加
insert into category_tags (category_group, tag_name) values
('hobby', 'music'),
('hobby', 'movie'),
('hobby', 'book'),
('worries','friend'),
('worries', 'work'),
('worries', 'family');

/* -- user_tagsの管理テーブル
create table user_tags (
    user_tag_id longint primary key auto_increment,
    user_id longint foreign key references users(user_id),
    tag_id int  foreign key references category_tags(tag_id)
);

-- user_tagsの初期データ追加
insert into user_tags (user_id, tag_id) values
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 2); */

 -- MBTIの管理テーブル
create table mbtis (
    mbti_id int primary key auto_increment,
    mbti_name varchar(255) not null,
    mbti_description varchar(255) not null
);

-- MBTIの初期データ追加
insert into mbtis (mbti_name, mbti_description) values
('ISTJ', '真面目で責任感が強く、堅実な性格。'),
('ISFJ', '控えめで思いやりがあり、忠実な性格。'),
('INFJ', '理想主義者で、独創的で人に思いやりがある。'),
('INTJ', '独創的で、自分の考えを大切にする。');