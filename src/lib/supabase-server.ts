import { createClient } from '@supabase/supabase-js';

// 服务端专用的 Supabase 客户端，使用 service role key
// 这个客户端有更高的权限，可以绕过 RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
