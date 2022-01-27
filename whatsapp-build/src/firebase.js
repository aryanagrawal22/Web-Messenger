import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDCEEC7UsiW3_ZaJAKZ_3Jq9uxfhxn4jg8",
    authDomain: "whatsapp-build-e3a1e.firebaseapp.com",
    projectId: "whatsapp-build-e3a1e",
    storageBucket: "whatsapp-build-e3a1e.appspot.com",
    messagingSenderId: "623157523647",
    appId: "1:623157523647:web:ca6b9507eb8ffaabec820a"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  export {auth,provider};
  export default firebaseApp;