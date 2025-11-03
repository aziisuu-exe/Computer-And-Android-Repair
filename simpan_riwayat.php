<?php
$file_riwayat = 'riwayat-diagnosa.json';
$data_json_baru = file_get_contents('php://input');

if (!empty($data_json_baru)) {
    
    $data_baru = json_decode($data_json_baru);
    $riwayat_lama = [];
    if (file_exists($file_riwayat)) {
        $konten_lama = file_get_contents($file_riwayat);
        $riwayat_lama = json_decode($konten_lama, true);
    }
    array_push($riwayat_lama, $data_baru);
    $json_terbaru = json_encode($riwayat_lama, JSON_PRETTY_PRINT);
    
    file_put_contents($file_riwayat, $json_terbaru);
    echo json_encode(['status' => 'sukses', 'message' => 'Riwayat telah disimpan.']);
    
} else {
    echo json_encode(['status' => 'error', 'message' => 'Tidak ada data yang diterima.']);
}
?>