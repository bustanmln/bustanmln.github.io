/* ==========================================================================
   Bustan Nabiel Maulana — Multi-Layer SPA Portfolio Controller
   - Hash-based SPA View Switching (#home, #experience, #projects, #certificates, #contact)
   - 100% Authentic Local Assets (Case-sensitive verified paths)
   - Interactive Master-Detail Experience & Projects + Multi-Photo Lightbox
   - Interactive Certificates Filter & Next/Prev Lightbox Modal
   - Official Contact Actions with Copy-to-Clipboard
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Authentic Experience Dataset (5 Entries · All 32 Local Photos)
     ------------------------------------------------------------------------ */
  const EXPERIENCES = [
    {
      id: 'exp-sig',
      code: 'EXP-01',
      track: 'industrial',
      trackLabel: 'Industrial Internship',
      role: 'Instrumentation Maintenance Intern',
      org: 'PT Semen Indonesia (Persero) Tbk (SIG) — Pabrik Tuban',
      institution: 'ELINS KC 3-4 Sector',
      period: 'Jul 2026 — Aug 2026',
      summary:
        'Hands-on field maintenance and precision calibration of industrial weighing instrumentation, process transmitters, control valves, and PLC/HMI/SCADA interconnections in cement manufacturing operations.',
      bullets: [
        'Mengawal pemeliharaan sistem instrumentasi industri dan kalibrasi load cell pada Pulverized Weigher (PW 2 & PW 3).',
        'Melakukan verifikasi zero/span serta menganalisis deviasi pengukuran presisi sebelum dan sesudah kalibrasi.',
        'Inspeksi rutin sensor industri, transmitter, control valve, dan interkoneksi PLC/HMI/SCADA pada proses manufaktur semen.',
        'Mengoperasikan tools industri spesifik: CSC Tools, Pfister HyperTerminal, dan MOVIDRIVE.'
      ],
      tags: ['PLC', 'HMI', 'SCADA', 'Load Cell Calibration', 'Industrial Instrumentation', 'CSC Tools', 'Pfister HyperTerminal', 'MOVIDRIVE'],
      links: [],
      photos: [
        { src: 'images/experience/Instrumentation Maintenance Intern/Semen1.JPG', caption: 'Field instrumentation maintenance at PT Semen Indonesia (SIG) Pabrik Tuban — ELINS KC 3-4' },
        { src: 'images/experience/Instrumentation Maintenance Intern/Semen2.jpg', caption: 'Industrial instrumentation calibration and system inspection documentation' },
        { src: 'images/experience/Instrumentation Maintenance Intern/Semen3.jpg', caption: 'On-site field engineering work at SIG Pabrik Tuban' }
      ]
    },
    {
      id: 'exp-iris',
      code: 'EXP-02',
      track: 'lab',
      trackLabel: 'Lab Coordination & Research',
      role: 'IRIS Laboratory Coordinator & Practicum Assistant',
      org: 'IRIS (IoT Runtime and Integration System Laboratory)',
      institution: 'Universitas Telkom',
      period: '2026 — 2027',
      summary:
        'Leading laboratory assistant operations, applied IoT runtime research, and advanced embedded integration practicum for undergraduate Electrical Engineering students.',
      bullets: [
        'Memimpin tim asisten laboratorium, mengelola jadwal praktikum, dan memastikan kualitas penyelenggaraan modul IoT tingkat lanjut.',
        'Mengelola riset terapan IoT termasuk integrasi sistem runtime dan eksperimen perangkat keras terhubung.',
        'Menyelenggarakan praktikum sistem integrasi IoT tingkat lanjut (ESP32, Arduino, manajemen data sensor, dan arsitektur komunikasi data) untuk mahasiswa S1 Teknik Elektro.'
      ],
      tags: ['IoT Systems', 'Lab Coordination', 'Applied Research', 'ESP32 / Arduino', 'Runtime Integration'],
      links: [
        { label: 'Elitia / I-IoT Lab', url: 'https://www.instagram.com/elitia_laboratory' }
      ],
      photos: [
        { src: 'images/experience/IRIS Laboratory/lab_iris.jpg', caption: 'IRIS Laboratory — IoT Runtime and Integration System activity' },
        { src: 'images/experience/IRIS Laboratory/iris2.jpg', caption: 'IoT hardware integration and practicum coordination at IRIS Lab' },
        { src: 'images/experience/IRIS Laboratory/iris3.jpg', caption: 'Connected sensor systems & lab session documentation' }
      ]
    },
    {
      id: 'exp-spell',
      code: 'EXP-03',
      track: 'lab',
      trackLabel: 'Research Assistant',
      role: 'SPELL Laboratory Research Assistant',
      org: 'SPELL (Signal Processing & Learning for Spatial Intelligence)',
      institution: 'Universitas Telkom',
      period: '2026 — 2027',
      summary:
        'Conducting applied signal processing and spatial intelligence research using high-speed sensor acquisition, embedded microcontrollers, and machine learning pipelines.',
      bullets: [
        'Melaksanakan riset pemrosesan sinyal dan kecerdasan spasial berbasis data sensor.',
        'Menganalisis dan mengolah data sensor untuk pengembangan algoritma spatial intelligence serta sistem deteksi berbasis ultrasonik.',
        'Berkontribusi pada proyek-proyek riset terapan di bidang signal processing, sensor fusion, dan machine learning.'
      ],
      tags: ['Signal Processing', 'Spatial Intelligence', 'Sensor Data', 'Machine Learning', 'Python'],
      links: [],
      photos: [
        { src: 'images/experience/SPELL Laboratory/spell1.jpg', caption: 'SPELL Laboratory research session — Signal Processing & Spatial Intelligence' },
        { src: 'images/experience/SPELL Laboratory/ayoberaksi1.jpg', caption: 'Applied instrumentation & laboratory outreach collaboration' }
      ]
    },
    {
      id: 'exp-daskom',
      code: 'EXP-04',
      track: 'lab',
      trackLabel: 'Hardware & Logistics Leadership',
      role: 'Daskom Laboratory — PJ Hardware, Koord. MLC & Asprak',
      org: 'Basic Computing Laboratory (Laboratorium Dasar Komputer)',
      institution: 'Universitas Telkom',
      period: '2024 — 2026',
      summary:
        'Multi-year leadership and teaching tenure at Basic Computing Laboratory spanning hardware infrastructure maintenance, Maintenance & Logistics Committee coordination, DLOR 2025 logistics, and C programming practicum instruction.',
      bullets: [
        'Penanggung Jawab Hardware (2025/2026): Memastikan seluruh infrastruktur komputer laboratorium berfungsi optimal melalui instalasi, konfigurasi, dan perbaikan perangkat keras mandiri serta koordinasi teknis dengan Kepala Urusan Laboratorium FTE.',
        'Koordinator Maintenance & Logistic Committee / MLC (2024/2025) & Koordinator Logistik DLOR 2025: Mengelola inventaris laboratorium, pengadaan sarana teknis, koordinasi ruangan rekrutmen DLOR 2025, serta revisi modul materi.',
        'Asisten Praktikum Algoritma & Pemrograman (2024–2026): Membimbing mahasiswa Teknik Elektro & Teknik Fisika menguasai logika algoritma Bahasa C, debugging kode, serta evaluasi tugas dan ujian responsi.'
      ],
      tags: ['Hardware Maintenance', 'Logistics & Inventory', 'C Programming', 'Lab Coordination', 'DLOR 2025', 'MLC'],
      links: [
        { label: '@telu.daskom', url: 'https://www.instagram.com/telu.daskom' }
      ],
      photos: [
        { src: 'images/experience/Daskom Laboratory/lab_daskom.jpg', caption: 'Basic Computing Laboratory (Daskom) — Telkom University' },
        { src: 'images/experience/Daskom Laboratory/aslab1.jpg', caption: 'PJ Hardware — Laboratory PC infrastructure & hardware maintenance (1/3)' },
        { src: 'images/experience/Daskom Laboratory/aslab2.jpg', caption: 'PJ Hardware — Technical setup & faculty lab coordination (2/3)' },
        { src: 'images/experience/Daskom Laboratory/aslab3.jpg', caption: 'PJ Hardware — Basic Computing Laboratory team (3/3)' },
        { src: 'images/experience/Daskom Laboratory/asprak1.jpg', caption: 'Practicum Assistant — C Programming & Algorithm session (1/3)' },
        { src: 'images/experience/Daskom Laboratory/asprak2.jpg', caption: 'Practicum Assistant — Student debugging & guidance (2/3)' },
        { src: 'images/experience/Daskom Laboratory/asprak3.jpg', caption: 'Practicum Assistant — Lab evaluation & responsi (3/3)' },
        { src: 'images/experience/Daskom Laboratory/korlog1.jpg', caption: 'Koordinator Logistik DLOR 2025 — Operational preparation (1/3)' },
        { src: 'images/experience/Daskom Laboratory/korlog2.jpg', caption: 'Koordinator Logistik DLOR 2025 — Technical hardware logistics (2/3)' },
        { src: 'images/experience/Daskom Laboratory/korlog3.jpg', caption: 'Koordinator Logistik DLOR 2025 — Cross-division execution (3/3)' },
        { src: 'images/experience/Daskom Laboratory/mlc1.jpg', caption: 'Maintenance & Logistic Committee (MLC) — Inventory & team coordination (1/3)' },
        { src: 'images/experience/Daskom Laboratory/mlc2.jpg', caption: 'Maintenance & Logistic Committee (MLC) — Facility readiness (2/3)' },
        { src: 'images/experience/Daskom Laboratory/mlc3.jpg', caption: 'Maintenance & Logistic Committee (MLC) — Operational review (3/3)' }
      ]
    },
    {
      id: 'exp-community',
      code: 'EXP-05',
      track: 'community',
      trackLabel: 'Community Service & STEM',
      role: 'Community Service & STEM Outreach Initiatives',
      org: 'AyoBerAKSI Telkom · PPM Tel-U · IEEE STEM · Novo Club ParagonCorp',
      institution: 'Multi-Institution (Bandung & Jawa Barat)',
      period: '2024 — 2026',
      summary:
        'Technical training, environmental IoT deployment, and youth STEM outreach across vocational high schools and local communities in West Java.',
      bullets: [
        'AyoBerAKSI 2025 Telkom Indonesia — SMKN 8 Bandung (30 Sep 2025): Panitia & pemateri Pelatihan Sistem IoT dan Power Monitoring berbasis Internet of Things bagi siswa SMK.',
        'Pengabdian Masyarakat TPS Sindangkerta (2026): Implementasi dan pendampingan sistem monitoring kualitas udara untuk pengelolaan lingkungan masyarakat.',
        'IEEE Pre-University STEM Grant — SMKN 07 Baleendah (2024): Mengedukasi siswa mengenai fundamental teknologi meliputi flowchart, kolaborasi dasar GitHub, dan pengenalan Computer Vision.',
        'Novo Club Batch 3 & Novo Club in Action by ParagonCorp (2024): Region 3 Jawa Barat Kelompok 38 (Leviosa Altus) bersama Puskesmas Cilengkrang di SMPN 02 Cilengkrang (27 Jul 2024) — meraih Top 30 Project Report NCIA.'
      ],
      tags: ['IoT Training', 'Air Quality Monitoring', 'IEEE STEM', 'Computer Vision Outreach', 'ParagonCorp NCIA Top 30'],
      links: [
        { label: 'AyoBerAKSI Reel', url: 'https://www.instagram.com/reel/DQeij3mDx96/' },
        { label: 'IEEE STEM Reel', url: 'https://www.instagram.com/reel/DCtJzbqOP46/' },
        { label: 'Leviosa Altus', url: 'https://www.instagram.com/senja.by.leviosaaltus' }
      ],
      photos: [
        { src: 'images/experience/Community Service/ayoberaksi1.jpg', caption: 'AyoBerAKSI 2025 — IoT Power Monitoring training at SMKN 8 Bandung (1/3)' },
        { src: 'images/experience/Community Service/ayoberaksi2.jpg', caption: 'AyoBerAKSI 2025 — Hands-on sensor & power monitoring session (2/3)' },
        { src: 'images/experience/Community Service/ayoberaksi3.jpg', caption: 'AyoBerAKSI 2025 — Committee & participants at SMKN 8 Bandung (3/3)' },
        { src: 'images/experience/Community Service/pengmasbaa.jpg', caption: 'Pengabdian Masyarakat 2026 — Air Quality Monitoring at TPS Sindangkerta (1/3)' },
        { src: 'images/experience/Community Service/pengmasbaa2.jpg', caption: 'Pengabdian Masyarakat 2026 — Field deployment & calibration (2/3)' },
        { src: 'images/experience/Community Service/pengmasbaa3.JPG', caption: 'Pengabdian Masyarakat 2026 — Community handover documentation (3/3)' },
        { src: 'images/experience/Community Service/ieee2.jpg', caption: 'IEEE Pre-University STEM Grant — Workshop at SMKN 07 Baleendah (1/2)' },
        { src: 'images/experience/Community Service/ieee3.jpg', caption: 'IEEE Pre-University STEM Grant — Flowchart, GitHub & CV mentoring (2/2)' },
        { src: 'images/experience/Community Service/novo1.jpg', caption: 'Novo Club in Action (ParagonCorp) — SMPN 02 Cilengkrang workshop (1/3)' },
        { src: 'images/experience/Community Service/novo2.jpg', caption: 'Novo Club in Action — Group 38 Leviosa Altus community session (2/3)' },
        { src: 'images/experience/Community Service/novo3.jpg', caption: 'Novo Club in Action — Closing & appreciation ceremony (3/3)' }
      ]
    }
  ];

  /* ------------------------------------------------------------------------
     2. Authentic Projects Dataset (4 Projects · All 17 Local Photos)
     ------------------------------------------------------------------------ */
  const PROJECTS = [
    {
      id: 'prj-sipesat',
      code: 'PRJ-01',
      category: 'iot',
      categoryLabel: 'IoT & Computer Vision · AI Sorting',
      period: 'Active Project · 2026',
      title: 'SIPESAT – Sistem Pemilah Sampah Terpadu',
      shortDesc:
        'Integrated waste sorting system that automatically classifies waste into 6 categories using on-device Computer Vision with <1s detection latency and >90% target accuracy.',
      problem:
        'Waste management at collection points lacks automated sorting mechanisms, resulting in low recycling rates and high cross-contamination of recyclable materials.',
      solution:
        'Engineered an end-to-end automated sorting system powered by Raspberry Pi 4. OpenCV captures real-time visual frames while TensorFlow Lite performs on-device 6-class inference. Servo actuators and a belt conveyor mechanically route waste into designated bins, synchronized to a Firebase real-time monitoring dashboard with <5s latency.',
      metrics: [
        { label: 'Classes', value: '6 Categories' },
        { label: 'Inference', value: '< 1s Latency' },
        { label: 'Accuracy', value: '> 90% Target' },
        { label: 'Cloud Sync', value: '< 5s Firebase' }
      ],
      stack: ['Raspberry Pi 4', 'Python', 'TensorFlow Lite', 'OpenCV', 'Firebase', 'Servo Actuators', 'Belt Conveyor'],
      repoUrl: 'https://github.com/bustanmln',
      photos: [
        { src: 'images/projects/SIPESAT – Sistem Pemilah Sampah Terpadu/IMG_20261120_103621.jpg', caption: 'SIPESAT integrated automated waste sorting hardware assembly' },
        { src: 'images/projects/SIPESAT – Sistem Pemilah Sampah Terpadu/IMG_20260531_163843.jpg', caption: 'Mechanical conveyor, camera gantry, and sorting chamber build' },
        { src: 'images/projects/SIPESAT – Sistem Pemilah Sampah Terpadu/IMG-20260602-WA0106.jpg', caption: 'System wiring, embedded compute module, and actuator integration' },
        { src: 'images/projects/SIPESAT – Sistem Pemilah Sampah Terpadu/IMG_20260602_211549.jpg', caption: 'Testing & validation of automated waste classification pipeline' }
      ]
    },
    {
      id: 'prj-iot-power',
      code: 'PRJ-02',
      category: 'iot',
      categoryLabel: 'IoT & Machine Learning · Instrumentation',
      period: 'Deployed System · 2025',
      title: 'IoT Power Intensity Control & Energy Monitoring with KNN',
      shortDesc:
        'Real-time electrical power consumption monitoring and electricity cost estimation featuring K-Nearest Neighbor (KNN) anomaly classification and adaptive overload protection.',
      problem:
        'Households and small facilities lack granular real-time visibility into power draw, leading to unexpectedly high electricity bills and undetected abnormal consumption patterns or overload faults.',
      solution:
        'Built an ESP32-based instrumentation node paired with a PZEM-004T module for accurate voltage, current, active power, and energy metering, combined with an AC Dimmer circuit for load intensity control. Deployed a K-Nearest Neighbor (KNN) classifier to detect anomalous power usage and trigger adaptive overload protection, streaming live telemetry to Firebase Cloud and a custom Android Studio companion app.',
      metrics: [
        { label: 'Metering', value: 'PZEM-004T AC' },
        { label: 'ML Model', value: 'KNN Classifier' },
        { label: 'Protection', value: 'AC Dimmer Cut' },
        { label: 'Telemetry', value: 'Firebase + App' }
      ],
      stack: ['ESP32', 'PZEM-004T', 'KNN Algorithm', 'AC Dimmer', 'Firebase', 'Android Studio', 'Power Electronics'],
      repoUrl: 'https://github.com/bustanmln',
      photos: [
        { src: 'images/projects/IoT Power Intensity Control & Energy Monitoring with KNN/iot1.jpg', caption: 'IoT Power Intensity Control & Energy Monitoring hardware prototype' },
        { src: 'images/projects/IoT Power Intensity Control & Energy Monitoring with KNN/iot2.jpg', caption: 'ESP32, PZEM-004T power metering, and AC Dimmer circuit wiring' },
        { src: 'images/projects/IoT Power Intensity Control & Energy Monitoring with KNN/iot3.jpg', caption: 'Real-time monitoring telemetry and KNN anomaly classification validation' }
      ]
    },
    {
      id: 'prj-sumo',
      code: 'PRJ-03',
      category: 'robotics',
      categoryLabel: 'Robotics & Embedded Control',
      period: 'Competition Robot · 2025',
      title: 'Autonomous Sumo Robot Navigation System',
      shortDesc:
        'High-speed autonomous sumo robot integrating Time-of-Flight opponent tracking, optical arena boundary detection, and closed-loop embedded C motor control.',
      problem:
        'Autonomous sumo competitions require millisecond-level sensor fusion and deterministic motor actuation to lock onto opponents while preventing arena ring-outs under high acceleration.',
      solution:
        'Designed an ESP32-controlled autonomous sumo robot driven by a TB6612FNG dual H-bridge motor driver for responsive bi-directional torque control. Integrated VL53L0X Time-of-Flight (ToF) laser ranging sensors for opponent acquisition and TCRT5000 reflective optical sensors for real-time dojo line detection, orchestrated by deterministic Embedded C closed-loop firmware.',
      metrics: [
        { label: 'MCU', value: 'ESP32 (C)' },
        { label: 'Ranging', value: 'VL53L0X ToF' },
        { label: 'Boundary', value: 'TCRT5000 Line' },
        { label: 'Driver', value: 'TB6612FNG' }
      ],
      stack: ['ESP32', 'Embedded C', 'VL53L0X ToF', 'TB6612FNG', 'TCRT5000', 'Closed-Loop Control', 'Robotics'],
      repoUrl: 'https://github.com/bustanmln',
      photos: [
        { src: 'images/projects/Autonomous Sumo Robot Navigation System/sumo.jpg', caption: 'Autonomous Sumo Robot completed chassis and front dozer assembly' },
        { src: 'images/projects/Autonomous Sumo Robot Navigation System/IMG_20260620_100539.jpg', caption: 'Internal electronics layout: ESP32, motor driver, and power rail' },
        { src: 'images/projects/Autonomous Sumo Robot Navigation System/IMG_20260620_103519.jpg', caption: 'Optical & Time-of-Flight sensor placement calibration' },
        { src: 'images/projects/Autonomous Sumo Robot Navigation System/IMG-20260616-WA0042(1).jpg', caption: 'Hardware prototyping and PCB/wiring bench test (1/3)' },
        { src: 'images/projects/Autonomous Sumo Robot Navigation System/IMG-20260616-WA0044(1).jpg', caption: 'Hardware prototyping and sensor response tuning (2/3)' },
        { src: 'images/projects/Autonomous Sumo Robot Navigation System/IMG-20260616-WA0047.jpg', caption: 'Arena testing and autonomous maneuver validation (3/3)' }
      ]
    },
    {
      id: 'prj-agv',
      code: 'PRJ-04',
      category: 'robotics',
      categoryLabel: 'Industrial Safety & Ultrasonic Sensing',
      period: 'Research Project · 2025 — 2026',
      title: 'AGV Blind Spot Detection & 3D Ultrasonic Sensing System',
      shortDesc:
        'Distributed ultrasonic sensor array and phased-array beamforming research for 360-degree blind spot collision prevention on Autonomous Guided Vehicles (AGVs).',
      problem:
        'Autonomous Guided Vehicles (AGVs) operating in dense industrial and warehouse corridors suffer from perimeter blind spots that create collision hazards with personnel and stationary obstacles.',
      solution:
        'Researched and built a distributed ultrasonic proximity array covering critical AGV blind spot zones for 360-degree obstacle awareness, alongside 3D Ultrasonic Phased-Array Scanner experimentation using dual hardware-triggered Teensy microcontrollers for beamforming and high-speed raw ultrasonic data acquisition (4.6 Mbps) processed via Python.',
      metrics: [
        { label: 'Coverage', value: '360° Perimeter' },
        { label: 'Throughput', value: '4.6 Mbps Raw' },
        { label: 'Sync MCU', value: 'Dual Teensy' },
        { label: 'Pipeline', value: 'Python 3D' }
      ],
      stack: ['Ultrasonic Array', 'Phased-Array Beamforming', 'Teensy MCU', 'AGV Safety', 'Sensor Fusion', 'Python'],
      repoUrl: 'https://github.com/bustanmln',
      photos: [
        { src: 'images/projects/AGV Blind Spot Detection System/lab_spell.jpg', caption: 'Distributed ultrasonic sensing test bench at SPELL Laboratory' },
        { src: 'images/projects/AGV Blind Spot Detection System/ultrasonic1.jpg', caption: 'Ultrasonic phased-array transducer board & dual microcontroller setup (1/3)' },
        { src: 'images/projects/AGV Blind Spot Detection System/ultrasonic2.jpg', caption: 'Hardware trigger synchronization and signal acquisition testing (2/3)' },
        { src: 'images/projects/AGV Blind Spot Detection System/ultrasonic3.jpg', caption: 'Sensor array calibration and obstacle detection validation (3/3)' }
      ]
    }
  ];

  /* ------------------------------------------------------------------------
     3. Authentic Official Certificates Dataset (All 13 Unique Credentials)
     ------------------------------------------------------------------------ */
  const CERTIFICATES = [
    {
      id: 'oracle-ai',
      category: 'ai',
      tag: 'Global Credential',
      date: 'Agustus 2025',
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle University',
      credId: '102296358OCI25AICFA',
      image: 'images/certificates/oracle_ai_foundations.png',
      desc: 'Sertifikasi internasional resmi dari Oracle University yang memvalidasi keahlian komprehensif terkait konsep Artificial Intelligence, Machine Learning, Deep Learning, arsitektur Large Language Models (LLM), Generative AI, layanan Oracle Cloud Infrastructure (OCI) AI, serta prinsip Responsible AI.'
    },
    {
      id: 'sic-ai',
      category: 'ai',
      tag: 'Industry Intensive',
      date: 'Januari 2026',
      title: 'Samsung Innovation Campus Batch 7: Stage 3 — AI: Crafting Thoughts for Machines',
      issuer: 'Samsung & ibimbing',
      credId: '219/SEIN-CC-SIC7/AI/Mahasiswa/2025-2026',
      image: 'images/certificates/sic_stage3_ai.png',
      desc: 'Tahap lanjutan Samsung Innovation Campus Batch 7 yang berfokus pada perancangan arsitektur deep learning, neural networks, pelatihan dan optimasi model AI, computer vision, serta implementasi pipeline AI siap industri.'
    },
    {
      id: 'sic-iot',
      category: 'iot',
      tag: 'Hardware & IoT',
      date: 'Desember 2025',
      title: 'Samsung Innovation Campus Batch 7: Stage 2 — IoT (Device & Hardware Discovery)',
      issuer: 'Samsung & ibimbing',
      credId: '579/SEIN-CC-SIC7/IoT/Mahasiswa/2025-2026',
      image: 'images/certificates/sic_stage2_iot.png',
      desc: 'Tahap perantara terakreditasi fokus pada embedded systems, pemrograman mikrokontroler, sensor interfacing, implementasi protokol komunikasi IoT (MQTT/HTTP), dan konektivitas cloud telemetri perangkat pintar.'
    },
    {
      id: 'sic-python',
      category: 'iot',
      tag: 'Core Software',
      date: 'Oktober 2025',
      title: 'Samsung Innovation Campus Batch 7: Stage 1 — Code Kickstart: Python Programming',
      issuer: 'Samsung & ibimbing',
      credId: '0579/SEIN-CC-SIC7/CP/Mahasiswa/2025-2026',
      image: 'images/certificates/sic_stage1_python.png',
      desc: 'Tahap fondasi terakreditasi Samsung Innovation Campus mencakup pemrograman Python tingkat lanjut, struktur data efisien, paradigma Object-Oriented Programming (OOP), dan pemecahan masalah algoritma komputasional.'
    },
    {
      id: 'sic-b6',
      category: 'ai',
      tag: 'Competitive Selection',
      date: 'Desember 2024',
      title: 'Samsung Innovation Campus Batch 6: Logic Test (AI in Everyday Life)',
      issuer: 'Samsung & Hacktiv8 Indonesia',
      credId: 'SIC6-LOGIC-2024',
      image: 'images/certificates/sic_batch6_logic.png',
      desc: 'Sertifikat partisipasi dan kelulusan uji logika komputasional tingkat nasional dalam seleksi program Samsung Innovation Campus Batch 6 (AI in Everyday Life) bersama Hacktiv8 Indonesia.'
    },
    {
      id: 'pj-hw',
      category: 'leadership',
      tag: 'Academic Leadership',
      date: 'Januari 2026',
      title: 'Penanggung Jawab Hardware & Asisten Praktikum Algoritma & Pemrograman 2025/2026',
      issuer: 'Dekan FTE Telkom University',
      credId: 'SAP-690/AKD9/TE-DEK/2026',
      image: 'images/certificates/pj_hw_daskom_2026.png',
      desc: 'Surat keputusan dan sertifikat resmi Dekan Fakultas Teknik Elektro Telkom University (Prof. Dr. Achmad Rizal, S.T., M.T.) atas kontribusi sebagai Penanggung Jawab Hardware dan Asisten Praktikum Algoritma dan Pemrograman di Lab Dasar Komputer.'
    },
    {
      id: 'koord-ml',
      category: 'leadership',
      tag: 'Laboratory Management',
      date: 'Januari 2025',
      title: 'Koordinator Divisi Maintenance & Logistic Committee (MLC) & Asprak 2024/2025',
      issuer: 'Dekan FTE Telkom University',
      credId: 'SAP-686/AKD7/TE-DEK/2025',
      image: 'images/certificates/koord_ml_daskom_2025.png',
      desc: 'Sertifikat resmi Dekan Fakultas Teknik Elektro Telkom University (Dr. Ir. Bambang Setia Nugroho, S.T., M.T.) atas kepemimpinan sebagai Koordinator Divisi MLC serta Asisten Praktikum di Laboratorium Dasar Komputer.'
    },
    {
      id: 'abdimas-iot',
      category: 'leadership',
      tag: 'Community Impact',
      date: 'Januari 2026',
      title: 'Panitia Pengabdian Masyarakat: Pelatihan Power Monitoring IoT di SMKN 8 Bandung',
      issuer: 'Direktur PPM Telkom University',
      credId: '0609/ABD08/PPM-JPM/2026',
      image: 'images/certificates/abdimas_iot_monitoring.png',
      desc: 'Sertifikat kepanitiaan resmi Direktur PPM Telkom University (Dr. Eng Faisal Budiman, S.T., M.Sc.) dalam kegiatan Pengabdian Kepada Masyarakat bertajuk Peningkatan Kompetensi Siswa SMK Melalui Pelatihan Power Monitoring IoT di SMKN 8 Bandung (30 Sep 2025).'
    },
    {
      id: 'dicoding',
      category: 'iot',
      tag: 'Systems Programming',
      date: 'Jul 2024 – Jul 2027',
      title: 'Memulai Pemrograman Dengan C — Dicoding Academy',
      issuer: 'Dicoding Academy Indonesia',
      credId: '07Z60MRQMZQR',
      image: 'images/certificates/dicoding_c_programming.png',
      desc: 'Sertifikat kompetensi kelulusan terakreditasi Dicoding Academy Indonesia dalam penguasaan bahasa pemrograman C, manajemen memori pointer, alokasi memori dinamis, struktur data, dan standard I/O untuk embedded systems.'
    },
    {
      id: 'skilvul-dasar',
      category: 'iot',
      tag: 'Software Foundation',
      date: 'Maret 2024',
      title: 'Python Dasar — Certificate of Completion',
      issuer: 'Skilvul.com',
      credId: 'SKILVUL-PY-DASAR-2024',
      image: 'images/certificates/skilvul_python_dasar.png',
      desc: 'Sertifikasi kelulusan resmi dari Skilvul yang menguji pemahaman fundamental sintaksis Python, struktur data primitif, seleksi, iterasi, fungsi modular, dan procedural programming.'
    },
    {
      id: 'skilvul-lanjutan',
      category: 'iot',
      tag: 'Advanced OOP',
      date: 'Maret 2024',
      title: 'Python Lanjutan — Certificate of Completion',
      issuer: 'Skilvul.com',
      credId: 'SKILVUL-PY-LANJUT-2024',
      image: 'images/certificates/skilvul_python_lanjutan.png',
      desc: 'Sertifikasi kelulusan lanjutan dari Skilvul yang memverifikasi keahlian arsitektur Object-Oriented Programming (OOP) pada Python, enkapsulasi, inheritance, exception handling terstruktur, dan pengolahan file.'
    },
    {
      id: 'novo-comp',
      category: 'leadership',
      tag: 'Leadership & Innovation',
      date: 'Agustus 2024',
      title: 'Novo Club Batch 3 — Certificate of Completion',
      issuer: 'ParagonCorp & Pemimpin.id',
      credId: 'PARAGON-NOVO-BATCH3',
      image: 'images/certificates/novo_club_completion.png',
      desc: 'Sertifikat kelulusan atas penyelesaian seluruh rangkaian program kepemimpinan dan inovasi sosial nasional Novo Club Batch 3 (6 Mar – 28 Agu 2024) oleh PT Paragon Technology and Innovation (ParagonCorp) bersama Pemimpin.id.'
    },
    {
      id: 'novo-part',
      category: 'leadership',
      tag: 'Bootcamp Training',
      date: 'April 2024',
      title: 'Novo Club Leadership Bootcamp — Certificate of Participation',
      issuer: 'ParagonCorp & Pemimpin.id',
      credId: 'PARAGON-BOOTCAMP-2024',
      image: 'images/certificates/novo_leadership_bootcamp.png',
      desc: 'Sertifikat partisipasi resmi pelatihan intensif Novo Club Leadership Bootcamp Online Training (6 Mar – 6 Apr 2024) oleh ParagonCorp untuk pengembangan kepemimpinan strategis dan eksekusi proyek kolaboratif.'
    }
  ];

  /* ------------------------------------------------------------------------
     Icons (Crisp Inline SVGs — Zero Emoji)
     ------------------------------------------------------------------------ */
  const ICONS = {
    prev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>',
    next: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    expand: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
    ext: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>'
  };

  /* ------------------------------------------------------------------------
     Utility Helpers
     ------------------------------------------------------------------------ */
  function safeUrl(path) {
    return encodeURI(path);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeAttrUrl(path) {
    return escapeHtml(encodeURI(path));
  }

  function copyToClipboard(text, btnEl, defaultHtml) {
    const done = function () {
      if (!btnEl) return;
      btnEl.innerHTML = ICONS.check + ' <span>Copied</span>';
      setTimeout(function () {
        btnEl.innerHTML = defaultHtml;
      }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text, done);
      });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
    cb();
  }

  /* ------------------------------------------------------------------------
     4. Multi-Layer SPA Router (#home, #experience, #projects, #certificates, #contact)
     ------------------------------------------------------------------------ */
  const VALID_VIEWS = ['home', 'experience', 'projects', 'certificates', 'contact'];
  let activeView = 'home';

  function resolveViewFromHash(rawHash) {
    const cleaned = (rawHash || '').replace(/^#/, '').trim().toLowerCase();
    if (cleaned === 'about') return 'home';
    return VALID_VIEWS.includes(cleaned) ? cleaned : 'home';
  }

  function navigateTo(viewId, updateHash) {
    const target = VALID_VIEWS.includes(viewId) ? viewId : 'home';
    activeView = target;

    VALID_VIEWS.forEach(function (v) {
      const layer = document.getElementById('view-' + v);
      if (layer) layer.classList.toggle('active', v === target);
    });

    document.querySelectorAll('[data-nav-view]').forEach(function (el) {
      const isCurrent = el.getAttribute('data-nav-view') === target;
      el.classList.toggle('active', isCurrent);
      if (isCurrent) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });

    if (updateHash !== false && window.location.hash !== '#' + target) {
      window.location.hash = target;
    }

    // Close mobile drawer if open
    const drawer = document.getElementById('mobile-drawer');
    const toggle = document.getElementById('mobile-menu-btn');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    // Reset scroll cleanly to top of newly opened layer
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ------------------------------------------------------------------------
     5. Theme Management (Light / Dark / System)
     ------------------------------------------------------------------------ */
  const THEME_KEY = 'bustan-theme-preference';
  const colorQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };

  function getStoredTheme() {
    try {
      const v = localStorage.getItem(THEME_KEY);
      if (v === 'light' || v === 'dark' || v === 'system') return v;
    } catch (_) {}
    return 'system';
  }

  function applyTheme(pref, persist) {
    const valid = pref === 'light' || pref === 'dark' || pref === 'system' ? pref : 'system';
    if (persist) {
      try { localStorage.setItem(THEME_KEY, valid); } catch (_) {}
    }
    const resolved = valid === 'dark' ? 'dark' : (valid === 'light' ? 'light' : (colorQuery.matches ? 'dark' : 'light'));
    document.documentElement.setAttribute('data-theme-mode', valid);
    document.documentElement.setAttribute('data-resolved-theme', resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');

    document.querySelectorAll('[data-theme-opt]').forEach(function (btn) {
      btn.setAttribute('aria-checked', btn.getAttribute('data-theme-opt') === valid ? 'true' : 'false');
    });
  }

  if (colorQuery.addEventListener) {
    colorQuery.addEventListener('change', function () {
      if (getStoredTheme() === 'system') applyTheme('system', false);
    });
  }

  /* ------------------------------------------------------------------------
     6. Experience Master-Detail Controller
     ------------------------------------------------------------------------ */
  const expState = {
    filter: 'all',
    selectedId: EXPERIENCES[0].id,
    photoIdx: 0
  };

  function getFilteredExperiences() {
    if (expState.filter === 'all') return EXPERIENCES;
    return EXPERIENCES.filter(function (e) { return e.track === expState.filter; });
  }

  function renderExperienceView() {
    const listEl = document.getElementById('exp-directory');
    const detailEl = document.getElementById('exp-detail');
    if (!listEl || !detailEl) return;

    const filtered = getFilteredExperiences();
    if (!filtered.some(function (e) { return e.id === expState.selectedId; })) {
      expState.selectedId = filtered[0] ? filtered[0].id : EXPERIENCES[0].id;
      expState.photoIdx = 0;
    }

    const active = filtered.find(function (e) { return e.id === expState.selectedId; }) || filtered[0];
    if (!active) return;

    if (expState.photoIdx >= active.photos.length) expState.photoIdx = 0;
    const currentPhoto = active.photos[expState.photoIdx];

    listEl.innerHTML = filtered.map(function (e) {
      const isAct = e.id === active.id;
      return (
        '<button type="button" class="dir-card' + (isAct ? ' active' : '') + '" data-select-exp="' + e.id + '">' +
          '<div class="dir-thumb"><img src="' + safeAttrUrl(e.photos[0].src) + '" alt="' + escapeHtml(e.role) + '" loading="lazy" /></div>' +
          '<div class="dir-meta">' +
            '<div class="dir-top"><span class="dir-code">' + e.code + '</span><span>' + escapeHtml(e.period) + '</span></div>' +
            '<div class="dir-title">' + escapeHtml(e.role) + '</div>' +
            '<div class="dir-sub">' + escapeHtml(e.org) + ' · ' + e.photos.length + ' photos</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    const linksHtml = active.links.map(function (lk) {
      return '<a class="btn btn-secondary btn-sm" href="' + escapeHtml(lk.url) + '" target="_blank" rel="noopener noreferrer"><span>' + escapeHtml(lk.label) + '</span>' + ICONS.ext + '</a>';
    }).join('');

    detailEl.innerHTML =
      '<div class="detail-sheet">' +
        '<div class="media-showcase">' +
          '<div class="media-stage">' +
            (active.photos.length > 1
              ? '<button type="button" class="stage-arrow prev" data-exp-step="-1" aria-label="Previous photo">' + ICONS.prev + '</button>' +
                '<button type="button" class="stage-arrow next" data-exp-step="1" aria-label="Next photo">' + ICONS.next + '</button>'
              : '') +
            '<img src="' + safeAttrUrl(currentPhoto.src) + '" alt="' + escapeHtml(currentPhoto.caption) + '" data-open-exp-lb="true" />' +
            '<span class="stage-counter">' + (expState.photoIdx + 1) + ' / ' + active.photos.length + '</span>' +
            '<button type="button" class="stage-expand-btn" data-open-exp-lb="true">' + ICONS.expand + '<span>Fullscreen</span></button>' +
          '</div>' +
          '<div class="stage-caption"><span>' + escapeHtml(currentPhoto.caption) + '</span></div>' +
          '<div class="thumb-strip">' +
            active.photos.map(function (p, i) {
              return (
                '<button type="button" class="thumb-btn' + (i === expState.photoIdx ? ' active' : '') + '" data-exp-photo="' + i + '" aria-label="Select photo ' + (i + 1) + '">' +
                  '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(p.caption) + '" loading="lazy" />' +
                '</button>'
              );
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="detail-body">' +
          '<div class="detail-top-bar">' +
            '<div class="tag-list"><span class="tag tag-accent">' + escapeHtml(active.trackLabel) + '</span><span class="tag">' + active.code + '</span></div>' +
            '<span class="mono" style="font-size:12px; color:var(--ink-muted); font-weight:600;">' + escapeHtml(active.period) + '</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="detail-title">' + escapeHtml(active.role) + '</h3>' +
            '<p class="detail-org">' + escapeHtml(active.org) + ' <span>· ' + escapeHtml(active.institution) + '</span></p>' +
          '</div>' +
          '<p class="detail-summary">' + escapeHtml(active.summary) + '</p>' +
          '<div>' +
            '<span class="datasheet-label">Verified Scope &amp; Technical Contributions</span>' +
            '<ul class="scope-list">' + active.bullets.map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join('') + '</ul>' +
          '</div>' +
          '<div class="tag-list">' + active.tags.map(function (t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join('') + '</div>' +
          '<div class="detail-footer">' +
            '<button type="button" class="btn btn-primary btn-sm" data-open-exp-lb="true">' + ICONS.expand + '<span>Open Gallery (' + active.photos.length + ' Photos)</span></button>' +
            '<div class="tag-list">' + linksHtml + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------------
     7. Projects Master-Detail Controller
     ------------------------------------------------------------------------ */
  const prjState = {
    filter: 'all',
    selectedId: PROJECTS[0].id,
    photoIdx: 0
  };

  function getFilteredProjects() {
    if (prjState.filter === 'all') return PROJECTS;
    return PROJECTS.filter(function (p) { return p.category === prjState.filter; });
  }

  function renderProjectsView() {
    const listEl = document.getElementById('prj-directory');
    const detailEl = document.getElementById('prj-detail');
    if (!listEl || !detailEl) return;

    const filtered = getFilteredProjects();
    if (!filtered.some(function (p) { return p.id === prjState.selectedId; })) {
      prjState.selectedId = filtered[0] ? filtered[0].id : PROJECTS[0].id;
      prjState.photoIdx = 0;
    }

    const active = filtered.find(function (p) { return p.id === prjState.selectedId; }) || filtered[0];
    if (!active) return;

    if (prjState.photoIdx >= active.photos.length) prjState.photoIdx = 0;
    const currentPhoto = active.photos[prjState.photoIdx];

    listEl.innerHTML = filtered.map(function (p) {
      const isAct = p.id === active.id;
      return (
        '<button type="button" class="dir-card' + (isAct ? ' active' : '') + '" data-select-prj="' + p.id + '">' +
          '<div class="dir-thumb"><img src="' + safeAttrUrl(p.photos[0].src) + '" alt="' + escapeHtml(p.title) + '" loading="lazy" /></div>' +
          '<div class="dir-meta">' +
            '<div class="dir-top"><span class="dir-code">' + p.code + '</span><span>' + escapeHtml(p.period) + '</span></div>' +
            '<div class="dir-title">' + escapeHtml(p.title) + '</div>' +
            '<div class="dir-sub">' + escapeHtml(p.categoryLabel) + ' · ' + p.photos.length + ' photos</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    detailEl.innerHTML =
      '<div class="detail-sheet">' +
        '<div class="media-showcase">' +
          '<div class="media-stage">' +
            (active.photos.length > 1
              ? '<button type="button" class="stage-arrow prev" data-prj-step="-1" aria-label="Previous photo">' + ICONS.prev + '</button>' +
                '<button type="button" class="stage-arrow next" data-prj-step="1" aria-label="Next photo">' + ICONS.next + '</button>'
              : '') +
            '<img src="' + safeAttrUrl(currentPhoto.src) + '" alt="' + escapeHtml(currentPhoto.caption) + '" data-open-prj-lb="true" />' +
            '<span class="stage-counter">' + (prjState.photoIdx + 1) + ' / ' + active.photos.length + '</span>' +
            '<button type="button" class="stage-expand-btn" data-open-prj-lb="true">' + ICONS.expand + '<span>Fullscreen</span></button>' +
          '</div>' +
          '<div class="stage-caption"><span>' + escapeHtml(currentPhoto.caption) + '</span></div>' +
          '<div class="thumb-strip">' +
            active.photos.map(function (p, i) {
              return (
                '<button type="button" class="thumb-btn' + (i === prjState.photoIdx ? ' active' : '') + '" data-prj-photo="' + i + '" aria-label="Select photo ' + (i + 1) + '">' +
                  '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(p.caption) + '" loading="lazy" />' +
                '</button>'
              );
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="detail-body">' +
          '<div class="detail-top-bar">' +
            '<div class="tag-list"><span class="tag tag-accent">' + escapeHtml(active.categoryLabel) + '</span><span class="tag">' + active.code + '</span></div>' +
            '<span class="mono" style="font-size:12px; color:var(--ink-muted); font-weight:600;">' + escapeHtml(active.period) + '</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="detail-title">' + escapeHtml(active.title) + '</h3>' +
            '<p class="detail-summary" style="margin-top:0.5rem;">' + escapeHtml(active.shortDesc) + '</p>' +
          '</div>' +
          '<div class="metrics-grid">' +
            active.metrics.map(function (m) {
              return '<div class="metric-box"><span class="metric-k">' + escapeHtml(m.label) + '</span><span class="metric-v">' + escapeHtml(m.value) + '</span></div>';
            }).join('') +
          '</div>' +
          '<div class="datasheet-grid">' +
            '<div class="datasheet-box"><span class="datasheet-label">Problem Context</span><p>' + escapeHtml(active.problem) + '</p></div>' +
            '<div class="datasheet-box accent-box"><span class="datasheet-label">Engineering Architecture &amp; Solution</span><p>' + escapeHtml(active.solution) + '</p></div>' +
          '</div>' +
          '<div>' +
            '<span class="datasheet-label">Hardware &amp; Software Stack</span>' +
            '<div class="tag-list">' + active.stack.map(function (s) { return '<span class="tag">' + escapeHtml(s) + '</span>'; }).join('') + '</div>' +
          '</div>' +
          '<div class="detail-footer">' +
            '<button type="button" class="btn btn-primary btn-sm" data-open-prj-lb="true">' + ICONS.expand + '<span>Open Gallery (' + active.photos.length + ' Photos)</span></button>' +
            '<a class="btn btn-secondary btn-sm" href="' + escapeHtml(active.repoUrl) + '" target="_blank" rel="noopener noreferrer"><span>GitHub Repository</span>' + ICONS.ext + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------------
     8. Interactive Certificates Registry & Filter Controller
     ------------------------------------------------------------------------ */
  let certFilter = 'all';

  function getFilteredCertificates() {
    if (certFilter === 'all') return CERTIFICATES;
    return CERTIFICATES.filter(function (c) { return c.category === certFilter; });
  }

  function renderCertificatesView() {
    const gridEl = document.getElementById('certificates-grid');
    if (!gridEl) return;

    const list = getFilteredCertificates();
    gridEl.innerHTML = list.map(function (c, idx) {
      return (
        '<button type="button" class="cert-card" data-open-cert-idx="' + idx + '" aria-label="Inspect certificate: ' + escapeHtml(c.title) + '">' +
          '<div class="cert-frame">' +
            '<img src="' + safeAttrUrl(c.image) + '" alt="' + escapeHtml(c.title) + '" loading="lazy" />' +
            '<span class="cert-hover-pill">Inspect Credential</span>' +
          '</div>' +
          '<div class="cert-body">' +
            '<div class="cert-meta-row">' +
              '<span class="tag">' + escapeHtml(c.tag) + '</span>' +
              '<span>' + escapeHtml(c.date) + '</span>' +
            '</div>' +
            '<h3 class="cert-title">' + escapeHtml(c.title) + '</h3>' +
            '<p class="cert-issuer">' + escapeHtml(c.issuer) + '</p>' +
            '<p class="cert-desc">' + escapeHtml(c.desc) + '</p>' +
            '<div class="cert-foot">' +
              '<span class="cert-id">ID: ' + escapeHtml(c.credId) + '</span>' +
              '<span style="display:inline-flex; align-items:center; gap:4px; color:var(--accent); font-weight:600;">View ' + ICONS.expand + '</span>' +
            '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');
  }

  /* ------------------------------------------------------------------------
     9. Unified Interactive Lightbox Modal (Next/Prev for Photos & Certificates)
     ------------------------------------------------------------------------ */
  let lbState = {
    mode: 'photo', // 'photo' | 'certificate'
    kicker: '',
    title: '',
    items: [],
    index: 0
  };

  function openLightbox(config) {
    lbState = {
      mode: config.mode || 'photo',
      kicker: config.kicker || '',
      title: config.title || '',
      items: config.items || [],
      index: Math.max(0, Math.min(config.index || 0, (config.items || []).length - 1))
    };
    renderLightboxFrame();
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function stepLightbox(delta) {
    if (!lbState.items.length) return;
    lbState.index = (lbState.index + delta + lbState.items.length) % lbState.items.length;
    renderLightboxFrame();
  }

  function renderLightboxFrame() {
    const item = lbState.items[lbState.index];
    if (!item) return;

    const kickerEl = document.getElementById('lb-kicker');
    const titleEl = document.getElementById('lb-title');
    const imgEl = document.getElementById('lb-img');
    const capEl = document.getElementById('lb-caption');
    const countEl = document.getElementById('lb-counter');
    const openRawEl = document.getElementById('lb-open-raw');
    const detailsBox = document.getElementById('lb-details-box');
    const detailsMeta = document.getElementById('lb-details-meta');
    const descEl = document.getElementById('lb-desc');
    const thumbsEl = document.getElementById('lb-thumbs');

    if (lbState.mode === 'certificate') {
      kickerEl.textContent = item.tag + ' · ' + item.date;
      titleEl.textContent = item.title;
      imgEl.src = safeUrl(item.image);
      imgEl.alt = item.title;
      capEl.textContent = item.issuer;
      openRawEl.href = safeUrl(item.image);

      detailsBox.style.display = 'flex';
      detailsMeta.innerHTML =
        '<span class="tag tag-accent">' + escapeHtml(item.issuer) + '</span>' +
        '<span class="tag">' + escapeHtml(item.date) + '</span>' +
        '<span class="tag">ID: ' + escapeHtml(item.credId) + '</span>';
      descEl.textContent = item.desc;
    } else {
      kickerEl.textContent = lbState.kicker;
      titleEl.textContent = lbState.title;
      imgEl.src = safeUrl(item.src);
      imgEl.alt = item.caption || lbState.title;
      capEl.textContent = item.caption || '';
      openRawEl.href = safeUrl(item.src);
      detailsBox.style.display = 'none';
    }

    countEl.textContent = (lbState.index + 1) + ' / ' + lbState.items.length;

    const multi = lbState.items.length > 1;
    document.getElementById('lb-prev').style.display = multi ? 'grid' : 'none';
    document.getElementById('lb-next').style.display = multi ? 'grid' : 'none';

    if (multi) {
      thumbsEl.style.display = 'flex';
      thumbsEl.innerHTML = lbState.items.map(function (entry, i) {
        const src = lbState.mode === 'certificate' ? entry.image : entry.src;
        const alt = lbState.mode === 'certificate' ? entry.title : (entry.caption || '');
        return (
          '<button type="button" class="thumb-btn' + (i === lbState.index ? ' active' : '') + '" data-lb-jump="' + i + '" aria-label="Jump to item ' + (i + 1) + '">' +
            '<img src="' + safeAttrUrl(src) + '" alt="' + escapeHtml(alt) + '" />' +
          '</button>'
        );
      }).join('');
    } else {
      thumbsEl.style.display = 'none';
      thumbsEl.innerHTML = '';
    }
  }

  /* ------------------------------------------------------------------------
     10. CV Summary Modal & Profile JSON Export
     ------------------------------------------------------------------------ */
  function openCvModal() {
    const m = document.getElementById('cv-modal');
    if (m) {
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCvModal() {
    const m = document.getElementById('cv-modal');
    if (m) {
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function downloadProfileJson() {
    const payload = {
      name: 'Bustan Nabiel Maulana',
      headline: 'Final-Year Electrical Engineering Student at Telkom University | Industrial Automation, Embedded IoT & Applied AI',
      education: 'Telkom University — S.T. Electrical Engineering',
      location: 'Bandung & Tuban, Indonesia',
      contact: {
        email: 'bustanmaulana50@gmail.com',
        whatsapp: '+6281216919968',
        linkedin: 'https://linkedin.com/in/bustannabiel',
        github: 'https://github.com/bustanmln',
        instagram: 'https://instagram.com/bustanmln'
      },
      experiences: EXPERIENCES.map(function (e) {
        return { role: e.role, organization: e.org, institution: e.institution, period: e.period, scope: e.bullets };
      }),
      projects: PROJECTS.map(function (p) {
        return { title: p.title, category: p.categoryLabel, period: p.period, stack: p.stack, summary: p.shortDesc };
      }),
      certificates: CERTIFICATES.map(function (c) {
        return { title: c.title, issuer: c.issuer, date: c.date, credentialId: c.credId };
      })
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bustan_Nabiel_Maulana_Profile.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ------------------------------------------------------------------------
     11. Live WIB Clock
     ------------------------------------------------------------------------ */
  function updateWibClocks() {
    const formatted = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date()) + ' WIB';
    document.querySelectorAll('[data-wib-clock]').forEach(function (el) {
      el.textContent = formatted;
    });
  }

  /* ------------------------------------------------------------------------
     12. Bootstrap & Event Delegation
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getStoredTheme(), false);
    renderExperienceView();
    renderProjectsView();
    renderCertificatesView();
    updateWibClocks();
    setInterval(updateWibClocks, 1000);

    // Initialize route from current URL hash
    navigateTo(resolveViewFromHash(window.location.hash), false);

    // Browser Back / Forward sync
    window.addEventListener('hashchange', function () {
      navigateTo(resolveViewFromHash(window.location.hash), false);
    });

    // Theme controls
    document.querySelectorAll('[data-theme-opt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.getAttribute('data-theme-opt'), true);
      });
    });

    // Mobile drawer toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', function () {
        const open = mobileDrawer.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Filter buttons — Experience
    document.querySelectorAll('[data-exp-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        expState.filter = btn.getAttribute('data-exp-filter');
        expState.photoIdx = 0;
        document.querySelectorAll('[data-exp-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderExperienceView();
      });
    });

    // Filter buttons — Projects
    document.querySelectorAll('[data-prj-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        prjState.filter = btn.getAttribute('data-prj-filter');
        prjState.photoIdx = 0;
        document.querySelectorAll('[data-prj-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderProjectsView();
      });
    });

    // Filter buttons — Certificates
    document.querySelectorAll('[data-cert-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        certFilter = btn.getAttribute('data-cert-filter');
        document.querySelectorAll('[data-cert-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderCertificatesView();
      });
    });

    // Global delegated clicks
    document.addEventListener('click', function (e) {
      // Multi-layer navigation links & highlight jump cards
      const navLink = e.target.closest('[data-nav-view], [data-jump-view]');
      if (navLink) {
        const view = navLink.getAttribute('data-nav-view') || navLink.getAttribute('data-jump-view');
        const jumpId = navLink.getAttribute('data-jump-id');
        e.preventDefault();
        if (view === 'experience' && jumpId) {
          expState.filter = 'all';
          expState.selectedId = jumpId;
          expState.photoIdx = 0;
          document.querySelectorAll('[data-exp-filter]').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-exp-filter') === 'all');
          });
          renderExperienceView();
        } else if (view === 'projects' && jumpId) {
          prjState.filter = 'all';
          prjState.selectedId = jumpId;
          prjState.photoIdx = 0;
          document.querySelectorAll('[data-prj-filter]').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-prj-filter') === 'all');
          });
          renderProjectsView();
        }
        navigateTo(view, true);
        return;
      }

      // Experience selection & photo navigation
      const expBtn = e.target.closest('[data-select-exp]');
      if (expBtn) {
        expState.selectedId = expBtn.getAttribute('data-select-exp');
        expState.photoIdx = 0;
        renderExperienceView();
        return;
      }

      const expPhotoBtn = e.target.closest('[data-exp-photo]');
      if (expPhotoBtn) {
        expState.photoIdx = Number(expPhotoBtn.getAttribute('data-exp-photo'));
        renderExperienceView();
        return;
      }

      const expStepBtn = e.target.closest('[data-exp-step]');
      if (expStepBtn) {
        const active = EXPERIENCES.find(function (x) { return x.id === expState.selectedId; });
        if (active) {
          const delta = Number(expStepBtn.getAttribute('data-exp-step'));
          expState.photoIdx = (expState.photoIdx + delta + active.photos.length) % active.photos.length;
          renderExperienceView();
        }
        return;
      }

      const expLbBtn = e.target.closest('[data-open-exp-lb]');
      if (expLbBtn) {
        const active = EXPERIENCES.find(function (x) { return x.id === expState.selectedId; });
        if (active) {
          openLightbox({
            mode: 'photo',
            kicker: active.code + ' · ' + active.trackLabel,
            title: active.role,
            items: active.photos,
            index: expState.photoIdx
          });
        }
        return;
      }

      // Project selection & photo navigation
      const prjBtn = e.target.closest('[data-select-prj]');
      if (prjBtn) {
        prjState.selectedId = prjBtn.getAttribute('data-select-prj');
        prjState.photoIdx = 0;
        renderProjectsView();
        return;
      }

      const prjPhotoBtn = e.target.closest('[data-prj-photo]');
      if (prjPhotoBtn) {
        prjState.photoIdx = Number(prjPhotoBtn.getAttribute('data-prj-photo'));
        renderProjectsView();
        return;
      }

      const prjStepBtn = e.target.closest('[data-prj-step]');
      if (prjStepBtn) {
        const active = PROJECTS.find(function (x) { return x.id === prjState.selectedId; });
        if (active) {
          const delta = Number(prjStepBtn.getAttribute('data-prj-step'));
          prjState.photoIdx = (prjState.photoIdx + delta + active.photos.length) % active.photos.length;
          renderProjectsView();
        }
        return;
      }

      const prjLbBtn = e.target.closest('[data-open-prj-lb]');
      if (prjLbBtn) {
        const active = PROJECTS.find(function (x) { return x.id === prjState.selectedId; });
        if (active) {
          openLightbox({
            mode: 'photo',
            kicker: active.code + ' · ' + active.categoryLabel,
            title: active.title,
            items: active.photos,
            index: prjState.photoIdx
          });
        }
        return;
      }

      // Interactive Certificate Modal (Next/Prev across active filtered set)
      const certCard = e.target.closest('[data-open-cert-idx]');
      if (certCard) {
        const filtered = getFilteredCertificates();
        openLightbox({
          mode: 'certificate',
          items: filtered,
          index: Number(certCard.getAttribute('data-open-cert-idx'))
        });
        return;
      }

      // Lightbox thumbnail jump
      const lbJump = e.target.closest('[data-lb-jump]');
      if (lbJump) {
        lbState.index = Number(lbJump.getAttribute('data-lb-jump'));
        renderLightboxFrame();
        return;
      }

      // Copy email button
      const copyBtn = e.target.closest('[data-copy-text]');
      if (copyBtn) {
        const text = copyBtn.getAttribute('data-copy-text');
        const original = copyBtn.getAttribute('data-original-html') || copyBtn.innerHTML;
        copyBtn.setAttribute('data-original-html', original);
        copyToClipboard(text, copyBtn, original);
        return;
      }

      // CV modal trigger
      if (e.target.closest('[data-open-cv]')) {
        openCvModal();
      }
    });

    // Lightbox controls & backdrop close
    document.getElementById('lb-prev').addEventListener('click', function () { stepLightbox(-1); });
    document.getElementById('lb-next').addEventListener('click', function () { stepLightbox(1); });
    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-modal').addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });

    // Swipe in Lightbox
    let swipeX = 0;
    const lbStage = document.querySelector('.lb-stage');
    if (lbStage) {
      lbStage.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) swipeX = e.touches[0].clientX;
      }, { passive: true });
      lbStage.addEventListener('touchend', function (e) {
        if (e.changedTouches.length === 1) {
          const diff = swipeX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 45) stepLightbox(diff > 0 ? 1 : -1);
        }
      }, { passive: true });
    }

    // CV Modal controls
    document.getElementById('cv-close').addEventListener('click', closeCvModal);
    document.getElementById('cv-close-foot').addEventListener('click', closeCvModal);
    document.getElementById('cv-download-json').addEventListener('click', downloadProfileJson);
    document.getElementById('cv-modal').addEventListener('click', function (e) {
      if (e.target === this) closeCvModal();
    });

    // Keyboard shortcuts (Esc / Left / Right)
    document.addEventListener('keydown', function (e) {
      const lbOpen = document.getElementById('lightbox-modal').classList.contains('open');
      const cvOpen = document.getElementById('cv-modal').classList.contains('open');
      if (e.key === 'Escape') {
        if (lbOpen) closeLightbox();
        if (cvOpen) closeCvModal();
      } else if (lbOpen) {
        if (e.key === 'ArrowRight') stepLightbox(1);
        if (e.key === 'ArrowLeft') stepLightbox(-1);
      }
    });
  });
})();
