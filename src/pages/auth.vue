<template>
	<section class=" bg-gray-50 dark:bg-slate-500">
	<!-- Login -->
	<div v-if="isLoginComponent" class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<div class="w-full bg-white mt- rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
						Login into your account
				</h1>
				<form @submit.prevent="login()" class="space-y-4 md:space-y-6" action="#">
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
						<input
							v-model="email"
							type="email" 
							name="email" 
							id="email" 
							class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
					</div>

					<div>
						<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
						<input
							v-model="password"
							type="password" 
							name="password" 
							id="password" 
							placeholder="••••••••" 
							class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
					</div>

					<div class="flex items-center w-full bg-slate-300  h-px justify-between"></div>

					<Button 
						type="submit" 
						class="w-full px-5 py-2.5 "
					>
						Login
					</Button>
					<p v-if="isError2" class="text-red-600 font-bold">
						Can't log to your account 
					</p>

					<p class="text-sm font-light text-gray-500 dark:text-white">
						Don’t have an account yet? <a @click="isLoginComponent = false" class="cursor-pointer font-medium text-slate-800 hover:underline dark:text-white">Sign up</a>
					</p>
				</form>
			</div>
		</div>
	</div>
	<!-- Login -->

	<!-- Sign Up -->
	<div v-else class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
					Create your account
				</h1>
				<form @submit.prevent="register()" class="space-y-4 md:space-y-6" action="#">
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
						<input
							v-model="email"
							type="email" 
							name="email" 
							id="email" 
							class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
					</div>

					<div>
						<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
						<input
							v-model="password"
							type="password" 
							name="password" 
							id="password" 
							placeholder="••••••••" 
							class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
					</div>

					<div class="flex items-center w-full bg-slate-300  h-px justify-between"></div>

					<Button 
						type="submit" 
						class="w-full px-5 py-2.5 text-center"
					>
						Sign Up
					</Button>
					<p v-if="isError" class="text-red-600 font-bold">
						Can't create your account 
					</p>

					<p class="text-sm font-light text-gray-500 dark:text-white">
						Already have an account? <a @click="isLoginComponent = true" class="cursor-pointer font-medium text-slate-800 hover:underline dark:text-white">Sign up</a>
					</p>
				</form>
			</div>
		</div>
	</div>
	<!-- Sign Up -->

	</section>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { registerUser, loginUser } from '../db.js';
import { useUserStore } from '../stores/userStore';

const email = ref('');
const password = ref('');
const isLoginComponent = ref(true);
const isError = ref(false);
const isError2 = ref(false);
const router = useRouter();
const userStore = useUserStore();

const register = async () => {
	try {
		isError.value = false;
		const user = await registerUser(email.value, password.value);
		userStore.user = { uid: user.uid, email: user.email };
		console.log("User created:", user);
		router.push('/');
	} catch (error) {
		isError.value = true;
		console.log("Erreur lors de la création de compte :", error.message);
}
};

const login = async () => {
	try {
		isError2.value = false;
		const user = await loginUser(email.value, password.value);
		userStore.user = { uid: user.uid, email: user.email };
		console.log("User store:", userStore.user);
		console.log("User connected:", user);
		router.push('/');
	} catch (error) {
		isError2.value = true;
		console.log("Erreur lors de la connection du compte :", error.message);
	}
};

</script>
