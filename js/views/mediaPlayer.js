// mediaPlayer.js
const mediaPlayerView = {
    timerInterval: null,
    isBuffering: false,

    render(videoId) {
        const item = state.getItemById(videoId);
        if (!item || (item.type !== 'video' && item.type !== 'youtube')) return `<div class="text-center py-20 text-red-500 font-bold text-xl">Video not found.</div>`;

        return `
            <!-- Breadcrumbs -->
            <nav class="text-sm font-medium mb-6 text-gray-500 flex items-center">
                <a href="#" onclick="router.navigate('dashboard')" class="hover:text-primary transition-colors flex items-center"><i class="fa-solid fa-home mr-1"></i> Dashboard</a>
                <i class="fa-solid fa-chevron-right mx-3 text-xs"></i>
                <a href="#" onclick="router.navigate('courseDetail', {courseId: '${item.courseId}'})" class="hover:text-primary transition-colors">${item.courseName}</a>
                <i class="fa-solid fa-chevron-right mx-3 text-xs"></i>
                <a href="#" onclick="router.navigate('moduleContent', {courseId: '${item.courseId}', moduleId: '${item.moduleId}'})" class="hover:text-primary transition-colors">${item.moduleName}</a>
                <i class="fa-solid fa-chevron-right mx-3 text-xs"></i>
                <span class="text-gray-900 font-semibold truncate">${item.title}</span>
            </nav>

            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Main Player Area -->
                <div class="w-full lg:w-2/3">
                    <div class="bg-black rounded-2xl shadow-2xl overflow-hidden relative group">
                        


                        <!-- Buffering Indicator (Hidden by default) -->
                        <div id="bufferingSpinner" class="hidden absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
                            <p class="text-white font-mono bg-black bg-opacity-60 px-4 py-1.5 rounded-lg border border-gray-700">Network Congestion Detected...</p>
                        </div>

                        <!-- Video Element -->
                        ${item.type === 'youtube' ? `
                            <iframe id="mainVideoFrame" class="w-full aspect-video outline-none border-none" src="${item.url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        ` : `
                            <video id="mainVideo" class="w-full aspect-video outline-none" controls>
                                <source src="${item.url}">
                                Your browser does not support HTML video.
                            </video>
                        `}
                    </div>

                    <div class="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <h1 class="text-3xl font-extrabold text-gray-900 mb-2">${item.title}</h1>
                        <p class="text-gray-500 text-sm mb-6 flex items-center">
                            <i class="fa-solid fa-user-tie mr-2 text-primary opacity-70"></i> ${item.creator} 
                            <span class="mx-3 opacity-30">|</span> 
                            <i class="fa-solid fa-calendar-day mr-2 text-primary opacity-70"></i> ${item.dateCreated} 
                            <span class="mx-3 opacity-30">|</span> 
                            <i class="fa-solid fa-display mr-2 text-primary opacity-70"></i> ${item.resolution}
                        </p>
                        <div class="flex flex-wrap gap-2 mb-8">
                            ${item.tags && item.tags.length > 0 ? item.tags.map(t => `<span class="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">${t}</span>`).join('') : ''}
                        </div>

                        <!-- Video Indexing & Retrieval Section -->
                        <div class="border-t border-gray-100 pt-8">
                            <h3 class="text-xl font-bold text-gray-900 mb-5 flex items-center">
                                <i class="fa-solid fa-layer-group mr-3 text-primary"></i> Video Indexing & Transcript Retrieval
                            </h3>
                            
                            <!-- Keyframes -->
                            <div class="grid grid-cols-3 gap-4 mb-8">
                                <div class="cursor-pointer group" onclick="mediaPlayerView.seekTo(0)">
                                    <div class="bg-gray-200 aspect-video rounded-xl mb-2 relative overflow-hidden shadow-sm border border-gray-200 group-hover:border-primary transition-colors flex items-center justify-center">
                                        <img src="${item.thumbnail || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                        <div class="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all"></div>
                                        <span class="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 backdrop-blur-sm text-white text-[10px] font-mono px-1.5 py-0.5 rounded">00:00</span>
                                    </div>
                                    <p class="text-sm font-bold text-center text-gray-700 group-hover:text-primary transition-colors">Introduction</p>
                                </div>
                                <div class="cursor-pointer group" onclick="mediaPlayerView.seekTo(15)">
                                    <div class="bg-gray-200 aspect-video rounded-xl mb-2 relative overflow-hidden shadow-sm border border-gray-200 group-hover:border-primary transition-colors flex items-center justify-center">
                                        <img src="${item.thumbnail || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}" class="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500">
                                        <div class="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all"></div>
                                        <span class="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 backdrop-blur-sm text-white text-[10px] font-mono px-1.5 py-0.5 rounded">00:15</span>
                                    </div>
                                    <p class="text-sm font-bold text-center text-gray-700 group-hover:text-primary transition-colors">Synchronization Sync</p>
                                </div>
                                <div class="cursor-pointer group" onclick="mediaPlayerView.seekTo(30)">
                                    <div class="bg-gray-200 aspect-video rounded-xl mb-2 relative overflow-hidden shadow-sm border border-gray-200 group-hover:border-primary transition-colors flex items-center justify-center">
                                        <img src="${item.thumbnail || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}" class="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-500">
                                        <div class="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all"></div>
                                        <span class="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 backdrop-blur-sm text-white text-[10px] font-mono px-1.5 py-0.5 rounded">00:30</span>
                                    </div>
                                    <p class="text-sm font-bold text-center text-gray-700 group-hover:text-primary transition-colors">Buffering Demo</p>
                                </div>
                            </div>

                            <!-- Transcript -->
                            <div class="bg-gray-50 rounded-2xl p-6 text-sm text-gray-700 h-40 overflow-y-auto font-serif leading-relaxed border border-gray-200 shadow-inner">
                                <p class="mb-4 hover:bg-white p-2 rounded transition-colors"><span class="bg-indigo-100 text-indigo-800 font-mono text-xs px-1.5 py-0.5 rounded mr-2 cursor-pointer hover:bg-primary hover:text-white transition-colors shadow-sm" onclick="mediaPlayerView.seekTo(0)">[00:00]</span> Welcome to this multimedia systems module. Today we're looking at video compression and how modern browsers handle streaming formats.</p>
                                <p class="mb-4 hover:bg-white p-2 rounded transition-colors"><span class="bg-indigo-100 text-indigo-800 font-mono text-xs px-1.5 py-0.5 rounded mr-2 cursor-pointer hover:bg-primary hover:text-white transition-colors shadow-sm" onclick="mediaPlayerView.seekTo(15)">[00:15]</span> Let's discuss multimedia synchronization. In a moment, you'll see an interactive quiz pop up perfectly synced with this timestamp on the right side.</p>
                                <p class="hover:bg-white p-2 rounded transition-colors"><span class="bg-indigo-100 text-indigo-800 font-mono text-xs px-1.5 py-0.5 rounded mr-2 cursor-pointer hover:bg-primary hover:text-white transition-colors shadow-sm" onclick="mediaPlayerView.seekTo(30)">[00:30]</span> Finally, network issues can cause buffering. We must simulate this to understand dynamic adaptive streaming over HTTP. Try clicking the 'Simulate Buffering' button.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Synchronized Quiz Panel -->
                <div class="w-full lg:w-1/3">
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
                        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                            <h2 class="text-xl font-bold text-gray-900 flex items-center">
                                <i class="fa-solid fa-bolt mr-2 text-yellow-500"></i> Active Sync
                            </h2>
                            <div class="bg-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold text-white font-mono flex items-center shadow-inner">
                                <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                                <span id="timeDisplay">00:00</span>
                            </div>
                        </div>

                        <!-- Waiting State -->
                        <div id="quizWaiting" class="text-center py-12">
                            <div class="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 pulse-ring">
                                <i class="fa-solid fa-stopwatch text-3xl text-primary"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Waiting for sync point...</h3>
                            <p class="text-gray-500">An interactive module will appear here when the video reaches <span class="font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">00:15</span>.</p>
                        </div>

                        <!-- Active Quiz State (Hidden by default) -->
                        <div id="quizActive" class="hidden transform transition-all duration-500 scale-95 opacity-0">
                            <div class="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 mb-5 shadow-sm relative overflow-hidden">
                                <div class="absolute top-0 right-0 w-16 h-16 bg-primary opacity-5 rounded-bl-full"></div>
                                <span class="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm">Knowledge Check</span>
                                <p class="text-gray-900 font-bold mb-5 text-lg leading-snug">Which video compression standard is predominantly used for HTML5 web video streaming as simulated here?</p>
                                
                                <div class="space-y-3">
                                    <label class="flex items-center p-3 border border-indigo-100 rounded-xl cursor-pointer hover:bg-white hover:border-primary transition-all bg-white bg-opacity-60 shadow-sm group">
                                        <input type="radio" name="quiz1" class="text-primary focus:ring-primary w-4 h-4">
                                        <span class="ml-3 text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">MPEG-1</span>
                                    </label>
                                    <label class="flex items-center p-3 border border-indigo-100 rounded-xl cursor-pointer hover:bg-white hover:border-primary transition-all bg-white bg-opacity-60 shadow-sm group">
                                        <input type="radio" name="quiz1" class="text-primary focus:ring-primary w-4 h-4">
                                        <span class="ml-3 text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">H.264 / AVC</span>
                                    </label>
                                    <label class="flex items-center p-3 border border-indigo-100 rounded-xl cursor-pointer hover:bg-white hover:border-primary transition-all bg-white bg-opacity-60 shadow-sm group">
                                        <input type="radio" name="quiz1" class="text-primary focus:ring-primary w-4 h-4">
                                        <span class="ml-3 text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">H.261</span>
                                    </label>
                                </div>
                            </div>
                            <button onclick="mediaPlayerView.submitQuiz()" class="w-full bg-primary hover:bg-indigo-700 text-white font-bold rounded-xl text-base px-5 py-3.5 text-center transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Submit Answer <i class="fa-solid fa-arrow-right ml-1"></i>
                            </button>
                        </div>
                        
                        <!-- Success State -->
                        <div id="quizSuccess" class="hidden text-center py-12">
                            <div class="w-20 h-20 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                <i class="fa-solid fa-check text-4xl text-green-500 drop-shadow-sm"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">Excellent!</h3>
                            <p class="text-gray-500">You've mastered this concept. Continuing playback...</p>
                        </div>

                    </div>
                </div>
            </div>
        `;
    },

    init() {
        const video = document.getElementById('mainVideo');
        if (!video) return;

        this.isBuffering = false;
        
        // Reset quiz states
        document.getElementById('quizWaiting').classList.remove('hidden');
        document.getElementById('quizActive').classList.add('hidden', 'scale-95', 'opacity-0');
        document.getElementById('quizActive').classList.remove('scale-100', 'opacity-100');
        document.getElementById('quizSuccess').classList.add('hidden');

        let quizTriggered = false;

        this.timerInterval = setInterval(() => {
            if (!video) return;
            
            const time = video.currentTime;
            
            // Format time display
            const mins = Math.floor(time / 60).toString().padStart(2, '0');
            const secs = Math.floor(time % 60).toString().padStart(2, '0');
            const timeDisplay = document.getElementById('timeDisplay');
            if (timeDisplay) timeDisplay.innerText = `${mins}:${secs}`;

            // Trigger sync quiz at 15 seconds
            if (time >= 15 && time < 16 && !quizTriggered) {
                quizTriggered = true;
                video.pause(); // Pause to let user take quiz
                
                document.getElementById('quizWaiting').classList.add('hidden');
                
                const quizActive = document.getElementById('quizActive');
                quizActive.classList.remove('hidden');
                // trigger reflow
                void quizActive.offsetWidth;
                quizActive.classList.remove('scale-95', 'opacity-0');
                quizActive.classList.add('scale-100', 'opacity-100');
            }
        }, 200);
    },

    seekTo(seconds) {
        const video = document.getElementById('mainVideo');
        if (video) {
            video.currentTime = seconds;
            video.play();
        }
    },

    simulateBuffering() {
        const video = document.getElementById('mainVideo');
        if (!video || this.isBuffering) return;

        this.isBuffering = true;
        video.pause();
        
        // Update overlay UI
        document.getElementById('simStatus').innerText = 'Congested';
        document.getElementById('simStatus').classList.replace('text-green-300', 'text-red-400');
        document.getElementById('simBitrate').innerText = '400 kbps';
        document.getElementById('simBandwidth').innerText = '1.2 Mbps';
        document.getElementById('bufferingSpinner').classList.remove('hidden');

        // Restore after 3 seconds
        setTimeout(() => {
            this.isBuffering = false;
            document.getElementById('simStatus').innerText = 'Stable';
            document.getElementById('simStatus').classList.replace('text-red-400', 'text-green-300');
            document.getElementById('simBitrate').innerText = '2500 kbps';
            document.getElementById('simBandwidth').innerText = '3.5 Mbps';
            document.getElementById('bufferingSpinner').classList.add('hidden');
            video.play();
        }, 3000);
    },

    submitQuiz() {
        const options = document.querySelectorAll('input[name="quiz1"]');
        let selected = false;
        options.forEach(opt => { if(opt.checked) selected = true; });

        if (!selected) {
            alert('Please select an answer to proceed.');
            return;
        }

        document.getElementById('quizActive').classList.add('hidden');
        document.getElementById('quizSuccess').classList.remove('hidden');
        
        // Resume video
        const video = document.getElementById('mainVideo');
        if (video) video.play();
    }
};

// Cleanup interval on route change
const originalNavigate = router.navigate.bind(router);
router.navigate = function(route, params) {
    if (mediaPlayerView && mediaPlayerView.timerInterval) {
        clearInterval(mediaPlayerView.timerInterval);
    }
    originalNavigate(route, params);
};
