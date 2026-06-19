// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    if (!state.currentUser) {
        router.navigate('login');
    } else {
        router.navigate('dashboard');
    }
});
