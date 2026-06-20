// courseDetail.js
const courseDetailView = {
    render(courseId) {
        const course = state.courses.find(c => c.id === courseId);
        if (!course) return `<div class="text-center py-20 text-xl font-medium text-red-500">Course not found.</div>`;

        let html = `
            <!-- Top Navigation / Breadcrumb -->
            <nav class="text-sm font-medium mb-6 text-gray-500 flex items-center bg-white py-2 px-5 rounded-full shadow-sm border border-gray-100 w-max hover:shadow-md transition-shadow">
                <a href="#" onclick="router.navigate('dashboard')" class="hover:text-primary transition-colors flex items-center font-bold">
                    <div class="w-8 h-8 rounded-full bg-indigo-50 text-primary flex items-center justify-center mr-3 hover:bg-primary hover:text-white transition-colors">
                        <i class="fa-solid fa-arrow-left"></i>
                    </div>
                    Kembali ke Dashboard
                </a>
            </nav>

            <!-- Hero Banner -->
            <div class="bg-gradient-to-br ${course.bannerColor} rounded-[2.5rem] shadow-xl p-10 mb-8 relative overflow-hidden text-white flex flex-col justify-end min-h-[280px]">
                <div class="absolute inset-0 bg-black opacity-20"></div>
                <!-- Decorative circles -->
                <div class="absolute -top-20 -right-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-white opacity-10 rounded-full blur-2xl"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div class="mb-6 md:mb-0">
                        <div class="inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/30 shadow-sm">
                            <i class="fa-solid fa-book-open mr-2"></i> ${course.category}
                        </div>
                        <h1 class="text-4xl md:text-5xl font-black mb-3 drop-shadow-lg tracking-tight leading-tight">${course.title}</h1>
                        <p class="text-lg opacity-90 font-medium flex items-center bg-black/10 w-max px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                            <img src="https://ui-avatars.com/api/?name=${course.lecturer}&background=random&color=fff" class="w-8 h-8 rounded-full mr-3 border-2 border-white/50 shadow-sm" />
                            ${course.lecturer}
                        </p>
                    </div>
                    
                    <div class="flex space-x-4">
                        <div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center shadow-lg hover:bg-white/20 transition-colors cursor-pointer">
                            <p class="text-3xl font-extrabold">${course.modules.length}</p>
                            <p class="text-[10px] uppercase tracking-wider opacity-80 mt-1 font-bold">Modul / Sesi</p>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center shadow-lg hover:bg-white/20 transition-colors cursor-pointer">
                            <p class="text-3xl font-extrabold">32</p>
                            <p class="text-[10px] uppercase tracking-wider opacity-80 mt-1 font-bold">Mahasiswa</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Asymmetric Grid Content -->
            <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                <!-- MAIN CONTENT (Left side) -->
                <div class="xl:col-span-8 space-y-8">
                    
                    <!-- Quick Action / Post Bar -->
                    ${state.currentUser && state.currentUser.role === 'lecturer' ? `
                    <div class="bg-white p-3 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow">
                        <img src="https://ui-avatars.com/api/?name=${course.lecturer}&background=random&color=fff" class="w-12 h-12 rounded-full border-2 border-indigo-100" />
                        <button class="flex-grow bg-gray-50 hover:bg-indigo-50 hover:text-primary text-left px-5 py-3.5 rounded-2xl text-gray-500 text-sm font-bold transition-colors border border-gray-100">
                            Bagikan materi, pengumuman, atau survei...
                        </button>
                        <div class="flex gap-2 pr-2 hidden sm:flex">
                            <button class="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-all flex items-center justify-center shadow-sm" title="Buat Survei"><i class="fa-solid fa-square-poll-horizontal"></i></button>
                            <button class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm" title="Buat Info"><i class="fa-solid fa-bullhorn"></i></button>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Learning Path (Horizontal Modules) -->
                    <div class="bg-transparent relative">
                        <div class="flex justify-between items-center mb-5 px-1">
                            <h2 class="text-xl font-extrabold text-gray-800 flex items-center">
                                <span class="w-8 h-8 rounded-lg bg-indigo-100 text-primary flex items-center justify-center mr-3"><i class="fa-solid fa-route"></i></span>
                                Jalur Pembelajaran (Folder Modul)
                            </h2>
                            <div class="flex gap-2">
                                <button class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"><i class="fa-solid fa-chevron-left text-xs"></i></button>
                                <button class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"><i class="fa-solid fa-chevron-right text-xs"></i></button>
                            </div>
                        </div>
                        
                        <div class="flex overflow-x-auto pb-6 -mx-2 px-2 space-x-5 scrollbar-hide snap-x">
                            ${state.currentUser && state.currentUser.role === 'lecturer' ? `
                            <!-- Add Module Button (First Card) -->
                            <div class="snap-start flex-none w-60 h-44 border-2 border-dashed border-indigo-200 rounded-[2rem] flex flex-col items-center justify-center text-indigo-400 hover:bg-indigo-50 hover:border-primary hover:text-primary transition-all cursor-pointer group shadow-sm bg-white" onclick="courseDetailView.showAddModuleModal('${course.id}')">
                                <div class="w-14 h-14 rounded-full bg-indigo-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-xl mb-3 transition-colors shadow-sm">
                                    <i class="fa-solid fa-folder-plus"></i>
                                </div>
                                <span class="font-extrabold text-sm uppercase tracking-wider">Buat Folder Sesi</span>
                            </div>
                            ` : ''}
        `;

        course.modules.forEach((mod, index) => {
            html += `
                            <!-- Module Card -->
                            <div class="snap-start flex-none w-64 h-44 bg-white border border-gray-100 rounded-[2rem] p-6 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden group hover:-translate-y-2 flex flex-col justify-between" onclick="router.navigate('moduleContent', {courseId: '${course.id}', moduleId: '${mod.id}'})">
                                <div class="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${course.bannerColor} opacity-10 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                                
                                ${state.currentUser && state.currentUser.role === 'lecturer' ? `
                                <button onclick="event.stopPropagation(); courseDetailView.confirmDeleteModule('${course.id}', '${mod.id}', '${mod.title.replace(/'/g, "\\'")}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 shadow-sm" title="Hapus Folder">
                                    <i class="fa-solid fa-trash-can text-xs"></i>
                                </button>
                                ` : ''}

                                <div>
                                    <div class="flex justify-between items-start mb-4">
                                        <span class="px-3 py-1 bg-indigo-50 text-primary text-[10px] font-black rounded-lg uppercase tracking-wider border border-indigo-100">Sesi ${index + 1}</span>
                                        <div class="text-gray-300 group-hover:text-primary transition-colors">
                                            <i class="fa-solid fa-folder-open text-2xl"></i>
                                        </div>
                                    </div>
                                    <h3 class="font-extrabold text-gray-800 text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 z-10 relative">${mod.title}</h3>
                                </div>

                                <div class="flex items-center justify-between z-10">
                                    <div class="text-[10px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 flex items-center">
                                        <i class="fa-solid fa-paperclip mr-1.5 text-gray-400"></i> ${mod.items.length} Materi
                                    </div>
                                    <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        <i class="fa-solid fa-arrow-right -rotate-45 text-xs"></i>
                                    </div>
                                </div>
                            </div>
            `;
        });

        html += `
                        </div>
                    </div>


                </div>

                <!-- RIGHT SIDEBAR (Widgets) -->
                <div class="xl:col-span-4 space-y-6">
                    
                    <!-- App-like Pill Navigation Menu -->
                    <div class="bg-white p-2 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-1 relative z-20">
                        <a href="#" class="px-5 py-4 rounded-3xl bg-gradient-to-r from-indigo-50 to-blue-50 text-primary font-extrabold text-sm flex items-center transition-all shadow-sm border border-indigo-100">
                            <div class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 text-primary"><i class="fa-solid fa-house"></i></div> 
                            Beranda Kelas
                        </a>
                        <a href="#" onclick="router.navigate('roster', {courseId: '${course.id}'})" class="px-5 py-3 rounded-3xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-bold text-sm flex items-center transition-colors">
                            <div class="w-8 h-8 rounded-full bg-transparent flex items-center justify-center mr-3 text-gray-400"><i class="fa-solid fa-users text-lg"></i></div> 
                            Anggota & Pengajar
                        </a>
                    </div>



                </div>
            </div>
        `;

        return html;
    },

    showAddModuleModal(courseId) {
        const modalHtml = `
            <div class="bg-white px-8 pt-8 pb-6 rounded-t-[2rem] border-b border-gray-100 relative overflow-hidden">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>
                <div class="flex items-center justify-between mb-8 relative z-10">
                    <div class="flex items-center">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 text-primary flex items-center justify-center text-2xl mr-4 shadow-sm border border-indigo-200">
                            <i class="fa-solid fa-folder-plus"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-black text-gray-900 tracking-tight" id="modal-title">Folder Sesi Baru</h3>
                            <p class="text-xs text-gray-500 font-bold mt-1">Tambahkan modul ke learning path.</p>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center" onclick="components.closeModal()">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                
                <div class="space-y-6 relative z-10">
                    <input type="hidden" id="addModuleCourseId" value="${courseId}">
                    <div>
                        <label for="moduleTitle" class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Judul Sesi / Modul</label>
                        <input type="text" id="moduleTitle" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-gray-50/50 transition-all font-bold text-gray-800" placeholder="Contoh: Sesi 1 - Pengantar">
                    </div>
                    <div>
                        <label for="moduleDesc" class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Deskripsi Singkat</label>
                        <textarea id="moduleDesc" rows="3" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-gray-50/50 transition-all font-medium text-gray-600" placeholder="Tuliskan tujuan pembelajaran sesi ini..."></textarea>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50/80 backdrop-blur-md px-8 py-6 rounded-b-[2rem] flex justify-end space-x-4 border-t border-gray-100">
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-gray-200 px-6 py-3.5 bg-white text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none transition-colors shadow-sm" onclick="components.closeModal()">
                    Batal
                </button>
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-transparent shadow-lg shadow-indigo-200 px-8 py-3.5 bg-primary text-sm font-black text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all transform hover:-translate-y-1" onclick="courseDetailView.submitAddModule()">
                    <i class="fa-solid fa-check mr-2"></i> Simpan Modul
                </button>
            </div>
        `;
        components.openModal(modalHtml);
    },

    submitAddModule() {
        const courseId = document.getElementById('addModuleCourseId').value;
        const title = document.getElementById('moduleTitle').value;
        const desc = document.getElementById('moduleDesc').value;
        
        if (title) {
            state.addModule(courseId, title, desc);
            // Retrieve newly added module (last in array)
            const courseObj = state.courses.find(c => c.id === courseId);
            const newMod = courseObj && courseObj.modules[courseObj.modules.length - 1];
            components.closeModal();
            if (newMod) {
                router.navigate('moduleContent', {courseId, moduleId: newMod.id});
            } else {
                router.render();
            }
        } else {
            alert('Judul modul wajib diisi.');
        }
    },

    confirmDeleteModule(courseId, moduleId, moduleTitle) {
        const modalHtml = `
            <div class="bg-white px-8 pt-8 pb-6 rounded-t-[2rem] border-b border-gray-100 relative overflow-hidden">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-red-50 rounded-full blur-3xl pointer-events-none"></div>
                <div class="flex items-center justify-between mb-6 relative z-10">
                    <div class="flex items-center">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 text-red-500 flex items-center justify-center text-2xl mr-4 shadow-sm border border-red-200">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-black text-gray-900 tracking-tight" id="modal-title">Hapus Folder?</h3>
                            <p class="text-xs text-gray-500 font-bold mt-1">Tindakan ini tidak dapat dibatalkan.</p>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center" onclick="components.closeModal()">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                
                <div class="relative z-10 bg-red-50 border border-red-100 rounded-2xl p-5">
                    <p class="text-sm text-gray-700 font-medium leading-relaxed">
                        Anda akan menghapus folder <strong class="text-red-600">"${moduleTitle}"</strong> beserta <strong>semua materi</strong> di dalamnya. Yakin ingin melanjutkan?
                    </p>
                </div>
            </div>
            <div class="bg-gray-50/80 backdrop-blur-md px-8 py-6 rounded-b-[2rem] flex justify-end space-x-4 border-t border-gray-100">
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-gray-200 px-6 py-3.5 bg-white text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none transition-colors shadow-sm" onclick="components.closeModal()">
                    Batal
                </button>
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-transparent shadow-lg shadow-red-200 px-8 py-3.5 bg-red-500 text-sm font-black text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all transform hover:-translate-y-1" onclick="courseDetailView.executeDeleteModule('${courseId}', '${moduleId}')">
                    <i class="fa-solid fa-trash-can mr-2"></i> Ya, Hapus
                </button>
            </div>
        `;
        components.openModal(modalHtml);
    },

    executeDeleteModule(courseId, moduleId) {
        state.deleteModule(courseId, moduleId);
        components.closeModal();
        router.render();
    }
};
