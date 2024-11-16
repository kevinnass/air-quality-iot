<template>
	<div tabindex="-1" class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-gray-800 bg-opacity-50">
		<div class="relative p-4 w-full max-w-md">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

				<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add your device</h3>
					<button @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
						<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>

				<div class="p-4 md:p-5">
					<form @submit.prevent="handleSubmit" class="space-y-4">
						<div>
							<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To know your device ID, you must configure it first</label>
							<input v-model="deviceId" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter device ID" required />
						</div>
						<p v-if="!isData" class="text-red-600 font-bold">
							No device at this Id 
						</p>
						<Button class="h-12 border-2 rounded-xl text-center focus:ring-4 focus:outline-none hover:bg-slate-800 focus:ring-primary-300 font-medium text-sm text-white bg-slate-700 w-32">
							Add this device
						</Button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, onUnmounted, ref, defineComponent } from 'vue';
import Button from "./Button.vue";
import { useUserStore } from "../stores/userStore";
import { getDataByDeviceId } from '../db.js';

export default defineComponent({
	components: { Button },
	emits: ['close', 'submit'],
	setup(props, { emit }) {
		const deviceId = ref('');
		const isData = ref(true);
		const userStore = useUserStore();

		const closeModal = () => {
			emit('close');
		};

	// 	const handleSubmit = async () => {
	// 		const data = await getDataByDeviceId(deviceId.value, userStore);
	// 		if (data) {
	// 			isData.value = true;				
	// 		} else {
	// 			isData.value = false;
	// 		}
	// 		if (isData) {
	// 			emit('submit', deviceId.value);
	// 			deviceId.value = '';
	// 	}
	// };

	const handleSubmit = async () => {
		try {
			const data = await getDataByDeviceId(deviceId.value, userStore);

			isData.value = !!data;

			if (isData.value) {
				await emit('submit', deviceId.value);
				deviceId.value = '';
			}
		} catch (error) {
			console.error("Error in handleSubmit:", error);
		}
	};


	return {
		deviceId,
		closeModal,
		handleSubmit,
	};
  },
});

</script>