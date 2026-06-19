// router.js
const router = {
    currentRoute: 'login',
    
    navigate(route, params = {}) {
        // Auth Guard
        if (!state.currentUser && route !== 'login') {
            console.warn('Unauthorized access attempt, redirecting to login');
            this.currentRoute = 'login';
        } else {
            this.currentRoute = route;
        }
        
        // Update state params if passed
        if (params.courseId) state.currentCourseId = params.courseId;
        if (params.moduleId) state.currentModuleId = params.moduleId;
        if (params.videoId) state.currentVideoId = params.videoId;
        
        this.render();
    },
    
    render() {
        const appDiv = document.getElementById('app');
        
        // Add a slight fade out effect before switching views (simulating SPA loading)
        appDiv.classList.remove('fade-in');
        
        setTimeout(() => {
            let viewHtml = '';
            
            switch(this.currentRoute) {
                case 'login':
                    viewHtml = loginView.render();
                    break;
                case 'dashboard':
                    viewHtml = dashboardView.render();
                    break;
                case 'courseDetail':
                    viewHtml = courseDetailView.render(state.currentCourseId);
                    break;
                case 'moduleContent':
                    viewHtml = moduleContentView.render(state.currentCourseId, state.currentModuleId);
                    break;
                case 'roster':
                    viewHtml = rosterView.render(state.currentCourseId);
                    break;
                case 'search':
                    viewHtml = searchRetrievalView.render();
                    break;
                case 'player':
                    viewHtml = mediaPlayerView.render(state.currentVideoId);
                    break;
                default:
                    viewHtml = dashboardView.render();
            }
            
            appDiv.innerHTML = viewHtml;
            appDiv.classList.add('fade-in');

            // Hook for views that need JS initialization after DOM insertion
            if (this.currentRoute === 'player' && mediaPlayerView.init) {
                mediaPlayerView.init();
            }
            if (this.currentRoute === 'search' && searchRetrievalView.init) {
                searchRetrievalView.init();
            }
        }, 50); // Small delay for the fade effect to register
    }
};
