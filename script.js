// Products Database
const products = [
    { 
        id: 1, 
        name: 'Base Matte ', 
        price: 89.90, 
        category: 'rosto', 
        image: 'img/Base.jpg',
        description: 'Base de alta cobertura com acabamento matte duradouro' 
    },
    { 
        id: 2, 
        name: 'Paleta de Sombras Rose', 
        price: 129.90, 
        category: 'olhos', 
        image: 'img/Paletra de sombra Rosa.jpg',
        description: 'Paleta com 12 tons rosados e neutros incríveis' 
    },
    { 
        id: 3, 
        name: 'Batom Líquido Vermelho', 
        price: 45.90, 
        category: 'labios', 
        image: 'img/Batom Líquido Vermelho.jpg',
        description: 'Batom líquido de longa duração e alta pigmentação' 
    },
    { 
        id: 4, 
        name: 'Pó Compacto Translúcido', 
        price: 69.90, 
        category: 'rosto', 
        image: 'img/Pó Compacto Translúcido.jpg',
        description: 'Pó translúcido para selar a maquiagem' 
    },
    { 
        id: 5, 
        name: 'Máscara de Cílios Volume', 
        price: 54.90, 
        category: 'olhos', 
        image: 'img/Máscara de Cílios Volume.jpg',
        description: 'Máscara para volume e curvatura extrema' 
    },
    { 
        id: 6, 
        name: 'Primer Facial', 
        price: 79.90, 
        category: 'skincare', 
        image: 'img/Primer Facial.jpg',
        description: 'Primer iluminador para preparar a pele' 
    },
    { 
        id: 7, 
        name: 'Delineador Preto', 
        price: 39.90, 
        category: 'olhos', 
        image: 'img/Delineador Preto.jpg',
        description: 'Delineador à prova d\'água de longa duração' 
    },
    { 
        id: 8, 
        name: 'Gloss Labial Nude', 
        price: 35.90, 
        category: 'labios', 
        image: 'img/Gloss Labial Nude.jpg',
        description: 'Gloss com brilho intenso e hidratação' 
    },
    { 
        id: 9, 
        name: 'Blush Rosa Natural', 
        price: 59.90, 
        category: 'rosto', 
        image: 'img/Blush Rosa Natural.jpg',
        description: 'Blush com pigmentação natural e duradoura' 
    },
    { 
        id: 10, 
        name: 'Sérum Facial', 
        price: 149.90, 
        category: 'skincare', 
        image: 'img/Sérum Facial.jpg',
        description: 'Sérum hidratante e iluminador para pele perfeita' 
    },
    { 
        id: 11, 
        name: 'Corretivo Alta Cobertura', 
        price: 64.90, 
        category: 'rosto', 
        image: 'img/Corretivo Alta Cobertura.jpg',
        description: 'Corretivo para olheiras e imperfeições' 
    },
    { 
        id: 12, 
        name: 'Lápis de Sobrancelha', 
        price: 29.90, 
        category: 'olhos', 
        image: 'img/Lápis de Sobrancelha.jpg',
        description: 'Lápis para definir e preencher sobrancelhas' 
    },
];

let cart = [];
let currentFilter = 'todos';
let searchTerm = '';

