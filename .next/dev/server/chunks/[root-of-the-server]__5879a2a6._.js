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
        let baseTotal = 0;
        // Fetch all selected items
        for (const itemId of selectedItemIds){
            const { data: item, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_items').select('unit_price').eq('id', itemId).eq('is_active', true).single();
            if (!error && item) {
                baseTotal += item.unit_price;
            }
        }
        // Apply multipliers based on urgency and property type
        let multiplier = 1.0;
        if (urgency === 'emergency') multiplier += 0.5;
        else if (urgency === 'urgent') multiplier += 0.25;
        if (propertyType === 'commercial') multiplier += 0.3;
        return Math.round(baseTotal * multiplier);
    } catch (error) {
        console.error('Error calculating total price:', error);
        return 0;
    }
};
const calculateTotalDurationFromSupabase = async (selectedItemIds)=>{
    try {
        let totalDuration = 0;
        // Fetch all selected items
        for (const itemId of selectedItemIds){
            const { data: item, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_items').select('estimated_duration').eq('id', itemId).eq('is_active', true).single();
            if (!error && item) {
                totalDuration += item.estimated_duration;
            }
        }
        return totalDuration;
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
        partsExtra: row.parts_extra,
        partsPrice: row.parts_price || undefined,
        estimatedDuration: row.estimated_duration,
        displayOrder: row.display_order
    };
};
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
;
const serviceCategories = [
    {
        id: 'bathroom-rough-in',
        name: 'Bathroom Rough-In',
        description: 'Complete plumbing installation for new bathrooms during construction or renovation (behind walls)',
        category: 'rough-in',
        priceRangeMin: 50,
        priceRangeMax: 3000,
        estimatedDuration: 240,
        displayOrder: 1,
        items: [
            {
                id: 'rough-shower-diverter-basic',
                name: 'Shower Diverter (Basic)',
                unitPrice: 250,
                partsExtra: false,
                estimatedDuration: 90,
                displayOrder: 1
            },
            {
                id: 'rough-shower-diverter-custom',
                name: 'Shower Diverter (Custom)',
                unitPrice: 300,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 2
            },
            {
                id: 'rough-bathtub-install',
                name: 'Bath Tub Installation',
                description: 'Parts not included',
                unitPrice: 400,
                partsExtra: true,
                estimatedDuration: 180,
                displayOrder: 3
            },
            {
                id: 'rough-standing-shower-drain',
                name: 'Standing Shower Drain',
                unitPrice: 250,
                partsExtra: false,
                estimatedDuration: 90,
                displayOrder: 4
            },
            {
                id: 'rough-freestanding-tub',
                name: 'Free Standing Tub',
                description: 'Parts not included',
                unitPrice: 250,
                partsExtra: true,
                estimatedDuration: 120,
                displayOrder: 5
            },
            {
                id: 'rough-freestanding-shower',
                name: 'Free Standing Shower',
                unitPrice: 150,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 6
            },
            {
                id: 'rough-valve-install',
                name: 'Valve Installation',
                unitPrice: 50,
                partsExtra: false,
                estimatedDuration: 30,
                displayOrder: 7
            },
            {
                id: 'rough-fridge-waterline',
                name: 'Fridge Water Line',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 8
            },
            {
                id: 'rough-single-to-double-vanity',
                name: 'Convert Single Vanity to Double',
                unitPrice: 200,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 9
            },
            {
                id: 'rough-toilet-flange-repair',
                name: 'Toilet Flange Repair',
                unitPrice: 95,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 10
            },
            {
                id: 'rough-3piece-bathroom',
                name: '3-Piece Bathroom Rough-In (Complete Package)',
                description: 'Complete bathroom rough-in package',
                unitPrice: 1750,
                partsExtra: false,
                estimatedDuration: 480,
                displayOrder: 11
            },
            {
                id: 'rough-3piece-basement',
                name: '3-Piece Bathroom Basement with Permit',
                description: 'Includes permit costs',
                unitPrice: 3000,
                partsExtra: false,
                estimatedDuration: 600,
                displayOrder: 12
            }
        ]
    },
    {
        id: 'bathroom-finishing',
        name: 'Bathroom Finishing',
        description: 'Installation of bathroom fixtures and final plumbing connections (visible parts)',
        category: 'finishing',
        priceRangeMin: 50,
        priceRangeMax: 450,
        estimatedDuration: 120,
        displayOrder: 2,
        items: [
            {
                id: 'finish-shower-fixture',
                name: 'Shower Fixture Installation',
                unitPrice: 75,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 1
            },
            {
                id: 'finish-vanity-plumbing-only',
                name: 'Vanity Complete Plumbing ONLY',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 2
            },
            {
                id: 'finish-faucet-ptrap',
                name: 'Faucet + P-Trap ONLY',
                unitPrice: 95,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 3
            },
            {
                id: 'finish-vanity-install-plumbing',
                name: 'Vanity Installation + Plumbing',
                unitPrice: 250,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 4
            },
            {
                id: 'finish-toilet-install',
                name: 'Toilet Installation',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 5
            },
            {
                id: 'finish-freestanding-tub',
                name: 'Free Standing Tub Installation',
                unitPrice: 85,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 6
            },
            {
                id: 'finish-freestanding-shower',
                name: 'Free Standing Shower Installation',
                unitPrice: 85,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 7
            },
            {
                id: 'finish-double-vanity',
                name: 'Double Vanity + Plumbing',
                unitPrice: 450,
                partsExtra: false,
                estimatedDuration: 180,
                displayOrder: 8
            },
            {
                id: 'finish-toilet-bidet',
                name: 'Toilet Bidet Installation',
                unitPrice: 50,
                partsExtra: false,
                estimatedDuration: 30,
                displayOrder: 9
            }
        ]
    },
    {
        id: 'kitchen-plumbing',
        name: 'Kitchen Plumbing',
        description: 'Complete kitchen plumbing installation including appliances and fixtures',
        category: 'kitchen',
        priceRangeMin: 125,
        priceRangeMax: 250,
        estimatedDuration: 120,
        displayOrder: 3,
        items: [
            {
                id: 'kitchen-complete',
                name: 'Complete Kitchen Plumbing',
                unitPrice: 150,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 1
            },
            {
                id: 'kitchen-dishwasher',
                name: 'Dishwasher Installation',
                unitPrice: 125,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 2
            },
            {
                id: 'kitchen-dishwasher-plumbing',
                name: 'Dishwasher + Kitchen Plumbing',
                unitPrice: 250,
                partsExtra: false,
                estimatedDuration: 120,
                displayOrder: 3
            }
        ]
    },
    {
        id: 'laundry-connections',
        name: 'Laundry Connections',
        description: 'Washing machine and dryer water and drain connections',
        category: 'laundry',
        priceRangeMin: 85,
        priceRangeMax: 130,
        estimatedDuration: 60,
        displayOrder: 4,
        items: [
            {
                id: 'laundry-no-parts',
                name: 'Washing Machine + Dryer (No Parts)',
                unitPrice: 85,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 1
            },
            {
                id: 'laundry-with-parts',
                name: 'Washing Machine + Dryer (With Parts)',
                unitPrice: 130,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 2
            }
        ]
    },
    {
        id: 'repairs-troubleshooting',
        name: 'Repairs & Troubleshooting',
        description: 'Quick repairs and leak troubleshooting for existing plumbing',
        category: 'repair',
        priceRangeMin: 95,
        priceRangeMax: 95,
        estimatedDuration: 60,
        displayOrder: 5,
        items: [
            {
                id: 'repair-leak-troubleshoot',
                name: 'Leak Troubleshoot',
                unitPrice: 95,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 1
            },
            {
                id: 'repair-leak-fix',
                name: 'Leak Fix',
                unitPrice: 95,
                partsExtra: false,
                estimatedDuration: 60,
                displayOrder: 2
            },
            {
                id: 'repair-faucet-replacement',
                name: 'Faucet Replacement',
                unitPrice: 95,
                partsExtra: false,
                estimatedDuration: 45,
                displayOrder: 3
            },
            {
                id: 'repair-random-parts',
                name: 'Random Plumbing Parts Installation',
                description: 'Parts not included',
                unitPrice: 95,
                partsExtra: true,
                estimatedDuration: 45,
                displayOrder: 4
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
    selectedItemIds.forEach((itemId)=>{
        const result = getServiceItemById(itemId);
        if (result) {
            baseTotal += (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyPriceMarkup"])(result.item.unitPrice);
        }
    });
    // Apply multipliers based on urgency and property type
    let multiplier = 1.0;
    if (urgency === 'emergency') multiplier += 0.5;
    else if (urgency === 'urgent') multiplier += 0.25;
    if (propertyType === 'commercial') multiplier += 0.3;
    return Math.round(baseTotal * multiplier);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__5879a2a6._.js.map