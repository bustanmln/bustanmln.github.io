/* ==========================================================================
   Bustan Nabiel Maulana — Portfolio Data & Interactive Controller
   100% authentic local assets (case-sensitive paths verified against disk).
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Authentic Experience Data (All 32 photos across 5 folders)
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
      role: 'Daskom Laboratory — PJ Hardware, Koord. MLC & Asisten Praktikum',
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
     2. Authentic Projects Data (All 17 photos across 4 folders)
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
        { label: 'Classes', value: '6 Waste Categories' },
        { label: 'Inference', value: '< 1s Response' },
        { label: 'Target Accuracy', value: '> 90%' },
        { label: 'Cloud Sync', value: '< 5s (Firebase)' }
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
      categoryLabel: 'IoT & Machine Learning · Electrical Instrumentation',
      period: 'Deployed System · 2025',
      title: 'IoT Power Intensity Control & Energy Monitoring with KNN',
      shortDesc:
        'Real-time electrical power consumption monitoring and electricity cost estimation featuring K-Nearest Neighbor (KNN) anomaly classification and adaptive overload protection.',
      problem:
        'Households and small facilities lack granular real-time visibility into power draw, leading to unexpectedly high electricity bills and undetected abnormal consumption patterns or overload faults.',
      solution:
        'Built an ESP32-based instrumentation node paired with a PZEM-004T module for accurate voltage, current, active power, and energy metering, combined with an AC Dimmer circuit for load intensity control. Deployed a K-Nearest Neighbor (KNN) classifier to detect anomalous power usage and trigger adaptive overload protection, streaming live telemetry to Firebase Cloud and a custom Android Studio companion app.',
      metrics: [
        { label: 'Sensor', value: 'PZEM-004T AC Metering' },
        { label: 'ML Model', value: 'K-Nearest Neighbor (KNN)' },
        { label: 'Actuation', value: 'AC Dimmer + Overload Cut' },
        { label: 'Client', value: 'Firebase + Android App' }
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
        { label: 'Controller', value: 'ESP32 (Embedded C)' },
        { label: 'Opponent Sensor', value: 'VL53L0X ToF Laser' },
        { label: 'Boundary Sensor', value: 'TCRT5000 Optical Array' },
        { label: 'Driver', value: 'TB6612FNG Dual H-Bridge' }
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
        { label: 'Coverage', value: '360° Perimeter Array' },
        { label: 'Data Pipeline', value: '4.6 Mbps Raw Acquisition' },
        { label: 'Sync Hardware', value: 'Dual Teensy Triggered' },
        { label: 'Processing', value: 'Python 3D Visualization' }
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
     3. Authentic Official Certificates (All 13 unique credentials)
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
     Helpers
     ------------------------------------------------------------------------ */
  function safeUrl(path) {
    return encodeURI(path);
  }

  function safeAttrUrl(path) {
    return escapeHtml(encodeURI(path));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------------------
     4. Theme Management (Light / Dark / System)
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
      const checked = btn.getAttribute('data-theme-opt') === valid;
      btn.setAttribute('aria-checked', checked ? 'true' : 'false');
    });
  }

  if (colorQuery.addEventListener) {
    colorQuery.addEventListener('change', function () {
      if (getStoredTheme() === 'system') applyTheme('system', false);
    });
  }

  /* ------------------------------------------------------------------------
     5. Render Experience Dossiers (All 5 experiences & all 32 photos)
     ------------------------------------------------------------------------ */
  function renderExperiences() {
    const container = document.getElementById('experience-list');
    if (!container) return;

    container.innerHTML = EXPERIENCES.map(function (exp) {
      const firstPhoto = exp.photos[0];
      const thumbsHtml = exp.photos.map(function (p, idx) {
        return (
          '<button type="button" class="thumb-btn' + (idx === 0 ? ' active' : '') + '"' +
          ' data-record-id="' + exp.id + '" data-photo-idx="' + idx + '"' +
          ' aria-label="View photo ' + (idx + 1) + ' of ' + exp.photos.length + '">' +
          '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(p.caption) + '" loading="lazy" />' +
          '</button>'
        );
      }).join('');

      const linksHtml = (exp.links || []).map(function (lk) {
        return (
          '<a class="btn btn-secondary btn-sm" href="' + escapeHtml(lk.url) + '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(lk.label) + ' ↗</a>'
        );
      }).join('');

      return (
        '<article class="record-card" data-exp-track="' + exp.track + '" id="' + exp.id + '">' +
          '<div class="record-head">' +
            '<div class="record-meta-left">' +
              '<span class="record-id">' + exp.code + '</span>' +
              '<span class="tag tag-accent">' + escapeHtml(exp.trackLabel) + '</span>' +
              '<span class="tag">' + exp.photos.length + ' Photos</span>' +
            '</div>' +
            '<span class="record-period">' + escapeHtml(exp.period) + '</span>' +
          '</div>' +
          '<div class="record-body">' +
            '<div class="record-media">' +
              '<div class="media-stage" role="button" tabindex="0" data-lightbox-group="exp" data-lightbox-id="' + exp.id + '" data-active-idx="0" aria-label="Open photo gallery for ' + escapeHtml(exp.role) + '">' +
                '<img id="stage-img-' + exp.id + '" src="' + safeAttrUrl(firstPhoto.src) + '" alt="' + escapeHtml(firstPhoto.caption) + '" loading="lazy" />' +
                '<span class="media-badge" id="stage-counter-' + exp.id + '">1 / ' + exp.photos.length + '</span>' +
                '<span class="media-zoom-hint">Inspect Gallery ⤢</span>' +
              '</div>' +
              '<div class="media-caption-bar">' +
                '<span id="stage-cap-' + exp.id + '">' + escapeHtml(firstPhoto.caption) + '</span>' +
              '</div>' +
              '<div class="thumb-strip">' + thumbsHtml + '</div>' +
            '</div>' +
            '<div class="record-info">' +
              '<div>' +
                '<h3 class="record-title">' + escapeHtml(exp.role) + '</h3>' +
                '<p class="record-org">' + escapeHtml(exp.org) + ' <span>· ' + escapeHtml(exp.institution) + '</span></p>' +
              '</div>' +
              '<p class="record-summary">' + escapeHtml(exp.summary) + '</p>' +
              '<div>' +
                '<span class="datasheet-label">Verified Scope & Technical Contributions</span>' +
                '<ul class="scope-list">' +
                  exp.bullets.map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join('') +
                '</ul>' +
              '</div>' +
              '<div class="tag-list">' +
                exp.tags.map(function (t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join('') +
              '</div>' +
              '<div class="record-actions">' +
                '<button type="button" class="btn btn-primary btn-sm" data-open-gallery-group="exp" data-open-gallery-id="' + exp.id + '">' +
                  'Open Lightbox Gallery (' + exp.photos.length + ' Photos)' +
                '</button>' +
                '<div class="tag-list">' + linksHtml + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ------------------------------------------------------------------------
     6. Render Project Dossiers (All 4 projects & all 17 photos)
     ------------------------------------------------------------------------ */
  function renderProjects() {
    const container = document.getElementById('projects-list');
    if (!container) return;

    container.innerHTML = PROJECTS.map(function (prj) {
      const firstPhoto = prj.photos[0];
      const thumbsHtml = prj.photos.map(function (p, idx) {
        return (
          '<button type="button" class="thumb-btn' + (idx === 0 ? ' active' : '') + '"' +
          ' data-record-id="' + prj.id + '" data-photo-idx="' + idx + '"' +
          ' aria-label="View project photo ' + (idx + 1) + ' of ' + prj.photos.length + '">' +
          '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(p.caption) + '" loading="lazy" />' +
          '</button>'
        );
      }).join('');

      const metricsHtml = prj.metrics.map(function (m) {
        return '<span class="metric-chip">' + escapeHtml(m.label) + ': <strong>' + escapeHtml(m.value) + '</strong></span>';
      }).join('');

      return (
        '<article class="record-card" data-prj-cat="' + prj.category + '" id="' + prj.id + '">' +
          '<div class="record-head">' +
            '<div class="record-meta-left">' +
              '<span class="record-id">' + prj.code + '</span>' +
              '<span class="tag tag-accent">' + escapeHtml(prj.categoryLabel) + '</span>' +
              '<span class="tag">' + prj.photos.length + ' Photos</span>' +
            '</div>' +
            '<span class="record-period">' + escapeHtml(prj.period) + '</span>' +
          '</div>' +
          '<div class="record-body">' +
            '<div class="record-media">' +
              '<div class="media-stage" role="button" tabindex="0" data-lightbox-group="prj" data-lightbox-id="' + prj.id + '" data-active-idx="0" aria-label="Open documentation gallery for ' + escapeHtml(prj.title) + '">' +
                '<img id="stage-img-' + prj.id + '" src="' + safeAttrUrl(firstPhoto.src) + '" alt="' + escapeHtml(firstPhoto.caption) + '" loading="lazy" />' +
                '<span class="media-badge" id="stage-counter-' + prj.id + '">1 / ' + prj.photos.length + '</span>' +
                '<span class="media-zoom-hint">Inspect Gallery ⤢</span>' +
              '</div>' +
              '<div class="media-caption-bar">' +
                '<span id="stage-cap-' + prj.id + '">' + escapeHtml(firstPhoto.caption) + '</span>' +
              '</div>' +
              '<div class="thumb-strip">' + thumbsHtml + '</div>' +
            '</div>' +
            '<div class="record-info">' +
              '<div>' +
                '<h3 class="record-title">' + escapeHtml(prj.title) + '</h3>' +
                '<p class="record-summary" style="margin-top:0.45rem;">' + escapeHtml(prj.shortDesc) + '</p>' +
              '</div>' +
              '<div class="metrics-strip">' + metricsHtml + '</div>' +
              '<div class="datasheet-grid">' +
                '<div class="datasheet-box">' +
                  '<span class="datasheet-label">Problem Context</span>' +
                  '<p>' + escapeHtml(prj.problem) + '</p>' +
                '</div>' +
                '<div class="datasheet-box accent-box">' +
                  '<span class="datasheet-label">Engineering Architecture & Solution</span>' +
                  '<p>' + escapeHtml(prj.solution) + '</p>' +
                '</div>' +
              '</div>' +
              '<div>' +
                '<span class="datasheet-label">Hardware & Software Stack</span>' +
                '<div class="tag-list">' +
                  prj.stack.map(function (s) { return '<span class="tag">' + escapeHtml(s) + '</span>'; }).join('') +
                '</div>' +
              '</div>' +
              '<div class="record-actions">' +
                '<button type="button" class="btn btn-primary btn-sm" data-open-gallery-group="prj" data-open-gallery-id="' + prj.id + '">' +
                  'Open Photo Gallery (' + prj.photos.length + ' Photos)' +
                '</button>' +
                '<a class="btn btn-secondary btn-sm" href="' + escapeHtml(prj.repoUrl) + '" target="_blank" rel="noopener noreferrer">GitHub Repository ↗</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ------------------------------------------------------------------------
     7. Render Certificates Grid (All 13 unique credentials)
     ------------------------------------------------------------------------ */
  function renderCertificates() {
    const container = document.getElementById('certificates-grid');
    if (!container) return;

    container.innerHTML = CERTIFICATES.map(function (c, idx) {
      return (
        '<article class="cert-card" role="button" tabindex="0" data-cert-cat="' + c.category + '" data-cert-idx="' + idx + '" aria-label="Inspect certificate: ' + escapeHtml(c.title) + '">' +
          '<div class="cert-img-frame">' +
            '<img src="' + safeAttrUrl(c.image) + '" alt="' + escapeHtml(c.title) + '" loading="lazy" />' +
          '</div>' +
          '<div class="cert-content">' +
            '<div class="cert-top-row">' +
              '<span class="tag">' + escapeHtml(c.tag) + '</span>' +
              '<span>' + escapeHtml(c.date) + '</span>' +
            '</div>' +
            '<h3 class="cert-title">' + escapeHtml(c.title) + '</h3>' +
            '<p class="cert-issuer">' + escapeHtml(c.issuer) + '</p>' +
            '<p class="cert-desc">' + escapeHtml(c.desc) + '</p>' +
            '<div class="cert-foot">' +
              '<span class="cert-id-text">ID: ' + escapeHtml(c.credId) + '</span>' +
              '<span>Inspect ⤢</span>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ------------------------------------------------------------------------
     8. Lightbox Gallery Modal (Projects, Experience & Certificates)
     ------------------------------------------------------------------------ */
  let lightboxState = {
    kicker: '',
    title: '',
    desc: '',
    items: [],
    index: 0
  };

  function openLightbox(kicker, title, items, startIndex, desc) {
    lightboxState = {
      kicker: kicker,
      title: title,
      desc: desc || '',
      items: items,
      index: Math.max(0, Math.min(startIndex || 0, items.length - 1))
    };
    updateLightboxView();
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
    if (!lightboxState.items.length) return;
    lightboxState.index = (lightboxState.index + delta + lightboxState.items.length) % lightboxState.items.length;
    updateLightboxView();
  }

  function updateLightboxView() {
    const item = lightboxState.items[lightboxState.index];
    if (!item) return;

    document.getElementById('lb-kicker').textContent = lightboxState.kicker;
    document.getElementById('lb-title').textContent = lightboxState.title;

    const imgEl = document.getElementById('lb-img');
    imgEl.src = safeUrl(item.src);
    imgEl.alt = item.caption || lightboxState.title;

    document.getElementById('lb-caption').textContent = item.caption || '';
    document.getElementById('lb-counter').textContent = (lightboxState.index + 1) + ' / ' + lightboxState.items.length;
    document.getElementById('lb-open-raw').href = safeUrl(item.src);

    const descEl = document.getElementById('lb-desc');
    if (lightboxState.desc) {
      descEl.textContent = lightboxState.desc;
      descEl.style.display = 'block';
    } else {
      descEl.textContent = '';
      descEl.style.display = 'none';
    }

    const showNav = lightboxState.items.length > 1;
    document.getElementById('lb-prev').style.display = showNav ? 'grid' : 'none';
    document.getElementById('lb-next').style.display = showNav ? 'grid' : 'none';

    const thumbsEl = document.getElementById('lb-thumbs');
    if (showNav) {
      thumbsEl.style.display = 'flex';
      thumbsEl.innerHTML = lightboxState.items.map(function (p, i) {
        return (
          '<button type="button" class="thumb-btn' + (i === lightboxState.index ? ' active' : '') + '" data-lb-jump="' + i + '" aria-label="Jump to photo ' + (i + 1) + '">' +
          '<img src="' + safeAttrUrl(p.src) + '" alt="' + escapeHtml(p.caption || '') + '" />' +
          '</button>'
        );
      }).join('');
    } else {
      thumbsEl.style.display = 'none';
      thumbsEl.innerHTML = '';
    }
  }

  /* ------------------------------------------------------------------------
     9. Curriculum Vitae Modal & Profile JSON Export
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
     10. Event Wiring, Filters, Scroll Spy & Live WIB Clock
     ------------------------------------------------------------------------ */
  function findRecord(group, id) {
    const list = group === 'exp' ? EXPERIENCES : PROJECTS;
    return list.find(function (item) { return item.id === id; });
  }

  function selectCardPhoto(recordId, photoIdx) {
    const record = EXPERIENCES.find(function (e) { return e.id === recordId; }) ||
                   PROJECTS.find(function (p) { return p.id === recordId; });
    if (!record || !record.photos[photoIdx]) return;

    const photo = record.photos[photoIdx];
    const stageImg = document.getElementById('stage-img-' + recordId);
    const counter = document.getElementById('stage-counter-' + recordId);
    const cap = document.getElementById('stage-cap-' + recordId);
    const card = document.getElementById(recordId);

    if (stageImg) {
      stageImg.src = safeUrl(photo.src);
      stageImg.alt = photo.caption;
    }
    if (counter) counter.textContent = (photoIdx + 1) + ' / ' + record.photos.length;
    if (cap) cap.textContent = photo.caption;
    if (card) {
      const stage = card.querySelector('.media-stage');
      if (stage) stage.setAttribute('data-active-idx', String(photoIdx));
      card.querySelectorAll('.thumb-btn').forEach(function (btn) {
        btn.classList.toggle('active', Number(btn.getAttribute('data-photo-idx')) === photoIdx);
      });
    }
  }

  function initScrollSpy() {
    const sectionIds = ['home', 'experience', 'projects', 'certificates', 'contact'];
    const navMap = {};
    sectionIds.forEach(function (id) {
      navMap[id] = document.querySelector('.nav-link[href="#' + id + '"]');
    });

    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const activeId = entry.target.id;
          sectionIds.forEach(function (id) {
            if (navMap[id]) navMap[id].classList.toggle('active', id === activeId);
          });
        }
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0.01 });

    sectionIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  function updateWibClock() {
    const el = document.getElementById('wib-clock');
    if (!el) return;
    const formatted = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date());
    el.textContent = formatted + ' WIB';
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getStoredTheme(), false);
    renderExperiences();
    renderProjects();
    renderCertificates();
    initScrollSpy();
    updateWibClock();
    setInterval(updateWibClock, 1000);

    // Theme buttons
    document.querySelectorAll('[data-theme-opt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.getAttribute('data-theme-opt'), true);
      });
    });

    // Mobile nav toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', function () {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      mobileDrawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileDrawer.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Experience track filters
    document.querySelectorAll('[data-exp-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const val = btn.getAttribute('data-exp-filter');
        document.querySelectorAll('[data-exp-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        document.querySelectorAll('#experience-list .record-card').forEach(function (card) {
          const match = val === 'all' || card.getAttribute('data-exp-track') === val;
          card.classList.toggle('hidden-by-filter', !match);
        });
      });
    });

    // Project category filters
    document.querySelectorAll('[data-prj-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const val = btn.getAttribute('data-prj-filter');
        document.querySelectorAll('[data-prj-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        document.querySelectorAll('#projects-list .record-card').forEach(function (card) {
          const match = val === 'all' || card.getAttribute('data-prj-cat') === val;
          card.classList.toggle('hidden-by-filter', !match);
        });
      });
    });

    // Certificate category filters
    document.querySelectorAll('[data-cert-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const val = btn.getAttribute('data-cert-filter');
        document.querySelectorAll('[data-cert-filter]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        document.querySelectorAll('#certificates-grid .cert-card').forEach(function (card) {
          const match = val === 'all' || card.getAttribute('data-cert-cat') === val;
          card.classList.toggle('hidden-by-filter', !match);
        });
      });
    });

    // Delegated click handlers for thumbnails, stages, gallery buttons & certificates
    document.addEventListener('click', function (e) {
      const thumb = e.target.closest('.thumb-btn[data-record-id]');
      if (thumb) {
        selectCardPhoto(thumb.getAttribute('data-record-id'), Number(thumb.getAttribute('data-photo-idx')));
        return;
      }

      const stage = e.target.closest('.media-stage[data-lightbox-id]');
      if (stage) {
        const group = stage.getAttribute('data-lightbox-group');
        const id = stage.getAttribute('data-lightbox-id');
        const idx = Number(stage.getAttribute('data-active-idx') || 0);
        const rec = findRecord(group, id);
        if (rec) {
          openLightbox(rec.code + ' · ' + (rec.trackLabel || rec.categoryLabel), rec.role || rec.title, rec.photos, idx, '');
        }
        return;
      }

      const openGalleryBtn = e.target.closest('[data-open-gallery-id]');
      if (openGalleryBtn) {
        const group = openGalleryBtn.getAttribute('data-open-gallery-group');
        const id = openGalleryBtn.getAttribute('data-open-gallery-id');
        const rec = findRecord(group, id);
        if (rec) {
          const card = document.getElementById(id);
          const stageEl = card ? card.querySelector('.media-stage') : null;
          const idx = stageEl ? Number(stageEl.getAttribute('data-active-idx') || 0) : 0;
          openLightbox(rec.code + ' · ' + (rec.trackLabel || rec.categoryLabel), rec.role || rec.title, rec.photos, idx, '');
        }
        return;
      }

      const certCard = e.target.closest('.cert-card[data-cert-idx]');
      if (certCard) {
        const c = CERTIFICATES[Number(certCard.getAttribute('data-cert-idx'))];
        if (c) {
          openLightbox(
            c.tag + ' · ' + c.date + ' · ID: ' + c.credId,
            c.title,
            [{ src: c.image, caption: c.issuer + ' — ' + c.title }],
            0,
            c.desc
          );
        }
        return;
      }

      const lbJump = e.target.closest('[data-lb-jump]');
      if (lbJump) {
        lightboxState.index = Number(lbJump.getAttribute('data-lb-jump'));
        updateLightboxView();
      }
    });

    // Keyboard activation for accessible role="button" elements
    document.addEventListener('keydown', function (e) {
      const modalOpen = document.getElementById('lightbox-modal').classList.contains('open');
      const cvOpen = document.getElementById('cv-modal').classList.contains('open');

      if (e.key === 'Escape') {
        if (modalOpen) closeLightbox();
        if (cvOpen) closeCvModal();
        return;
      }
      if (modalOpen) {
        if (e.key === 'ArrowRight') stepLightbox(1);
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        return;
      }
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.media-stage, .cert-card')) {
        e.preventDefault();
        e.target.click();
      }
    });

    // Lightbox buttons & backdrop close
    document.getElementById('lb-prev').addEventListener('click', function () { stepLightbox(-1); });
    document.getElementById('lb-next').addEventListener('click', function () { stepLightbox(1); });
    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-modal').addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });

    // Touch swipe in Lightbox
    let touchStartX = 0;
    const lbStage = document.querySelector('.lightbox-stage');
    if (lbStage) {
      lbStage.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
      }, { passive: true });
      lbStage.addEventListener('touchend', function (e) {
        if (e.changedTouches.length === 1) {
          const diff = touchStartX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 45) stepLightbox(diff > 0 ? 1 : -1);
        }
      }, { passive: true });
    }

    // CV Modal triggers
    document.querySelectorAll('[data-open-cv]').forEach(function (btn) {
      btn.addEventListener('click', openCvModal);
    });
    document.getElementById('cv-close').addEventListener('click', closeCvModal);
    document.getElementById('cv-close-footer').addEventListener('click', closeCvModal);
    document.getElementById('cv-download-json').addEventListener('click', downloadProfileJson);
    document.getElementById('cv-modal').addEventListener('click', function (e) {
      if (e.target === this) closeCvModal();
    });
  });
})();
