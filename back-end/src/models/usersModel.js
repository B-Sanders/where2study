import db from "../database/base";

export async function createUser({
  activePost,
  userClasses,
  displayName,
  userEmail,
  userPassword,
  userMajor,
  userPronouns,
}) {
  try {
    // console.log("\n\n\nInside createUser try block...");
    return await db
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        const userID = user.user.uid;
        const userData = {
          active_post: activePost,
          classes: userClasses,
          display_name: displayName,
          email: userEmail,
          major: userMajor,
          pronouns: userPronouns,
          uuid: userID,
        };

        // Create a new user with index of userId
        db.database()
          .ref("Users/" + userID)
          .set(userData);
        console.log("Successfully added user to the database...");
        return 200;
      });
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      console.log("Email is already in use");
      return 301;
    } else {
      return 300;
    }
  }
}

export function obtainUser(reqHeaders) {
  // Send snapshot of the specific user
  return db
    .database()
    .ref("Users/" + reqHeaders["userid"])
    .once("value")
    .then((snapshot) => snapshot.val())
    .catch((error) => console.log(error));
}

export function editUser({
  activePost,
  userClasses,
  displayName,
  userEmail,
  userMajor,
  userPronouns,
  userID,
}) {
  var updates = {};

  var edit = {
    active_post: activePost,
    classes: userClasses,
    display_name: displayName,
    email: userEmail,
    major: userMajor,
    pronouns: userPronouns,
    uuid: userID,
  };

  // Overwrite request, identified by userID
  updates["/Users/" + userID] = edit;

  // Return updated request
  return db.database().ref().update(updates);
}
