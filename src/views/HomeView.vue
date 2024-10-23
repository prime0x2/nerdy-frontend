<script setup lang="ts">
import { ref } from 'vue';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useForm } from 'vee-validate';
import { RouterLink } from 'vue-router';
import type { InvalidSubmissionHandler, SubmissionHandler } from 'vee-validate';

import SVGImage from '@/assets/svg-image.svg';

interface FormValues {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  password: string;
}

const { defineField, resetForm, handleSubmit } = useForm<FormValues>({
  initialValues: {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
  },
  validationSchema: yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    mobileNumber: yup.string().required('Mobile number is required').length(11, 'Mobile number must be 11 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  }),
});

const [firstName, firstNameAttr] = defineField('firstName');
const [lastName, lastNameAttr] = defineField('lastName');
const [mobileNumber, mobileNumberAttr] = defineField('mobileNumber');
const [email, emailAttr] = defineField('email');
const [password, passwordAttr] = defineField('password');

const loading = ref(false);

const onSuccess: SubmissionHandler = async (values) => {
  loading.value = true;

  try {
    const { data } = await axios.post('http://localhost:8080/api/auth/register', values);

    if (data.success) {
      alert(data.message);
      resetForm();
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
};

const onInvalidSubmit: InvalidSubmissionHandler = ({ errors }) => {
  alert(Object.values(errors)[0]!);
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);
</script>

<template>
  <main class="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 sm:p-10">
    <div
      class="grid h-dvh w-full max-w-6xl grid-cols-1 divide-x overflow-hidden rounded-3xl border bg-white shadow-lg sm:h-auto sm:grid-cols-2"
    >
      <div class="hidden h-full w-full items-center justify-center bg-blue-600/10 p-5 sm:flex">
        <img :src="SVGImage" alt="Login Vector" className="hidden w-80 object-cover sm:block" />
      </div>

      <div class="flex min-h-screen flex-col justify-center p-5 sm:block sm:min-h-0">
        <form class="flex flex-col items-center justify-center px-5 sm:px-20" @submit="onSubmit">
          <h2 class="text-center text-3xl font-bold text-blue-500">
            Create an account
            <span class="block text-base font-normal text-gray-500">Sign up to get started</span>
          </h2>

          <label for="firstName" class="mt-5 flex w-full flex-col gap-y-1">
            <span class="font-medium text-slate-700">First Name</span>
            <input
              v-model="firstName"
              v-bind="firstNameAttr"
              type="text"
              placeholder="Enter your first name"
              class="h-10 rounded border px-4 outline-none focus:border-blue-300"
            />
          </label>

          <label for="lastName" class="mt-4 flex w-full flex-col gap-y-1">
            <span class="font-medium text-slate-700">Last Name</span>
            <input
              v-model="lastName"
              v-bind="lastNameAttr"
              type="text"
              placeholder="Enter your last name"
              class="h-10 rounded border px-4 outline-none focus:border-blue-300"
            />
          </label>

          <label for="mobileNumber" class="mt-4 flex w-full flex-col gap-y-1">
            <span class="font-medium text-slate-700">Mobile Number</span>
            <input
              v-model="mobileNumber"
              v-bind="mobileNumberAttr"
              type="text"
              placeholder="Enter your mobile number"
              class="h-10 rounded border px-4 outline-none focus:border-blue-300"
            />
          </label>

          <label for="email" class="mt-4 flex w-full flex-col gap-y-1">
            <span class="font-medium text-slate-700">Email Address</span>
            <input
              v-model="email"
              v-bind="emailAttr"
              type="email"
              placeholder="Enter your email address"
              class="h-10 rounded border px-4 outline-none focus:border-blue-300"
            />
          </label>

          <label for="password" class="mt-4 flex w-full flex-col gap-y-1">
            <span class="font-medium text-slate-700">Password</span>
            <input
              v-model="password"
              v-bind="passwordAttr"
              type="password"
              placeholder="Enter your password"
              class="h-10 rounded border px-4 outline-none focus:border-blue-300"
            />
          </label>

          <button
            type="submit"
            :disabled="loading"
            class="mt-5 h-10 w-full rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none disabled:opacity-60"
          >
            Sign Up
          </button>

          <nav class="mt-5 text-center text-sm text-gray-500">
            Already have an account? <RouterLink to="login" class="text-blue-500">Sign in</RouterLink>
          </nav>
        </form>
      </div>
    </div>
  </main>
</template>
