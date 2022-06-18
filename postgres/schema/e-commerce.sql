CREATE TABLE IF NOT EXISTS "users"(
    "id" serial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "lastname" varchar(255),
    "email" varchar(255) UNIQUE NOT NULL,
    "password" varchar(255),
    "role" varchar(255),
    "status" varchar(255),
    "reset-password-token" varchar(255),
    "picture" varchar(500),
    "created-at" timestamp DEFAULT NOW() NOT NULL,
    "updated-at" timestamp DEFAULT NOW() NOT NULL
);