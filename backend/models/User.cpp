#include "User.h"

User::User(
    string id,
    string username,
    string email,
    string passwordHash,
    string displayName,
    optional<string> avatarUrl,
    bool isBanned,
    optional<string> banReason,
    bool isEmailVerified)
    : id(std::move(id)),
      username(std::move(username)),
      email(std::move(email)),
      passwordHash(std::move(passwordHash)),
      displayName(std::move(displayName)),
      avatarUrl(std::move(avatarUrl)),
      isBanned(isBanned),
      banReason(std::move(banReason)),
      isEmailVerified(isEmailVerified) {}
const string& User::getId() const {
    return id;
}
const string& User::getUsername() const {
    return username;
}
const string& User::getEmail() const {
    return email;
}
const string& User::getPasswordHash() const {
    return passwordHash;
}
const string& User::getDisplayName() const {
    return displayName;
}
const optional<string>& User::getAvatarUrl() const {
    return avatarUrl;
}
bool User::getIsBanned() const {
    return isBanned;
}
const optional<string>& User::getBanReason() const {
    return banReason;
}
bool User::getIsEmailVerified() const {
    return isEmailVerified;
}
void User::setDisplayName(const string& name) {
    displayName = name;
}
void User::setAvatarUrl(const optional<string>& url) {
    avatarUrl = url;
}
void User::setIsBanned(bool banned, const optional<string>& reason) {
    isBanned = banned;
    banReason = reason;
}
