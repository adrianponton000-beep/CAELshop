/* ==========================================
   CAEL — SUPABASE CONFIG
========================================== */

const SUPABASE_URL = "https://eecydiklyryzffenmpwn.supabase.co";
const SUPABASE_KEY = "sb_publishable_EL8uCS_WsTmOMRnJUyRtag_365G4ez9";

window.client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});


/* ==========================================
   HERO
========================================== */

async function getHero() {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("hero")
        .select("*")
        .limit(1)
        .single();

        if (error) throw error;

        return data;

    } catch (error) {

        console.error(
            "Hero Error:",
            error
        );

        return null;

    }

}


/* ==========================================
   SETTINGS
========================================== */

async function getSettings() {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("settings")
        .select("*")
        .limit(1)
        .single();

        if (error) throw error;

        return data;

    } catch (error) {

        console.error(
            "Settings Error:",
            error
        );

        return null;

    }

}


/* ==========================================
   PRODUCTS
========================================== */

async function getProducts() {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("products")
        .select("*")
        .order(
            "created_at",
            {
                ascending:false
            }
        );

        if(error) throw error;

        return data || [];

    } catch(error) {

        console.error(
            "Products Error:",
            error
        );

        return [];

    }

}


async function getFeaturedProducts() {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("products")
        .select("*")
        .eq(
            "featured",
            true
        )
        .limit(8);

        if(error) throw error;

        return data || [];

    } catch(error) {

        console.error(
            "Featured Products Error:",
            error
        );

        return [];

    }

}


async function getProductById(id) {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("products")
        .select("*")
        .eq(
            "id",
            id
        )
        .single();

        if(error) throw error;

        return data;

    } catch(error) {

        console.error(
            "Product Error:",
            error
        );

        return null;

    }

}


/* ==========================================
   COLLECTIONS
========================================== */

async function getCollections() {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("collections")
        .select("*")
        .order(
            "created_at",
            {
                ascending:false
            }
        );

        if(error) throw error;

        return data || [];

    } catch(error) {

        console.error(
            "Collections Error:",
            error
        );

        return [];

    }

}


async function getFeaturedCollections() {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("collections")
        .select("*")
        .eq(
            "featured",
            true
        );

        if(error) throw error;

        return data || [];

    } catch(error) {

        console.error(
            "Featured Collections Error:",
            error
        );

        return [];

    }

}


/* ==========================================
   AUTH
========================================== */

async function signIn(
    email,
    password
) {

    try {

        const {
            data,
            error
        } = await supabaseClient.auth.signInWithPassword({

            email,
            password

        });

        if(error) throw error;

        return data;

    } catch(error) {

        console.error(
            "Login Error:",
            error
        );

        throw error;

    }

}


async function signOut() {

    try {

        await supabaseClient.auth.signOut();

    } catch(error) {

        console.error(
            error
        );

    }

}


async function getCurrentUser() {

    try {

        const {
            data
        } = await supabaseClient.auth.getUser();

        return data.user;

    } catch(error) {

        console.error(
            error
        );

        return null;

    }

}


async function requireAuth() {

    const user =
    await getCurrentUser();

    if(!user){

        window.location.href =
        "/archive/login.html";

        return null;

    }

    return user;

}


/* ==========================================
   ADMIN HERO
========================================== */

async function updateHero(heroData) {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("hero")
        .update(heroData)
        .eq("id",1);

        if(error) throw error;

        return data;

    } catch(error) {

        console.error(
            error
        );

        throw error;

    }

}


/* ==========================================
   ADMIN PRODUCTS
========================================== */

async function createProduct(product) {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("products")
        .insert(product);

        if(error) throw error;

        return data;

    } catch(error) {

        console.error(
            error
        );

        throw error;

    }

}


async function updateProduct(
    id,
    product
) {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("products")
        .update(product)
        .eq(
            "id",
            id
        );

        if(error) throw error;

        return data;

    } catch(error) {

        console.error(
            error
        );

        throw error;

    }

}


async function deleteProduct(id) {

    try {

        const {
            error
        } = await supabaseClient
        .from("products")
        .delete()
        .eq(
            "id",
            id
        );

        if(error) throw error;

        return true;

    } catch(error) {

        console.error(
            error
        );

        return false;

    }

}


/* ==========================================
   ADMIN COLLECTIONS
========================================== */

async function createCollection(collection) {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("collections")
        .insert(collection);

        if(error) throw error;

        return data;

    } catch(error) {

        console.error(
            error
        );

        throw error;

    }

}


async function updateCollection(
    id,
    collection
) {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("collections")
        .update(collection)
        .eq(
            "id",
            id
        );

        if(error) throw error;

        return data;

    } catch(error) {

        console.error(
            error
        );

        throw error;

    }

}


async function deleteCollection(id) {

    try {

        const {
            error
        } = await supabaseClient
        .from("collections")
        .delete()
        .eq(
            "id",
            id
        );

        if(error) throw error;

        return true;

    } catch(error) {

        console.error(
            error
        );

        return false;

    }

}


/* ==========================================
   SETTINGS UPDATE
========================================== */

async function updateSettings(
    settings
) {

    try {

        const {
            data,
            error
        } = await supabaseClient
        .from("settings")
        .update(settings)
        .eq(
            "id",
            1
        );

        if(error) throw error;

        return data;

    } catch(error) {

        console.error(
            error
        );

        throw error;

    }

}
