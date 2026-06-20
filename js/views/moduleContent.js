// moduleContent.js
const moduleContentView = {
    render(courseId, moduleId) {
        const course = state.courses.find(c => c.id === courseId);
        if (!course) return `<div class="text-center py-20 text-red-500">Course not found.</div>`;
        
        const module = course.modules.find(m => m.id === moduleId);
        if (!module) return `<div class="text-center py-20 text-red-500">Module not found.</div>`;

        let html = `
            <!-- Top Navigation / Breadcrumb -->
            <nav class="text-sm font-medium mb-8 text-gray-500 flex items-center bg-white py-2 px-5 rounded-full shadow-sm border border-gray-100 w-max hover:shadow-md transition-shadow">
                <a href="#" onclick="router.navigate('courseDetail', {courseId: '${course.id}'})" class="hover:text-primary transition-colors flex items-center font-bold">
                    <div class="w-8 h-8 rounded-full bg-indigo-50 text-primary flex items-center justify-center mr-3 hover:bg-primary hover:text-white transition-colors">
                        <i class="fa-solid fa-arrow-left"></i>
                    </div>
                    Kembali ke Kelas
                </a>
                <span class="mx-3 text-gray-300">/</span>
                <span class="text-gray-800 font-extrabold truncate max-w-[200px]">${module.title}</span>
            </nav>

            <div class="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-10 mb-8 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${course.bannerColor} opacity-5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
                    <div>
                        <div class="inline-flex items-center gap-2 mb-4">
                            <span class="bg-indigo-50 text-primary border border-indigo-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm"><i class="fa-solid fa-folder-open mr-1.5"></i> FOLDER SESI / MODUL</span>
                        </div>
                        <h1 class="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight drop-shadow-sm">${module.title}</h1>
                        <p class="text-gray-600 font-medium max-w-3xl leading-relaxed text-sm">${module.description || 'Belum ada deskripsi untuk sesi ini.'}</p>
                    </div>
                    
                    <!-- THE BUTTON TO ADD FILES -->
                    ${state.currentUser && state.currentUser.role === 'lecturer' ? `
                    <button onclick="moduleContentView.showAddContentModal('${course.id}', '${module.id}')" class="flex-shrink-0 bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-gray-200 transition-all flex items-center gap-3 transform hover:-translate-y-1 hover:shadow-xl border border-gray-800">
                        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><i class="fa-solid fa-cloud-arrow-up text-lg"></i></div>
                        Upload File / Materi
                    </button>
                    ` : ''}
                </div>
            </div>

            <div class="mb-6 flex items-center justify-between px-2">
                <h2 class="text-xl font-extrabold text-gray-800 flex items-center gap-3">
                    <span class="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 flex items-center justify-center"><i class="fa-solid fa-layer-group"></i></span>
                    Daftar Materi Pembelajaran (${module.items.length})
                </h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        `;

        if (module.items.length === 0) {
            html += `
                <div class="col-span-full bg-transparent border-2 border-dashed border-gray-200 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center">
                    <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-5 shadow-inner">
                        <i class="fa-solid fa-box-open text-5xl text-gray-300"></i>
                    </div>
                    <h3 class="text-xl font-black text-gray-700 mb-2">Folder ini masih kosong</h3>
                    <p class="text-sm text-gray-500 mb-8 max-w-md">Tambahkan file PDF, Video Pembelajaran, atau Audio ke dalam folder sesi ini agar mahasiswa dapat mulai belajar.</p>
                    ${state.currentUser && state.currentUser.role === 'lecturer' ? `
                    <button onclick="moduleContentView.showAddContentModal('${course.id}', '${module.id}')" class="px-8 py-4 bg-indigo-50 text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 shadow-sm border border-indigo-100 flex items-center">
                        <i class="fa-solid fa-plus mr-3"></i> Upload File Pertama
                    </button>
                    ` : ''}
                </div>
            `;
        } else {
            module.items.forEach(item => {
                let iconHtml = '';
                let bgGradient = '';
                let textColor = '';
                let thumbnailStyle = '';
                
                if (item.type === 'video') {
                    iconHtml = '<i class="fa-solid fa-video"></i>';
                    bgGradient = 'from-blue-500 to-indigo-600';
                    textColor = 'text-blue-600';
                } else if (item.type === 'youtube') {
                    iconHtml = '<i class="fa-brands fa-youtube"></i>';
                    bgGradient = 'from-red-600 to-rose-700';
                    textColor = 'text-red-600';
                    if (item.thumbnail) {
                        thumbnailStyle = "background-image: url('" + item.thumbnail + "'); background-size: cover; background-position: center;";
                    }
                } else if (item.type === 'pdf') {
                    iconHtml = '<i class="fa-solid fa-file-pdf"></i>';
                    bgGradient = 'from-red-500 to-pink-600';
                    textColor = 'text-red-500';
                } else if (item.type === 'audio') {
                    iconHtml = '<i class="fa-solid fa-file-audio"></i>';
                    bgGradient = 'from-purple-500 to-fuchsia-600';
                    textColor = 'text-purple-600';
                }

                var isYt = item.type === 'youtube' && item.thumbnail;

                html += `
                    <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 flex flex-col justify-between h-full" onclick="moduleContentView.openItem('${course.id}', '${module.id}', '${item.id}')" style="${thumbnailStyle}">
                        ${isYt ? '<div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors z-0"></div>' : ''}
                        
                        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${bgGradient} z-10"></div>
                        <div class="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${bgGradient} opacity-5 rounded-full transform group-hover:scale-150 transition-transform duration-500 z-0"></div>
                        
                        ${state.currentUser && state.currentUser.role === 'lecturer' ? '<button onclick="event.stopPropagation(); moduleContentView.confirmDeleteItem(\'' + course.id + '\', \'' + module.id + '\', \'' + item.id + '\', \'' + item.title.replace(/'/g, "\\\'" ) + '\')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 shadow-sm" title="Hapus Materi"><i class="fa-solid fa-trash-can text-xs"></i></button>' : ''}

                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-5">
                                <div class="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl ${textColor} shadow-sm group-hover:scale-110 transition-transform">
                                    ${iconHtml}
                                </div>
                                <span class="bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm opacity-90">
                                    ${item.format || item.type}
                                </span>
                            </div>
                            
                            <h3 class="font-extrabold ${isYt ? 'text-white' : 'text-gray-900'} text-lg leading-tight mb-3 transition-colors line-clamp-2">${item.title}</h3>
                            <div class="flex flex-wrap gap-2 mb-6">
                                ${item.tags ? item.tags.slice(0,3).map(tag => '<span class="text-[9px] ' + (isYt ? 'bg-white/20 border-white/30 text-white' : 'bg-gray-100 border-gray-200 text-gray-500') + ' border font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">#' + tag + '</span>').join('') : ''}
                            </div>
                        </div>

                        <div class="border-t ${isYt ? 'border-white/20' : 'border-gray-100'} pt-5 mt-auto relative z-10">
                            <div class="flex items-center justify-between">
                                <p class="text-[10px] ${isYt ? 'text-white/80' : 'text-gray-500'} font-bold flex items-center gap-2 uppercase tracking-wider">
                                    <i class="fa-regular fa-clock ${isYt ? 'text-white/60' : 'text-gray-400'}"></i> ${item.duration !== 'N/A' && item.duration ? item.duration : 'Tersedia'}
                                </p>
                                <div class="w-10 h-10 rounded-full ${isYt ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400 border border-gray-100'} flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-lg">
                                    <i class="fa-solid fa-play text-xs"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        html += `</div>`;
        return html;
    },

    openItem(courseId, moduleId, itemId) {
        const course = state.courses.find(c => c.id === courseId);
        const module = course.modules.find(m => m.id === moduleId);
        const item = module.items.find(i => i.id === itemId);

        if (item.type === 'video' || item.type === 'youtube') {
            router.navigate('player', {courseId, moduleId, videoId: itemId});
        } else if (item.type === 'pdf') {
            // Open PDF inside the LMS using the new documentViewer
            router.navigate('document', {courseId, moduleId, documentId: itemId});
        } else if (item.type === 'audio') {
            alert('[SIMULASI PROTOTIPE]\nMemutar Audio File: ' + item.title + '\nMetadata:\n- Format: ' + item.format + '\n- Duration: ' + item.duration);
        }
    },

    confirmDeleteItem(courseId, moduleId, itemId, itemTitle) {
        var modalHtml = `
            <div class="bg-white px-8 pt-8 pb-6 rounded-t-[2rem] border-b border-gray-100 relative overflow-hidden">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-red-50 rounded-full blur-3xl pointer-events-none"></div>
                <div class="flex items-center justify-between mb-6 relative z-10">
                    <div class="flex items-center">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 text-red-500 flex items-center justify-center text-2xl mr-4 shadow-sm border border-red-200">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-black text-gray-900 tracking-tight" id="modal-title">Hapus Materi?</h3>
                            <p class="text-xs text-gray-500 font-bold mt-1">Tindakan ini tidak dapat dibatalkan.</p>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center" onclick="components.closeModal()">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                <div class="relative z-10 bg-red-50 border border-red-100 rounded-2xl p-5">
                    <p class="text-sm text-gray-700 font-medium leading-relaxed">
                        Anda akan menghapus materi <strong class="text-red-600">"${itemTitle}"</strong>. Yakin ingin melanjutkan?
                    </p>
                </div>
            </div>
            <div class="bg-gray-50/80 backdrop-blur-md px-8 py-6 rounded-b-[2rem] flex justify-end space-x-4 border-t border-gray-100">
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-gray-200 px-6 py-3.5 bg-white text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none transition-colors shadow-sm" onclick="components.closeModal()">
                    Batal
                </button>
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-transparent shadow-lg shadow-red-200 px-8 py-3.5 bg-red-500 text-sm font-black text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all transform hover:-translate-y-1" onclick="moduleContentView.executeDeleteItem('${courseId}', '${moduleId}', '${itemId}')">
                    <i class="fa-solid fa-trash-can mr-2"></i> Ya, Hapus
                </button>
            </div>
        `;
        components.openModal(modalHtml);
    },

    executeDeleteItem(courseId, moduleId, itemId) {
        state.deleteModuleItem(courseId, moduleId, itemId);
        components.closeModal();
        router.render();
    },

    showAddContentModal(courseId, moduleId) {
        var modalHtml = `
            <div class="bg-white px-8 pt-8 pb-6 rounded-t-[2.5rem] border-b border-gray-100 relative overflow-hidden">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>
                <div class="flex items-center justify-between mb-8 relative z-10">
                    <div class="flex items-center">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 text-primary flex items-center justify-center text-2xl mr-5 shadow-sm border border-indigo-200">
                            <i class="fa-solid fa-cloud-arrow-up"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-black text-gray-900 tracking-tight" id="modal-title">Upload File / Materi</h3>
                            <p class="text-xs text-gray-500 font-bold mt-1">Lengkapi metadata file sesuai standar LMS.</p>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center" onclick="components.closeModal()">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                
                <div class="space-y-5 relative z-10 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    <input type="hidden" id="addContentCourseId" value="${courseId}">
                    <input type="hidden" id="addContentModuleId" value="${moduleId}">
                    
                    <div>
                        <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Jenis File</label>
                        <select id="contentType" onchange="moduleContentView.toggleUploadMode()" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-white transition-all font-bold text-gray-800">
                            <option value="video">Video Lokal (Upload MP4)</option>
                            <option value="youtube">Video YouTube (URL)</option>
                            <option value="pdf">Dokumen / Modul (Upload PDF)</option>
                            <option value="audio">Audio / Podcast (Upload MP3)</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Judul Materi (Title)</label>
                        <input type="text" id="contentTitle" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-white transition-all font-bold text-gray-800" placeholder="Contoh: Konsep Dasar Jaringan">
                    </div>

                    <!-- FILE UPLOAD ZONE (for video, pdf, audio) -->
                    <div id="fileUploadZone">
                        <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Pilih File dari Komputer</label>
                        <div id="dropZone" class="border-2 border-dashed border-indigo-200 rounded-2xl p-8 text-center cursor-pointer hover:border-primary hover:bg-indigo-50/50 transition-all group" onclick="document.getElementById('contentFile').click()">
                            <input type="file" id="contentFile" class="hidden" accept="video/mp4,video/webm,video/ogg" onchange="moduleContentView.handleFileSelect(event)">
                            <div class="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                <i class="fa-solid fa-file-arrow-up text-2xl"></i>
                            </div>
                            <p class="text-sm font-bold text-gray-700 mb-1">Klik untuk memilih file</p>
                            <p id="fileAcceptHint" class="text-xs text-gray-400 font-medium">Format yang diterima: MP4, WebM, OGG</p>
                            <div id="selectedFileInfo" class="hidden mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-left">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                        <i class="fa-solid fa-check text-lg"></i>
                                    </div>
                                    <div class="min-w-0">
                                        <p id="selectedFileName" class="text-xs font-bold text-green-800 truncate"></p>
                                        <p id="selectedFileSize" class="text-[10px] text-green-600 font-medium"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- URL INPUT (for YouTube only) -->
                    <div id="urlInputZone" class="hidden">
                        <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">URL Video YouTube</label>
                        <input type="text" id="contentUrl" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-white transition-all font-medium text-gray-700" placeholder="https://www.youtube.com/watch?v=...">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Kreator (Creator)</label>
                            <input type="text" id="contentCreator" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-white transition-all font-medium text-gray-700" placeholder="Nama dosen/pembuat">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Hak Akses (Access Rights)</label>
                            <select id="contentRights" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-white transition-all font-medium text-gray-700">
                                <option value="Public">Publik (Semua Orang)</option>
                                <option value="Enrolled Only">Khusus Mahasiswa Terdaftar</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Template Kata Kunci (Pilih atau ketik sendiri)</label>
                        <div class="flex flex-wrap gap-2 mb-3" id="keywordTemplates">
                            <button type="button" onclick="moduleContentView.addTag('Materi Wajib')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Materi Wajib</button>
                            <button type="button" onclick="moduleContentView.addTag('Source Code')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Source Code</button>
                            <button type="button" onclick="moduleContentView.addTag('Praktikum')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Praktikum</button>
                            <button type="button" onclick="moduleContentView.addTag('Tugas Akhir')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Tugas Akhir</button>
                            <button type="button" onclick="moduleContentView.addTag('Dataset')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Dataset</button>
                            <button type="button" onclick="moduleContentView.addTag('Dokumentasi API')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Dokumentasi API</button>
                            <button type="button" onclick="moduleContentView.addTag('Jurnal / Paper')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Jurnal / Paper</button>
                            <button type="button" onclick="moduleContentView.addTag('Tugas')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Tugas</button>
                            <button type="button" onclick="moduleContentView.addTag('Kuis / Ujian')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Kuis / Ujian</button>
                            <button type="button" onclick="moduleContentView.addTag('Silabus')" class="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">Silabus</button>
                        </div>
                        <input type="text" id="contentTags" class="focus:ring-4 focus:ring-indigo-100 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-200 rounded-2xl p-4 border bg-white transition-all font-medium text-gray-700" placeholder="Ketik kata kunci lain di sini (pisahkan dengan koma)">
                    </div>
                </div>
            </div>
            <div class="bg-gray-50/80 backdrop-blur-md px-8 py-6 rounded-b-[2.5rem] flex justify-end space-x-4 border-t border-gray-100">
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-gray-200 px-6 py-4 bg-white text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none transition-colors shadow-sm" onclick="components.closeModal()">
                    Batal
                </button>
                <button type="button" class="inline-flex justify-center items-center rounded-2xl border border-transparent shadow-lg shadow-indigo-200 px-8 py-4 bg-primary text-sm font-black text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all transform hover:-translate-y-1" onclick="moduleContentView.submitAddContent()">
                    <i class="fa-solid fa-cloud-arrow-up mr-2"></i> Upload File
                </button>
            </div>
        `;
        components.openModal(modalHtml, 'max-w-2xl');
        setTimeout(function() { moduleContentView.toggleUploadMode(); }, 100);
    },

    toggleUploadMode() {
        var type = document.getElementById('contentType').value;
        var fileZone = document.getElementById('fileUploadZone');
        var urlZone = document.getElementById('urlInputZone');
        var fileInput = document.getElementById('contentFile');
        var fileHint = document.getElementById('fileAcceptHint');

        if (type === 'youtube') {
            fileZone.classList.add('hidden');
            urlZone.classList.remove('hidden');
        } else {
            fileZone.classList.remove('hidden');
            urlZone.classList.add('hidden');
            if (type === 'video') {
                fileInput.accept = 'video/mp4,video/webm,video/ogg';
                fileHint.textContent = 'Format yang diterima: MP4, WebM, OGG';
            } else if (type === 'pdf') {
                fileInput.accept = 'application/pdf';
                fileHint.textContent = 'Format yang diterima: PDF';
            } else if (type === 'audio') {
                fileInput.accept = 'audio/mpeg,audio/mp3,audio/ogg,audio/wav';
                fileHint.textContent = 'Format yang diterima: MP3, OGG, WAV';
            }
        }
        var info = document.getElementById('selectedFileInfo');
        if (info) info.classList.add('hidden');
    },

    addTag(tag) {
        var input = document.getElementById('contentTags');
        var current = input.value.split(',').map(function(t) { return t.trim(); }).filter(function(t) { return t; });
        if (!current.includes(tag)) {
            current.push(tag);
            input.value = current.join(', ');
        }
    },

    handleFileSelect(event) {
        var file = event.target.files[0];
        if (!file) return;
        var info = document.getElementById('selectedFileInfo');
        var nameEl = document.getElementById('selectedFileName');
        var sizeEl = document.getElementById('selectedFileSize');
        nameEl.textContent = file.name;
        var sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        sizeEl.textContent = sizeMB + ' MB';
        info.classList.remove('hidden');
        // Auto-fill title from filename if empty
        var titleInput = document.getElementById('contentTitle');
        if (!titleInput.value) {
            titleInput.value = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        }
    },

    async submitAddContent() {
        var courseId = document.getElementById('addContentCourseId').value;
        var moduleId = document.getElementById('addContentModuleId').value;
        var type = document.getElementById('contentType').value;
        var title = document.getElementById('contentTitle').value;
        var creator = document.getElementById('contentCreator').value;
        var rights = document.getElementById('contentRights').value;
        var tagsInput = document.getElementById('contentTags').value;
        var fileInput = document.getElementById('contentFile');
        var urlInput = document.getElementById('contentUrl');
        var file = fileInput ? fileInput.files[0] : null;
        var url = urlInput ? urlInput.value : '';

        if (!title) { alert('Judul materi wajib diisi.'); return; }
        if (type === 'youtube' && !url) { alert('URL YouTube wajib diisi.'); return; }
        if (type !== 'youtube' && !file) { alert('Silakan pilih file untuk diupload.'); return; }

        var tags = tagsInput.split(',').map(function(t) { return t.trim(); }).filter(function(t) { return t; });

        // For YouTube, no file reading needed
        if (type === 'youtube') {
            var finalThumbnail = null;
            var finalUrl = url;
            var ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
            if (ytMatch && ytMatch[1]) {
                finalThumbnail = 'https://img.youtube.com/vi/' + ytMatch[1] + '/hqdefault.jpg';
                finalUrl = 'https://www.youtube.com/embed/' + ytMatch[1] + '?autoplay=1';
            }
            var newItem = {
                id: 'item' + Date.now(),
                type: 'youtube',
                title: title,
                creator: creator || (state.currentUser ? state.currentUser.name : 'Sistem'),
                dateCreated: new Date().toISOString().split('T')[0],
                format: 'YouTube',
                duration: 'TBD',
                resolution: 'Auto',
                tags: tags,
                accessRights: rights,
                url: finalUrl,
                thumbnail: finalThumbnail,
                fileName: ''
            };
            state.addModuleItem(courseId, moduleId, newItem);
            components.closeModal();
            router.render();
            return;
        }

        // For local files: Upload bypassing Firebase Storage (using Vercel API or free public API)
        try {
            if (file.size > 3.5 * 1024 * 1024) {
                alert("Maksimal ukuran file adalah 3.5 MB. Untuk file berukuran besar, silakan gunakan link Google Drive atau YouTube.");
                return;
            }

            var submitBtn = document.querySelector('button[onclick="moduleContentView.submitAddContent()"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Mengupload...';
                submitBtn.disabled = true;
            }

            // Convert to Base64
            var reader = new FileReader();
            var base64Promise = new Promise(function(resolve, reject) {
                reader.onload = function() { resolve(reader.result); };
                reader.onerror = function() { reject(new Error("Gagal membaca file")); };
                reader.readAsDataURL(file);
            });
            var base64Data = await base64Promise;

            var downloadURL = "";
            try {
                // Try Vercel Serverless API (Permanent hosting via Catbox)
                var response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: file.name, base64: base64Data })
                });
                if (response.status === 404) throw new Error("Local");
                var result = await response.json();
                if (!response.ok) throw new Error(result.error);
                downloadURL = result.url;
            } catch (e) {
                // Fallback to tmpfiles.org for local testing
                console.log("Menggunakan server fallback sementara...");
                var formData = new FormData();
                formData.append('file', file);
                var tmpRes = await fetch('https://tmpfiles.org/api/v1/upload', {
                    method: 'POST',
                    body: formData
                });
                var tmpData = await tmpRes.json();
                if (tmpData.status !== 'success') throw new Error("Server cadangan gagal merespon");
                downloadURL = tmpData.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
            }

            var finalFormat = 'Unknown';
            var finalDuration = 'TBD';
            var finalResolution = 'N/A';

            if (type === 'video') {
                finalFormat = 'MP4';
                finalResolution = '1080p';
            } else if (type === 'pdf') {
                finalFormat = 'PDF';
                finalDuration = 'N/A';
            } else if (type === 'audio') {
                finalFormat = 'MP3';
            }

            var newItem = {
                id: 'item' + Date.now(),
                type: type,
                title: title,
                creator: creator || (state.currentUser ? state.currentUser.name : 'Sistem'),
                dateCreated: new Date().toISOString().split('T')[0],
                format: finalFormat,
                duration: finalDuration,
                resolution: finalResolution,
                tags: tags,
                accessRights: rights,
                url: downloadURL,
                thumbnail: null,
                fileName: file.name
            };

            await state.addModuleItem(courseId, moduleId, newItem);
            components.closeModal();
            router.render();

        } catch (error) {
            console.error("Upload error:", error);
            alert("Gagal mengupload file: " + error.message + "\\n(Pastikan Firebase config sudah diset)");
            var submitBtn = document.querySelector('button[onclick="moduleContentView.submitAddContent()"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up mr-2"></i> Upload File';
                submitBtn.disabled = false;
            }
        }
    }
};
