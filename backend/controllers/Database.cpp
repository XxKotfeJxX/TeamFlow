#include "Database.h"
#include <stdexcept>
#include <iostream>

using namespace std;

Database::Database(const string& connInfo) : connInfo(connInfo) {
    pqxx::connection conn(connInfo);
    if(!conn.is_open()){
        throw runtime_error("Fail to connect to the database");
    }
}

void Database::createDefaultRoles() {
    pqxx::connection conn(connInfo);
    pqxx::work txn(conn);
    
    const vector<pair<string, string>> roles = {
        {"admin", "Administrator with full access"},
        {"user", "Regular user with limited access"},
        {"guest", "Guest user with minimal access"}
    };

    for (const auto& [name, description] : roles){
        txn.exec_params(R"(
            INSERT INTO roles (name, description)
            VALUES ($1, $2)
            ON CONFLICT (name) DO NOTHING;
            )", name, description);
    }

    txn.commit();
}

void Database::assignRoleToUser(const string &userId, const string &roleName) {
    pqxx::connection conn(connInfo);
    pqxx::work txn(conn);

    pqxx::result roleRes = txn.exec_params("SELECT id FROM roles WHERE name = $1", roleName);
    if (roleRes.empty()) {
        throw runtime_error("Role not found: " + roleName);
    }

    int roleId = roleRes[0][0].as<int>();
    txn.exec_params(R"(
        INSERT INTO user_roles (user_id, role_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, role_id) DO NOTHING;
        )", userId, roleId);

    txn.commit();
}

vector<string> Database::getUserRoles(const string &userId) {
    pqxx::connection conn(connInfo);
    pqxx::work txn(conn);

    vector<string> roles;
    pqxx::result res = txn.exec_params(R"(
        SELECT r.name FROM roles r
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = $1;
        )", userId);

    for (const auto& row : res) {
        roles.push_back(row["name"].as<string>());
    }

    return roles;
}

void Database::insertUser(const User &user)
{
    pqxx::connection conn(connInfo);
    pqxx::work txn(conn);

    txn.exec_params(R"(
        INSERT INTO users (id, username, email, password_hash, display_name, avatar_url, is_banned, ban_reason, is_email_verified)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    )",
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getPasswordHash(),
                    user.getDisplayName(),
                    user.getAvatarUrl() ? *user.getAvatarUrl() : nullptr,
                    user.getIsBanned(),
                    user.getBanReason() ? *user.getBanReason() : nullptr,
                    user.getIsEmailVerified());

    txn.commit();
}

optional<User> Database::getUserById(const string &id)
{
    pqxx::connection conn(connInfo);
    pqxx::work txn(conn);

    pqxx::result res = txn.exec_params("SELECT * FROM users WHERE id = $1", id);
    if (res.empty())
        return nullopt;

    const auto &row = res[0];
    return User(
        row["id"].as<string>(),
        row["username"].as<string>(),
        row["email"].as<string>(),
        row["password_hash"].as<string>(),
        row["display_name"].as<string>(),
        row["avatar_url"].is_null() ? std::nullopt : make_optional(row["avatar_url"].as<string>()),
        row["is_banned"].as<bool>(),
        row["ban_reason"].is_null() ? std::nullopt : make_optional(row["ban_reason"].as<string>()),
        row["is_email_verified"].as<bool>());
}

vector<User> Database::getAllUsers()
{
    pqxx::connection conn(connInfo);
    pqxx::work txn(conn);

    vector<User> users;
    pqxx::result res = txn.exec("SELECT * FROM users");

    for (const auto &row : res)
    {
        users.emplace_back(
            row["id"].as<string>(),
            row["username"].as<string>(),
            row["email"].as<string>(),
            row["password_hash"].as<string>(),
            row["display_name"].as<string>(),
            row["avatar_url"].is_null() ? nullopt : make_optional(row["avatar_url"].as<string>()),
            row["created_at"].as<string>(),
            row["is_banned"].as<bool>(),
            row["ban_reason"].is_null() ? nullopt : make_optional(row["ban_reason"].as<string>()),
            row["is_email_verified"].as<bool>());
    }

    return users;
}

void Database::updateUser(const User &user)
{
    pqxx::connection conn(connInfo);
    pqxx::work txn(conn);

    txn.exec_params(R"(
        UPDATE users
        SET username = $2,
            email = $3,
            password_hash = $4,
            display_name = $5,
            avatar_url = $6,
            is_banned = $7,
            ban_reason = $8,
            is_email_verified = $9
        WHERE id = $1
    )",
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getPasswordHash(),
                    user.getDisplayName(),
                    user.getAvatarUrl() ? *user.getAvatarUrl() : nullptr,
                    user.getIsBanned(),
                    user.getBanReason() ? *user.getBanReason() : nullptr,
                    user.getIsEmailVerified());

    txn.commit();
}

void Database::deleteUser(const string &id)
{
    pqxx::connection conn(connInfo);
    pqxx::work txn(conn);

    txn.exec_params("DELETE FROM users WHERE id = $1", id);
    txn.commit();
}