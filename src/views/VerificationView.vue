<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios, { AxiosError } from 'axios';
import { useRoute, useRouter } from 'vue-router';

import MailFailed from '@/assets/mail-failed.png';
import MailSuccess from '@/assets/mail-success.png';

const router = useRouter();
const { query } = useRoute();

const loading = ref(true);
const success = ref(false);

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/auth/activate?token=' + query.token);

    if (data.success) {
      success.value = true;
      setTimeout(() => {
        router.push({
          path: '/login',
        });
      }, 3000);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
    } else {
      alert('An error occurred. Please try again later.');
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <img v-if="success" :src="MailSuccess" alt="Mail Success" class="mb-4 h-32 w-32" />
      <img v-else :src="MailFailed" alt="Mail Failed" class="mb-4 h-32 w-32" />

      <h1 v-if="loading" class="text-2xl font-bold text-gray-800">Verifying your email...</h1>
      <h1 v-else-if="success" class="text-2xl font-bold text-green-600">Email verified successfully! Redirecting...</h1>
      <h1 v-else class="text-2xl font-bold text-red-600">Email verification failed!</h1>
    </div>
  </div>
</template>
