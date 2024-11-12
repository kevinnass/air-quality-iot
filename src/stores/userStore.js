import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export const useUserStore = defineStore('user', () => {
  const auth = getAuth();
  const user = ref(null);
  const hasDevices = ref(false);

  const initAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email } : null;
        resolve();
      });
    });
  };

  const logout = async () => {
		console.log('deconnexion...');
    await signOut(auth);
    user.value = null;
  };

  const setHasDevices = (value) => {
    hasDevices.value = value;
  };

  return {
    user,
    initAuth,
    setHasDevices,
    hasDevices,
    logout
  };
});