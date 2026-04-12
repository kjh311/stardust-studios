-- Row Level Security (RLS) Policies for Stardust Studios

-- 1. Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- 2. Profiles Table Policies
-- Users can select their own profile
CREATE POLICY "Users can select own profile" ON profiles 
FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (e.g. credits)
CREATE POLICY "Users can update own profile" ON profiles 
FOR UPDATE USING (auth.uid() = id);

-- 3. Movies Table Policies
-- Users can select movies they own
CREATE POLICY "Users can select own movies" ON movies 
FOR SELECT USING (auth.uid() = user_id);

-- Users can insert movies they own
CREATE POLICY "Users can insert own movies" ON movies 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Scenes Table Policies
-- Users can select scenes belonging to their movies
CREATE POLICY "Users can select own scenes" ON scenes 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM movies 
    WHERE movies.id = scenes.movie_id 
    AND movies.user_id = auth.uid()
  )
);

-- 5. Stories Table Policies (Public Gallery)
CREATE POLICY "Stories are publicly viewable" ON stories 
FOR SELECT USING (true);

-- 6. Auth Trigger for Automatic Profiles
-- This function inserts a row into public.profiles whenever a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, credits)
  VALUES (new.id, 0);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
