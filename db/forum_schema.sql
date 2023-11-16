DROP DATABASE IF EXISTS forum_db;
CREATE DATABASE forum_db;

\c forum_db

CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    username TEXT NOT NULLL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS categories(
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS threads(
    thread_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category_id INTEGER REFERENCES categories(category_id),
    user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS posts(
    post_id SERIAL PRIMARY KEY,
    post_content TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(user_id),
    thread_id INTEGER REFERENCES threads(thread_id),
    reply_to_post_id INTEGER REFERENCES posts(post_id)
);

CREATE TABLE IF NOT EXISTS reactions(
    reaction_id SERIAL PRIMARY KEY,
    reaction_type VARCHAR(20),
    post_id INTEGER REFERENCES posts(post_id),
    user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS roles(
    role VARCHAR(20),
    user_id INTEGER REFERENCES users(user_id)
);
