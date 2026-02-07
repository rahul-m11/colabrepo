// Main Application Controller
import { DashboardModule } from './modules/dashboard/dashboard.js';
import { ProductsModule } from './modules/products/products.js';

class App {
    constructor() {
        this.currentModule = null;
        this.modules = {
            dashboard: new DashboardModule(),
            products: new ProductsModule()
        };
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadModule('dashboard'); // Load dashboard by default
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Load module
                this.loadModule(page);
            });
        });
    }

    loadModule(moduleName) {
        const mainContent = document.getElementById('main-content');
        
        if (this.modules[moduleName]) {
            // Cleanup previous module
            if (this.currentModule && this.currentModule.destroy) {
                this.currentModule.destroy();
            }
            
            // Load new module
            this.currentModule = this.modules[moduleName];
            mainContent.innerHTML = '';
            this.currentModule.render(mainContent);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
