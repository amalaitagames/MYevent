import {createClient} from "@supabase/supabase-js";

const supabaseUrl = 'https://wyhjrxktijlgrtfdagsu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aGpyeGt0aWpsZ3J0ZmRhZ3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NzM3NjIsImV4cCI6MjA1MzA0OTc2Mn0.Xh-Va-AxMazb2EiJLGFNt4mrdcSqV_ii7w2YuplzL3c";
export const supabase = createClient(supabaseUrl, supabaseKey);