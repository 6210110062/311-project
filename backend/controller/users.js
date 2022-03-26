import { v4 as uuid } from "uuid";

let users = [];
export const getUsers = (req, res) => {
    res.send(users);
};

export const createUser = (req, res) => {
    const user = user.body;

    users.push({ ...user, id: uuid() });
    res.send("User added");
};
export const getUser = (req, res) => {
    const singleUser = users.filter((user) => user.id === req.params.id);
    res.send(singleUser);
};

export const deleteUser = (req, res) => {
    users = users.filter((user) => user.id !== req.params.id);
    res.send("deleted");
}