// roster.js
const rosterView = {
    render(courseId) {
        const course = state.courses.find(c => c.id === courseId);
        if (!course) return `<div class="text-center py-20 text-red-500">Course not found.</div>`;

        // Ensure members array exists
        const members = course.members || [];
        
        // Define default lecturers/students if members array is empty, for prototype feel
        // Actually, we'll just show the main lecturer by default
        let defaultLecturer = {
            id: 'l1',
            name: course.lecturer,
            role: 'Pengajar',
            email: course.lecturer.toLowerCase().replace(/ /g, '.') + '@classhub.edu'
        };

        const allTeachers = [defaultLecturer, ...members.filter(m => m.role.toLowerCase() === 'teacher' || m.role.toLowerCase() === 'pengajar')];
        const allStudents = members.filter(m => m.role.toLowerCase() === 'student' || m.role.toLowerCase() === 'mahasiswa');

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
                <span class="text-gray-800 font-extrabold truncate max-w-[200px]">Anggota & Pengajar</span>
            </nav>

            <div class="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-10 mb-8 relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${course.bannerColor} opacity-5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
                    <div>
                        <h1 class="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight drop-shadow-sm">Anggota Kelas</h1>
                        <p class="text-gray-600 font-medium max-w-3xl leading-relaxed text-sm">Kelola pengajar dan mahasiswa yang terdaftar di kelas <strong>${course.title}</strong>.</p>
                    </div>
                    
                    ${state.currentUser && state.currentUser.role === 'lecturer' ? `
                    <div class="flex-shrink-0 relative">
                        <input type="file" id="csvFileInput" accept=".csv" class="hidden" onchange="rosterView.handleCsvUpload(event, '${course.id}')" />
                        <button onclick="document.getElementById('csvFileInput').click()" class="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-green-200 transition-all flex items-center gap-3 transform hover:-translate-y-1 hover:shadow-xl">
                            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><i class="fa-solid fa-file-csv text-lg"></i></div>
                            Impor Anggota via CSV
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Pengajar Section -->
                <div>
                    <div class="flex items-center justify-between mb-6 px-2 border-b border-indigo-100 pb-4">
                        <h2 class="text-2xl font-extrabold text-indigo-900 flex items-center gap-3">
                            <span class="w-10 h-10 rounded-xl bg-indigo-100 text-primary flex items-center justify-center"><i class="fa-solid fa-chalkboard-user"></i></span>
                            Daftar Pengajar
                        </h2>
                        <span class="bg-indigo-50 text-primary font-black px-4 py-1.5 rounded-full text-sm">${allTeachers.length}</span>
                    </div>
                    
                    <div class="space-y-4">
                        ${allTeachers.map(teacher => `
                            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div class="flex items-center gap-4">
                                    <img src="https://ui-avatars.com/api/?name=${teacher.name}&background=random&color=fff" class="w-12 h-12 rounded-full border border-gray-200" />
                                    <div>
                                        <h3 class="font-bold text-gray-900">${teacher.name}</h3>
                                        <p class="text-xs text-gray-500 font-medium">${teacher.email}</p>
                                    </div>
                                </div>
                                <span class="text-[10px] bg-indigo-50 text-primary border border-indigo-100 px-3 py-1 rounded-lg font-black uppercase tracking-wider">${teacher.role}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Mahasiswa Section -->
                <div>
                    <div class="flex items-center justify-between mb-6 px-2 border-b border-blue-100 pb-4">
                        <h2 class="text-2xl font-extrabold text-blue-900 flex items-center gap-3">
                            <span class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><i class="fa-solid fa-user-graduate"></i></span>
                            Daftar Mahasiswa
                        </h2>
                        <span class="bg-blue-50 text-blue-600 font-black px-4 py-1.5 rounded-full text-sm">${allStudents.length}</span>
                    </div>

                    ${allStudents.length === 0 ? `
                        <div class="bg-transparent border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
                            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                <i class="fa-solid fa-users-slash text-3xl text-gray-300"></i>
                            </div>
                            <h3 class="text-lg font-black text-gray-700 mb-2">Belum ada mahasiswa</h3>
                            <p class="text-xs text-gray-500">Silakan gunakan tombol "Impor Anggota via CSV" untuk menambahkan mahasiswa massal.</p>
                        </div>
                    ` : `
                        <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            ${allStudents.map(student => `
                                <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
                                            ${student.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-gray-900">${student.name}</h3>
                                            <p class="text-xs text-gray-500 font-medium">${student.email}</p>
                                        </div>
                                    </div>
                                    <button class="text-gray-400 hover:text-red-500 transition-colors w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center" title="Hapus Mahasiswa">
                                        <i class="fa-solid fa-xmark text-sm"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            </div>
        `;

        return html;
    },

    handleCsvUpload(event, courseId) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split(/\r?\n/);
            const newMembers = [];
            
            // Assume format: Name, Role, Email
            // We skip the first line assuming it's a header
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                
                // Splitting by comma
                const cols = lines[i].split(',');
                if (cols.length >= 3) {
                    newMembers.push({
                        id: 'mem' + Date.now() + i,
                        name: cols[0].trim(),
                        role: cols[1].trim(), // Expects 'Student', 'Teacher', 'Mahasiswa', 'Pengajar'
                        email: cols[2].trim()
                    });
                }
            }

            if (newMembers.length > 0) {
                state.addCourseMembers(courseId, newMembers);
                
                // Show success modal
                const modalHtml = `
                    <div class="bg-white px-8 pt-8 pb-6 rounded-t-[2.5rem] border-b border-gray-100 relative overflow-hidden">
                        <div class="flex items-center justify-between mb-4 relative z-10">
                            <div class="flex items-center">
                                <div class="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl mr-4">
                                    <i class="fa-solid fa-circle-check"></i>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-black text-gray-900 tracking-tight">Berhasil!</h3>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 font-medium">Berhasil mengimpor <strong>${newMembers.length}</strong> anggota baru ke kelas ini.</p>
                    </div>
                    <div class="bg-gray-50/80 px-8 py-6 rounded-b-[2.5rem] flex justify-end">
                        <button class="px-8 py-3 bg-primary text-white font-black rounded-2xl" onclick="components.closeModal()">Tutup</button>
                    </div>
                `;
                components.openModal(modalHtml);
                
                router.render(); // Re-render view to show new data
            } else {
                alert("Format CSV tidak valid atau file kosong. Pastikan menggunakan format: Name, Role, Email.");
            }
        };
        reader.readAsText(file);
    }
};
