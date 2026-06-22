// documentViewer.js
const documentViewerView = {
    render(documentId) {
        const item = state.getItemById(documentId);
        if (!item || (item.type !== 'pdf' && item.type !== 'image')) return `<div class="text-center py-20 text-red-500 font-bold text-xl">Document not found.</div>`;

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

            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-[85vh]">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <div>
                        <h1 class="text-2xl font-extrabold text-gray-900">${item.title}</h1>
                        <p class="text-gray-500 text-sm mt-1">
                            <i class="fa-solid fa-user-tie mr-2 text-primary opacity-70"></i> ${item.creator} 
                            <span class="mx-3 opacity-30">|</span> 
                            <i class="fa-solid fa-calendar-day mr-2 text-primary opacity-70"></i> ${item.dateCreated}
                        </p>
                        <div class="flex flex-wrap gap-2 mt-4">
                            ${item.tags && item.tags.length > 0 ? item.tags.map(t => `<span class="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">${t}</span>`).join('') : ''}
                        </div>
                    </div>
                    <a href="${item.url}" target="_blank" class="bg-indigo-50 text-primary font-bold px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-0.5 border border-indigo-100 shadow-sm flex items-center gap-2">
                        <i class="fa-solid fa-download"></i> Download File Asli
                    </a>
                </div>
                
                <div class="flex-grow bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-inner flex items-center justify-center relative">
                    ${(item.url && item.url.match(/\.(mp4|webm|ogg|mov)$/i)) ? `
                        <video class="w-full h-full outline-none bg-black" controls>
                            <source src="${item.url}">
                            Your browser does not support HTML video.
                        </video>
                    ` : item.type === 'pdf' ? `
                        <iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(item.url)}&embedded=true" class="w-full h-full border-none absolute inset-0"></iframe>
                    ` : `
                        <div class="w-full h-full p-4 flex items-center justify-center overflow-auto">
                            <img src="${item.url}" class="max-w-full max-h-full object-contain rounded-lg shadow-sm" alt="${item.title}">
                        </div>
                    `}
                </div>
            </div>
        `;
    }
};
