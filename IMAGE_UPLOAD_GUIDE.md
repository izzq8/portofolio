# 📸 Panduan Upload Foto Portfolio

## 🎯 Cara Upload Foto yang Efisien

### 📁 Struktur Folder:
```
public/
├── projects/           # Foto proyek
│   ├── mymovielist.jpg    # Screenshot aplikasi myMovieList
│   ├── kasirku.jpg        # Screenshot aplikasi KasirKu  
│   └── laundrybiner.jpg   # Screenshot aplikasi LaundryBiner
├── photography/        # Hasil fotografi
│   ├── portrait/          # Foto portrait
│   ├── landscape/         # Foto landscape
│   ├── street/           # Foto street photography
│   └── event/            # Foto event
└── profile-photo.jpg   # Foto profil (sudah ada)
```

## 🚀 Langkah Upload:

### 1. **Foto Proyek** (untuk app/projects/page.tsx):
- Simpan di: `public/projects/`
- Format: `namaproyek.jpg` atau `namaproyek.png`
- Ukuran ideal: 800x600px atau 16:9 ratio
- Contoh nama file:
  - `mymovielist.jpg`
  - `kasirku.jpg` 
  - `laundrybiner.jpg`

### 2. **Foto Portfolio Fotografi** (untuk app/photography/page.tsx):
- Simpan di: `public/photography/[kategori]/`
- Format: `nama-deskriptif.jpg`
- Ukuran ideal: 1200x800px atau full resolution
- Contoh nama file:
  - `public/photography/portrait/golden-hour-portrait.jpg`
  - `public/photography/landscape/mountain-sunrise.jpg`
  - `public/photography/street/urban-life.jpg`
  - `public/photography/event/wedding-moment.jpg`

## 🔧 Setelah Upload Foto:

### Untuk Foto Proyek:
1. Beri tahu saya nama file yang sudah diupload
2. Saya akan update `lib/api.ts` untuk mengganti placeholder dengan foto asli
3. Format: `/projects/namafile.jpg`

### Untuk Foto Fotografi:
1. Beri tahu saya:
   - Nama file dan lokasi folder
   - Judul foto
   - Kategori (Portrait/Landscape/Street/Event)
   - Deskripsi singkat
2. Saya akan update data fotografi di `lib/api.ts`

## 📝 Template Informasi Foto:

### Untuk Proyek:
```
Proyek: myMovieList
File: mymovielist.jpg
Lokasi: public/projects/mymovielist.jpg
```

### Untuk Fotografi:
```
Judul: Golden Hour Portrait
Kategori: Portrait
File: golden-hour-portrait.jpg
Lokasi: public/photography/portrait/golden-hour-portrait.jpg
Deskripsi: Portrait dengan cahaya golden hour
```

## ⚡ Tips Optimasi:
- Kompres foto untuk web (gunakan tools seperti TinyPNG)
- Format JPEG untuk foto, PNG untuk screenshot dengan text
- Ukuran file maksimal 500KB per foto untuk performance
- Beri nama file yang deskriptif tanpa spasi (gunakan dash -)

## 🎨 Recommendations:
- Foto proyek: Screenshot terbaik yang menunjukkan UI/UX
- Foto fotografi: Pilih karya terbaik dengan komposisi yang strong
- Konsistensi aspect ratio untuk tampilan yang rapi
