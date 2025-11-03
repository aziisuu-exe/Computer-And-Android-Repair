document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LOGIKA TAB ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Dapatkan target tab dari atribut 'data-tab'
            const targetId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);

            // Non-aktifkan semua tombol dan konten
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Aktifkan tombol dan konten yang diklik
            button.classList.add('active');
            targetContent.classList.add('active');
        });
    });

    // --- 2. MEMUAT DATA SAAT HALAMAN DIBUKA ---
    
    // Fungsi untuk memuat Riwayat Diagnosa (JSON)
    async function loadRiwayat() {
        const container = document.getElementById('riwayat');
        try {
            // Ambil data dari file JSON
            const response = await fetch('riwayat-diagnosa.json');
            if (!response.ok) throw new Error('File tidak ditemukan');
            
            const data = await response.json();

            // Hapus loader
            container.innerHTML = ''; 

            if (data.length === 0) {
                container.innerHTML = '<p>Belum ada riwayat diagnosa.</p>';
                return;
            }

            // Tampilkan data terbaru (reverse)
            data.reverse().forEach(item => {
                const card = document.createElement('div');
                card.className = 'item-card riwayat-card';
                card.innerHTML = `
                    <h3>${item.customer} - ${item.perangkat}</h3>
                    <p><strong>Tanggal:</strong> ${item.tanggalDiagnosa}</p>
                    <p><strong>OS:</strong> ${item.sistemOperasi}</p>
                    <p><strong>Status:</strong> ${item.statusKonsultasi}</p>
                    <p><strong>Gejala:</strong></p>
                    <ul>${item.gejala.map(g => `<li>${g}</li>`).join('')}</ul>
                    <p style="margin-top: 10px;"><strong>Diagnosa:</strong> ${item.hasil.kesimpulan}</p>
                `;
                container.appendChild(card);
            });

        } catch (error) {
            console.error('Gagal memuat riwayat:', error);
            container.innerHTML = '<p style="color: #E84A5F;">Gagal memuat riwayat. Pastikan file riwayat-diagnosa.json ada.</p>';
        }
    }

    // Fungsi untuk memuat Basis Pengetahuan (data.js)
    function loadBasisPengetahuan() {
        const container = document.getElementById('pengetahuan');
        container.innerHTML = ''; // Kosongkan

        // 1. Tampilkan Kerusakan & Solusi
        container.innerHTML += '<h3 class="sub-header">Data Kerusakan & Solusi</h3>';
        db_kerusakan.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card pengetahuan-card';
            card.innerHTML = `
                <h3>[${item.id}] ${item.name}</h3>
                <p><strong>Perangkat:</strong> ${item.device}</p>
                <p><strong>Solusi:</strong></p>
                <ul>
                    ${item.solution.split('\n').map(s => `<li>${s}</li>`).join('')}
                </ul>
            `;
            container.appendChild(card);
        });

        // 2. Tampilkan Aturan (Rules)
        // container.innerHTML += '<h3 class="sub-header">Data Aturan (Rules)</h3>';
        // db_rules.forEach(item => {
        //     const card = document.createElement('div');
        //     card.className = 'item-card pengetahuan-card';
        //     card.innerHTML = `
        //         <h3>Aturan untuk: ${item.id}</h3>
        //         <p><strong>IF (Gejala):</strong></p>
        //         <ul>
        //             ${item.symptoms.map(sId => `<li>${sId}</li>`).join('')}
        //         </ul>
        //     `;
        //     container.appendChild(card);
        // });
    }

    // Fungsi untuk memuat Daftar Gejala (data.js)
    function loadGejala() {
        const container = document.getElementById('gejala');
        container.innerHTML = ''; // Kosongkan

        // 1. Gejala Android
        container.innerHTML += '<h3 class="sub-header">Gejala Android</h3>';
        const androidGejala = db_gejala.filter(g => g.device === 'Android');
        androidGejala.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card gejala-card';
            card.innerHTML = `<h3>[${item.id}] ${item.text}</h3>`;
            container.appendChild(card);
        });

        // 2. Gejala Windows
        container.innerHTML += '<h3 class="sub-header">Gejala Windows</h3>';
        const windowsGejala = db_gejala.filter(g => g.device === 'Windows');
        windowsGejala.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card gejala-card';
            card.innerHTML = `<h3>[${item.id}] ${item.text}</h3>`;
            container.appendChild(card);
        });
    }

    // Panggil semua fungsi load
    loadRiwayat();
    loadBasisPengetahuan();
    loadGejala();

});