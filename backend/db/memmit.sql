-- DROP DATABASE IF EXISTS memmit_db;
-- CREATE DATABASE memmit_db;

-- \c memmit_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS submemmits;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS comments;


CREATE TABLE users
(
    id VARCHAR PRIMARY KEY,
    email VARCHAR,
    username VARCHAR,
    password VARCHAR
);

CREATE TABLE submemmits
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    owner_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT UC_name UNIQUE (name)
);

CREATE TABLE subscriptions
(
    id SERIAL PRIMARY KEY,
    submemmitID INT REFERENCES submemmits(id) ON DELETE CASCADE,
    userID VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT UC_subscription UNIQUE (submemmitID, userID)
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    owner_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    submemmit_id INT REFERENCES submemmits(id) ON DELETE CASCADE,
    title VARCHAR,
    image_url VARCHAR,
    body VARCHAR,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votes
(
    id SERIAL PRIMARY KEY,
    voter_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT UC_vote UNIQUE (voter_id, post_id)
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    author_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    content VARCHAR,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users
    (id, email, username, password)
VALUES
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 'kevinwong@pursuit.org', 'kwizzi', 'admin123'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 'kevin.wong954@gmail.com', 'kevinwong', 'admin123');


INSERT INTO submemmits
    (name, owner_id)
VAlUES
    ('memes', 'E9zSOjRa2IVCrEAWfdxWaJXtwJ83'),
    ('shibas', 'E9zSOjRa2IVCrEAWfdxWaJXtwJ83'),
    ('nature_is_lit', 'E9zSOjRa2IVCrEAWfdxWaJXtwJ83'),
    ('music', 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2'),
    ('coding', 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2'),
    ('cats', 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2');

INSERT INTO subscriptions
    (submemmitID, userID)
VALUES
    (1, 'E9zSOjRa2IVCrEAWfdxWaJXtwJ83'),
    (2, 'E9zSOjRa2IVCrEAWfdxWaJXtwJ83'),
    (3, 'E9zSOjRa2IVCrEAWfdxWaJXtwJ83'),
    (4, 'E9zSOjRa2IVCrEAWfdxWaJXtwJ83'),
    (5, 'E9zSOjRa2IVCrEAWfdxWaJXtwJ83'),
    (1, 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2'),
    (2, 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2'),
    (3, 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2'),
    (4, 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2'),
    (5, 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2'),
    (6, 'xbqiDqEXNUWXXkOpM7VW4SkuTSw2');

INSERT INTO posts
    (owner_id, submemmit_id, title, image_url, body)
VALUES
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 1, 'Zoom be like', 'https://preview.redd.it/if8jfw9sgc051.jpg?width=640&crop=smart&auto=webp&s=9b285a62587a4ec518358bf7c034159d8731fc1b', 'Daily Meme 2'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 1, 'Yas Queen', 'https://preview.redd.it/04h207d30d051.jpg?width=640&crop=smart&auto=webp&s=76bb207bae9efd2ed347d89f7317f83e7e96851d', 'Daily Meme 1'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 2, 'So cute', 'https://static.boredpanda.com/blog/wp-content/uploads/2018/05/funny-shiba-inu-8-5ae806af8fa83__700.gif', 'Look at this shiba-ssant!'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 2, 'About 8 years ago...', 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/459095_10151201570066088_880374472_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=y20HTwjmVAUAX9_cxP9&_nc_ht=scontent-lga3-1.xx&oh=f5d9a5a68661501581f3c9133dd31620&oe=5EEFDA3A', 'This is my shiba-inu Yuki'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 2, 'Keep smiling!', 'https://justsomething.co/wp-content/uploads/2015/08/this-shiba-inu-stuck-in-a-bush-will-teach-you-a-funny-lesson.jpg', 'Funny shiba gets stuck in bush, keeps smiling'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 3, 'Tree that looks like 3d computer art', 'https://www.reddit.com/r/NatureIsFuckingLit/comments/goj1ek/a_tree_that_looks_like_3d_computer_art/', 'A tree that looks like 3d computer art'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 3, 'Having lunch... wait a minute', 'https://preview.redd.it/xf8pibmwqd051.jpg?width=640&crop=smart&auto=webp&s=b94a5ebb32a46bd091acccb3f7d82bea0d53151b', 'Squirrel approves of the bench built for it'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 3, 'Eagle-owl', 'https://preview.redd.it/lo19fj1cod051.jpg?width=640&crop=smart&auto=webp&s=e9770319c27fb2e57fdb2c449ecd9d7adc802163', '🔥 This badass-looking Eurasian eagle-owl 🔥'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 3, 'Beautiful shot', 'https://preview.redd.it/8iyd3c6549051.jpg?width=640&crop=smart&auto=webp&s=e781a28d0a06980e04a27d9e0eb0ee8b395af3d2', '🔥 Inside the wave 🔥'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 4, 'Promotion: hit up my soundcloud', '', 'Hi memmitors, here is a link to my soundcloud! https://soundcloud.com/kwiz-zi'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 4, 'Promotion: hit up my friend''s soundcloud!', '', 'Hi memmitors, check out my friend''s beat on soundcloud! Here''s a link! https://soundcloud.com/kwiz-zi/run'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 5, 'Check out this article: Global Gitignore Files Are Cool and So Are You', '', 'https://www.viget.com/articles/global-gitignore-files-are-cool-and-so-are-you-1/'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 5, 'Another one: Longest Even Length Substring', '', 'https://medium.com/@srajaninnov/longest-even-length-substring-9be298827f2a'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 5, 'VIDEO: Connecting Django with PostgreSQL Database', '', 'https://www.youtube.com/watch?v=xsT7C-jSrBc'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 6, '💕Heart melting', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLBhU_PG9ws6jqFTmtWjxZKvhYgCnUTs1qW31ftnnLcYiwMLnJ&usqp=CAU', 'I honestly tried, but I could not resist. Who could possibly resist this face?'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 6, 'Raphael the Cat', 'https://preview.redd.it/76lud4m3jd051.jpg?width=640&crop=smart&auto=webp&s=f792f32b8fda1a0c298218cfdfbac943cd078c56', 'My name is Raphael, how may I help you? 😍'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 6, 'Lolcat', 'https://preview.redd.it/8ec2h43t1c051.jpg?width=640&crop=smart&auto=webp&s=3c11bd2b660b254ab398123297a1946c3e0c35bc', 'I looked out my window and saw this Cat Picture');


INSERT INTO votes
    (voter_id, post_id)
VALUES
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 1),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 2),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 3),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 4),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 5),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 6),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 7),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 8),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 9),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 10),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 11),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 12),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 13),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 14),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 15),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 16),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 17),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 1),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 3),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 5),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 6),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 9),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 10),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 12),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 15),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 16),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 17);

INSERT INTO comments
    (author_id, post_id, content)
VALUES
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 1, 'LOL thats a funny one'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 2, 'LOL this made my day! thanks!'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 3, 'Awww cute shiba-ssant'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 4, 'Wow, how old is your dog here?'),
    ('xbqiDqEXNUWXXkOpM7VW4SkuTSw2', 4, 'Only three months old!'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 5, 'LOL hilarious and cute'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 10, 'Please like and follow for more content!'),
    ('E9zSOjRa2IVCrEAWfdxWaJXtwJ83', 11, 'Please message me on soundcloud for any inquiries');

