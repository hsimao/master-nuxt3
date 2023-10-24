<template>
  <NuxtLayout>
    <div class="flex flex-col"></div>
    <div v-if="error.statusCode === 404" class="prose">
      <h1>404</h1>
      <p>I guess that page doesn't exist.</p>
    </div>

    <div v-else class="prose">
      <h1>Dang</h1>
      <p>It looks like something</p>
      <p>Sorry about that.</p>
    </div>

    <div class="prose mt-5">
      <p>
        <strong>{{ error.message }}</strong>
      </p>
      <p>
        Go to the
        <a class="hover:cursor-pointer" @click="handleError"> first lesson. </a>
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError()

const handleError = () => {
  // server error handle
  clearError({
    redirect:
      '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3'
  })
}
</script>

<style lang="scss" scoped></style>
