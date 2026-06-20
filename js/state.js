// state.js
const state = {
    courses: [
        {
            id: 'c1',
            title: 'SISTEM MULTIMEDIA (SIA01)',
            lecturer: 'Onki Alexander',
            category: 'Teknik Informatika',
            bannerColor: 'from-blue-500 to-indigo-600',
            modules: [
                {
                    id: 'm1',
                    title: 'Introduction to Digital Video',
                    description: 'Basics of video compression, encoding, and multimedia networking.',
                    items: [
                        {
                            id: 'v1',
                            type: 'video',
                            // 8 Required Metadata Fields
                            title: 'H.264 Compression Basics',
                            creator: 'Onki Alexander',
                            dateCreated: '2023-09-01',
                            format: 'MP4',
                            duration: '00:45',
                            resolution: '1920x1080',
                            tags: ['compression', 'h264', 'video', 'networking'],
                            accessRights: 'Public/Enrolled',
                            
                            // Specific Mock Data
                            url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                            thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                            transcript: '[00:00] Welcome to the module. [00:15] Now we are looking at synchronization... [00:30] And buffering simulation.'
                        },
                        {
                            id: 'p1',
                            type: 'pdf',
                            title: 'Syllabus and Course Guidelines',
                            creator: 'Onki Alexander',
                            dateCreated: '2023-08-25',
                            format: 'PDF',
                            duration: 'N/A',
                            resolution: 'N/A',
                            tags: ['syllabus', 'guidelines'],
                            accessRights: 'Public',
                            url: '#'
                        },
                        {
                            id: 'a1',
                            type: 'audio',
                            title: 'Podcast: The History of Multimedia',
                            creator: 'Guest Lecturer',
                            dateCreated: '2023-09-05',
                            format: 'MP3',
                            duration: '45:00',
                            resolution: 'N/A',
                            tags: ['history', 'podcast', 'audio'],
                            accessRights: 'Enrolled Only',
                            url: '#'
                        }
                    ]
                ,
            members: [
                { id: 'm1', name: 'Dr. Onki Alexander', role: 'Pengajar', email: 'onki.alexander@univ.edu' },
                { id: 'm2', name: 'Safira Faizah, S.Tr.Kom., M.I.T.', role: 'Pengajar', email: 'safira.faizah@univ.edu' },
                { id: 'm3', name: 'Dian Nugraha, S.ST., MIT', role: 'Pengajar', email: 'dian.nugraha@univ.edu' },
                { id: 'm4', name: 'Budi Santoso', role: 'Mahasiswa', email: 'budi.santoso@student.edu' },
                { id: 'm5', name: 'Ayu Lestari', role: 'Mahasiswa', email: 'ayu.lestari@student.edu' },
                { id: 'm6', name: 'Rizky Ramadhan', role: 'Mahasiswa', email: 'rizky.ramadhan@student.edu' },
                { id: 'm7', name: 'Siti Aminah', role: 'Mahasiswa', email: 'siti.aminah@student.edu' },
                { id: 'm8', name: 'Dimas Pratama', role: 'Mahasiswa', email: 'dimas.pratama@student.edu' },
                { id: 'm9', name: 'Nadia Putri', role: 'Mahasiswa', email: 'nadia.putri@student.edu' },
                { id: 'm10', name: 'Fajar Siddiq', role: 'Mahasiswa', email: 'fajar.siddiq@student.edu' }
            ]
        }
            ]
        },
        {
            id: 'c2',
            title: 'REKAYASA PERANGKAT LUNAK (SIA01)',
            lecturer: 'Safira Faizah, S.Tr.Kom., M.I.T.',
            category: 'Teknik Informatika',
            bannerColor: 'from-pink-500 to-purple-600',
            modules: []
        ,
            members: [
                { id: 'm1', name: 'Dr. Onki Alexander', role: 'Pengajar', email: 'onki.alexander@univ.edu' },
                { id: 'm2', name: 'Safira Faizah, S.Tr.Kom., M.I.T.', role: 'Pengajar', email: 'safira.faizah@univ.edu' },
                { id: 'm3', name: 'Dian Nugraha, S.ST., MIT', role: 'Pengajar', email: 'dian.nugraha@univ.edu' },
                { id: 'm4', name: 'Budi Santoso', role: 'Mahasiswa', email: 'budi.santoso@student.edu' },
                { id: 'm5', name: 'Ayu Lestari', role: 'Mahasiswa', email: 'ayu.lestari@student.edu' },
                { id: 'm6', name: 'Rizky Ramadhan', role: 'Mahasiswa', email: 'rizky.ramadhan@student.edu' },
                { id: 'm7', name: 'Siti Aminah', role: 'Mahasiswa', email: 'siti.aminah@student.edu' },
                { id: 'm8', name: 'Dimas Pratama', role: 'Mahasiswa', email: 'dimas.pratama@student.edu' },
                { id: 'm9', name: 'Nadia Putri', role: 'Mahasiswa', email: 'nadia.putri@student.edu' },
                { id: 'm10', name: 'Fajar Siddiq', role: 'Mahasiswa', email: 'fajar.siddiq@student.edu' }
            ]
        },
        {
            id: 'c3',
            title: 'SISTEM OPERASI (SIA01)',
            lecturer: 'Dian Nugraha, S.ST., MIT',
            category: 'Teknik Informatika',
            bannerColor: 'from-teal-400 to-green-600',
            modules: []
        ,
            members: [
                { id: 'm1', name: 'Dr. Onki Alexander', role: 'Pengajar', email: 'onki.alexander@univ.edu' },
                { id: 'm2', name: 'Safira Faizah, S.Tr.Kom., M.I.T.', role: 'Pengajar', email: 'safira.faizah@univ.edu' },
                { id: 'm3', name: 'Dian Nugraha, S.ST., MIT', role: 'Pengajar', email: 'dian.nugraha@univ.edu' },
                { id: 'm4', name: 'Budi Santoso', role: 'Mahasiswa', email: 'budi.santoso@student.edu' },
                { id: 'm5', name: 'Ayu Lestari', role: 'Mahasiswa', email: 'ayu.lestari@student.edu' },
                { id: 'm6', name: 'Rizky Ramadhan', role: 'Mahasiswa', email: 'rizky.ramadhan@student.edu' },
                { id: 'm7', name: 'Siti Aminah', role: 'Mahasiswa', email: 'siti.aminah@student.edu' },
                { id: 'm8', name: 'Dimas Pratama', role: 'Mahasiswa', email: 'dimas.pratama@student.edu' },
                { id: 'm9', name: 'Nadia Putri', role: 'Mahasiswa', email: 'nadia.putri@student.edu' },
                { id: 'm10', name: 'Fajar Siddiq', role: 'Mahasiswa', email: 'fajar.siddiq@student.edu' }
            ]
        },
        {
            id: 'c4',
            title: 'KEAMANAN DATA DAN JARINGAN (SIA01)',
            lecturer: 'Untung Suprihadi, S.Kom, M.Pd',
            category: 'Teknik Informatika',
            bannerColor: 'from-orange-400 to-red-500',
            modules: []
        ,
            members: [
                { id: 'm1', name: 'Dr. Onki Alexander', role: 'Pengajar', email: 'onki.alexander@univ.edu' },
                { id: 'm2', name: 'Safira Faizah, S.Tr.Kom., M.I.T.', role: 'Pengajar', email: 'safira.faizah@univ.edu' },
                { id: 'm3', name: 'Dian Nugraha, S.ST., MIT', role: 'Pengajar', email: 'dian.nugraha@univ.edu' },
                { id: 'm4', name: 'Budi Santoso', role: 'Mahasiswa', email: 'budi.santoso@student.edu' },
                { id: 'm5', name: 'Ayu Lestari', role: 'Mahasiswa', email: 'ayu.lestari@student.edu' },
                { id: 'm6', name: 'Rizky Ramadhan', role: 'Mahasiswa', email: 'rizky.ramadhan@student.edu' },
                { id: 'm7', name: 'Siti Aminah', role: 'Mahasiswa', email: 'siti.aminah@student.edu' },
                { id: 'm8', name: 'Dimas Pratama', role: 'Mahasiswa', email: 'dimas.pratama@student.edu' },
                { id: 'm9', name: 'Nadia Putri', role: 'Mahasiswa', email: 'nadia.putri@student.edu' },
                { id: 'm10', name: 'Fajar Siddiq', role: 'Mahasiswa', email: 'fajar.siddiq@student.edu' }
            ]
        },
        {
            id: 'c5',
            title: 'SISTEM TERDISTRIBUSI (SIA01)',
            lecturer: 'Halimatus Zuhriyah',
            category: 'Teknik Informatika',
            bannerColor: 'from-cyan-400 to-blue-600',
            modules: []
        ,
            members: [
                { id: 'm1', name: 'Dr. Onki Alexander', role: 'Pengajar', email: 'onki.alexander@univ.edu' },
                { id: 'm2', name: 'Safira Faizah, S.Tr.Kom., M.I.T.', role: 'Pengajar', email: 'safira.faizah@univ.edu' },
                { id: 'm3', name: 'Dian Nugraha, S.ST., MIT', role: 'Pengajar', email: 'dian.nugraha@univ.edu' },
                { id: 'm4', name: 'Budi Santoso', role: 'Mahasiswa', email: 'budi.santoso@student.edu' },
                { id: 'm5', name: 'Ayu Lestari', role: 'Mahasiswa', email: 'ayu.lestari@student.edu' },
                { id: 'm6', name: 'Rizky Ramadhan', role: 'Mahasiswa', email: 'rizky.ramadhan@student.edu' },
                { id: 'm7', name: 'Siti Aminah', role: 'Mahasiswa', email: 'siti.aminah@student.edu' },
                { id: 'm8', name: 'Dimas Pratama', role: 'Mahasiswa', email: 'dimas.pratama@student.edu' },
                { id: 'm9', name: 'Nadia Putri', role: 'Mahasiswa', email: 'nadia.putri@student.edu' },
                { id: 'm10', name: 'Fajar Siddiq', role: 'Mahasiswa', email: 'fajar.siddiq@student.edu' }
            ]
        },
        {
            id: 'c6',
            title: 'SISTEM PENDUKUNG KEPUTUSAN (SIA01)',
            lecturer: 'Herwanto',
            category: 'Teknik Informatika',
            bannerColor: 'from-yellow-400 to-orange-500',
            modules: []
        ,
            members: [
                { id: 'm1', name: 'Dr. Onki Alexander', role: 'Pengajar', email: 'onki.alexander@univ.edu' },
                { id: 'm2', name: 'Safira Faizah, S.Tr.Kom., M.I.T.', role: 'Pengajar', email: 'safira.faizah@univ.edu' },
                { id: 'm3', name: 'Dian Nugraha, S.ST., MIT', role: 'Pengajar', email: 'dian.nugraha@univ.edu' },
                { id: 'm4', name: 'Budi Santoso', role: 'Mahasiswa', email: 'budi.santoso@student.edu' },
                { id: 'm5', name: 'Ayu Lestari', role: 'Mahasiswa', email: 'ayu.lestari@student.edu' },
                { id: 'm6', name: 'Rizky Ramadhan', role: 'Mahasiswa', email: 'rizky.ramadhan@student.edu' },
                { id: 'm7', name: 'Siti Aminah', role: 'Mahasiswa', email: 'siti.aminah@student.edu' },
                { id: 'm8', name: 'Dimas Pratama', role: 'Mahasiswa', email: 'dimas.pratama@student.edu' },
                { id: 'm9', name: 'Nadia Putri', role: 'Mahasiswa', email: 'nadia.putri@student.edu' },
                { id: 'm10', name: 'Fajar Siddiq', role: 'Mahasiswa', email: 'fajar.siddiq@student.edu' }
            ]
        },
        {
            id: 'c7',
            title: 'KECERDASAN BUATAN (SIA01)',
            lecturer: 'Anindya Ananda Hapsari',
            category: 'Teknik Informatika',
            bannerColor: 'from-gray-700 to-black',
            modules: []
        ,
            members: [
                { id: 'm1', name: 'Dr. Onki Alexander', role: 'Pengajar', email: 'onki.alexander@univ.edu' },
                { id: 'm2', name: 'Safira Faizah, S.Tr.Kom., M.I.T.', role: 'Pengajar', email: 'safira.faizah@univ.edu' },
                { id: 'm3', name: 'Dian Nugraha, S.ST., MIT', role: 'Pengajar', email: 'dian.nugraha@univ.edu' },
                { id: 'm4', name: 'Budi Santoso', role: 'Mahasiswa', email: 'budi.santoso@student.edu' },
                { id: 'm5', name: 'Ayu Lestari', role: 'Mahasiswa', email: 'ayu.lestari@student.edu' },
                { id: 'm6', name: 'Rizky Ramadhan', role: 'Mahasiswa', email: 'rizky.ramadhan@student.edu' },
                { id: 'm7', name: 'Siti Aminah', role: 'Mahasiswa', email: 'siti.aminah@student.edu' },
                { id: 'm8', name: 'Dimas Pratama', role: 'Mahasiswa', email: 'dimas.pratama@student.edu' },
                { id: 'm9', name: 'Nadia Putri', role: 'Mahasiswa', email: 'nadia.putri@student.edu' },
                { id: 'm10', name: 'Fajar Siddiq', role: 'Mahasiswa', email: 'fajar.siddiq@student.edu' }
            ]
        }
    ],
    
    // Global State for UI
    currentUser: null, // { name: 'User', role: 'student' | 'lecturer' }
    currentCourseId: null,
    currentModuleId: null,
    currentVideoId: null,

    // Methods
    login(name, role) {
        this.currentUser = { name, role };
        localStorage.setItem('classhub_user', JSON.stringify(this.currentUser));
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('classhub_user');
    },

    initAuth() {
        const stored = localStorage.getItem('classhub_user');
        if (stored) {
            this.currentUser = JSON.parse(stored);
        }
    },

    // Methods
    addCourse(title, lecturer, category) {
        const newCourse = {
            id: 'c' + Date.now(),
            title,
            lecturer,
            category,
            bannerColor: 'from-purple-500 to-pink-600', // Default color for new
            modules: [],
            members: []
        };
        this.courses.push(newCourse);
        this.saveCourses();
    },

    // Add bulk members to a course
    addCourseMembers(courseId, newMembers) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            if (!course.members) course.members = [];
            course.members = course.members.concat(newMembers);
            this.saveCourses();
        }
    },

    // Adds a new module (folder) to a course
    addModule(courseId, title, description) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            course.modules.push({
                id: 'm' + Date.now(),
                title,
                description,
                items: []
            });
            this.saveCourses();
        }
    },

    // Deletes a module (folder) from a course
    deleteModule(courseId, moduleId) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            course.modules = course.modules.filter(m => m.id !== moduleId);
            this.saveCourses();
        }
    },

    // Adds a new content item to a specific module
    async addModuleItem(courseId, moduleId, item) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            const mod = course.modules.find(m => m.id === moduleId);
            if (mod) {
                mod.items.push(item);
                await this.saveCourses();
            }
        }
    },

    // Deletes a content item from a specific module
    deleteModuleItem(courseId, moduleId, itemId) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            const mod = course.modules.find(m => m.id === moduleId);
            if (mod) {
                mod.items = mod.items.filter(i => i.id !== itemId);
                this.saveCourses();
            }
        }
    },

    getAllItems() {
        let allItems = [];
        this.courses.forEach(c => {
            c.modules.forEach(m => {
                m.items.forEach(i => {
                    allItems.push({
                        ...i,
                        courseName: c.title,
                        moduleName: m.title,
                        courseId: c.id,
                        moduleId: m.id
                    });
                });
            });
        });
        return allItems;
    },

    searchItems(query, filterFormat = '', filterLecturer = '') {
        let items = this.getAllItems();
        
        if (query) {
            const lowerQ = query.toLowerCase();
            items = items.filter(item => 
                item.title.toLowerCase().includes(lowerQ) || 
                item.tags.some(t => t.toLowerCase().includes(lowerQ))
            );
        }
        
        if (filterFormat) {
            items = items.filter(item => item.format.toLowerCase() === filterFormat.toLowerCase());
        }

        if (filterLecturer) {
            items = items.filter(item => item.creator.toLowerCase().includes(filterLecturer.toLowerCase()));
        }

        return items;
    },
    
    getItemById(id) {
        return this.getAllItems().find(item => item.id === id);
    },

    // Persist courses data to Firestore
    async saveCourses() {
        try {
            await db.collection('data').doc('courses').set({ list: this.courses });
        } catch (e) {
            console.warn('Gagal menyimpan data ke Firestore:', e.message);
            // Fallback to local storage if firebase fails
            localStorage.setItem('classhub_courses', JSON.stringify(this.courses));
        }
    },

    // Load courses data from Firestore
    async loadCourses() {
        try {
            const docRef = await db.collection('data').doc('courses').get();
            if (docRef.exists) {
                this.courses = docRef.data().list;
            } else {
                // Jika DB kosong, kita jangan paksa timpa dengan mock data.
                // Kita gunakan data awal di memory saja tanpa menyimpannya ke DB.
                console.log('Database kosong, menggunakan data lokal sementara tanpa menimpa DB.');
            }
        } catch (e) {
            console.warn('Gagal memuat data dari Firestore (mungkin Firebase Config belum diatur):', e.message);
            var saved = localStorage.getItem('classhub_courses');
            if (saved) {
                this.courses = JSON.parse(saved);
            }
        }
    }
};

// Initialize authentication state from local storage on load
state.initAuth();
