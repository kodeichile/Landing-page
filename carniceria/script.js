document.addEventListener('DOMContentLoaded', function () {
function formatCLP(value) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(value);
}
// Productos por categoría
const products = {
    vacuno: [
        { id: 1, name: 'Carne Molida Premium', description: 'Carne de res molida de primera calidad', price: 12990, image: 'images/carne-molida.jpg' },
        { id: 2, name: 'Filete de Res', description: 'Corte fino y tierno', price: 24990,image: 'images/filete-res.jpg' },
        { id: 3, name: 'Costilla BBQ', description: 'Costillas jugosas y sabrosas', price: 18990, image: 'images/costillas-res.jpg' },
        { id: 4, name: 'T-Bone Steak', description: 'Corte clásico y delicioso', price: 28990, image: 'images/tbone.jpg' },
        { id: 5, name: 'Carne para Asar', description: 'Ideal para parrilladas', price: 16990, image: 'images/filete-res.jpg' },
        { id: 6, name: 'Solomillo Premium', description: 'Lo más fino de la res', price: 34990, image: 'images/solomillo.jpg' }
    ],
    ave: [
        { id: 7, name: 'Pechuga de Pollo', description: 'Tierna y jugosa', price: 8990, image: 'images/pechuga-pollo.jpg' },
        { id: 8, name: 'Muslos de Pollo', description: 'Sabrosos y económicos', price: 7990, image: 'images/muslos-pollo.jpg' },
        { id: 9, name: 'Pollo Entero', description: 'Perfecto para la familia', price: 13990, image: 'images/pollo-entero.jpg' },
        { id: 10, name: 'Alitas de Pollo', description: 'Crujientes y deliciosas', price: 9990, image: 'images/alitas.jpg' },
        { id: 11, name: 'Pechuga Deshuesada', description: 'Sin huesos, lista para cocinar', price: 11990, image: 'images/pechuga-pollo.jpg' },
        { id: 12, name: 'Pavo Premium', description: 'Carne magra y saludable', price: 14990, image: 'images/pavo.jpg' }
    ],
    cerdo: [
        { id: 13, name: 'Costilla de Cerdo', description: 'Tierna y jugosa', price: 14990, image: 'images/costillas-cerdo.jpg' },
        { id: 14, name: 'Chuletas de Cerdo', description: 'Perfectas para asar', price: 13990, image: 'images/chuletas-cerdo.jpg' },
        { id: 15, name: 'Jamón Fresco', description: 'Deshuesado y listo', price: 19990, image: 'images/jamon.jpg' },
        { id: 16, name: 'Costillar BBQ', description: 'Para asar y disfrutar', price: 16990, image: 'images/costillas-cerdo.jpg' },
        { id: 17, name: 'Lomo de Cerdo', description: 'Corte premium', price: 22990, image: 'images/lomo-cerdo.jpg' },
        { id: 18, name: 'Tocino', description: 'Crujiente y delicioso', price: 8990, image: 'images/tocino.jpg' }
    ],
    mariscos: [
        { id: 19, name: 'Camarones Frescos', description: 'Grandes y jugosos', price: 16990, image: 'images/camarones.jpg' },
        { id: 20, name: 'Filete de Salmón', description: 'De excelente calidad', price: 19990, image: 'images/salmon.jpg' },
        { id: 21, name: 'Filete de Atún', description: 'Fresco y de alta calidad', price: 21990, image: 'images/atun.jpg' },
        { id: 22, name: 'Camarones Jumbo', description: 'Los más grandes y frescos', price: 24990, image: 'images/camarones.jpg' },
        { id: 23, name: 'Mejillones Frescos', description: 'Recién llegados del mar', price: 15990, image: 'images/mejillones.jpg' },
        { id: 24, name: 'Pulpo Fresco', description: 'Tierno y delicioso', price: 22990, image: 'images/pulpo.jpg' }
    ],
    miscelaneos: [
        { id: 25, name: 'Chorizo Fresco', description: 'Sabroso y tradicional', price: 8990, image: 'images/chorizo.jpg' },
        { id: 26, name: 'Salchicha Premium', description: 'De excelente calidad', price: 9990, image: 'images/salchichas.jpg' },
        { id: 27, name: 'Morcilla Artesanal', description: 'Hecha con receta tradicional', price: 10990, image: 'images/morcilla.jpg' },
        { id: 28, name: 'Hamburguesas Caseras', description: 'Listas para la parrilla', price: 11990, image: 'images/hamburguesas.jpg' },
        { id: 29, name: 'Albóndigas Frescas', description: 'Perfectas para tu receta favorita', price: 12990, image: 'images/albondigas.jpg' },
        { id: 30, name: 'Chorizo Premium', description: 'Calidad superior', price: 13990, image: 'images/chorizo.jpg' }
    ]
};

// Estado del carrito
let cart = [];

// Elementos del DOM
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCart');
const orderModal = document.getElementById('orderModal');
const closeOrderBtn = document.getElementById('closeOrder');
const closeOrderBtnSecondary = document.getElementById('closeOrderBtn');
const generateOrderBtn = document.getElementById('generateOrderBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const printBtn = document.getElementById('printBtn');
const downloadBtn = document.getElementById('downloadBtn');
const cartCount = document.getElementById('cartCount');
const navLinks = document.querySelectorAll('.nav-link');
const productsGrid = document.getElementById('productsGrid');
const categoryTitle = document.getElementById('categoryTitle');
const homeSection = document.getElementById('homeSection');
const productsSection = document.getElementById('productsSection');
const logoLink = document.getElementById('logoLink');
const featuredGrid = document.getElementById('featuredGrid');

// =============================
// Menu hamburguesa
// =============================
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}

// Funciones de Navegación
function showCategory(category) {
    if (category === 'home') {
        homeSection.classList.add('active');
        productsSection.classList.remove('active');
        updateActiveNavLink('home');
        renderFeaturedProducts();
    } else if (products[category]) {
        homeSection.classList.remove('active');
        productsSection.classList.add('active');
        updateActiveNavLink(category);
        renderProducts(category);
    }
}

function renderFeaturedProducts() {
    // Selecciona un producto de cada categoría
    const featured = [
        products.vacuno[1],      // Filete de Res
        products.ave[0],         // Pechuga de Pollo
        products.cerdo[4],       // Lomo de Cerdo
        products.mariscos[1],    // Filete de Salmón
        products.vacuno[5],      // Solomillo Premium
        products.cerdo[2]        // Jamón Fresco
    ];

    if(!featuredGrid) return;
    featuredGrid.innerHTML = '';

    featured.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'featured-product-card';
        productCard.innerHTML = `
            <div class="featured-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="featured-product-info">
                <h3 class="featured-product-name">${product.name}</h3>
                <p class="featured-product-description">${product.description}</p>
                <div class="featured-product-footer">
                    <span class="featured-product-price">${formatCLP(product.price)}</span>
                    <button class="featured-add-btn add-to-cart-btn" 
                        data-id="${product.id}">
                        Agregar
                    </button>
                </div>
            </div>
        `;
        featuredGrid.appendChild(productCard);
    });
}

