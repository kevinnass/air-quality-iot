<template>
  <main
    class="flex flex-col bg-gray-50 dark:bg-slate-500 items-center justify-center w-full px-4 py-16 mx-auto"
  >
    <div
      v-if="!userStore.hasDevices"
      class="flex flex-col items-center justify-center h-screen"
    >
      <p class="text-4xl flex justify-start font-bold dark:text-white text-slate-800">
        Air Quality Control
      </p>
      <p class="text-slate-700 mt-12 dark:text-white text-2xl">
        You don't yet have a device for monitoring air quality
      </p>

      <Modal v-if="isModalActive" @close="handleClose" @submit="addDevices" />

      <Modal2 v-if="isModalActive2" @close2="handleClose2" />

      <div class="flex flex-row-reverse w-11/12 justify-between">
        <Button class="w-60 h-16 mt-12" @click="toggleModal()"> 
          Visualize your data by adding your device ID
        </Button>

        <Button class="w-60 h-16 mt-12" @click="toggleModal2()">
          Configure your device to get its Id
        </Button>
      </div>
    </div>

    <div v-else class="flex flex-col w-full space-y-6 mt-12 items-center">
      <p class="text-4xl mt-4 font-bold dark:text-white text-slate-800">
        Air Quality Control
      </p>

      <div class="flex w-full justify-around">
        <Duo class="mt-4"></Duo>
      </div>

      <Button2 @click="removeDevices()" class="h-12 w-64 mt-4"
        >Delete the device supplying the data</Button2
      >
    </div>
  </main>
</template>

<script setup>
import Modal from "@/components/modal.vue";
import Modal2 from "@/components/modalinfo.vue";
import Duo from "@/components/duo.vue";
import Temp from "@/components/temp.vue";
import CO2 from "@/components/co2.vue";
import Button from "@/components/Button.vue";
import Button2 from "@/components/Button2.vue";
import { ref, onMounted } from "vue";
import { checkForDevices, addDevice, removeDevice } from "../db.js";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const userhasDevices = ref(false);
const isModalActive = ref(false);
const isModalActive2 = ref(false);

const checkDevices = async () => {
  console.log("userId: ", userStore.user.uid);
  await checkForDevices(userStore.user.uid, userStore);
};

const toggleModal = () => {
  isModalActive.value = true;
};

const toggleModal2 = () => {
  isModalActive2.value = true;
};

const handleClose = () => {
  isModalActive.value = false;
};

const handleClose2 = () => {
  isModalActive2.value = false;
};

const addDevices = (deviceId) => {
  addDevice(userStore.user.uid, deviceId, userStore);
  console.log("Device ID submitted:", userStore.deviceId);
};

const removeDevices = async () => {
  await removeDevice(userStore.user.uid, userStore);
  isModalActive.value = false;
  // userStore.setHasDevices(false);
};

onMounted(async () => {
  await checkDevices();
});
</script>
