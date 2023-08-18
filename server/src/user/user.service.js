const db = require("../../database-mysql/index");
const addUserService = async (userData) => {
  return new Promise(async (resolve, reject) => {
    const query = "INSERT INTO user (firstName,lastName,email,password) VALUES (?)";
    const values = [
      userData.firstName,
      userData.lastNAme,
      userData.email,
      userData.password
    ];
    db.query(query, [values], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.affectedRows === 0) {
          resolve(null);
        } else {
          resolve(results);
        }
      }
    });
  });
};
const updateUserService = async (idUser,fieldsToUpdate) => {
  return new Promise(async (resolve, reject) => {
    const query = "UPDATE user SET ? WHERE idUser = ?";
    db.query(query, [fieldsToUpdate, idUser], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.changedRows === 0) {
          resolve(null);
        } else {
          resolve(results);
        }
      }
    });
  });
};
const getUserByIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
    const query = "SELECT * FROM user WHERE idUser = ?";
    db.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve([results]);
        }
      }
    });
  });
};
const getUserByEmailService = async (email) => {
  return new Promise(async (resolve, reject) => {
    const query = "SELECT * FROM user WHERE email = ?";
    db.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results);
        }
      }
    });
  });
};
const getAllUserService = async () => {
  return new Promise(async (resolve, reject) => {
    const query = "SELECT * FROM user";
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve([results]);
        }
      }
    });
  });
};
const deleteUserByIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
    const query = "UPDATE user SET deactivated = 1 WHERE idUser = ?";
    db.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.changedRows === 0) {
          resolve(null);
        } else {
          resolve(result);
        }
      }
    });
  });
};

module.exports = {
  addUserService,
  updateUserService,
  getUserByIdService,
  getAllUserService,
  deleteUserByIdService,
  getUserByEmailService

};
