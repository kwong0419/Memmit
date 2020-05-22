DROP DATABASE IF EXISTS memmit_db;
CREATE DATABASE memmit_db;

\c memmit_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS submemmits;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS comments;


CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    username VARCHAR,
    password VARCHAR
);

CREATE TABLE submemmits
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    submemmit_id INT REFERENCES submemmits(id) ON DELETE CASCADE,
    image_url VARCHAR,
    body VARCHAR,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votes
(
    id SERIAL PRIMARY KEY,
    voter_id INT REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT UC_vote UNIQUE (voter_id, post_id)
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    content VARCHAR,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users
    (email, username, password)
VALUES
    ('kevinwong@pursuit.org', 'kwizzi', 'admin123'),
    ('kevin.wong954@gmail.com', 'kevinwong', 'admin123');


INSERT INTO submemmits
    (name, owner_id)
VAlUES
    ('memes', 1),
    ('shibas', 1),
    ('nature_is_lit', 1),
    ('music', 2),
    ('coding', 2),
    ('cats', 2);

INSERT INTO posts
    (owner_id, submemmit_id, image_url, body)
VALUES
    (1, 1, 'https://preview.redd.it/if8jfw9sgc051.jpg?width=640&crop=smart&auto=webp&s=9b285a62587a4ec518358bf7c034159d8731fc1b', 'Daily Meme 2'),
    (2, 1, 'https://preview.redd.it/04h207d30d051.jpg?width=640&crop=smart&auto=webp&s=76bb207bae9efd2ed347d89f7317f83e7e96851d', 'Daily Meme 1'),
    (1, 2, 'https://static.boredpanda.com/blog/wp-content/uploads/2018/05/funny-shiba-inu-8-5ae806af8fa83__700.gif', 'Shiba-ssant'),
    (2, 2, 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/459095_10151201570066088_880374472_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=y20HTwjmVAUAX9_cxP9&_nc_ht=scontent-lga3-1.xx&oh=f5d9a5a68661501581f3c9133dd31620&oe=5EEFDA3A', 'This is my shiba-inu Yuki'),
    (1, 2, 'https://justsomething.co/wp-content/uploads/2015/08/this-shiba-inu-stuck-in-a-bush-will-teach-you-a-funny-lesson.jpg', 'Funny shiba gets stuck in bush, keeps smiling'),
    (1, 3, 'https://www.reddit.com/r/NatureIsFuckingLit/comments/goj1ek/a_tree_that_looks_like_3d_computer_art/', 'A tree that looks like 3d computer art'),
    (2, 3, 'https://preview.redd.it/xf8pibmwqd051.jpg?width=640&crop=smart&auto=webp&s=b94a5ebb32a46bd091acccb3f7d82bea0d53151b', 'Squirrel approves of the bench built for it'),
    (2, 3, 'https://preview.redd.it/lo19fj1cod051.jpg?width=640&crop=smart&auto=webp&s=e9770319c27fb2e57fdb2c449ecd9d7adc802163', '🔥 This badass-looking Eurasian eagle-owl 🔥'),
    (1, 3, 'https://preview.redd.it/8iyd3c6549051.jpg?width=640&crop=smart&auto=webp&s=e781a28d0a06980e04a27d9e0eb0ee8b395af3d2', '🔥 Inside the wave 🔥'),
    (1, 4, '', 'Hi memmitors, here is a link to my soundcloud! https://soundcloud.com/kwiz-zi'),
    (2, 4, '', 'Hi memmitors, check out my friend''s beat on soundcloud! Here''s a link! https://soundcloud.com/kwi-zi/run'),
    (1, 5, 'Global Gitignore Files Are Cool and So Are You', 'https://www.viget.com/articles/global-gitignore-files-are-cool-and-so-are-you-1/'),
    (2, 5, 'Longest Even Length Substring', 'https://medium.com/@srajaninnov/longest-even-length-substring-9be298827f2a'),
    (2, 5, 'Connecting Django with PostgreSQL Database', 'https://www.youtube.com/watch?v=xsT7C-jSrBc'),
    (1, 6, 'https://i.redd.it/eiwadnus2d051.jpg', 'I honestly tried, but I could not resist. Who could possibly resist this face?'),
    (1, 6, 'https://preview.redd.it/76lud4m3jd051.jpg?width=640&crop=smart&auto=webp&s=f792f32b8fda1a0c298218cfdfbac943cd078c56', 'My name is Raphael, how may I help you? 😍'),
    (1, 6, 'https://preview.redd.it/8ec2h43t1c051.jpg?width=640&crop=smart&auto=webp&s=3c11bd2b660b254ab398123297a1946c3e0c35bc', 'I looked out my window and saw this Cat Picture');


INSERT INTO votes
    (voter_id, post_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
    (1, 15),
    (1, 16),
    (1, 17),
    (2, 1),
    (2, 3),
    (2, 5),
    (2, 6),
    (2, 9),
    (2, 10),
    (2, 12),
    (2, 15),
    (2, 16),
    (2, 17);

INSERT INTO comments
    (author_id, post_id, content)
VALUES
    (2, 1, 'LOL thats a funny one'),
    (1, 2, 'LOL this made my day! thanks!'),
    (2, 3, 'Awww cute shiba-ssant'),
    (1, 4, 'Wow, how old is your dog here?'),
    (2, 4, 'Only three months old!'),
    (1, 5, 'LOL hilarious and cute'),
    (1, 10, 'Please like and follow for more content!'),
    (1, 11, 'Please message me on soundcloud for any inquiries');

