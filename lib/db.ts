import { createClient } from "@supabase/supabase-js";

// Server only. Prefers the service role key when it is set, so row level
// security can be turned on for the users, passwords and logins tables with
// no policies for the public anon key. Falls back to the anon key so existing
// deployments keep working until SUPABASE_SERVICE_ROLE_KEY is added.
export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL || "",
	process.env.SUPABASE_SERVICE_ROLE_KEY ||
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
		""
);
