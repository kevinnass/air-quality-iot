<template>
  <main class="flex flex-col bg-gray-50 dark:bg-slate-500 items-center justify-center w-full px-4 py-16 mx-auto">
    <div 
    v-if="!userStore.hasDevices"
    class="flex flex-col items-center justify-center h-screen"
    >
      <p class="text-slate-700 dark:text-white text-2xl">You don't yet have a device for monitoring air quality</p>
     
      <Button
      class="w-36 h-12 mt-12"
       @click="addDevice(userStore.user.uid, 'device')"
      >
        Add a device
        </Button>
    </div>

    <div 
      v-else 
      class="flex flex-col w-full space-y-6 mt-12 items-center"
    >
      <p class="text-3xl mt-4 font-bold dark:text-white text-slate-800">Air Quality Vizualisation</p>

      <div class="flex w-full justify-around">
       <Duo class="mt-4"></Duo>
      </div>
      
      <Button2 @click="removeDevices()" class="h-12 w-64 mt-4 ">Delete the device supplying the data</Button2>
    </div>
  </main>

</template>


<script setup>
import Duo from '@/components/duo.vue';
import Temp from '@/components/temp.vue';
import CO2 from '@/components/co2.vue';
import Button from "@/components/Button.vue";
import Button2 from "@/components/Button2.vue";
import { ref, onMounted } from 'vue';
import { checkForDevices, addDevice, removeDevice } from '../db.js';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const userhasDevices = ref(false);

const checkDevices = async () => {
  console.log('userId: ', userStore.user.uid);
  await checkForDevices(userStore.user.uid, userStore);
};

const addDevices = async () => {
  await addDevice(userStore.user.uid, 'device', userStore);
  // userStore.setHasDevices(true);
};

const removeDevices = async () => {
  await removeDevice(userStore.user.uid, userStore);
  // userStore.setHasDevices(false);
};

onMounted(async () => {
  await checkDevices();

});
</script>