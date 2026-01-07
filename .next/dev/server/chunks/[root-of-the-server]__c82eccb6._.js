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
        // Fetch categories
        const { data: categories, error: categoriesError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_categories').select('*').eq('is_active', true).order('display_order', {
            ascending: true
        });
        if (categoriesError) {
            console.error('Error fetching categories:', categoriesError);
            throw new Error('Failed to fetch service categories');
        }
        if (!categories || categories.length === 0) {
            return [];
        }
        // Fetch all items
        const { data: items, error: itemsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('service_items').select('*').eq('is_active', true).order('display_order', {
            ascending: true
        });
        if (itemsError) {
            console.error('Error fetching items:', itemsError);
            throw new Error('Failed to fetch service items');
        }
        // Map database rows to application models
        const serviceCategories = categories.map((cat)=>{
            const categoryItems = items?.filter((item)=>item.category_id === cat.id).map((item)=>mapServiceItemRowToModel(item)) || [];
            return mapServiceCategoryRowToModel(cat, categoryItems);
        });
        return serviceCategories;
    } catch (error) {
        console.error('Error in fetchServiceCategories:', error);
        throw error;
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
        icon: row.icon || '',
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
"[project]/app/api/services/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseServiceApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/supabaseServiceApi.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const categories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseServiceApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchServiceCategories"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to fetch services'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c82eccb6._.js.map