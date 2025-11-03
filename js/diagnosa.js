document.addEventListener('DOMContentLoaded', () => {


    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    const formStep1 = document.getElementById('form-step-1');
    const formStep2 = document.getElementById('form-step-2');

    const osPilihan = document.getElementById('os_pilihan');
    const gejalaListContainer = document.getElementById('gejala-list-container');
    const osDisplayResult = document.getElementById('os-display-result');

    let customerData = {};
    let currentDiagnosisData = {};

    // --- STEP 1: Submit Form Pertama ---
    formStep1.addEventListener('submit', (e) => {
        e.preventDefault();
        customerData = {
            nama: document.getElementById('nama_customer').value,
            brand: document.getElementById('brand_model').value,
            os: osPilihan.value
        };

        loadGejala(customerData.os);

        osDisplayResult.textContent = customerData.os;

        step1.style.display = 'none';
        step2.style.display = 'block';
    });

    // --- STEP 2: Submit Form Kedua (Mulai Diagnosa) ---
    formStep2.addEventListener('submit', (e) => {
        e.preventDefault();

        // Diubah: Kita kumpulkan objek {id, text}
        const selectedGejala = [];
        const checkboxes = document.querySelectorAll('#gejala-list-container input[type="checkbox"]:checked');
        
        checkboxes.forEach(cb => {
            selectedGejala.push({
                id: cb.value,
                // Ambil teks dari label yang membungkus checkbox
                text: cb.parentElement.textContent.trim() 
            });
        });

        // 1. Kirim HANYA ID ke mesin diagnosa
        const selectedGejalaIds = selectedGejala.map(g => g.id);
        const diagnosis = startDiagnosis(selectedGejalaIds, customerData.os);

        // 2. Kirim LIST LENGKAP (dengan teks) ke fungsi display
        displayResults(diagnosis, selectedGejala); // <== Modifikasi di sini

        // Pindah ke step 3
        step2.style.display = 'none';
        step3.style.display = 'block';
    })


    function loadGejala(os) {
        gejalaListContainer.innerHTML = '<p>Pilih kerusakan sesuai yang kamu alami :</p>'; 
        const filteredGejala = db_gejala.filter(g => g.device === os);
        filteredGejala.forEach(g => {
            const label = document.createElement('label');
            label.className = 'checkbox-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'gejala_ids[]';
            checkbox.value = g.id;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(' ' + g.text)); // Tambah spasi
            gejalaListContainer.appendChild(label);
        });
    }

    /* Forward Chaining Logic */

    function startDiagnosis(selectedGejalaIds, os) {
        console.log("Fakta (Gejala Dipilih):", selectedGejalaIds);
        let scores = {};
        const validKerusakanIds = db_kerusakan
            .filter(k => k.device === os)
            .map(k => k.id);

        const relevantRules = db_rules.filter(r => validKerusakanIds.includes(r.id));
        console.log("Aturan yang Relevan:", relevantRules);

        for (const rule of relevantRules) {
            let matchCount = 0;
            for (const id of selectedGejalaIds) {
                if (rule.symptoms.includes(id)) {
                    matchCount++;
                }
            }

            if (matchCount > 0) {
                scores[rule.id] = (matchCount / rule.symptoms.length);
            }
        }

        console.log("Skor Diagnosa (Persentase):", scores);
        let bestMatchId = null;
        let highestScore = 0;

        for (const id in scores) {
            if (scores[id] > highestScore) {
                highestScore = scores[id];
                bestMatchId = id;
            }
        }

        if (bestMatchId) {
            const result = db_kerusakan.find(k => k.id === bestMatchId);
            return {
                name: result.name,
                solution: result.solution
            };
        } else {
            return {
                name: "Tidak ditemukan kerusakan yang cocok.",
                solution: "Silakan hubungi teknisi ahli untuk pemeriksaan lebih lanjut."
            };
        }
    }

    /* Step 3 */

    function displayResults(diagnosis, selectedGejala) {
        const tanggal = new Date().toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        currentDiagnosisData = {
            customer: customerData.nama,
            perangkat: customerData.brand,
            sistemOperasi: customerData.os,
            tanggalDiagnosa: tanggal,
            statusKonsultasi: "Menunggu Balasan Atmint", 

            gejala: selectedGejala.map(g => g.text),
            hasil: {
                kesimpulan: diagnosis.name,
                solusi: diagnosis.solution.split('\n').map(s => s.trim()).filter(s => s !== '') 
            }
        };

        document.getElementById('result-nama').textContent = currentDiagnosisData.customer;
        document.getElementById('result-brand').textContent = currentDiagnosisData.perangkat;
        document.getElementById('result-os').textContent = currentDiagnosisData.sistemOperasi;
        document.getElementById('result-tanggal').textContent = currentDiagnosisData.tanggalDiagnosa;
        
        const gejalaList = document.getElementById('result-gejala');
        gejalaList.innerHTML = ''; // Kosongkan list
        currentDiagnosisData.gejala.forEach(gejalaText => {
            const li = document.createElement('li');
            li.textContent = gejalaText;
            gejalaList.appendChild(li);
        });

        // Tampilkan kesimpulan
        document.getElementById('result-kesimpulan').textContent = diagnosis.name;

        // Tampilkan solusi
        const solusiList = document.getElementById('result-solusi');
        solusiList.innerHTML = ''; 
        currentDiagnosisData.hasil.solusi.forEach(langkah => {
            const li = document.createElement('li');
            li.textContent = langkah;
            solusiList.appendChild(li);
        });

        kirimRiwayatKeServer(currentDiagnosisData);
    }
    
    /* Data dikirim ke php */
    async function kirimRiwayatKeServer(data) {
        try {
            const response = await fetch('simpan_riwayat.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Respon server:', result.message);

        } catch (error) {
            console.error('Gagal mengirim riwayat ke server:', error);
        }
    }

});