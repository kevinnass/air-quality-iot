<template>
	<div tabindex="-1" class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-gray-800 bg-opacity-50">
		<div class="relative p-4 w-full max-w-md">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

				<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Configure your device</h3>
					<button @click="closeModal2" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
						<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>

				<div class="p-4 md:p-5">
					<form class="space-y-4">
						<div>
							<label for="text" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">
								To configure your device you must first connect to its local network whose name is <em class="font-bold">ESP-Config</em> with the password 
								<em class="font-bold">12345678</em>.
								Once connected, go to the address <em class="font-bold">192.168.4.1</em> where you will find a configuration page.
								You will then have to enter the credentials of the wifi network to which you want to connect your device.
								Once the wifi connection is successful, you will be redirected to a page indicating the Id of the device							
							</label>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import Button from "./Button.vue";


export default defineComponent({
	components: { Button },
	emits: ['close2'],
	setup(props, { emit }) {
	
		const closeModal2 = () => {
			emit('close2');
		};

	return {
		closeModal2,
	};
  },
});

</script>