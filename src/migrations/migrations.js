const createUserTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    users(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        firstname VARCHAR NOT NULL,
        lastname VARCHAR NOT NULL,
        profile_img VARCHAR NULL,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        createdat TIMESTAMP DEFAULT NOW()
    )
`;

const createEnteriesTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    enteries(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        title VARCHAR NOT NULL,
        entry VARCHAR NOT NULL,
        date TIMESTAMP NOT NULL,
        createdat TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE
    )
`;

const createtasksTableQuery = `
    DROP TABLE IF EXISTS comments CASCADE;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    tasks(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        task VARCHAR NOT NULL,
        isdone BOOLEAN NOT NULL,
        date TIMESTAMP NOT NULL,
        createdat TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE
    )
`;

const migrate = async (db) => {
  try {
    await db.query(createUserTableQuery);
    await db.query(createEnteriesTableQuery);
    await db.query(createtasksTableQuery);
    return true;
  } catch (err) {
    return console.log(err);
  }
};

module.exports = migrate;