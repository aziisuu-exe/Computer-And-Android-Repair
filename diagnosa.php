<?php
session_start();
require 'koneksi.php';
$step = isset($_POST['step']) ? (int)$_POST['step'] : 1;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AZIISUU.EXE - Diagnosa Kerusakan - </title>
    
    <link rel="stylesheet" href="css/style.css"> 
    <link rel="stylesheet" href="css/diagnosa-style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
</head>
<body>
    
    <header class="container">
        <a href="index.html" class="logo">AZIISUU.EXE</a>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="data.html">Data Kerusakan</a></li>
                <li><a href="diagnosa.html" class="active">Diagnosa Kerusakan</a></li>
                <li><a href="aboutme.html">Aboutme</a></li>
            </ul>
        </nav>
        <a href="login.php" class="btn btn-primary">Admin Login</a>
    </header>


    <div class="main-container">
        <?php if ($step === 1): ?>
            <div class="form-card">
                <h2>Form Diagnosa Kerusakan</h2>
                <form action="diagnosa.php" method="POST">
                    <input type="hidden" name="step" value="2">
                    <div class="input-group">
                        <label for="nama_customer">Nama Customer</label>
                        <input type="text" id="nama_customer" name="nama_customer" placeholder="Enter username" required>
                    </div>
                    <div class="input-group">
                        <label for="brand_model">Nama Brand dan Model Perangkat</label>
                        <input type="text" id="brand_model" name="brand_model" placeholder="Enter brand name" required>
                    </div>
                    <div class="input-group">
                        <label for="os_pilihan">Jenis Sistem Operasi</label>
                        <select id="os_pilihan" name="os_pilihan" required>
                            <option value="" disabled selected>Pilih sistem operasi anda..</option>
                            <option value="Android">Android</option>
                            <option value="Windows">Windows</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-diagnosa">Next</button>
                </form>
            </div>

        <?php elseif ($step === 2):
            $nama_customer = htmlspecialchars($_POST['nama_customer']);
            $brand_model = htmlspecialchars($_POST['brand_model']);
            $os_pilihan = htmlspecialchars($_POST['os_pilihan']);
            $stmt = $koneksi->prepare("SELECT idgejala, gejala FROM gejala WHERE jenis_device = ?");
            $stmt->bind_param("s", $os_pilihan);
            $stmt->execute();
            $result = $stmt->get_result();
        ?>
            <div class="form-card">
                <h2>Keluhan Kerusakan Hardware</h2>
                <div class="os-display"><?php echo $os_pilihan; ?></div>
                <form action="diagnosa.php" method="POST">
                    <input type="hidden" name="step" value="3">
                    <input type="hidden" name="nama_customer" value="<?php echo $nama_customer; ?>">
                    <input type="hidden" name="brand_model" value="<?php echo $brand_model; ?>">
                    <input type="hidden" name="os_pilihan" value="<?php echo $os_pilihan; ?>">
                    <div class="gejala-list">
                        <p>Pilih kerusakan sesuai yang kamu alami :</p>
                        <?php while ($row = $result->fetch_assoc()): ?>
                        <label class="checkbox-item">
                            <input type="checkbox" name="gejala_ids[]" value="<?php echo $row['idgejala']; ?>">
                            <?php echo htmlspecialchars($row['gejala']); ?>
                        </label>
                        <?php endwhile; ?>
                    </div>
                    <button type="submit" class="btn-diagnosa">Mulai Diagnosa</button>
                </form>
            </div>
            <?php $stmt->close(); ?>

        <?php elseif ($step === 3): 
            $nama_customer = htmlspecialchars($_POST['nama_customer']);
            $brand_model = htmlspecialchars($_POST['brand_model']);
            $os_pilihan = htmlspecialchars($_POST['os_pilihan']);
            $gejala_ids = $_POST['gejala_ids'] ?? [];
            
            $kesimpulan = "Tidak ditemukan kerusakan yang cocok.";
            $solusi = "Silakan hubungi teknisi ahli untuk pemeriksaan lebih lanjut.";
            $gejala_texts = [];
            $save_status_message = '';

            if (!empty($gejala_ids)) {
                $placeholders = implode(',', array_fill(0, count($gejala_ids), '?'));
                $stmt_gejala = $koneksi->prepare("SELECT gejala FROM gejala WHERE idgejala IN ($placeholders)");
                $stmt_gejala->bind_param(str_repeat('s', count($gejala_ids)), ...$gejala_ids);
                $stmt_gejala->execute();
                $result_gejala = $stmt_gejala->get_result();
                while ($row = $result_gejala->fetch_assoc()) {
                    $gejala_texts[] = $row['gejala'];
                }
                $stmt_gejala->close();

                $skor_kerusakan = [];
                if(!empty($gejala_texts)) {
                    $placeholders_text = implode(',', array_fill(0, count($gejala_texts), '?'));
                    $stmt_bp = $koneksi->prepare("SELECT namakerusakan FROM basispengetahuan WHERE gejala IN ($placeholders_text)");
                    $stmt_bp->bind_param(str_repeat('s', count($gejala_texts)), ...$gejala_texts);
                    $stmt_bp->execute();
                    $result_bp = $stmt_bp->get_result();
                    while ($row = $result_bp->fetch_assoc()) {
                        $nama_kerusakan = $row['namakerusakan'];
                        if (!isset($skor_kerusakan[$nama_kerusakan])) {
                            $skor_kerusakan[$nama_kerusakan] = 0;
                        }
                        $skor_kerusakan[$nama_kerusakan]++;
                    }
                    $stmt_bp->close();
                }

                if (!empty($skor_kerusakan)) {
                    arsort($skor_kerusakan);
                    $kesimpulan = key($skor_kerusakan);
                    $stmt_solusi = $koneksi->prepare("SELECT caramengatasi FROM kerusakan WHERE namakerusakan = ? AND jenis_device = ?");
                    $stmt_solusi->bind_param("ss", $kesimpulan, $os_pilihan);
                    $stmt_solusi->execute();
                    $result_solusi = $stmt_solusi->get_result();
                    if ($result_solusi->num_rows > 0) {
                        $solusi = $result_solusi->fetch_assoc()['caramengatasi'];
                    }
                    $stmt_solusi->close();
                }

                $tanggal_db = date('Y-m-d');
                $gejala_string = implode(', ', $gejala_texts);
                
                $stmt_insert = $koneksi->prepare("INSERT INTO repair_history (tanggal, brand, jenis_device, gejala, diagnosis) VALUES (?, ?, ?, ?, ?)");
                $stmt_insert->bind_param("sssss", $tanggal_db, $brand_model, $os_pilihan, $gejala_string, $kesimpulan);
                
                if ($stmt_insert->execute()) {
                    $save_status_message = "<p class='save-success'>Hasil diagnosa berhasil disimpan ke riwayat.</p>";
                } else {
                    $save_status_message = "<p class='save-error'>Gagal menyimpan hasil diagnosa: " . $stmt_insert->error . "</p>";
                }
                $stmt_insert->close();
            }
        ?>
            <div class="result-card">
                <h2>Hasil Diagnosa Kerusakan</h2>
                <?php echo $save_status_message; ?>
                <div class="result-info">
                    <p><strong>Nama Customer:</strong> <?php echo $nama_customer; ?></p>
                    <p><strong>Perangkat:</strong> <?php echo $brand_model; ?></p>
                    <p><strong>Sistem Operasi:</strong> <?php echo $os_pilihan; ?></p>
                    <p><strong>Tanggal Diagnosa:</strong> <?php echo date('d F Y'); ?></p>
                </div>
                <hr>
                <div class="result-conclusion">
                    <h3>Kesimpulan</h3>
                    <p class="diagnosis"><?php echo htmlspecialchars($kesimpulan); ?></p>
                </div>
                <div class="result-solution">
                    <h3>Saran Perbaikan</h3>
                    <ul>
                        <?php 
                            $langkah_solusi = explode("\n", htmlspecialchars($solusi));
                            foreach ($langkah_solusi as $langkah) {
                                if(trim($langkah) != '') echo "<li>" . trim($langkah) . "</li>";
                            }
                        ?>
                    </ul>
                </div>
                <a href="diagnosa.php" class="btn-diagnosa">Diagnosa Lagi</a>
            </div>
        <?php endif; ?>
        <?php $koneksi->close(); ?>
    </div>

    <footer>
        <div class="container footer-content">
            <div class="footer-left">
                <p class="logo">AZIISUU.EXE</p>
                <p class="copyright">&copy; 2025 All Rights Reserved</p>
            </div>
            <div class="footer-right">
                <p class="footer-title">Web Dev Gabut :V</p>
                <p class="footer-subtitle">"Cukup kerusakan laptop aja yang asing, kamu jangan."</p>
                <div class="social-media">
                    <a href="#"><img src="img/WA.png" alt="Whatsapp"></a>
                    <a href="#"><img src="img/IG.png" alt="Instagram"></a>
                    <a href="#"><img src="img/TIKTOK.png" alt="TikTok"></a>
                    <a href="#"><img src="img/GIT.png" alt="Github"></a>
                </div>
            </div>
        </div>
    </footer>

</body>
</html>