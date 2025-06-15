#pragma once
#include <string>

using namespace std;

class Role
{
public:
    Role(int id, string name, string description);
    ~Role() = default;

    // Getters
    [[nodiscard]] int getId() const;
    [[nodiscard]] const string &getName() const;
    [[nodiscard]] const string &getDescription() const;

    // Setters
    void setName(const string &name);
    void setDescription(const string &description);

private:
    int id;
    string name;
    string description;
};