/* eslint-disable radix */
const database = require("./database");

// const movies = [
//   {
//     id: 1,
//     title: "Citizen Kane",
//     director: "Orson Wells",
//     year: "1941",
//     colors: false,
//     duration: 120,
//   },
//   {
//     id: 2,
//     title: "The Godfather",
//     director: "Francis Ford Coppola",
//     year: "1972",
//     colors: true,
//     duration: 180,
//   },
//   {
//     id: 3,
//     title: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     year: "1994",
//     color: true,
//     duration: 180,
//   },
// ];

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Users not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res
        .location(`result/api/users/${result.insertID}`)
        .status(201)
        .send("User created");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving a new user");
    });
};

const updateUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([users]) => {
      if (users.affectedRow === 0) {
        res.status(404).send("Users not found");
      } else {
        res.sendStatus(204).send("User updated");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing database users");
    });
};

const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([users]) => {
      if (users.affectedRow === 0) {
        res.status(404).send("Users not found");
      } else {
        res.sendStatus(204).send("User deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing database users");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUserById,
  deleteUserById,
};
