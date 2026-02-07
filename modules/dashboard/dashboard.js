// Dashboard Module - Main Controller
export class DashboardModule {
    constructor() {
        this.data = {
            stats: [
                { id: 1, title: 'Total Sales', value: '$45,231', change: '+12.5%', icon: 'fa-dollar-sign', trend: 'up' },
                { id: 2, title: 'Products Sold', value: '1,234', change: '+8.2%', icon: 'fa-shopping-bag', trend: 'up' },
                { id: 3, title: 'Active Users', value: '892', change: '+15.3%', icon: 'fa-users', trend: 'up' },
                { id: 4, title: 'Pending Orders', value: '45', change: '-3.1%', icon: 'fa-clock', trend: 'down' }
            ],
            recentOrders: [
                { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: '$89.99', status: 'Delivered' },
                { id: '#ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: '$249.99', status: 'Processing' },
                { id: '#ORD-003', customer: 'Mike Johnson', product: 'Laptop Stand', amount: '$45.50', status: 'Shipped' },
                { id: '#ORD-004', customer: 'Sarah Williams', product: 'USB-C Hub', amount: '$29.99', status: 'Pending' },
                { id: '#ORD-005', customer: 'Tom Brown', product: 'Keyboard', amount: '$79.99', status: 'Delivered' }
            ],
            topProducts: [
                { name: 'Wireless Headphones', sales: 342, revenue: '$30,798' },
                { name: 'Smart Watch', sales: 256, revenue: '$63,997' },
                { name: 'Laptop Stand', sales: 198, revenue: '$9,009' },
                { name: 'USB-C Hub', sales: 167, revenue: '$5,008' }
            ]
        };
    }

    render(container) {
        container.innerHTML = this.getTemplate();
        this.attachEventListeners();
    }

    getTemplate() {
        return `
            <div class="dashboard">
                <div class="dashboard-header">
                    <h1>Dashboard Overview</h1>
                    <p class="subtitle">Welcome back! Here's what's happening with your store today.</p>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid grid grid-4">
                    ${this.data.stats.map(stat => `
                        <div class="stat-card card">
                            <div class="stat-icon ${stat.trend}">
                                <i class="fas ${stat.icon}"></i>
                            </div>
                            <div class="stat-content">
                                <p class="stat-label">${stat.title}</p>
                                <h3 class="stat-value">${stat.value}</h3>
                                <span class="stat-change ${stat.trend}">
                                    <i class="fas fa-arrow-${stat.trend === 'up' ? 'up' : 'down'}"></i>
                                    ${stat.change}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Recent Activity Section -->
                <div class="dashboard-content grid grid-2">
                    <!-- Recent Orders -->
                    <div class="card">
                        <div class="card-header">
                            <h2><i class="fas fa-receipt"></i> Recent Orders</h2>
                            <a href="#" class="view-all-link">View All</a>
                        </div>
                        <div class="orders-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.data.recentOrders.map(order => `
                                        <tr>
                                            <td><strong>${order.id}</strong></td>
                                            <td>${order.customer}</td>
                                            <td>${order.product}</td>
                                            <td>${order.amount}</td>
                                            <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Top Products -->
                    <div class="card">
                        <div class="card-header">
                            <h2><i class="fas fa-chart-line"></i> Top Selling Products</h2>
                        </div>
                        <div class="top-products-list">
                            ${this.data.topProducts.map((product, index) => `
                                <div class="product-item">
                                    <div class="product-rank">${index + 1}</div>
                                    <div class="product-info">
                                        <h4>${product.name}</h4>
                                        <p>${product.sales} units sold</p>
                                    </div>
                                    <div class="product-revenue">${product.revenue}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card quick-actions">
                    <h2>Quick Actions</h2>
                    <div class="actions-grid">
                        <button class="action-btn btn btn-primary">
                            <i class="fas fa-plus"></i> Add New Product
                        </button>
                        <button class="action-btn btn btn-primary">
                            <i class="fas fa-file-invoice"></i> Create Order
                        </button>
                        <button class="action-btn btn btn-primary">
                            <i class="fas fa-users"></i> Manage Customers
                        </button>
                        <button class="action-btn btn btn-primary">
                            <i class="fas fa-cog"></i> Settings
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Add any dashboard-specific event listeners here
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.textContent.trim();
                console.log(`Action clicked: ${action}`);
                // Handle quick actions
            });
        });
    }

    destroy() {
        // Cleanup when module is unloaded
        console.log('Dashboard module destroyed');
    }
}
