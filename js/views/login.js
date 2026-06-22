// login.js
const loginView = {
    render() {
        // Automatically hide the top navbar if we are on the login page
        const topNav = document.getElementById('main-nav');
        if (topNav) topNav.style.display = 'none';

        return `
            <div class="min-h-[80vh] flex items-center justify-center">
                <div class="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 w-full max-w-5xl overflow-hidden flex flex-col md:flex-row relative">
                    
                    <!-- Left Side: Branding / Info -->
                    <div class="w-full md:w-5/12 bg-gradient-to-br from-indigo-600 to-primary text-white p-12 relative flex flex-col justify-between overflow-hidden">
                        <div class="absolute -top-20 -left-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-white opacity-10 rounded-full blur-2xl"></div>
                        
                        <div class="relative z-10">
                            <div class="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner border border-white/20 backdrop-blur-sm">
                                <i class="fa-solid fa-graduation-cap"></i>
                            </div>
                            <h1 class="text-4xl font-black mb-4 tracking-tight leading-tight">Selamat Datang di ClassHub.</h1>
                            <p class="text-indigo-100 font-medium leading-relaxed">Sistem Manajemen Pembelajaran generasi baru dengan antarmuka modern untuk mendukung Multimedia System.</p>
                        </div>
                        

                    </div>

                    <!-- Right Side: Login Form -->
                    <div class="w-full md:w-7/12 p-10 md:p-16 bg-white relative">
                        <h2 class="text-3xl font-black text-gray-900 mb-10">Masuk ke Akun</h2>
                        
                        <form onsubmit="event.preventDefault(); loginView.submit();" class="space-y-6">
                            
                            <div>
                                <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Pilih Peran (Role)</label>
                                <div class="grid grid-cols-2 gap-4">
                                    <label class="cursor-pointer relative">
                                        <input type="radio" name="role" value="student" class="peer sr-only" checked>
                                        <div class="p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 text-center peer-checked:border-primary peer-checked:bg-indigo-50 peer-checked:text-primary hover:border-indigo-200 transition-all">
                                            <i class="fa-solid fa-user-graduate text-2xl mb-2"></i>
                                            <p class="font-bold text-sm">Mahasiswa</p>
                                        </div>
                                    </label>
                                    <label class="cursor-pointer relative">
                                        <input type="radio" name="role" value="lecturer" class="peer sr-only">
                                        <div class="p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 text-center peer-checked:border-primary peer-checked:bg-indigo-50 peer-checked:text-primary hover:border-indigo-200 transition-all">
                                            <i class="fa-solid fa-chalkboard-user text-2xl mb-2"></i>
                                            <p class="font-bold text-sm">Dosen / Admin</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Nama Pengguna</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i class="fa-solid fa-user text-gray-400"></i>
                                    </div>
                                    <input type="text" id="loginName" required class="pl-11 focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-gray-50 transition-all font-bold text-gray-800" placeholder="Masukkan nama Anda">
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Email (Opsional)</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i class="fa-solid fa-envelope text-gray-400"></i>
                                    </div>
                                    <input type="email" class="pl-11 focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-gray-50 transition-all font-medium text-gray-800" placeholder="nama@email.com">
                                </div>
                            </div>
                            
                            <div class="pt-4">
                                <button type="submit" class="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-200 text-sm font-black text-white bg-primary hover:bg-indigo-700 hover:-translate-y-1 transform transition-all focus:outline-none focus:ring-4 focus:ring-indigo-100">
                                    Masuk ke Aplikasi <i class="fa-solid fa-arrow-right ml-2 mt-0.5"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    submit() {
        const name = document.getElementById('loginName').value;
        const role = document.querySelector('input[name="role"]:checked').value;
        
        if (name.trim() !== '') {
            state.login(name, role);
            
            // Re-show main nav since we're leaving login
            const topNav = document.getElementById('main-nav');
            if (topNav) {
                topNav.style.display = 'block';
                // Update nav profile text
                const navProfileText = document.getElementById('nav-profile-text');
                if (navProfileText) {
                    navProfileText.textContent = name.charAt(0).toUpperCase();
                }
            }

            router.navigate('dashboard');
        } else {
            alert('Mohon masukkan nama Anda.');
        }
    }
};
