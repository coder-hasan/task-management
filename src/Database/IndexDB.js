import Dexie from "dexie";

const db = new Dexie('UserDatabase');

db.version(1).stores({
    users: '++id,first_name,last_name,email,password,profilePicture,bio',
    sessions: '++id,email,token',
    // indexes: ['email'],
});

export const createUser = async (user) => {
    const { id } = await db.users.add(user);
    return id;
};

export const createSession = async (email, token) => {
    await db.sessions.add({ email, token });
};

export const getUserByEmail = async (email) => {
    return await db.users.where('email').equals(email).first();
};

export const verifyPassword = async (inputPassword, storedPassword) => {
    try {
        return inputPassword === storedPassword;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };