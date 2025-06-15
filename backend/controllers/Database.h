#pragma once
#include <string>
#include <vector>
#include <memory>
#include "../models/User.h"
#include <pqxx/pqxx>

using namespace std;

class Database {
    public:
        explicit Database(const string& connInfo);

        void insertUser(const User& user);
        optional<User> getUserById(const string &id);
        vector<User> getAllUsers();
        void updateUser(const User& user);
        void deleteUser(const string &id);
        void assignRoleToUser(const string &userId, const string &roleName);
        vector<string> getUserRoles(const string &userId);
        void createDefaultRoles();

    private:
        string connInfo;
};
