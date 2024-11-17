import { createBrowserClient } from "@supabase/ssr";

let client;

export function getSupabaseBrowserClient() {
    if (client) {
        return client;
    }

    client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    return client;
}

// TODO: useless function
function useSupabaseBrowser() {
    return getSupabaseBrowserClient();
}

export default useSupabaseBrowser;
