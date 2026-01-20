
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsrjgzhceulpbhkwfjhd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcmpnemhjZXVscGJoa3dmamhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNzU0MjcsImV4cCI6MjA4MTY1MTQyN30.fdo9k57jmBzTpAqwTYMoYh2AwsfV0NM5HyH1VN-lBrQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
