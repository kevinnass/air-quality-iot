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

export const checkForDevices = async (userId, store) => {
  if (userId) {
    console.log('userID db:', userId);
    const devicesRef = ref(db, `users/${userId}`);

    try {
      const snapshot = await get(devicesRef);

      if (!snapshot.exists()) {
        store.setHasDevices(false);
      } else {
        store.setHasDevices(true);

        // Itérer sur chaque appareil trouvé
        snapshot.forEach(deviceSnapshot => {
          const deviceId = deviceSnapshot.key; // Récupérer le deviceId
          const deviceData = deviceSnapshot.val();

          // Stocker le deviceId dans le store
          store.setDeviceId(deviceId);
          console.log("Appareil trouvé :", deviceId, deviceData);
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
    
    const userInfo = ref(db, `users/${userId}/${deviceId}`);
    try {
      await set(userInfo, {
        temperature: 0,
        co2: 0,
        user_id: userId,
      });
      store.setHasDevices(true);
      store.setDeviceId(deviceId);
      console.log("device add: ", userInfo);
      console.log("Device ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un device: ", error.message);
    }
  }
}

export const removeDevice = async (userId, store) => {
  if (userId) {
    const userDevicesRef = ref(db, `users/${userId}`);
    try {
      await remove(userDevicesRef);
      store.setHasDevices(false);
      store.setDeviceId(null);
      console.log("Tous les appareils de l'utilisateur ont été supprimés avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression des appareils de l'utilisateur :", error.message);
      throw error;
    }
  } else {
    console.log("User ID non défini.");
  }
};

export const getDataByDeviceId = async (deviceId, store) => {
  if (!deviceId) {
    console.error("Device ID non fourni.");
    return null;
  }

  const deviceRef = ref(db, `devices/${deviceId}`);
  try {
    const snapshot = await get(deviceRef);
    if (snapshot.exists()) {
      const deviceData = snapshot.val();
      console.log("Données du device :", deviceData);
      return deviceData; // Retourner les données en tant qu'objet
    } else {
      store.setHasDevices(false);
      console.log("Device ID introuvable dans la base de données.");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données du device :", error.message);
    return null;
  }
};

export { db, auth };