function updateActiveNavLink(category) {
    navLinks.forEach(link => {
        if (link.dataset.category === category) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function renderProducts(category) {
    const categoryProducts = products[category];
    const categoryNames = {
        vacuno: 'Productos de Vacuno',
        ave: 'Productos de Ave',
        cerdo: 'Productos de Cerdo',
        mariscos: 'Productos de Mariscos',
        miscelaneos: 'Productos Misceláneos'
    };
    
    categoryTitle.textContent = categoryNames[category] || 'Selecciona una categoría';
    productsGrid.innerHTML = '';

    categoryProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>

                <div class="product-footer">
                    <span class="product-price">${formatCLP(product.price)}</span>

                    <!-- botón SIN onclick -->
                    <button 
                        class="add-to-cart-btn"
                        data-id="${product.id}">
                        Agregar
                    </button>

                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Funciones del Carrito
function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${productName} agregado al carrito`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    updateCartCount();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span class="empty-cart-icon">🛒</span>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        generateOrderBtn.disabled = true;
        document.getElementById('subtotal').textContent = formatCLP(0);
        document.getElementById('total').textContent = formatCLP(0);
        return;
    }

    generateOrderBtn.disabled = false;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${formatCLP(item.price)} c/u</div>
            </div>
            <div class="item-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <span class="item-subtotal">${formatCLP(item.price * item.quantity)}</span>
                <button class="remove-btn" data-id="${item.id}">Eliminar</button>
            </div>
        </div>
    `).join('');

    updateCartTotal();
}

function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = formatCLP(subtotal);
    document.getElementById('total').textContent = formatCLP(subtotal);
}

function clearCart() {
    if (confirm('¿Deseas eliminar todos los artículos del carrito?')) {
        cart = [];
        updateCartUI();
        updateCartCount();
    }
}

// Funciones de Pedido
function generateOrder() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const orderDate = new Date();
    const orderNumber = 'PED-' + Date.now();
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderHTML = `
        <div class="order-header">
            <h3>Pedido Generado Exitosamente</h3>
            <div class="order-date">
                Número de Pedido: <strong>${orderNumber}</strong><br>
                Fecha: ${orderDate.toLocaleDateString('es-ES')} - ${orderDate.toLocaleTimeString('es-ES')}
            </div>
        </div>
        <div class="order-items">
            ${cart.map((item, index) => `
                <div class="order-item">
                    <div>
                        <div class="order-item-name">${index + 1}. ${item.name}</div>
                        <div class="order-item-details">Cantidad: ${item.quantity} | Precio unitario: ${formatCLP(item.price)}</div>
                    </div>
                    <div class="order-item-details"><strong>${formatCLP(item.price * item.quantity)}</strong></div>
                </div>
            `).join('')}
        </div>
        <div class="order-total-section">
            <div class="order-total">
                <span>TOTAL A PAGAR:</span>
                <span>${formatCLP(totalAmount)}</span>
            </div>
        </div>
    `;

    document.getElementById('orderContent').innerHTML = orderHTML;
    
    // Guardar datos para impresión/descarga
    window.currentOrder = {
        number: orderNumber,
        date: orderDate,
        items: [...cart],
        total: totalAmount
    };

    cartModal.classList.remove('active');
    orderModal.classList.add('active');
}

