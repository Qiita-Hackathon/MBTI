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

 -- MBTIの管理テーブル
 create table mbti (
    mbti_id int primary key auto_increment,
    mbti_name varchar(255) not null,
    mbti_description varchar(255) not null
 );

-- MBTIの初期データ追加
insert into mbti (mbti_name, mbti_description) values
('ISTJ', '真面目で責任感が強く、堅実な性格。'),
('ISFJ', '控えめで思いやりがあり、忠実な性格。'),
('INFJ', '理想主義者で、独創的で人に思いやりがある。'),
('INTJ', '独創的で、自分の考えを大切にする。'),
('ISTP', '冷静で論理的で、現実的な性格。'),
('ISFP', '控えめで、繊細で、忠実な性格。'),
('INFP', '理想主義者で、独創的で、人に思いやりがある。'),
('INTP', '独創的で、論理的で、冷静な性格。'),
('ESTP', '冒険好きで、現実的で、論理的な性格。'),
('ESFP', '楽天的で、快活で、人に思いやりがある。'),
('ENFP', '理想主義者で、独創的で、人に思いやりがある。'),
('ENTP', '独創的で、論理的で、冷静な性格。'),
('ESTJ', '実直で、責任感が強く、堅実な性格。'),
('ESFJ', '社交的で、忠実で、思いやりがある。'),
('ENFJ', '理想主義者で、独創的で、人に思いやりがある。'),
('ENTJ', 'リーダーシップがあり、自分の考えを大切にする。');