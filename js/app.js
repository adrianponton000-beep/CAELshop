/* ==========================================
   CAEL APP
========================================== */


/* ==========================================
   LOADING SCREEN
========================================== */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            const loader =
            document.getElementById(
                "loading-screen"
            );

            if(loader){

                loader.classList.add(
                    "hidden"
                );

            }

        },2500);

    }
);


/* ==========================================
   NAVBAR SCROLL
========================================== */

function setupNavbar(){

    const navbar =
    document.getElementById(
        "navbar"
    );

    if(!navbar) return;

    window.addEventListener(
        "scroll",
        () => {

            if(window.scrollY > 40){

                navbar.classList.add(
                    "scrolled"
                );

            }else{

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }
    );

}


/* ==========================================
   MOBILE MENU
========================================== */

function setupMobileMenu(){

    const button =
    document.getElementById(
        "mobile-toggle"
    );

    const menu =
    document.getElementById(
        "mobile-menu"
    );

    if(!button || !menu) return;

    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "active"
            );

        }
    );

}


/* ==========================================
   HERO DATA
========================================== */

async function loadHero(){

    const hero =
    await getHero();

    if(!hero) return;

    const title =
    document.getElementById(
        "hero-title"
    );

    const subtitle =
    document.getElementById(
        "hero-subtitle"
    );

    const image =
    document.getElementById(
        "hero-image"
    );

    const button =
    document.getElementById(
        "hero-button"
    );

    if(title){

        title.textContent =
        hero.title || "";

    }

    if(subtitle){

        subtitle.textContent =
        hero.subtitle || "";

    }

    if(image){

        image.src =
        hero.image_url;

    }

    if(button){

        button.textContent =
        hero.button_text;

        button.href =
        hero.button_link;

    }

}


/* ==========================================
   SETTINGS
========================================== */

async function loadSettings(){

    const settings =
    await getSettings();

    if(!settings) return;

    const logos =
    document.querySelectorAll(
        "#brand-logo"
    );

    logos.forEach(logo => {

        logo.src =
        settings.logo_url;

    });

    const footer =
    document.getElementById(
        "footer-text"
    );

    const newsletter =
    document.getElementById(
        "newsletter-text"
    );

    if(footer){

        footer.textContent =
        settings.footer_text;

    }

    if(newsletter){

        newsletter.textContent =
        settings.newsletter_text;

    }

    document.title =
    settings.brand_name +
    " — Technology Driven Menswear";

}


/* ==========================================
   FEATURED PRODUCTS
========================================== */

async function loadFeaturedProducts(){

    const grid =
    document.getElementById(
        "featured-products-grid"
    );

    if(!grid) return;

    const products =
    await getFeaturedProducts();

    grid.innerHTML = "";

    if(products.length === 0){

        grid.innerHTML = `

        <p
        style="
        color:#888;
        ">
            No products available.
        </p>

        `;

        return;

    }

    products.forEach(product => {

        grid.innerHTML += `

        <article class="product-card">

            <a
            href="product.html?id=${product.id}">

                <img
                src="${product.image_url}"
                alt="${product.name}">

                <div
                class="product-card-content">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.category}
                    </p>

                    <div
                    class="product-price">

                        $${Number(
                            product.price
                        ).toFixed(2)}

                    </div>

                </div>

            </a>

        </article>

        `;

    });

}


/* ==========================================
   LOCAL CART
========================================== */

function getCart(){

    return JSON.parse(

        localStorage.getItem(
            "cael_cart"
        )

    ) || [];

}


function saveCart(cart){

    localStorage.setItem(

        "cael_cart",

        JSON.stringify(cart)

    );

}


function addToCart(product){

    const cart =
    getCart();

    const existingItem =
    cart.find(

        item =>
        item.id === product.id

    );

    if(existingItem){

        existingItem.quantity += 1;

    }else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    saveCart(cart);

    updateCartCount();

}


function removeFromCart(id){

    const cart =
    getCart().filter(

        item =>
        item.id !== id

    );

    saveCart(cart);

    updateCartCount();

}


function updateCartCount(){

    const cart =
    getCart();

    const totalItems =
    cart.reduce(

        (
            total,
            item
        ) =>

        total + item.quantity,

        0

    );

    const counter =
    document.getElementById(
        "cart-count"
    );

    if(counter){

        counter.textContent =
        totalItems;

    }

}


/* ==========================================
   PRODUCT PAGE
========================================== */

async function loadProductPage(){

    const container =
    document.getElementById(
        "product-page"
    );

    if(!container) return;

    const params =
    new URLSearchParams(
        window.location.search
    );

    const id =
    params.get("id");

    if(!id) return;

    const product =
    await getProductById(id);

    if(!product){

        container.innerHTML = `

        <h2>
            Product Not Found
        </h2>

        `;

        return;

    }

    container.innerHTML = `

    <div class="product-layout">

        <div class="product-gallery">

            <img
            src="${product.image_url}"
            alt="${product.name}">

        </div>

        <div class="product-info">

            <span>
                ${product.category}
            </span>

            <h1>
                ${product.name}
            </h1>

            <p>
                ${product.description}
            </p>

            <div
            class="product-price">

                $${Number(
                    product.price
                ).toFixed(2)}

            </div>

            <button
            class="btn-primary"
            id="add-product-btn">

                Add To Cart

            </button>

        </div>

    </div>

    `;

    const button =
    document.getElementById(
        "add-product-btn"
    );

    button.addEventListener(
        "click",
        () => {

            addToCart(product);

        }
    );

}


/* ==========================================
   REVEAL ANIMATION
========================================== */

function setupReveal(){

    const elements =
    document.querySelectorAll(

        ".section-header, .product-card, .collection-editorial"

    );

    const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if(
                        entry.isIntersecting
                    ){

                        entry.target.classList.add(
                            "revealed"
                        );

                    }

                }
            );

        },

        {
            threshold:.15
        }

    );

    elements.forEach(
        element =>
        observer.observe(
            element
        )
    );

}


/* ==========================================
   NEWSLETTER DEMO
========================================== */

function setupNewsletter(){

    const form =
    document.querySelector(
        ".newsletter-form"
    );

    if(!form) return;

    form.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            alert(

                "Subscription registered."

            );

            form.reset();

        }
    );

}


/* ==========================================
   INIT
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        setupNavbar();

        setupMobileMenu();

        setupNewsletter();

        updateCartCount();

        await loadSettings();

        await loadHero();

        await loadFeaturedProducts();

        await loadProductPage();

        setupReveal();

    }

);
