export default defineNuxtRouteMiddleware((to, from) => {
  // NOTE: useSupabaseUser in server side can't get user data
  if (process.server) return

  const user = useSupabaseUser()
  if (user.value || to.params.chapterSlug === '1-chapter-1') {
    return
  }

  // pass current path to login page
  return navigateTo(`/login?redirectTo=${to.path}`)
})
