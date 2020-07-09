import firebase from './index'

export default {
  async signup(email, password) {
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(email, password);

      console.log("Account created");

      //   // Navigate to the Home page, the user is auto logged in

      return { status: true };
    } catch (error) {
      return { status: false, error: error };
    }
  },
  async login(email, password) {
    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email, password);
      return { status: true };
    } catch (error) {
      return { status: false, error }
    }
  },
  async logout() {
    try {
      await firebase.auth().signOut();
      // Navigate to login view
    } catch (error) {
      console.log(error);
    }
  },
  async user() {
    return await firebase.auth().currentUser;
  }
}