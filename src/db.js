import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from 'firebase/database';
// import { useUserStore } from '@/stores/userStore';

const firebaseConfig = {
  apiKey: "AIzaSyA1Cj_bXyiwKVQ7FsdDxbiwEc64SVCdkEE",
  authDomain: "vue-auth-2f01c.firebaseapp.com",
  databaseURL: "https://vue-auth-2f01c-default-rtdb.firebaseio.com",
  projectId: "vue-auth-2f01c",
  storageBucket: "vue-auth-2f01c.firebasestorage.app",
  messagingSenderId: "121189346012",
  appId: "1:121189346012:web:0db39267bfc3e38a40e219",
  measurementId: "G-H1ESMHEQ46"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur lors de la connection de l'utilisateur :", error);
    throw error;
  }
}

export const checkForDevices = async(userId, store) => {
  if (userId) {
    console.log('userID db:', userId);
    const devicesRef = ref(db, `devices/${userId}`);

    try {
      const snapshot = await get(devicesRef);

      if (!snapshot.exists()) {
        store.setHasDevices(false);
      } else {
        store.setHasDevices(true);
        snapshot.forEach(deviceSnapshot => {
          const deviceData = deviceSnapshot.val();
          console.log("Appareil trouvé :", deviceData);
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des appareils :", error.message);
    }
  } else {
    console.log("User ID non défini.");
  }
};

export const addDevice = async (userId, deviceId, store) => {
  if (userId) {
    const deviceRef = ref(db, `devices/${userId}/${deviceId}`);
    try {
      await set(deviceRef, {
        temperature: 10,
        co2: 10,
        user_id: userId,
      });
      store.setHasDevices(true);
      console.log("device add: ", deviceRef);
      console.log("Device ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un device: ", error.message);
    }
  }
}

export const removeDevice = async (userId, store) => {
  if (userId) {
    const userDevicesRef = ref(db, `devices/${userId}`);
    try {
      await remove(userDevicesRef);
      store.setHasDevices(false);
      console.log("Tous les appareils de l'utilisateur ont été supprimés avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression des appareils de l'utilisateur :", error.message);
      throw error;
    }
  } else {
    console.log("User ID non défini.");
  }
};

export { db, auth };
