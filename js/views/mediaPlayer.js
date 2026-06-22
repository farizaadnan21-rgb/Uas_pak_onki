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

            <div class="flex flex-col gap-6 max-w-5xl mx-auto">
                <!-- Main Player Area -->
                <div class="w-full">
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

                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // Video initialization logic here if needed
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
