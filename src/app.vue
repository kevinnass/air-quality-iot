<template>
	<header class="flex shadow-xl fixed bg-white flex-row-reverse w-full justify-between">
		<div  class="container flex items-center justify-end p-4 mx-auto">
			<div v-if="userStore.user" class="flex items-center justify-around w-80">
				<p class="text-green-600 underline">{{ userStore.user.email }}</p>
				<Button @click="logout()" class="w-24 h-10">Logout</Button>
			</div>
			<button
				class="p-2 overflow-hidden"
				@click="switchTheme()"
			>
				<transition
					enter-active-class="transition duration-200 ease-out"
					leave-active-class="transition duration-200 ease-in"
					:enter-from-class="currentTheme === 'dark' ? 'transform -translate-y-full scale-50 opacity-0' : 'transform translate-y-full scale-50 opacity-0'"
					enter-to-class="transform translate-y-0"
					leave-from-class="transform translate-y-0"
					:leave-to-class="currentTheme === 'dark' ? 'transform translate-y-full scale-50 opacity-0' : 'transform -translate-y-full scale-50 opacity-0'"
					mode="out-in"
				>
					<svg
						v-if="currentTheme === 'dark'"
						xmlns="http://www.w3.org/2000/svg"
						class="w-8 h-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					>
						<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>

					<svg
						v-else
						xmlns="http://www.w3.org/2000/svg"
						class="w-8 h-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					>
						<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
				</transition>
			</button>
	    </div>

		<nav class="flex w-1/2 items-center">
			<button @click="router.push('/')" type="button" class="inline-flex flex-row items-center justify- px-5">
				<svg class="w-7 h-7 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 18H9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
				<span class="text-base ml-1 hover:underline">Home</span>
			</button>
			<button @click="router.push('/auth')" type="button" class="inline-flex w-full flex-row items-center justify- px-5 ">
				<svg class="w-7 h-7 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
				<span class="text-base ml-1 hover:underline">Login or Register</span>
			</button>
    </nav>
	</header>	

	<RouterView />
</template>

<script setup>
import { onMounted, onUpdated } from 'vue';
import { currentTheme, initTheme, switchTheme } from '@/composables/theme.js';
import { useUserStore } from '@/stores/userStore';
import Button from "@/components/Button.vue";
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
	userStore.logout();
	router.push('/auth');
};

onMounted(() => {
	userStore.initAuth();
  initTheme();
});
</script>
