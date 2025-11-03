const db_gejala = [
    // Android
    { id: 'A01', text: 'Tidak bisa menyala sama sekali', device: 'Android' },
    { id: 'A02', text: 'Baterai tidak mengisi daya', device: 'Android' },
    { id: 'A03', text: 'Baterai cepat habis', device: 'Android' },
    { id: 'A04', text: 'Smartphone cepat panas / overheating', device: 'Android' },
    { id: 'A05', text: 'Layar sentuh tidak merespons', device: 'Android' },
    { id: 'A06', text: 'Layar pecah/retak', device: 'Android' },
    { id: 'A07', text: 'Layar berkedip atau muncul garis', device: 'Android' },
    { id: 'A08', text: 'Kamera depan tidak berfungsi', device: 'Android' },
    { id: 'A09', text: 'Kamera belakang tidak berfungsi', device: 'Android' },
    { id: 'A10', text: 'Speaker tidak mengeluarkan suara', device: 'Android' },
    { id: 'A11', text: 'Mikrofon tidak berfungsi', device: 'Android' },
    { id: 'A12', text: 'Port USB/charging longgar atau tidak terdeteksi', device: 'Android' },
    { id: 'A13', text: 'SIM card tidak terdeteksi', device: 'Android' },
    { id: 'A14', text: 'Sinyal seluler hilang', device: 'Android' },
    { id: 'A15', text: 'Wi-Fi tidak terhubung (hardware)', device: 'Android' },
    { id: 'A16', text: 'Bluetooth tidak bisa dinyalakan', device: 'Android' },
    { id: 'A17', text: 'GPS tidak akurat atau tidak berfungsi', device: 'Android' },
    { id: 'A18', text: 'Getaran (vibrator) tidak berfungsi', device: 'Android' },
    { id: 'A19', text: 'Tombol power tidak berfungsi', device: 'Android' },
    { id: 'A20', text: 'Tombol volume tidak berfungsi', device: 'Android' },
    { id: 'A21', text: 'Sensor sidik jari tidak berfungsi', device: 'Android' },
    { id: 'A22', text: 'Sensor proximity/gyro tidak berfungsi', device: 'Android' },
    { id: 'A23', text: 'Slot SD card tidak membaca kartu', device: 'Android' },
    { id: 'A24', text: 'Suara panggilan pecah/berdengung', device: 'Android' },
    { id: 'A25', text: 'Headset jack tidak berfungsi', device: 'Android' },
    { id: 'A26', text: 'Bootloop (hanya menampilkan logo)', device: 'Android' },
    { id: 'A27', text: 'Sering restart sendiri', device: 'Android' },
    { id: 'A28', text: 'Lemot / lag parah meski memori lega', device: 'Android' },
    { id: 'A29', text: 'Aplikasi sering force close', device: 'Android' },
    { id: 'A30', text: 'Tidak bisa masuk ke sistem (stuck di recovery/fastboot)', device: 'Android' },
    { id: 'A31', text: 'Error “No IMEI / Baseband”', device: 'Android' },
    { id: 'A32', text: 'Update sistem gagal', device: 'Android' },

    // Windows
    { id: 'L01', text: 'Laptop tidak bisa menyala sama sekali', device: 'Windows' },
    { id: 'L02', text: 'Tidak ada tampilan di layar meskipun lampu power menyala', device: 'Windows' },
    { id: 'L03', text: 'Layar menampilkan garis-garis atau dead pixel', device: 'Windows' },
    { id: 'L04', text: 'Layar berkedip atau backlight mati', device: 'Windows' },
    { id: 'L05', text: 'Kipas pendingin berbunyi keras / abnormal', device: 'Windows' },
    { id: 'L06', text: 'Overheating (panas berlebih pada body)', device: 'Windows' },
    { id: 'L07', text: 'Baterai tidak mengisi daya', device: 'Windows' },
    { id: 'L08', text: 'Baterai cepat habis', device: 'Windows' },
    { id: 'L09', text: 'Adapter/charger panas berlebihan', device: 'Windows' },
    { id: 'L10', text: 'Port USB tidak berfungsi', device: 'Windows' },
    { id: 'L11', text: 'Keyboard beberapa tombol tidak berfungsi', device: 'Windows' },
    { id: 'L12', text: 'Touchpad tidak merespons', device: 'Windows' },
    { id: 'L13', text: 'Harddisk/SSD berbunyi aneh (klik/berderak)', device: 'Windows' },
    { id: 'L14', text: 'Harddisk/SSD tidak terdeteksi', device: 'Windows' },
    { id: 'L15', text: 'RAM tidak terdeteksi / bunyi beep saat boot', device: 'Windows' },
    { id: 'L16', text: 'Laptop mati mendadak saat digunakan', device: 'Windows' },
    { id: 'L17', text: 'Wi-Fi/Bluetooth tidak terdeteksi', device: 'Windows' },
    { id: 'L18', text: 'Port HDMI/VGA tidak menampilkan output', device: 'Windows' },
    { id: 'L19', text: 'Kamera internal tidak berfungsi', device: 'Windows' },
    { id: 'L20', text: 'Speaker internal tidak berbunyi', device: 'Windows' },
    { id: 'L21', text: 'Engsel laptop longgar atau patah', device: 'Windows' },
    { id: 'L22', text: 'Blue Screen of Death (BSOD)', device: 'Windows' },
    { id: 'L23', text: 'Sistem tiba-tiba freeze / hang', device: 'Windows' },
    { id: 'L24', text: 'Booting sangat lambat', device: 'Windows' },
    { id: 'L25', text: 'File hilang atau korup secara tiba-tiba', device: 'Windows' },
    { id: 'L26', text: 'Update driver GPU menyebabkan black screen', device: 'Windows' },
    { id: 'L27', text: 'Explorer.exe sering crash', device: 'Windows' },
    { id: 'L28', text: 'CPU usage 100% tanpa aplikasi berat', device: 'Windows' }
];

