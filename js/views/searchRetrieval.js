// searchRetrieval.js
const searchRetrievalView = {
    render() {
        return `
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Sidebar Filters -->
                <div class="w-full lg:w-1/4 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
                    <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b border-gray-100">
                        <i class="fa-solid fa-filter mr-3 text-primary"></i> Refine Search
                    </h2>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">File Format</label>
                        <select id="filterFormat" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 transition-colors">
                            <option value="">All Formats</option>
                            <option value="MP4">Video (MP4)</option>
                            <option value="PDF">Document (PDF)</option>
                            <option value="MP3">Audio (MP3)</option>
                        </select>
                    </div>

                    <div class="mb-8">
                        <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Lecturer / Creator</label>
                        <input type="text" id="filterLecturer" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 transition-colors" placeholder="e.g. Alan Turing">
                    </div>

                    <button onclick="searchRetrievalView.performSearch()" class="w-full bg-primary hover:bg-indigo-700 text-white font-bold rounded-xl text-sm px-5 py-3 text-center transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Apply Filters
                    </button>
                </div>

                <!-- Search Results Area -->
                <div class="w-full lg:w-3/4">
                    <div class="relative mb-8 group">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                            <i class="fa-solid fa-search text-gray-400 text-xl group-focus-within:text-primary transition-colors"></i>
                        </div>
                        <input type="search" id="searchInput" class="block w-full p-5 pl-14 text-base text-gray-900 border-2 border-gray-200 rounded-2xl bg-white focus:ring-primary focus:border-primary shadow-sm transition-colors" placeholder="Search multimedia content, tags, or creators..." required>
                        <button type="submit" onclick="searchRetrievalView.performSearch()" class="text-white absolute right-3 bottom-3 bg-primary hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-bold rounded-xl text-sm px-6 py-2.5 transition-colors shadow-sm">Search</button>
                    </div>

                    <div class="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
                        <h3 class="text-xl font-bold text-gray-800" id="resultsCount">Showing all items</h3>
                        <span class="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Multimedia Indexing Engine</span>
                    </div>
                    
                    <div id="searchResults" class="space-y-6">
                        <!-- Results injected here -->
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        this.performSearch();
        
        // Add enter key listener
        document.getElementById('searchInput').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchRetrievalView.performSearch();
            }
        });
    },

    performSearch() {
        const query = document.getElementById('searchInput').value;
        const format = document.getElementById('filterFormat').value;
        const lecturer = document.getElementById('filterLecturer').value;

        const results = state.searchItems(query, format, lecturer);
        
        document.getElementById('resultsCount').innerText = `Found ${results.length} result(s)`;
        
        const container = document.getElementById('searchResults');
        if (results.length === 0) {
            container.innerHTML = `
                <div class="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
                    <div class="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fa-solid fa-box-open text-5xl text-gray-300"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">No metadata matches found</h3>
                    <p class="text-gray-500 text-lg">Try adjusting your search query or relaxing the filters.</p>
                </div>
            `;
            return;
        }

        let html = '';
        results.forEach(item => {
            html += `
                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-lg hover:border-primary transition-all group">
                    <div class="w-full md:w-56 bg-gray-100 flex-shrink-0 flex items-center justify-center border-r border-gray-200 relative overflow-hidden">
                         ${item.thumbnail ? `<img src="${item.thumbnail}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />` : `<div class="text-6xl opacity-40 py-12 transform group-hover:scale-110 transition-transform">${components.getFormatIcon(item.format)}</div>`}
                         ${item.type === 'video' ? `
                             <button onclick="router.navigate('player', {videoId: '${item.id}'})" class="absolute inset-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center hover:bg-opacity-40 transition-all">
                                 <div class="h-14 w-14 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-xl transform group-hover:scale-110 transition-transform">
                                     <i class="fa-solid fa-play ml-1 text-xl"></i>
                                 </div>
                             </button>
                         ` : ''}
                    </div>
                    <div class="p-6 flex-grow flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-3">
                                <h3 class="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">${item.title}</h3>
                                <span class="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">${item.format}</span>
                            </div>
                            <p class="text-sm text-gray-500 mb-5 font-medium flex items-center">
                                <i class="fa-solid fa-folder mr-2 text-primary opacity-70"></i> 
                                <span class="hover:underline cursor-pointer" onclick="router.navigate('courseDetail', {courseId: '${item.courseId}'})">${item.courseName}</span> 
                                <span class="mx-2 text-gray-300">/</span> 
                                <span class="hover:underline cursor-pointer" onclick="router.navigate('moduleContent', {courseId: '${item.courseId}', moduleId: '${item.moduleId}'})">${item.moduleName}</span>
                            </p>
                            
                            <!-- The 8 Metadata Fields Panel -->
                            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                                    <i class="fa-solid fa-database mr-1.5"></i> Multimedia Metadata Profile
                                </h4>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-sm">
                                    <div><span class="font-bold text-gray-800 block mb-1 text-xs uppercase opacity-70">Title</span><span class="text-gray-700 font-medium truncate block" title="${item.title}">${item.title}</span></div>
                                    <div><span class="font-bold text-gray-800 block mb-1 text-xs uppercase opacity-70">Creator</span><span class="text-gray-700 font-medium">${item.creator}</span></div>
                                    <div><span class="font-bold text-gray-800 block mb-1 text-xs uppercase opacity-70">Date Created</span><span class="text-gray-700 font-medium">${item.dateCreated}</span></div>
                                    <div><span class="font-bold text-gray-800 block mb-1 text-xs uppercase opacity-70">Format</span><span class="text-gray-700 font-medium">${item.format}</span></div>
                                    <div><span class="font-bold text-gray-800 block mb-1 text-xs uppercase opacity-70">Duration</span><span class="text-gray-700 font-medium">${item.duration}</span></div>
                                    <div><span class="font-bold text-gray-800 block mb-1 text-xs uppercase opacity-70">Resolution</span><span class="text-gray-700 font-medium">${item.resolution}</span></div>
                                    <div class="col-span-2"><span class="font-bold text-gray-800 block mb-1 text-xs uppercase opacity-70">Tags</span>
                                        <div class="flex flex-wrap gap-1 mt-1">
                                            ${item.tags.map(t => `<span class="bg-gray-200 text-gray-700 text-[10px] px-2 py-0.5 rounded-sm">${t}</span>`).join('')}
                                        </div>
                                    </div>
                                    <div class="col-span-2"><span class="font-bold text-gray-800 block mb-1 text-xs uppercase opacity-70">Access Rights</span><span class="text-gray-700 font-medium inline-flex items-center"><i class="fa-solid fa-lock text-xs mr-1 opacity-50"></i> ${item.accessRights}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
};