function printOrder() {
    const printWindow = window.open('', '', 'width=800,height=600');
    const orderDate = window.currentOrder.date;
    
    let itemsHTML = '';
    window.currentOrder.items.forEach((item, index) => {
        itemsHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td style="text-align: center;">${item.quantity}</td>
                <td style="text-align: right;">${formatCLP(item.price)}</td>
                <td style="text-align: right;">${formatCLP(item.price * item.quantity)}</td>
            </tr>
        `;
    });

    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Pedido - ${window.currentOrder.number}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: white;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #DC143C;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                }
                .header h1 {
                    color: #DC143C;
                    margin: 0;
                }
                .order-info {
                    margin-bottom: 20px;
                    background-color: #F5F5F5;
                    padding: 15px;
                    border-radius: 8px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th {
                    background-color: #DC143C;
                    color: white;
                    padding: 12px;
                    text-align: left;
                }
                td {
                    padding: 10px 12px;
                    border-bottom: 1px solid #E0E0E0;
                }
                .total-section {
                    text-align: right;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 2px solid #DC143C;
                }
                .total {
                    font-size: 18px;
                    font-weight: bold;
                    color: #DC143C;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    color: #666;
                    font-size: 12px;
                    border-top: 1px solid #E0E0E0;
                    padding-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🥩 CARNICERÍA PREMIUM</h1>
                <p>Pedido de Compra</p>
            </div>
            <div class="order-info">
                <strong>Número de Pedido:</strong> ${window.currentOrder.number}<br>
                <strong>Fecha:</strong> ${orderDate.toLocaleDateString('es-ES')} ${orderDate.toLocaleTimeString('es-ES')}<br>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th style="text-align: center;">Cantidad</th>
                        <th style="text-align: right;">Precio Unitario</th>
                        <th style="text-align: right;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
            <div class="total-section">
                <div class="total">
                    TOTAL A PAGAR: ${formatCLP(window.currentOrder.total)}
                </div>
            </div>
            <div class="footer">
                <p>Gracias por su compra en Carnicería Premium</p>
                <p>Teléfono: +1 (555) 123-4567 | Email: info@carniceriapremium.com</p>
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

function downloadOrderPDF() {
    // Simulación de descarga (en un proyecto real, usarías una librería como jsPDF)
    const orderData = window.currentOrder;
    const csvContent = [
        ['CARNICERÍA PREMIUM - PEDIDO'],
        [''],
        ['Número de Pedido', orderData.number],
        ['Fecha', orderData.date.toLocaleDateString('es-ES')],
        ['Hora', orderData.date.toLocaleTimeString('es-ES')],
        [''],
        ['ARTÍCULOS'],
        ['Producto', 'Cantidad', 'Precio Unitario', 'Subtotal']
    ];

    orderData.items.forEach(item => {
        csvContent.push([
            item.name,
            item.quantity,
            `${formatCLP(item.price)}`,
            `${formatCLP(item.price * item.quantity)}`
        ]);
    });

    csvContent.push(['']);
    csvContent.push(['TOTAL', '', '', formatCLP(orderData.total)]);

    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Pedido_${orderData.number}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Pedido descargado exitosamente');
}

// Notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar estilos para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =============================
// Event Listeners
// =============================

// Abrir carrito
if (cartBtn && cartModal) {
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        updateCartUI();
    });
}

// Cerrar carrito
if (closeCartBtn && cartModal) {
    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
}

// Cerrar orden (botón principal)
if (closeOrderBtn && orderModal) {
    closeOrderBtn.addEventListener('click', () => {
        orderModal.classList.remove('active');
    });
}

// Cerrar orden secundario + limpiar carrito
if (closeOrderBtnSecondary && orderModal) {
    closeOrderBtnSecondary.addEventListener('click', () => {
        orderModal.classList.remove('active');
        cart = [];
        updateCartUI();
        updateCartCount();
    });
}

// Generar orden
if (generateOrderBtn) {
    generateOrderBtn.addEventListener('click', generateOrder);
}

// Limpiar carrito
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
}

// Imprimir
if (printBtn) {
    printBtn.addEventListener('click', printOrder);
}

// Descargar PDF
if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadOrderPDF);
}


// =============================
// Navegación por categorías
// =============================
if (navLinks && navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const category = link.dataset.category;
            showCategory(category);

            // 🔥 cerrar menú hamburguesa en celular
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('active');
        });
    });
}


// =============================
// Logo → Home
// =============================
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        showCategory('home');

        const menu = document.getElementById('menu');
        if (menu) menu.classList.remove('active');
    });
}


// =============================
// Cerrar modal al hacer clic fuera
// =============================
window.addEventListener('click', (event) => {

    if (cartModal && event.target === cartModal) {
        cartModal.classList.remove('active');
    }

    if (orderModal && event.target === orderModal) {
        orderModal.classList.remove('active');
    }

});

// ============ Carrusel de Imágenes ============
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const carouselInner = carousel ? carousel.querySelector('.carousel-inner') : null;
const slides = carouselInner ? carouselInner.querySelectorAll('.carousel-item') : [];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Asegurar que el índice esté dentro del rango
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Remover clase active de todas las slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Agregar clase active a la slide actual
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners para controles del carrusel
if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

// Event listeners para indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play del carrusel
let carouselInterval = setInterval(nextSlide, 5000);

// Pausar auto-play al hacer hover
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
}

// =============================
// arreglo
// =============================
document.addEventListener('click', function(e){

    if(e.target.classList.contains('add-to-cart-btn')){

        const id = parseInt(e.target.dataset.id);

        const product = Object
            .values(products)
            .flat()
            .find(p => p.id === id);

        if(product){
            addToCart(product.id, product.name, product.price);
        }
    }

});
});
function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) menu.classList.toggle('active');
}
