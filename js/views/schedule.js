// schedule.js
const scheduleView = {
    render() {
        const fakeSchedules = [
            { day: 'Senin', time: '08:00 - 10:30', course: 'SISTEM MULTIMEDIA (SIA01)', room: 'Lab Komputer 1', lecturer: 'Onki Alexander' },
            { day: 'Senin', time: '13:00 - 15:30', course: 'REKAYASA PERANGKAT LUNAK (SIA01)', room: 'Ruang 302', lecturer: 'Safira Faizah' },
            { day: 'Selasa', time: '09:00 - 11:30', course: 'SISTEM OPERASI (SIA01)', room: 'Ruang 201', lecturer: 'Dian Nugraha' },
            { day: 'Rabu', time: '10:00 - 12:30', course: 'KECERDASAN BUATAN (SIA01)', room: 'Lab AI 1', lecturer: 'Anindya Ananda' },
            { day: 'Kamis', time: '08:00 - 10:30', course: 'KEAMANAN DATA DAN JARINGAN (SIA01)', room: 'Lab Jaringan', lecturer: 'Untung Suprihadi' },
            { day: 'Jumat', time: '13:30 - 16:00', course: 'SISTEM TERDISTRIBUSI (SIA01)', room: 'Ruang 405', lecturer: 'Halimatus Zuhriyah' }
        ];

        let html = `
            <div class="flex flex-col md:flex-row gap-8">
                <!-- Left Sidebar -->
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
                            <a href="#" onclick="router.navigate('dashboard')" class="flex items-center gap-4 px-5 py-3.5 text-gray-500 hover:bg-gray-50 hover:text-gray-800 rounded-2xl font-bold transition-colors">
                                <i class="fa-solid fa-shapes text-lg"></i> Beranda Kelas
                            </a>
                            <a href="#" class="flex items-center gap-4 px-5 py-3.5 bg-indigo-50 text-primary rounded-2xl font-bold transition-colors border border-indigo-100">
                                <i class="fa-solid fa-calendar-days text-lg"></i> Jadwal Kuliah
                            </a>
                        </nav>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="flex-grow">
                    <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                        <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                            <div>
                                <h2 class="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                    <i class="fa-solid fa-calendar-days text-primary"></i> Jadwal Kuliah
                                </h2>
                                <p class="text-sm text-gray-500 font-bold mt-2">Jadwal perkuliahan minggu ini.</p>
                            </div>
                        </div>

                        <div class="space-y-6">
        `;

        const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        days.forEach(day => {
            const daySchedules = fakeSchedules.filter(s => s.day === day);
            if (daySchedules.length > 0) {
                html += `
                    <div class="mb-6">
                        <h3 class="text-lg font-black text-gray-800 mb-4 bg-gray-50 px-4 py-2 rounded-xl inline-block border border-gray-200">${day}</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                `;
                
                daySchedules.forEach(schedule => {
                    html += `
                            <div class="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow hover:border-indigo-200 group">
                                <div class="flex justify-between items-start mb-3">
                                    <span class="bg-indigo-50 text-primary text-xs font-black px-3 py-1 rounded-lg border border-indigo-100 flex items-center gap-2">
                                        <i class="fa-regular fa-clock"></i> ${schedule.time}
                                    </span>
                                    <span class="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1">
                                        <i class="fa-solid fa-location-dot text-red-400"></i> ${schedule.room}
                                    </span>
                                </div>
                                <h4 class="font-extrabold text-gray-900 mb-2 group-hover:text-primary transition-colors">${schedule.course}</h4>
                                <p class="text-xs text-gray-500 font-bold flex items-center gap-2">
                                    <i class="fa-solid fa-chalkboard-user text-primary opacity-70"></i> ${schedule.lecturer}
                                </p>
                            </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            }
        });

        html += `
                        </div>
                    </div>
                </div>
            </div>
        `;

        return html;
    }
};
