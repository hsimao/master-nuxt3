export default defineNuxtRouteMiddleware((to, from) => {
  const navigationHistory = useLocalStorage('history', [] as string[])

  navigationHistory.value.push(to.path)
  console.log(`Navigation history: ${navigationHistory.value.join('\n')}`)
})
