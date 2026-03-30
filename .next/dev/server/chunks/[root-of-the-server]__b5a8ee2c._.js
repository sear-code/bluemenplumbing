module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://elqkduzhcjsgsoksastu.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscWtkdXpoY2pzZ3Nva3Nhc3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzUwMjcsImV4cCI6MjA4MzM1MTAyN30.c7p4OIcerriPBg7Ca0LUOzuvLHwV9D4OuGEi5vbmw9c");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/src/lib/constants.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COMPANY",
    ()=>COMPANY,
    "EMERGENCY_FEE",
    ()=>EMERGENCY_FEE,
    "SERVICE_SLUGS",
    ()=>SERVICE_SLUGS
]);
const COMPANY = {
    name: 'Blue Men Plumbing',
    phone: '+16475007989',
    phoneFormatted: '647-500-7989',
    email: 'info@bluemenplumbing.com',
    address: {
        street: '65 Canadian Rd',
        city: 'Scarborough',
        province: 'ON',
        postalCode: 'M1R 5G2',
        country: 'Canada',
        full: '65 Canadian Rd, Scarborough, ON, M1R 5G2'
    },
    hours: '24/7',
    experience: '15+',
    customers: '1000+',
    googleRating: 5.0,
    googleReviewCount: 20,
    siteUrl: 'https://bluemenplumbing.com'
};
const SERVICE_SLUGS = [
    'leak-repairs',
    'installations',
    'kitchen-plumbing-v2',
    'bathroom-plumbing',
    'unclog',
    'filters'
];
const EMERGENCY_FEE = 250; // base price before 20% markup → displays as $300
}),
"[project]/src/lib/utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyPriceMarkup",
    ()=>applyPriceMarkup,
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-route] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const applyPriceMarkup = (price)=>{
    return Math.round(price * 1.2);
};
}),
"[project]/src/services/supabaseServiceApi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateTotalDurationFromSupabase",
    ()=>calculateTotalDurationFromSupabase,
    "calculateTotalPriceFromSupabase",
    ()=>calculateTotalPriceFromSupabase,
    "fetchCategoryById",
    ()=>fetchCategoryById,
    "fetchServiceCategories",
    ()=>fetchServiceCategories,
    "fetchServiceItemById",
    ()=>fetchServiceItemById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
