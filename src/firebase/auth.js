import firebase from "firebase/app";
import "firebase/auth";

export const logout = () => {
  return firebase.auth().signOut();
};

export const login = async ({ email, password }) => {
  const resp = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  return resp.user;
};