const db_kerusakan = [
    // Android
    { id: 'A01', name: 'Kerusakan Baterai', solution: '1. Cek konektor baterai dan IC power\n2. Kalibrasi baterai\n3. Ganti baterai jika rusak', device: 'Android' },
    { id: 'A02', name: 'Kerusakan LCD', solution: '1. Periksa fleksibel LCD\n2. Ganti panel LCD bila pecah atau tidak responsif', device: 'Android' },
    { id: 'A03', name: 'IC Charger Rusak', solution: '1. Periksa port USB dan charger\n2. Ganti IC charger jika tegangan tidak normal', device: 'Android' },
    { id: 'A04', name: 'Kerusakan Kamera', solution: '1. Bersihkan lensa dan cek aplikasi kamera\n2. Ganti modul kamera bila perlu', device: 'Android' },
    { id: 'A05', name: 'Kerusakan Speaker', solution: '1. Bersihkan grill speaker\n2. Cek jalur audio\n3. Ganti speaker jika rusak', device: 'Android' },
    { id: 'A06', name: 'Kerusakan Mikrofon', solution: '1. Periksa lubang mic dari debu\n2. Ganti mikrofon jika tetap tidak berfungsi', device: 'Android' },
    { id: 'A07', name: 'Kerusakan Sinyal', solution: '1. Periksa kartu SIM dan antena\n2. Update atau flash baseband jika perlu', device: 'Android' },
    { id: 'A08', name: 'Bootloop / Sistem Rusak', solution: '1. Wipe cache & data via recovery\n2. Flash firmware resmi\n3. Factory reset', device: 'Android' },
    { id: 'A09', name: 'Driver Audio Error', solution: '1. Reinstall/flash ROM\n2. Update driver audio', device: 'Android' },
    { id: 'A10', name: 'Baseband / IMEI Hilang', solution: '1. Flash ulang modem/baseband\n2. Restore IMEI melalui tool resmi', device: 'Android' },
    
    // Windows
    { id: 'L01', name: 'Motherboard Rusak', solution: '1. Cek adaptor dan power supply\n2. Tes RAM dan prosesor\n3. Ganti motherboard bila rusak', device: 'Windows' },
    { id: 'L02', name: 'Kerusakan RAM', solution: '1. Bersihkan slot RAM\n2. Ganti modul RAM bila tidak terdeteksi', device: 'Windows' },
    { id: 'L03', name: 'Kerusakan Harddisk/SSD', solution: '1. Jalankan diagnosa SMART\n2. Backup data\n3. Ganti HDD/SSD', device: 'Windows' },
    { id: 'L04', name: 'Kerusakan Layar', solution: '1. Periksa kabel fleksibel LCD\n2. Ganti panel LCD/backlight bila perlu', device: 'Windows' },
    { id: 'L05', name: 'Kerusakan Pendingin', solution: '1. Bersihkan kipas dan heatsink\n2. Ganti kipas jika rusak\n3. Ganti thermal paste', device: 'Windows' },
    { id: 'L06', name: 'Baterai Laptop Rusak', solution: '1. Kalibrasi baterai\n2. Ganti baterai bila tidak menampung daya', device: 'Windows' },
    { id: 'L07', name: 'Keyboard Rusak', solution: '1. Bersihkan keyboard\n2. Ganti keycaps atau papan keyboard', device: 'Windows' },
    { id: 'L08', name: 'Touchpad Rusak', solution: '1. Perbarui driver touchpad\n2. Ganti modul touchpad jika tetap tidak berfungsi', device: 'Windows' },
    { id: 'L09', name: 'Port USB Rusak', solution: '1. Periksa driver USB\n2. Ganti port atau motherboard bila jalur rusak', device: 'Windows' },
    { id: 'L10', name: 'Adaptor / Charger Rusak', solution: '1. Cek kabel dan adaptor\n2. Ganti adaptor bila tegangan tidak stabil', device: 'Windows' },
    { id: 'L11', name: 'Wi-Fi Module Rusak', solution: '1. Update driver Wi-Fi\n2. Ganti kartu Wi-Fi bila hardware rusak', device: 'Windows' },
    { id: 'L12', name: 'Blue Screen / Sistem Crash', solution: '1. Jalankan diagnosa memori dan harddisk\n2. Update driver dan Windows\n3. Reinstall Windows bila perlu', device: 'Windows' },
    { id: 'L13', name: 'Windows Corrupt', solution: '1. Jalankan System File Checker (sfc /scannow)\n2. Gunakan fitur Reset/Repair Windows', device: 'Windows' },
    { id: 'L14', name: 'Driver GPU Crash', solution: '1. Rollback atau update driver GPU\n2. Reinstall driver atau ganti GPU bila perlu', device: 'Windows' }
];

