import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

export default function useSupabaseServer(cookieStore, isAdmin) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env[`NEXT_PUBLIC_SUPABASE_${isAdmin ? "SERVICE" : "ANON"}_KEY`],
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
                set(name, value, options) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name, options) {
                    try {
                        cookieStore.set({ name, value: "", ...options });
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
}

export function getSupabaseServer(cookieStore, isAdmin) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env[`NEXT_PUBLIC_SUPABASE_${isAdmin ? "SERVICE" : "ANON"}_KEY`],
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
                set(name, value, options) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name, options) {
                    try {
                        cookieStore.set({ name, value: "", ...options });
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
}