// Initialize
function init() {
    renderProducts();
    updateCart();
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    let filtered = currentFilter === 'todos' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #6b7280;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Nenhum produto encontrado</h3>
                <p>Tente buscar por outro termo</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">R$ ${product.price.toFixed(2)}</div>
            <button class="btn-add" onclick="addToCart(${product.id})">
                Adicionar ao Carrinho
            </button>
        </div>
    `).join('');
}

// Toggle Search
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    
    searchBar.classList.toggle('active');
    
    if (searchBar.classList.contains('active')) {
        setTimeout(() => searchInput.focus(), 300);
    } else {
        searchInput.value = '';
        searchTerm = '';
        renderProducts();
    }
}

// Search Products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    searchTerm = searchInput.value;
    renderProducts();
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    renderProducts();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    showNotification('✅ Produto adicionado ao carrinho!');
}

// Update Cart
function updateCart() {
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length > 0) {
        cartBadge.style.display = 'flex';
        cartBadge.textContent = cart.length;
    } else {
        cartBadge.style.display = 'none';
    }

    if (cart.length === 0) {
        cartContent.innerHTML = '<div class="cart-empty">Carrinho vazio 🛒</div>';
        cartFooter.style.display = 'none';
    } else {
        cartContent.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div>
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
        cartFooter.style.display = 'block';
    }
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('❌ Item removido do carrinho');
}

// Toggle Menu (Esquerdo)
function toggleMenu() {
    const menuSidebar = document.getElementById('menuSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    menuSidebar.classList.toggle('active');
    
    if (menuSidebar.classList.contains('active')) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// Toggle Cart (Direito)
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    const menuSidebar = document.getElementById('menuSidebar');
    
    // Fechar menu se estiver aberto
    menuSidebar.classList.remove('active');
    
    cartSidebar.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Scroll to Products
function scrollToProducts() {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}

// Open Checkout Modal
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('❌ Seu carrinho está vazio!');
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('active');
    updateOrderSummary();
}

// Close Checkout Modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}

// Toggle Address Fields
function toggleAddressFields() {
    const deliveryType = document.getElementById('deliveryType').value;
    const addressFields = document.getElementById('addressFields');
    const street = document.getElementById('street');
    const number = document.getElementById('number');
    const neighborhood = document.getElementById('neighborhood');
    const city = document.getElementById('city');
    const cep = document.getElementById('cep');
    const cpf = document.getElementById('cpf');
    
    if (deliveryType === 'correios' || deliveryType === 'entrega') {
        addressFields.style.display = 'block';
        street.required = true;
        number.required = true;
        neighborhood.required = true;
        city.required = true;
        cep.required = true;
        cpf.required = true;
    } else {
        addressFields.style.display = 'none';
        street.required = false;
        number.required = false;
        neighborhood.required = false;
        city.required = false;
        cep.required = false;
        cpf.required = false;
    }
    
    updateOrderSummary();
}

// Update Order Summary
function updateOrderSummary() {
    const summaryDiv = document.getElementById('orderSummary');
    const deliveryType = document.getElementById('deliveryType').value;
    
    let deliveryFee = 0;
    let deliveryText = '';
    
    if (deliveryType === 'retirada') {
        deliveryFee = 0;
        deliveryText = 'Retirada na Loja (Grátis)';
    } else if (deliveryType === 'correios') {
        deliveryFee = 15.00;
        deliveryText = 'Correios';
    } else if (deliveryType === 'entrega') {
        deliveryFee = 25.00;
        deliveryText = 'Entrega Expressa';
    }
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + deliveryFee;
    
    summaryDiv.innerHTML = cart.map(item => `
        <div class="summary-line">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <img src="${item.image}" alt="${item.name}" style="width: 30px; height: 30px; border-radius: 5px; object-fit: cover;">
                <span>${item.name}</span>
            </div>
            <span>R$ ${item.price.toFixed(2)}</span>
        </div>
    `).join('') + `
        <div class="summary-line" style="font-weight: 700; margin-top: 0.5rem;">
            <span>Subtotal</span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        </div>
        ${deliveryType ? `
            <div class="summary-line">
                <span>${deliveryText}</span>
                <span>${deliveryFee > 0 ? 'R$ ' + deliveryFee.toFixed(2) : 'Grátis'}</span>
            </div>
        ` : ''}
    `;
    
    document.getElementById('finalTotal').textContent = `R$ ${total.toFixed(2)}`;
}

// Submit Order
function submitOrder() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const deliveryType = document.getElementById('deliveryType').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const observations = document.getElementById('observations').value;
    
    // Validação básica
    if (!customerName || !customerPhone || !deliveryType || !paymentMethod) {
        showNotification('❌ Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    // Se for correios ou entrega, validar endereço
    if (deliveryType === 'correios' || deliveryType === 'entrega') {
        const street = document.getElementById('street').value;
        const number = document.getElementById('number').value;
        const neighborhood = document.getElementById('neighborhood').value;
        const city = document.getElementById('city').value;
        const cep = document.getElementById('cep').value;
        const cpf = document.getElementById('cpf').value;
        
        if (!street || !number || !neighborhood || !city || !cep || !cpf) {
            showNotification('❌ Por favor, preencha todos os dados de endereço!');
            return;
        }
    }
    
    // Calcular total
    let deliveryFee = 0;
    if (deliveryType === 'correios') deliveryFee = 15.00;
    if (deliveryType === 'entrega') deliveryFee = 25.00;
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + deliveryFee;
    
    // Simular processamento
    const checkoutContent = document.getElementById('checkoutContent');
    checkoutContent.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
            <div style="font-size: 5rem; margin-bottom: 1.5rem; animation: bounce 1.5s ease infinite;">🎉</div>
            <h2 style="color: #10b981; font-size: 2rem; font-weight: 800; margin-bottom: 1rem; font-family: 'Pacifico', cursive;">Pedido Confirmado!</h2>
            <p style="color: #6b7280; font-size: 1.1rem; margin-bottom: 1.5rem;">
                Obrigada por comprar na Rosas Maquiagem, <strong>${customerName}</strong>! 💖
            </p>
            <div style="background: linear-gradient(135deg, #ffeef8, #ffd1e0); padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
                <p style="margin-bottom: 0.5rem;"><strong>💰 Total:</strong> R$ ${total.toFixed(2)}</p>
                <p style="margin-bottom: 0.5rem;"><strong>📱 Telefone:</strong> ${customerPhone}</p>
                <p style="margin-bottom: 0.5rem;"><strong>🚚 Entrega:</strong> ${getDeliveryTypeName(deliveryType)}</p>
                <p><strong>💳 Pagamento:</strong> ${getPaymentMethodName(paymentMethod)}</p>
            </div>
            <p style="font-size: 1rem; color: #6b7280; margin-bottom: 2rem;">
                Você receberá uma confirmação no telefone informado em breve!
            </p>
            <button class="btn-primary" style="width: 100%;" onclick="finishOrder()">
                Fechar ✨
            </button>
        </div>
    `;
    
    // Limpar carrinho
    cart = [];
    updateCart();
}

// Get Delivery Type Name
function getDeliveryTypeName(type) {
    const types = {
        'retirada': '🏪 Retirada na Loja',
        'correios': '📦 Correios',
        'entrega': '🚚 Entrega Expressa'
    };
    return types[type] || type;
}

// Get Payment Method Name
function getPaymentMethodName(method) {
    const methods = {
        'debito': '💳 Cartão de Débito',
        'credito': '💳 Cartão de Crédito',
        'pix': '📱 PIX'
    };
    return methods[method] || method;
}

// Finish Order
function finishOrder() {
    closeCheckoutModal();
    showNotification('✅ Obrigada pela preferência! 💖');
}

// Finalize Purchase (antiga função - mantida para compatibilidade)
function finalizePurchase() {
    openCheckoutModal();
}

// Smooth Scroll for menu links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Close overlays when clicking outside
document.getElementById('cartOverlay').addEventListener('click', function() {
    const menuSidebar = document.getElementById('menuSidebar');
    const cartSidebar = document.getElementById('cartSidebar');
    
    menuSidebar.classList.remove('active');
    cartSidebar.classList.remove('active');
    this.classList.remove('active');
});

// Initialize App
init();