const db_rules = [
    // Android Rules
    { id: 'A01', symptoms: ['A02', 'A03'] }, // Kerusakan Baterai
    { id: 'A02', symptoms: ['A05', 'A07', 'A06'] }, // Kerusakan LCD
    { id: 'A03', symptoms: ['A12', 'A01'] }, // IC Charger Rusak
    { id: 'A04', symptoms: ['A09', 'A08'] }, // Kerusakan Kamera
    { id: 'A05', symptoms: ['A10'] }, // Kerusakan Speaker
    { id: 'A06', symptoms: ['A11'] }, // Kerusakan Mikrofon
    { id: 'A07', symptoms: ['A14'] }, // Kerusakan Sinyal
    // (Kerusakan Wi-Fi, Bluetooth, GPS dari SQL tidak ada di tabel kerusakan, saya skip)
    // (Kerusakan Tombol Power, Volume dari SQL tidak ada di tabel kerusakan, saya skip)
    { id: 'A08', symptoms: ['A26', 'A27'] }, // Bootloop / Sistem Rusak
    // (Sistem Lemot / Crash dari SQL tidak ada di tabel kerusakan, saya skip)
    { id: 'A09', symptoms: ['A10'] }, // Driver Audio Error (Asumsi suara hilang = A10)
    { id: 'A10', symptoms: ['A31'] }, // Baseband / IMEI Hilang

    // Windows Rules
    { id: 'L01', symptoms: ['L01', 'L02'] }, // Motherboard Rusak
    { id: 'L02', symptoms: ['L15'] }, // Kerusakan RAM
    { id: 'L03', symptoms: ['L14', 'L13'] }, // Kerusakan Harddisk/SSD
    { id: 'L04', symptoms: ['L03', 'L04'] }, // Kerusakan Layar
    { id: 'L05', symptoms: ['L05'] }, // Kerusakan Pendingin
    // (Overheating dari SQL tidak ada di tabel kerusakan, tapi mirip L05)
    { id: 'L06', symptoms: ['L07', 'L08'] }, // Baterai Laptop Rusak
    { id: 'L07', symptoms: ['L11'] }, // Keyboard Rusak
    { id: 'L08', symptoms: ['L12'] }, // Touchpad Rusak
    { id: 'L09', symptoms: ['L10'] }, // Port USB Rusak
    { id: 'L10', symptoms: ['L09'] }, // Adaptor / Charger Rusak
    { id: 'L11', symptoms: ['L17'] }, // Wi-Fi Module Rusak
    { id: 'L12', symptoms: ['L22', 'L23'] }, // Blue Screen / Sistem Crash
    { id: 'L13', symptoms: ['L24', 'L25'] }, // Windows Corrupt
    { id: 'L14', symptoms: ['L26'] }  // Driver GPU Crash
];