;
;
;
const fetchServiceCategories = async ()=>{
    try {
        // Check if Supabase is configured
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Fetch categories
        const { data: categories, error: categoriesError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_categories').select('*').eq('is_active', true).order('display_order', {
            ascending: true
        });
        if (categoriesError) {
            console.error('Error fetching categories:', categoriesError);
            // Return empty array instead of throwing to allow fallback
            return [];
        }
        if (!categories || categories.length === 0) {
            console.warn('No categories found in Supabase');
            return [];
        }
        // Fetch all items
        const { data: items, error: itemsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_items').select('*').eq('is_active', true).order('display_order', {
            ascending: true
        });
        if (itemsError) {
            console.error('Error fetching items:', itemsError);
            // Return empty array instead of throwing to allow fallback
            return [];
        }
        // Map database rows to application models
        const serviceCategories = categories.map((cat)=>{
            const categoryItems = items?.filter((item)=>item.category_id === cat.id).map((item)=>mapServiceItemRowToModel(item)) || [];
            return mapServiceCategoryRowToModel(cat, categoryItems);
        });
        console.log(`Successfully fetched ${serviceCategories.length} categories from Supabase`);
        return serviceCategories;
    } catch (error) {
        console.error('Error in fetchServiceCategories:', error);
        // Return empty array instead of throwing to allow fallback to local data
        return [];
    }
};
const fetchCategoryById = async (categoryId)=>{
    try {
        const { data: category, error: categoryError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_categories').select('*').eq('id', categoryId).eq('is_active', true).single();
        if (categoryError || !category) {
            console.error('Error fetching category:', categoryError);
            return null;
        }
        const { data: items, error: itemsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_items').select('*').eq('category_id', categoryId).eq('is_active', true).order('display_order', {
            ascending: true
        });
        if (itemsError) {
            console.error('Error fetching items:', itemsError);
            return null;
        }
        const categoryItems = items?.map((item)=>mapServiceItemRowToModel(item)) || [];
        return mapServiceCategoryRowToModel(category, categoryItems);
    } catch (error) {
        console.error('Error in fetchCategoryById:', error);
        return null;
    }
};
const fetchServiceItemById = async (itemId)=>{
    try {
        const { data: item, error: itemError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_items').select('*').eq('id', itemId).eq('is_active', true).single();
        if (itemError || !item) {
            console.error('Error fetching item:', itemError);
            return null;
        }
        const category = await fetchCategoryById(item.category_id);
        if (!category) {
            return null;
        }
        return {
            category,
            item: mapServiceItemRowToModel(item)
        };
    } catch (error) {
        console.error('Error in fetchServiceItemById:', error);
        return null;
    }
};
const calculateTotalPriceFromSupabase = async (selectedItemIds, urgency, propertyType)=>{
    try {
        if (selectedItemIds.length === 0) return 0;
        const { data: items, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_items').select('unit_price, price_min').in('id', selectedItemIds).eq('is_active', true);
        if (error || !items) {
            console.error('Error fetching item prices:', error);
            return 0;
        }
        let baseTotal = items.reduce((sum, item)=>{
            const price = item.price_min ?? item.unit_price;
            return sum + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyPriceMarkup"])(price);
        }, 0);
        // Apply commercial multiplier
        if (propertyType === 'commercial') {
            baseTotal = Math.round(baseTotal * 1.3);
        }
        // Emergency: $300 minimum floor (after markup)
        if (urgency === 'emergency') {
            const emergencyMin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyPriceMarkup"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EMERGENCY_FEE"]);
            return Math.max(emergencyMin, baseTotal);
        }
        return Math.round(baseTotal);
    } catch (error) {
        console.error('Error calculating total price:', error);
        return 0;
    }
};
const calculateTotalDurationFromSupabase = async (selectedItemIds)=>{
    try {
        if (selectedItemIds.length === 0) return 0;
        const { data: items, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_items').select('estimated_duration').in('id', selectedItemIds).eq('is_active', true);
        if (error || !items) {
            console.error('Error fetching item durations:', error);
            return 0;
        }
        return items.reduce((sum, item)=>sum + item.estimated_duration, 0);
    } catch (error) {
        console.error('Error calculating total duration:', error);
        return 0;
    }
};
// Helper functions to map database rows to application models
const mapServiceCategoryRowToModel = (row, items)=>{
    return {
        id: row.id,
        name: row.name,
        description: row.description || '',
        category: row.category,
        priceRangeMin: row.price_range_min,
        priceRangeMax: row.price_range_max,
        estimatedDuration: row.estimated_duration,
        items: items,
        displayOrder: row.display_order
    };
};
const mapServiceItemRowToModel = (row)=>{
    return {
        id: row.id,
        name: row.name,
        description: row.description || undefined,
        unitPrice: row.unit_price,
        priceMin: row.price_min ?? undefined,
        priceMax: row.price_max ?? undefined,
        partsExtra: row.parts_extra,
        partsPrice: row.parts_price || undefined,
        estimatedDuration: row.estimated_duration,
        displayOrder: row.display_order
    };
};
}),
"[project]/src/services/serviceData.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateTotalDuration",
    ()=>calculateTotalDuration,
    "calculateTotalPrice",
    ()=>calculateTotalPrice,
    "getCategoryById",
    ()=>getCategoryById,
    "getServiceCategories",
    ()=>getServiceCategories,
    "getServiceItemById",
    ()=>getServiceItemById,
    "serviceCategories",
    ()=>serviceCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-route] (ecmascript)");
