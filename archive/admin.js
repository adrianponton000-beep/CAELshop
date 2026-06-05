const SUPABASE_URL = "https://eecydiklyryzffenmpwn.supabase.co";
const SUPABASE_KEY = "sb_publishable_EL8uCS_WsTmOMRnJUyRtag_365G4ez9";

const client = window.client;

const ALLOWED_EMAIL = "adrianponton000@gmail.com";

/* ==========================
AUTH GUARD
========================== */

async function checkAuth() {

    const { data } = await client.auth.getUser();

    const user = data?.user;

    if (!user) {

        showLogin();
        return;

    }

    if (user.email !== ALLOWED_EMAIL) {

        await client.auth.signOut();

        alert("Access denied");

        showLogin();

        return;

    }

    showApp();

}

/* ==========================
UI SWITCH
========================== */

function showLogin() {

    document.getElementById("login-screen").classList.remove("hidden");
    document.getElementById("admin-app").classList.add("hidden");

}

function showApp() {

    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("admin-app").classList.remove("hidden");

    loadAll();

}

/* ==========================
LOGIN
========================== */

document.getElementById("login-btn").addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await client.auth.signInWithPassword({
        email,
        password
    });

    if (error) {

        alert(error.message);
        return;

    }

    checkAuth();

});

/* ==========================
LOGOUT
========================== */

document.getElementById("logout-btn").addEventListener("click", async () => {

    await client.auth.signOut();
    showLogin();

});

/* ==========================
NAVIGATION
========================== */

document.querySelectorAll("[data-section]").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));

        document.getElementById(btn.dataset.section).classList.add("active");

    });

});

/* ==========================
HERO
========================== */

async function loadHero() {

    const { data } = await client
        .from("hero")
        .select("*")
        .limit(1)
        .single();

    if (!data) return;

    document.getElementById("hero-title").value = data.title || "";
    document.getElementById("hero-subtitle").value = data.subtitle || "";
    document.getElementById("hero-image").value = data.image_url || "";
    document.getElementById("hero-button").value = data.button_text || "";
    document.getElementById("hero-link").value = data.button_link || "";

}

document.getElementById("hero-form").addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {

        title: document.getElementById("hero-title").value,
        subtitle: document.getElementById("hero-subtitle").value,
        image_url: document.getElementById("hero-image").value,
        button_text: document.getElementById("hero-button").value,
        button_link: document.getElementById("hero-link").value

    };

    await client.from("hero").upsert(payload);

    alert("Hero saved");

});

/* ==========================
COLLECTIONS
========================== */

async function loadCollections() {

    const { data } = await client
        .from("collections")
        .select("*");

    const list = document.getElementById("collections-list");

    const select = document.getElementById("product-collection");

    list.innerHTML = "";
    select.innerHTML = "";

    data.forEach(col => {

        list.innerHTML += `
        <div class="data-item">

            <h4>${col.name}</h4>
            <p>${col.description || ""}</p>

        </div>
        `;

        select.innerHTML += `
            <option value="${col.id}">
                ${col.name}
            </option>
        `;

    });

}

document.getElementById("collection-form").addEventListener("submit", async (e) => {

    e.preventDefault();

    await client.from("collections").insert([{

        name: document.getElementById("collection-name").value,
        banner_url: document.getElementById("collection-banner").value,
        description: document.getElementById("collection-description").value

    }]);

    loadCollections();

});

/* ==========================
PRODUCTS
========================== */

async function loadProducts() {

    const { data } = await client
        .from("products")
        .select("*");

    const list = document.getElementById("products-list");

    list.innerHTML = "";

    data.forEach(p => {

        list.innerHTML += `
        <div class="data-item">

            <h4>${p.name}</h4>
            <p>${p.category} - $${p.price}</p>

        </div>
        `;

    });

}

document.getElementById("product-form").addEventListener("submit", async (e) => {

    e.preventDefault();

    await client.from("products").insert([{

        name: document.getElementById("product-name").value,
        price: document.getElementById("product-price").value,
        category: document.getElementById("product-category").value,
        image_url: document.getElementById("product-image").value,
        description: document.getElementById("product-description").value,
        collection_id: document.getElementById("product-collection").value

    }]);

    loadProducts();

});

/* ==========================
SETTINGS
========================== */

async function loadSettings() {

    const { data } = await client
        .from("settings")
        .select("*")
        .limit(1)
        .single();

    if (!data) return;

    document.getElementById("brand-name").value = data.brand_name || "";
    document.getElementById("logo-url").value = data.logo_url || "";
    document.getElementById("footer-text").value = data.footer_text || "";
    document.getElementById("newsletter-text").value = data.newsletter_text || "";

}

document.getElementById("settings-form").addEventListener("submit", async (e) => {

    e.preventDefault();

    await client.from("settings").upsert({

        id: 1,
        brand_name: document.getElementById("brand-name").value,
        logo_url: document.getElementById("logo-url").value,
        footer_text: document.getElementById("footer-text").value,
        newsletter_text: document.getElementById("newsletter-text").value

    });

    alert("Settings saved");

});

/* ==========================
LOAD ALL
========================== */

async function loadAll() {

    await loadHero();
    await loadCollections();
    await loadProducts();
    await loadSettings();

}

/* ==========================
INIT
========================== */

document.addEventListener("DOMContentLoaded", () => {

    checkAuth();

});
