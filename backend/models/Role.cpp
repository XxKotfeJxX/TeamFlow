#include "Role.h"

Role::Role(int id, string name, string description)
    : id(id), name(std::move(name)), description(std::move(description)) {}

int Role::getId() const
{
    return id;
}

const string &Role::getName() const
{
    return name;
}

const string &Role::getDescription() const
{
    return description;
}

void Role::setName(const string &newName)
{
    name = newName;
}

void Role::setDescription(const string &newDescription)
{
    description = newDescription;
}

