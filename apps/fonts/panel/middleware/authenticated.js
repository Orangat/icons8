export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.config.user) {
    return redirect('/fonts/panel/login')
  }
}
