// Products Module - Main Controller
export class ProductsModule {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.selectedCategory = 'all';
        this.products = [
            {
                id: 1,
                name: 'Wireless Headphones',
                category: 'electronics',
                price: 89.99,
                originalPrice: 129.99,
                rating: 4.5,
                reviews: 234,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                description: 'Premium wireless headphones with noise cancellation',
                inStock: true,
                discount: 31
            },
            {
                id: 2,
                name: 'Smart Watch Pro',
                category: 'electronics',
                price: 249.99,
                rating: 4.8,
                reviews: 567,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                description: 'Advanced fitness tracking and health monitoring',
                inStock: true,
                featured: true
            },
            {
                id: 3,
                name: 'Laptop Stand',
                category: 'accessories',
                price: 45.50,
                rating: 4.3,
                reviews: 123,
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
                description: 'Ergonomic aluminum laptop stand',
                inStock: true
            },
            {
                id: 4,
                name: 'USB-C Hub',
                category: 'accessories',
                price: 29.99,
                rating: 4.6,
                reviews: 345,
                image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
                description: '7-in-1 USB-C hub with multiple ports',
                inStock: true
            },
            {
                id: 5,
                name: 'Mechanical Keyboard',
                category: 'electronics',
                price: 79.99,
                rating: 4.7,
                reviews: 432,
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
                description: 'RGB mechanical gaming keyboard',
                inStock: true,
                featured: true
            },
            {
                id: 6,
                name: 'Wireless Mouse',
                category: 'electronics',
                price: 39.99,
                rating: 4.4,
                reviews: 289,
                image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
                description: 'Ergonomic wireless mouse with precision tracking',
                inStock: false
            },
            {
                id: 7,
                name: 'Phone Case',
                category: 'accessories',
                price: 19.99,
                rating: 4.2,
                reviews: 156,
                image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400',
                description: 'Protective silicone phone case',
                inStock: true
            },
            {
                id: 8,
                name: 'Bluetooth Speaker',
                category: 'electronics',
                price: 59.99,
                originalPrice: 89.99,
                rating: 4.6,
                reviews: 421,
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
                description: 'Portable waterproof Bluetooth speaker',
                inStock: true,
                discount: 33
            }
        ];
        
        this.categories = [
            { id: 'all', name: 'All Products', icon: 'fa-th' },
            { id: 'electronics', name: 'Electronics', icon: 'fa-laptop' },
            { id: 'accessories', name: 'Accessories', icon: 'fa-plug' }
        ];
    }

    render(container) {
        container.innerHTML = this.getTemplate();
        this.attachEventListeners();
        this.updateCartCount();
    }

    getTemplate() {
        const filteredProducts = this.selectedCategory === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === this.selectedCategory);

        return `
            <div class="products-page">
                <!-- Header -->
                <div class="products-header">
                    <div>
                        <h1>Product Catalog</h1>
                        <p class="subtitle">Discover our amazing products</p>
                    </div>
                    <div class="header-actions">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" id="product-search" placeholder="Search products...">
                        </div>
                    </div>
                </div>

                <!-- Categories Filter -->
                <div class="categories-filter">
                    ${this.categories.map(cat => `
                        <button class="category-btn ${this.selectedCategory === cat.id ? 'active' : ''}" 
                                data-category="${cat.id}">
                            <i class="fas ${cat.icon}"></i>
                            ${cat.name}
                        </button>
                    `).join('')}
                </div>

                <!-- Products Grid -->
                <div class="products-grid grid grid-4">
                    ${filteredProducts.map(product => this.getProductCard(product)).join('')}
                </div>

                ${filteredProducts.length === 0 ? '<p class="no-products">No products found in this category.</p>' : ''}
            </div>

            <!-- Product Modal (Hidden) -->
            <div id="product-modal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div id="modal-body"></div>
                </div>
            </div>
        `;
    }

    getProductCard(product) {
        const isInCart = this.cart.some(item => item.id === product.id);
        
        return `
            <div class="product-card card" data-product-id="${product.id}">
                ${product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
                ${product.featured ? '<div class="featured-badge"><i class="fas fa-star"></i> Featured</div>' : ''}
                ${!product.inStock ? '<div class="out-of-stock-overlay">Out of Stock</div>' : ''}
                
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <button class="btn-icon view-product" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-rating">
                        ${this.getStarRating(product.rating)}
                        <span class="rating-text">${product.rating} (${product.reviews})</span>
                    </div>
                    
                    <div class="product-footer">
                        <div class="product-price">
                            ${product.originalPrice ? 
                                `<span class="original-price">$${product.originalPrice}</span>` : ''}
                            <span class="current-price">$${product.price}</span>
                        </div>
                        
                        <button class="btn btn-primary add-to-cart" 
                                data-product-id="${product.id}"
                                ${!product.inStock || isInCart ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${isInCart ? 'In Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return `<div class="stars">${stars}</div>`;
    }

    attachEventListeners() {
        // Category filter
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedCategory = e.currentTarget.dataset.category;
                this.render(document.getElementById('main-content'));
            });
        });

        // Add to cart
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.productId);
                this.addToCart(productId);
            });
        });

        // View product modal
        const viewBtns = document.querySelectorAll('.view-product');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.currentTarget.closest('.product-card');
                const productId = parseInt(card.dataset.productId);
                this.showProductModal(productId);
            });
        });

        // Search
        const searchInput = document.getElementById('product-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProducts(e.target.value);
            });
        }

        // Modal close
        const modal = document.getElementById('product-modal');
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product && product.inStock) {
            this.cart.push({ ...product, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCartCount();
            this.showNotification('Product added to cart!');
            this.render(document.getElementById('main-content'));
        }
    }

    updateCartCount() {
        const cartLinks = document.querySelectorAll('.nav-link .fa-shopping-cart');
        cartLinks.forEach(icon => {
            const parent = icon.parentElement;
            parent.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${this.cart.length})`;
        });
    }

    showProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        const modalBody = document.getElementById('modal-body');
        const isInCart = this.cart.some(item => item.id === product.id);
        
        modalBody.innerHTML = `
            <div class="product-modal-content">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-details">
                    <div class="modal-category">${product.category}</div>
                    <h2>${product.name}</h2>
                    <div class="modal-rating">
                        ${this.getStarRating(product.rating)}
                        <span>${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <p class="modal-description">${product.description}</p>
                    <div class="modal-price">
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                        <span class="current-price">$${product.price}</span>
                        ${product.discount ? `<span class="discount-tag">Save ${product.discount}%</span>` : ''}
                    </div>
                    <div class="modal-stock">
                        <i class="fas fa-${product.inStock ? 'check-circle' : 'times-circle'}"></i>
                        ${product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                    <button class="btn btn-primary btn-large add-to-cart-modal" 
                            data-product-id="${product.id}"
                            ${!product.inStock || isInCart ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        ${isInCart ? 'Already in Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        
        // Attach modal add to cart event
        const modalAddBtn = modalBody.querySelector('.add-to-cart-modal');
        if (modalAddBtn) {
            modalAddBtn.addEventListener('click', () => {
                this.addToCart(productId);
                modal.style.display = 'none';
            });
        }
    }

    searchProducts(query) {
        const cards = document.querySelectorAll('.product-card');
        const lowerQuery = query.toLowerCase();
        
        cards.forEach(card => {
            const productId = parseInt(card.dataset.productId);
            const product = this.products.find(p => p.id === productId);
            
            if (product.name.toLowerCase().includes(lowerQuery) || 
                product.description.toLowerCase().includes(lowerQuery)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    destroy() {
        console.log('Products module destroyed');
    }
}