;
;
const serviceCategories = [
    {
        id: 'leak-repairs',
        name: 'Leak Repairs',
        description: 'Got a drip or a puddle? We\'ll find and fix it.',
        category: 'repair',
        priceRangeMin: 79,
        priceRangeMax: 250,
        estimatedDuration: 60,
        displayOrder: 1,
        items: [
            {
                id: 'leak-kitchen',
                name: 'Kitchen Leak',
                unitPrice: 79,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 1
            },
            {
                id: 'leak-bathroom-vanity',
                name: 'Bathroom Vanity Leak',
                unitPrice: 79,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 2
            },
            {
                id: 'leak-toilet-external',
                name: 'Toilet Leak - External',
                description: 'Outside of the toilet or under',
                unitPrice: 79,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 3
            },
            {
                id: 'leak-toilet-internal',
                name: 'Toilet Leak - Internal',
                description: 'Inside the toilet',
                unitPrice: 79,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 4
            },
            {
                id: 'leak-shower-faucet',
                name: 'Shower Faucet Leak',
                unitPrice: 79,
                priceMin: 79,
                priceMax: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 5
            },
            {
                id: 'leak-shower-valve',
                name: 'Shower Valve Leak',
                unitPrice: 125,
                priceMin: 125,
                priceMax: 250,
                partsExtra: false,
                estimatedDuration: 90,
                displayOrder: 6
            },
            {
                id: 'leak-ceiling',
                name: 'Ceiling Leak',
                description: 'Leak from above bathroom',
                unitPrice: 125,
                priceMin: 125,
                priceMax: 250,
                partsExtra: false,
                estimatedDuration: 90,
                displayOrder: 7
            },
            {
                id: 'leak-burst-pipe',
                name: 'Burst Pipe',
                unitPrice: 167,
                priceMin: 167,
                priceMax: 250,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 8
            },
            {
                id: 'leak-laundry',
                name: 'Laundry Leak',
                unitPrice: 79,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 9
            }
        ]
    },
    {
        id: 'installations',
        name: 'Installations',
        description: 'Need something new hooked up? Fixtures, valves, and appliance connections.',
        category: 'installation',
        priceRangeMin: 50,
        priceRangeMax: 375,
        estimatedDuration: 90,
        displayOrder: 2,
        items: [
            {
                id: 'install-faucet',
                name: 'Faucet Installation',
                unitPrice: 104,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 1
            },
            {
                id: 'install-shower',
                name: 'Shower Installation',
                unitPrice: 250,
                priceMin: 250,
                priceMax: 292,
                partsExtra: false,
                estimatedDuration: 180,
                displayOrder: 2
            },
            {
                id: 'install-toilet',
                name: 'Toilet Installation',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 3
            },
            {
                id: 'install-washer-dryer',
                name: 'Washer/Dryer Hookup',
                unitPrice: 104,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 4
            },
            {
                id: 'install-laundry-sink',
                name: 'Laundry Sink Installation',
                unitPrice: 208,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 5
            },
            {
                id: 'install-valve',
                name: 'Valve Installation',
                unitPrice: 79,
                priceMin: 79,
                priceMax: 108,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 6
            },
            {
                id: 'install-garden-hose-bib',
                name: 'Garden Hose Bib Installation',
                unitPrice: 83,
                priceMin: 83,
                priceMax: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 7
            },
            {
                id: 'install-main-shutoff',
                name: 'Main Shut-off Valve Installation',
                unitPrice: 292,
                priceMin: 292,
                priceMax: 375,
                partsExtra: false,
                estimatedDuration: 180,
                displayOrder: 8
            },
            {
                id: 'install-pot-filler',
                name: 'Pot Filler Installation',
                unitPrice: 75,
                priceMin: 75,
                priceMax: 100,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 9
            },
            {
                id: 'install-bidet-sprayer',
                name: 'Bidet / Handheld Sprayer',
                unitPrice: 50,
                priceMin: 50,
                priceMax: 75,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 10
            },
            {
                id: 'install-toilet-fill-valve',
                name: 'Toilet Fill Valve & Flapper',
                unitPrice: 75,
                priceMin: 75,
                priceMax: 104,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 11
            },
            {
                id: 'install-fridge-waterline',
                name: 'Fridge Water Line Installation',
                unitPrice: 104,
                priceMin: 104,
                priceMax: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 12
            }
        ]
    },
    {
        id: 'kitchen-plumbing-v2',
        name: 'Kitchen Plumbing',
        description: 'Kitchen sink, dishwasher, and plumbing reconfiguration.',
        category: 'kitchen',
        priceRangeMin: 104,
        priceRangeMax: 208,
        estimatedDuration: 120,
        displayOrder: 3,
        items: [
            {
                id: 'kitchen-complete-v2',
                name: 'Complete Kitchen Plumbing',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 1
            },
            {
                id: 'kitchen-dishwasher-v2',
                name: 'Dishwasher Installation',
                unitPrice: 104,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 2
            },
            {
                id: 'kitchen-dishwasher-plumbing-v2',
                name: 'Dishwasher + Kitchen Plumbing',
                unitPrice: 208,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 3
            },
            {
                id: 'kitchen-reconfiguration',
                name: 'Plumbing Reconfiguration',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 90,
                displayOrder: 4
            }
        ]
    },
    {
        id: 'bathroom-plumbing',
        name: 'Bathroom Plumbing',
        description: 'Full bathroom plumbing: rough-in packages, vanity conversions, and remodeling.',
        category: 'bathroom',
        priceRangeMin: 42,
        priceRangeMax: 2500,
        estimatedDuration: 180,
        displayOrder: 4,
        items: [
            {
                id: 'bath-shower-diverter-basic',
                name: 'Shower Diverter (Basic)',
                unitPrice: 208,
                partsExtra: false,
                estimatedDuration: 90,
                displayOrder: 1
            },
            {
                id: 'bath-shower-diverter-custom',
                name: 'Shower Diverter (Custom)',
                unitPrice: 250,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 2
            },
            {
                id: 'bath-bathtub-install',
                name: 'Bath Tub Installation',
                description: 'Parts not included',
                unitPrice: 333,
                partsExtra: true,
                estimatedDuration: 180,
                displayOrder: 3
            },
            {
                id: 'bath-standing-shower-drain',
                name: 'Standing Shower Drain',
                unitPrice: 208,
                partsExtra: false,
                estimatedDuration: 90,
                displayOrder: 4
            },
            {
                id: 'bath-freestanding-tub',
                name: 'Free Standing Tub',
                description: 'Parts not included',
                unitPrice: 208,
                partsExtra: true,
                estimatedDuration: 120,
                displayOrder: 5
            },
            {
                id: 'bath-freestanding-shower',
                name: 'Free Standing Shower',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 6
            },
            {
                id: 'bath-shower-fixture',
                name: 'Shower Fixture Installation',
                unitPrice: 63,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 7
            },
            {
                id: 'bath-vanity-plumbing',
                name: 'Vanity Complete Plumbing',
                unitPrice: 104,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 8
            },
            {
                id: 'bath-faucet-ptrap',
                name: 'Faucet + P-Trap',
                unitPrice: 79,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 9
            },
            {
                id: 'bath-vanity-install-plumbing',
                name: 'Vanity Installation + Plumbing',
                unitPrice: 208,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 10
            },
            {
                id: 'bath-freestanding-tub-install',
                name: 'Free Standing Tub Installation',
                unitPrice: 71,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 11
            },
            {
                id: 'bath-freestanding-shower-install',
                name: 'Free Standing Shower Installation',
                unitPrice: 71,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 12
            },
            {
                id: 'bath-double-vanity',
                name: 'Double Vanity + Plumbing',
                unitPrice: 375,
                partsExtra: false,
                estimatedDuration: 180,
                displayOrder: 13
            },
            {
                id: 'bath-bidet',
                name: 'Toilet Bidet Installation',
                unitPrice: 42,
                partsExtra: false,
                estimatedDuration: 30,
                displayOrder: 14
            },
            {
                id: 'bath-single-to-double-vanity',
                name: 'Convert Single Vanity to Double',
                unitPrice: 167,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 15
            },
            {
                id: 'bath-toilet-flange-repair',
                name: 'Toilet Flange Repair',
                unitPrice: 79,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 16
            },
            {
                id: 'bath-3piece-package',
                name: '3-Piece Bathroom Package',
                description: 'Complete bathroom rough-in package',
                unitPrice: 1458,
                partsExtra: false,
                estimatedDuration: 480,
                displayOrder: 17
            },
            {
                id: 'bath-3piece-basement',
                name: '3-Piece Basement Bathroom with Permit',
                description: 'Includes permit costs',
                unitPrice: 2500,
                partsExtra: false,
                estimatedDuration: 600,
                displayOrder: 18
            }
        ]
    },
    {
        id: 'unclog',
        name: 'Unclog / Drain Clearing',
        description: 'Clogged drain? We\'ll clear it out.',
        category: 'unclog',
        priceRangeMin: 104,
        priceRangeMax: 104,
        estimatedDuration: 60,
        displayOrder: 5,
        items: [
            {
                id: 'unclog-vanity',
                name: 'Bathroom Vanity Unclog',
                unitPrice: 104,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 1
            },
            {
                id: 'unclog-toilet',
                name: 'Toilet Unclog',
                unitPrice: 104,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 2
            },
            {
                id: 'unclog-bathtub',
                name: 'Bathtub Unclog',
                unitPrice: 104,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 3
            }
        ]
    },
    {
        id: 'filters',
        name: 'Water Filtration & Purification',
        description: 'Clean water solutions: softeners, reverse osmosis, and filter service.',
        category: 'filter',
        priceRangeMin: 125,
        priceRangeMax: 2083,
        estimatedDuration: 120,
        displayOrder: 6,
        items: [
            {
                id: 'filter-softener-standard',
                name: 'Water Softener - Standard',
                unitPrice: 375,
                priceMin: 375,
                priceMax: 417,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 1
            },
            {
                id: 'filter-softener-high-capacity',
                name: 'Water Softener - High Capacity (30k-50k grains)',
                unitPrice: 1500,
                priceMin: 1500,
                priceMax: 2083,
                partsExtra: false,
                estimatedDuration: 180,
                displayOrder: 2
            },
            {
                id: 'filter-reverse-osmosis',
                name: 'Reverse Osmosis System',
                unitPrice: 250,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 3
            },
            {
                id: 'filter-iron-tank',
                name: 'Iron Filter Tank',
                unitPrice: 1000,
                priceMin: 1000,
                priceMax: 1250,
                partsExtra: false,
                estimatedDuration: 180,
                displayOrder: 4
            },
            {
                id: 'filter-chlorinator',
                name: 'Chlorinator / Carbon Filter',
                unitPrice: 625,
                priceMin: 625,
                priceMax: 1250,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 5
            },
            {
                id: 'filter-service-change',
                name: 'Filter Service Change',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 6
            },
            {
                id: 'filter-relocation',
                name: 'Filter Relocation',
                unitPrice: 167,
                partsExtra: false,
                estimatedDuration: 90,
                displayOrder: 7
            }
        ]
    }
];
const getServiceCategories = ()=>{
    return serviceCategories;
};
const getCategoryById = (categoryId)=>{
    return serviceCategories.find((cat)=>cat.id === categoryId);
};
const getServiceItemById = (itemId)=>{
    for (const category of serviceCategories){
        const item = category.items.find((i)=>i.id === itemId);
        if (item) {
            return {
                category,
                item
            };
        }
    }
    return undefined;
};
const calculateTotalPrice = (selectedItemIds, urgency, propertyType)=>{
    let baseTotal = 0;
    // Sum up all selected items with 20% markup applied
    // Use priceMin for range items (conservative estimate)
    selectedItemIds.forEach((itemId)=>{
        const result = getServiceItemById(itemId);
        if (result) {
            const price = result.item.priceMin ?? result.item.unitPrice;
            baseTotal += (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyPriceMarkup"])(price);
        }
    });
    // Apply commercial multiplier
    if (propertyType === 'commercial') {
        baseTotal = Math.round(baseTotal * 1.3);
    }
    // Emergency: $300 minimum floor (after markup)
    if (urgency === 'emergency') {
        const emergencyMin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyPriceMarkup"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EMERGENCY_FEE"]);
        return Math.max(emergencyMin, baseTotal);
    }
    return Math.round(baseTotal);
};
const calculateTotalDuration = (selectedItemIds)=>{
    let totalDuration = 0;
    selectedItemIds.forEach((itemId)=>{
        const result = getServiceItemById(itemId);
        if (result) {
            totalDuration += result.item.estimatedDuration;
        }
    });
    return totalDuration;
};
}),
"[project]/app/api/services/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseServiceApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/supabaseServiceApi.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$serviceData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/serviceData.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        // Try to fetch from Supabase first
        const categories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseServiceApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchServiceCategories"])();
        if (categories && categories.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: categories,
                source: 'database'
            });
        }
        // Fallback to local data if Supabase returns empty
        console.log('Supabase returned empty, falling back to local data');
        const localCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$serviceData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServiceCategories"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: localCategories,
            source: 'local'
        });
    } catch (error) {
        console.error('Error fetching services from Supabase:', error);
        // Fallback to local data on error
        try {
            const localCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$serviceData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServiceCategories"])();
            console.log('Falling back to local service data');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: localCategories,
                source: 'local',
                warning: 'Using local data - Supabase unavailable'
            });
        } catch (fallbackError) {
            console.error('Error loading fallback data:', fallbackError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Failed to fetch services'
            }, {
                status: 500
            });
        }
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b5a8ee2c._.js.map