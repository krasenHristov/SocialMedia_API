import * as db from "../db/index";
import { comparePassword } from "../middleware/authMiddleware";

export const createUserModel = async (
  username: string,
  email: string,
  password: string,
) => {
  const existingUser = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (existingUser.rows.length > 0) {
    return Promise.reject({
      errCode: 409,
      errMsg: "User with this email already exists",
    });
  }

  const checkUsername = await db.query(`SELECT * FROM users WHERE username = $1`,[username])

  if (checkUsername.rows.length > 0) {
    return Promise.reject({
      errCode: 409,
      errMsg: "Username already taken",
    });
  }

  const user = await db.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username`,
    [username, email, password],
  );

  await db.query(`
    INSERT INTO posts (user_id, title, content)
    VALUES ($1, 'Hello World!', 'I am using SM name')
  `, [user.rows[0].user_id])

  return user.rows[0];
};

export const singInModel = async (email: string, password: string) => {
  const user = await db.query(`SELECT * FROM USERS WHERE email=$1`, [email]);

  if (!user.rows.length)
    return Promise.reject({ errCode: 404, errMsg: "User not found" });

  const isValid = await comparePassword(password, user.rows[0].password);

  if (!isValid) {
    return Promise.reject({ errCode: 401, errMsg: "Incorrect password" });
  }

  return user.rows[0];
};
