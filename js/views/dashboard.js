// dashboard.js
const dashboardView = {
    render() {
        let html = `
            <!-- Dashboard Redesign -->
            <div class="flex flex-col md:flex-row gap-8">
                
                <!-- Left Sidebar (App Navigation) -->
                <div class="w-full md:w-64 flex-shrink-0">
                    <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 sticky top-24">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xl font-black shadow-md border-2 border-indigo-100">
                                ${state.currentUser ? state.currentUser.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                                <h3 class="font-extrabold text-gray-900 leading-tight">${state.currentUser ? state.currentUser.name : 'User'}</h3>
                                <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-0.5">${state.currentUser && state.currentUser.role === 'lecturer' ? 'Dosen / Admin' : 'Mahasiswa'}</p>
                            </div>
                        </div>
                        
                        <nav class="space-y-2">
                            <a href="#" class="flex items-center gap-4 px-5 py-3.5 bg-indigo-50 text-primary rounded-2xl font-bold transition-colors border border-indigo-100">
                                <i class="fa-solid fa-shapes text-lg"></i> Beranda Kelas
                            </a>
                            <a href="#" class="flex items-center gap-4 px-5 py-3.5 text-gray-500 hover:bg-gray-50 hover:text-gray-800 rounded-2xl font-bold transition-colors">
                                <i class="fa-solid fa-calendar-days text-lg"></i> Jadwal Kuliah
                            </a>
                            <a href="#" class="flex items-center gap-4 px-5 py-3.5 text-gray-500 hover:bg-gray-50 hover:text-gray-800 rounded-2xl font-bold transition-colors">
                                <i class="fa-solid fa-clipboard-list text-lg"></i> Tugas Saya
                            </a>
                            <a href="#" class="flex items-center gap-4 px-5 py-3.5 text-gray-500 hover:bg-gray-50 hover:text-gray-800 rounded-2xl font-bold transition-colors">
                                <i class="fa-solid fa-chart-line text-lg"></i> Nilai & Evaluasi
                            </a>
                        </nav>
                        
                        ${state.currentUser && state.currentUser.role === 'lecturer' ? `
                        <div class="mt-8 pt-6 border-t border-gray-100">
                            <button onclick="dashboardView.showAddCourseModal()" class="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-1">
                                <i class="fa-solid fa-plus text-sm"></i> Gabung / Buat Kelas
                            </button>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="flex-grow">
                    <!-- Greeting Banner -->
                    <div class="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[2.5rem] p-10 mb-10 text-white relative overflow-hidden shadow-xl">
                        <div class="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div class="absolute bottom-0 left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl transform -translate-y-1/2"></div>
                        
                        <div class="relative z-10">
                            <h1 class="text-3xl md:text-5xl font-black mb-3 tracking-tight drop-shadow-md">Selamat Datang Kembali! 👋</h1>
                            <p class="text-blue-100 font-medium mb-8 max-w-lg leading-relaxed">Anda memiliki 2 tugas yang mendesak hari ini. Terus semangat belajar dan raih hasil terbaik!</p>
                            
                            <div class="flex gap-4">
                                <div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors cursor-pointer">
                                    <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-inner border border-white/10"><i class="fa-solid fa-book text-white text-xl"></i></div>
                                    <div>
                                        <p class="text-[10px] text-blue-100 font-bold uppercase tracking-widest mb-0.5">Total Kelas</p>
                                        <p class="font-black text-2xl">${state.courses.length}</p>
                                    </div>
                                </div>
                                <div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors cursor-pointer">
                                    <div class="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center text-yellow-300 shadow-inner border border-yellow-400/20"><i class="fa-solid fa-star text-xl"></i></div>
                                    <div>
                                        <p class="text-[10px] text-blue-100 font-bold uppercase tracking-widest mb-0.5">IPK Terkini</p>
                                        <p class="font-black text-2xl">3.85</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h2 class="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <i class="fa-solid fa-border-all text-primary opacity-80"></i> Kelas Aktif Anda
                        </h2>
                        <div class="flex gap-2">
                            <button class="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center hover:text-primary transition-colors shadow-sm"><i class="fa-solid fa-filter"></i></button>
                            <button class="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center hover:text-primary transition-colors shadow-sm"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>

                    <!-- Courses Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        `;
        
        if (state.courses.length === 0) {
            html += `<div class="col-span-full text-center text-gray-500 py-16 bg-white rounded-[2.5rem] shadow-sm border border-gray-100">
                <i class="fa-solid fa-folder-open text-5xl mb-4 text-gray-300"></i>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Belum ada kelas</h3>
                <p>Silakan klik tombol Gabung / Buat Kelas di menu kiri.</p>
            </div>`;
        } else {
            state.courses.forEach(course => {
                html += `
                    <!-- Modern Glass Course Card -->
                    <div class="relative bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl flex flex-col h-full" onclick="router.navigate('courseDetail', {courseId: '${course.id}'})">
                        <!-- Abstract Gradient Header inside card -->
                        <div class="h-32 bg-gradient-to-r ${course.bannerColor} relative p-5">
                            <div class="absolute inset-0 bg-black opacity-10"></div>
                            <!-- Small badge -->
                            <span class="relative z-10 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                                ${course.category}
                            </span>
                        </div>
                        
                        <!-- Floating Avatar -->
                        <div class="absolute top-24 right-6 w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-300 z-20">
                            <img src="https://ui-avatars.com/api/?name=${course.lecturer}&background=random&color=fff" class="w-full h-full rounded-xl object-cover bg-gray-50" />
                        </div>

                        <!-- Card Content -->
                        <div class="p-6 pt-10 flex-grow flex flex-col justify-between">
                            <div>
                                <h3 class="font-extrabold text-gray-900 text-lg leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2 pr-6" title="${course.title}">${course.title}</h3>
                                <p class="text-[11px] text-gray-500 font-bold mb-5 flex items-center gap-2 uppercase tracking-wider">
                                    <i class="fa-solid fa-chalkboard-user text-primary opacity-70"></i> ${course.lecturer}
                                </p>
                            </div>
                            
                            <div class="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
                                <div class="flex items-center gap-2 bg-indigo-50/50 px-3 py-1.5 rounded-xl border border-indigo-50">
                                    <i class="fa-solid fa-folder-tree text-primary text-xs opacity-70"></i>
                                    <span class="text-[10px] font-extrabold text-primary uppercase tracking-wider">${course.modules.length} Sesi</span>
                                </div>
                                <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors border border-gray-100">
                                    <i class="fa-solid fa-arrow-right -rotate-45 text-sm"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        html += `
                    </div>
                </div>
            </div>
        `;
        return html;
    },

    showAddCourseModal() {
        const modalHtml = `
            <div class="bg-white px-8 pt-8 pb-6 rounded-t-[2rem] border-b border-gray-100 relative overflow-hidden">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>
                <div class="flex items-center justify-between mb-8 relative z-10">
                    <div class="flex items-center">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 text-primary flex items-center justify-center text-2xl mr-4 shadow-sm border border-indigo-200">
                            <i class="fa-solid fa-book-open"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-black text-gray-900 tracking-tight" id="modal-title">Buat Kelas Baru</h3>
                            <p class="text-xs text-gray-500 font-bold mt-1">Tambahkan mata kuliah baru ke dalam dashboard.</p>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center" onclick="components.closeModal()">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                
                <div class="space-y-6 relative z-10">
                    <div>
                        <label for="courseTitle" class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Judul Mata Kuliah</label>
                        <input type="text" id="courseTitle" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-gray-50/50 transition-all font-bold text-gray-800" placeholder="Contoh: Pemrograman Web Lanjut">
                    </div>
                    <div>
                        <label for="lecturerName" class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Nama Dosen Pengajar</label>
                        <input type="text" id="lecturerName" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-gray-50/50 transition-all font-medium text-gray-800" placeholder="Contoh: Dr. Budi Santoso">
                    </div>
                    <div>
                        <label for="courseCategory" class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Kategori Bidang Ilmu</label>
                        <input type="text" id="courseCategory" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-gray-50/50 transition-all font-medium text-gray-800" placeholder="Contoh: Teknik Informatika">
                    </div>
                </div>
            </div>
            <div class="bg-gray-50/80 backdrop-blur-md px-8 py-6 rounded-b-[2rem] flex justify-end space-x-4 border-t border-gray-100">
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-gray-200 px-6 py-3.5 bg-white text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none transition-colors shadow-sm" onclick="components.closeModal()">
                    Batal
                </button>
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-transparent shadow-lg shadow-indigo-200 px-8 py-3.5 bg-primary text-sm font-black text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all transform hover:-translate-y-1" onclick="dashboardView.submitAddCourse()">
                    <i class="fa-solid fa-check mr-2"></i> Buat Kelas
                </button>
            </div>
        `;
        components.openModal(modalHtml, 'max-w-md');
    },

    submitAddCourse() {
        const title = document.getElementById('courseTitle').value;
        const lecturer = document.getElementById('lecturerName').value;
        const category = document.getElementById('courseCategory').value;
        
        if (title && lecturer) {
            state.addCourse(title, lecturer, category || 'Teknik Informatika');
            components.closeModal();
            router.render(); // re-render dashboard
        } else {
            alert('Mohon lengkapi judul dan nama dosen.');
        }
    }
};
