-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create tables for portfolio data
CREATE TABLE IF NOT EXISTS personal_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  instagram_url VARCHAR(255),
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech JSONB NOT NULL DEFAULT '[]',
  period VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  link VARCHAR(255),
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]',
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 5),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS languages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  level VARCHAR(100) NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  flag_emoji VARCHAR(10),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS soft_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(10),
  color VARCHAR(50) DEFAULT 'blue',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON experiences(order_index);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(order_index);
CREATE INDEX IF NOT EXISTS idx_languages_order ON languages(order_index);
CREATE INDEX IF NOT EXISTS idx_soft_skills_order ON soft_skills(order_index);

-- Enable RLS on all tables
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE soft_skills ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio website)
CREATE POLICY "Allow public read access on personal_info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on languages" ON languages FOR SELECT USING (true);
CREATE POLICY "Allow public read access on soft_skills" ON soft_skills FOR SELECT USING (true);

-- Create policies for authenticated users (admin website)
CREATE POLICY "Allow authenticated users full access on personal_info" ON personal_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on languages" ON languages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on soft_skills" ON soft_skills FOR ALL USING (auth.role() = 'authenticated');
