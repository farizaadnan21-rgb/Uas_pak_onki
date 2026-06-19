// components.js
const components = {
    openModal(contentHtml) {
        const container = document.getElementById('modal-container');
        const content = document.getElementById('modal-content');
        content.innerHTML = contentHtml;
        container.classList.remove('hidden');
    },
    
    closeModal() {
        const container = document.getElementById('modal-container');
        container.classList.add('hidden');
    },

    getFormatIcon(format) {
        switch(format.toLowerCase()) {
            case 'mp4': return '<i class="fa-solid fa-file-video text-blue-500"></i>';
            case 'pdf': return '<i class="fa-solid fa-file-pdf text-red-500"></i>';
            case 'mp3': return '<i class="fa-solid fa-file-audio text-purple-500"></i>';
            case 'jpg':
            case 'png': return '<i class="fa-solid fa-file-image text-green-500"></i>';
            default: return '<i class="fa-solid fa-file text-gray-500"></i>';
        }
    }
};
