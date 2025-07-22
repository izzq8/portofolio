-- Insert initial personal info
INSERT INTO personal_info (
  name, title, description, email, phone, 
  github_url, linkedin_url, instagram_url
) VALUES (
  'Faiz Abhinaya',
  'Web Developer & Fotografer',
  'Mahasiswa Sistem Informasi dengan IPK 3.85 dan sertifikasi BNSP Junior Web Developer. Berpengalaman dalam pengembangan aplikasi web modern dan fotografi profesional.',
  'faiz.abhinaya@email.com',
  '+62 xxx-xxxx-xxxx',
  'https://github.com/izzq8',
  'https://linkedin.com/in/linkedin.com',
  'https://www.instagram.com/trash.heic'
) ON CONFLICT DO NOTHING;

-- Insert projects
INSERT INTO projects (title, description, tech, period, type, link, order_index) VALUES
(
  'myMovieList',
  'Aplikasi Android untuk menjelajahi dan mengelola katalog film dengan arsitektur MVVM',
  '["Kotlin", "Jetpack Compose", "Firebase", "TMDB API", "MVVM"]',
  'Mei 2025 – Juni 2025',
  'Mobile Development',
  'https://github.com/izzq8',
  1
),
(
  'KasirKu - Point Of Sale',
  'Sistem Point of Sale lengkap dengan autentikasi dan manajemen inventory real-time',
  '["Next.js 15", "React 19", "TypeScript", "Supabase", "Tailwind CSS"]',
  'Juni 2025 – Juli 2025',
  'Fullstack Web',
  'https://github.com/izzq8',
  2
),
(
  'LaundryBiner',
  'Platform pemesanan laundry online dengan sistem tracking real-time dan dashboard user',
  '["Next.js", "TypeScript", "Supabase Auth", "Google OAuth", "Tailwind CSS"]',
  'Jan – Jun 2022',
  'Fullstack Web',
  'https://github.com/izzq8',
  3
) ON CONFLICT DO NOTHING;

-- Insert experiences
INSERT INTO experiences (title, company, description, tags, order_index) VALUES
(
  'IT Support Intern',
  'PPKPI Pasar Rebo',
  'Pengalaman magang sebagai IT Support di PPKPI Pasar Rebo, dimana saya mendapatkan pengalaman praktis dalam menangani masalah teknis, maintenance sistem, dan memberikan dukungan teknis kepada pengguna.',
  '["Technical Support", "System Maintenance", "User Support"]',
  1
),
(
  'BNSP Certified Junior Web Developer',
  'Sertifikasi Resmi',
  'Memiliki sertifikasi resmi sebagai Junior Web Developer dari Badan Nasional Sertifikasi Profesi (BNSP), yang memvalidasi kemampuan dalam pengembangan aplikasi web sesuai standar industri.',
  '["Web Development", "Industry Standard", "Professional Certification"]',
  2
) ON CONFLICT DO NOTHING;

-- Insert technical skills
INSERT INTO skills (name, category, level, order_index) VALUES
-- Frontend
('HTML', 'Frontend', 5, 1),
('CSS', 'Frontend', 5, 2),
('JavaScript', 'Frontend', 4, 3),
('React.js', 'Frontend', 4, 4),
('Next.js', 'Frontend', 4, 5),
('TypeScript', 'Frontend', 4, 6),
('Tailwind CSS', 'Frontend', 4, 7),
-- Backend
('Express.js', 'Backend', 3, 8),
('RESTful API', 'Backend', 4, 9),
('Node.js', 'Backend', 3, 10),
('JWT Auth', 'Backend', 3, 11),
-- Database
('Supabase', 'Database', 4, 12),
('Firebase', 'Database', 4, 13),
('PostgreSQL', 'Database', 3, 14),
('Firestore', 'Database', 4, 15),
-- Tools & Design
('GitHub', 'Tools & Design', 4, 16),
('VS Code', 'Tools & Design', 5, 17),
('Postman', 'Tools & Design', 4, 18),
('Figma', 'Tools & Design', 3, 19),
('Vercel', 'Tools & Design', 4, 20),
('Photoshop', 'Tools & Design', 4, 21),
('Lightroom', 'Tools & Design', 4, 22)
ON CONFLICT DO NOTHING;

-- Insert languages
INSERT INTO languages (name, level, progress, flag_emoji, order_index) VALUES
('Bahasa Indonesia', 'Native', 100, '🇮🇩', 1),
('English', 'Professional Working', 75, '🇺🇸', 2)
ON CONFLICT DO NOTHING;

-- Insert soft skills
INSERT INTO soft_skills (name, icon, color, order_index) VALUES
('Problem Solving', '🧩', 'blue', 1),
('Teamwork', '🤝', 'green', 2),
('Communication', '💬', 'purple', 3),
('Attention to Detail', '🔍', 'orange', 4),
('Analytical Thinking', '📊', 'red', 5),
('Technical Writing', '✍️', 'indigo', 6)
ON CONFLICT DO NOTHING;
