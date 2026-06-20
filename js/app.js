// app.js
document.addEventListener('DOMContentLoaded', async () => {
    const appDiv = document.getElementById('app');
    
    // Tampilkan loading sebelum data diambil dari Firebase
    appDiv.innerHTML = '<div class="flex flex-col items-center justify-center min-h-[60vh]"><i class="fa-solid fa-circle-notch fa-spin text-4xl text-primary mb-4"></i><p class="text-gray-500 font-bold">Memuat Data dari Server...</p></div>';
    
    await state.loadCourses();

    // Initial Render
    if (!state.currentUser) {
        router.navigate('login');
    } else {
        router.navigate('dashboard');
    }
});
