#pragma once
#include <string>
#include <optional>

using namespace std;

class User {
    public:
        User(
            string id,
            string username,
            string email,
            string passwordHash,
            string displayName,
            optional<string> avatarUrl,
            bool isBanned,
            optional<string> banReason,
            bool isEmailVerified);

        ~User() = default;

        // Getters
        [[nodiscard]] const string &getId() const;
        [[nodiscard]] const string &getUsername() const;
        [[nodiscard]] const string &getEmail() const;
        [[nodiscard]] const string &getPasswordHash() const;
        [[nodiscard]] const string &getDisplayName() const;
        [[nodiscard]] const optional<string> &getAvatarUrl() const;
        [[nodiscard]] bool getIsBanned() const;
        [[nodiscard]] const optional<string> &getBanReason() const;
        [[nodiscard]] bool getIsEmailVerified() const;

        // Setters
        void setDisplayName(const string& name);
        void setAvatarUrl(const optional<string>& url);
        void setIsBanned(bool banned, const optional<string>& reason = std::nullopt);

    private:
        string id;
        string username;
        string email;
        string passwordHash;
        string displayName;
        optional<string> avatarUrl;
        bool isBanned;
        optional<string> banReason;
        bool isEmailVerified;
};