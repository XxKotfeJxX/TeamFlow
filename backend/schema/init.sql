    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        display_name VARCHAR(100) NOT NULL,
        avatar_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        is_banned BOOLEAN DEFAULT FALSE,
        ban_reason TEXT,
        is_email_verified BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        description TEXT
    );

    CREATE TABLE IF NOT EXISTS user_roles (
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, role_id)
    );
