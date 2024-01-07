<script setup>
import { ref } from 'vue';
const username = ref('');
const password = ref('');

import { useAuthStore } from '@/stores/useAuth';

const handleSubmit = async ({ setErrors }) => {
  const authStore = useAuthStore();
  try {
    return await authStore.login(username, password);
  } catch (error) {
    return setErrors({ apiError: error });
  }
};

const handleReset = () => {
  username.value = '';
  password.value = '';
};
</script>

<template>
  <div class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card flat bordered class="q-pa-md" style="width: 360px">
          <q-form @submit.prevent="handleSubmit" @reset="handleReset" class="q-gutter-md">
            <q-card-section>
              <div class="text-h6 text-center">로그인</div>
            </q-card-section>

            <q-card-section>
              <q-input
                class="q-mb-lg"
                filled
                hint="Username"
                v-model="username"
                label="ID *"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || '필수값입니다']"
              />
              <q-input
                filled
                hint="Password"
                v-model="password"
                label="Password *"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || '필수값입니다']"
              />
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="primary"
                size="lg"
                class="full-width"
                label="Login"
                :disable="!username || !password"
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>
