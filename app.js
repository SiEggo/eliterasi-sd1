const categories = ["Puisi", "Surat", "Cerpen", "Esai", "Resensi film", "Resensi buku", "Resensi musik", "Kisah inspiratif"];
const storageKey = "jenaka-works-v1";
const initialWorks = [
  { id: "seed-1", name: "Nadia Putri", className: "5A", type: "Puisi", title: "Pagi di Ujung Lapangan", body: "Embun berbaris di rumput sekolah,\nsepatu kecil berlari mengejar bola.\nBel masuk berbunyi, matahari tersenyum,\nhari baru menunggu di depan pintu.\n\nDi bawah pohon ketapang,\naku simpan mimpi dalam saku.\nNanti saat besar, akan kubuka\ndan kutunjukkan pada dunia.", status: "published", date: "2026-10-07" },
  { id: "seed-2", name: "Rafi Akbar", className: "6B", type: "Cerpen", title: "Payung Merah untuk Bu Sari", body: "Hujan turun tepat ketika bel pulang berbunyi. Di depan kelas, Bu Sari berdiri sambil memandangi langit. Payungnya tertinggal di rumah.\n\nAku punya payung merah di tas. Awalnya aku ragu, sebab rumahku berlawanan arah. Tetapi Bu Sari selalu sabar mengajariku pecahan. Hari itu, kami pulang bersama sampai pertigaan. Bajuku sedikit basah, tetapi rasanya hangat sekali.\n\nBesoknya, Bu Sari membawa dua potong kue pisang. Katanya, kebaikan kecil selalu punya cara untuk kembali.", status: "published", date: "2026-10-05" },
  { id: "seed-3", name: "Alya Maharani", className: "4A", type: "Resensi buku", title: "Petualangan di Balik Sampul", body: "Buku yang kubaca bercerita tentang seorang anak yang menemukan peta di perpustakaan kakeknya. Ia lalu berpetualang mencari tempat-tempat yang selama ini hanya ia lihat dari jendela.\n\nBagian paling kusuka adalah saat tokohnya menolong teman baru meski sedang terburu-buru. Bahasanya mudah dipahami dan gambarnya membuat cerita terasa hidup.\n\nAku merekomendasikan buku ini untuk teman-teman yang suka petualangan dan ingin belajar berani mencoba hal baru.", status: "published", date: "2026-10-02" },
  { id: "seed-4", name: "Dimas Pratama", className: "5B", type: "Kisah inspiratif", title: "Sepuluh Menit Lebih Awal", body: "Setiap hari, Lala datang paling akhir karena harus menunggu adiknya siap. Ia sering merasa tertinggal. Suatu pagi, adiknya membantu menyiapkan tas sendiri. Mereka berangkat sepuluh menit lebih awal.\n\nDi kelas, Lala sempat membantu teman merapikan buku sebelum pelajaran dimulai. Hal kecil itu membuat paginya berbeda. Ia sadar bahwa perubahan tidak selalu harus besar. Kadang, sepuluh menit cukup untuk membuka hari yang lebih baik.", status: "published", date: "2026-09-28" },
  { id: "seed-5", name: "Salsa Nirmala", className: "5A", type: "Surat", title: "Untuk Pohon di Halaman", body: "Pohon besar yang baik,\n\nTerima kasih sudah menjadi tempat teduh saat kami membaca. Cabangmu adalah rumah bagi burung-burung kecil. Daunmu menari setiap kali angin datang.\n\nKami berjanji tidak akan mematahkan rantingmu. Kami juga akan menjaga halaman tetap bersih. Semoga kamu tumbuh kuat dan menemani adik kelas kami nanti.\n\nSalam hangat,\nSalsa", status: "published", date: "2026-09-24" },
  { id: "seed-6", name: "Bagas Wicaksono", className: "4B", type: "Esai", title: "Perpustakaan, Rumah Kedua", body: "Perpustakaan sekolah bukan hanya tempat menyimpan buku. Di sana kita bisa beristirahat sejenak, mencari jawaban, atau menemukan cerita yang belum pernah kita bayangkan.\n\nMenurutku, perpustakaan yang nyaman membuat anak-anak senang membaca. Kita bisa ikut menjaganya dengan mengembalikan buku ke tempat semula dan berbicara dengan suara pelan. Jika setiap orang merawatnya, perpustakaan akan selalu menjadi rumah kedua yang menyenangkan.", status: "published", date: "2026-09-20" },
  { id: "seed-7", name: "Mira Lestari", className: "5A", type: "Resensi musik", title: "Lagu yang Mengingatkanku Pulang", body: "Lagu ini memiliki irama yang pelan dan lirik yang mudah diingat. Saat mendengarnya, aku teringat perjalanan pulang sekolah bersama teman-teman.\n\nBagian yang paling kusuka adalah suara pianonya, karena terdengar seperti hujan sore. Lagu ini cocok didengarkan saat ingin beristirahat setelah belajar. Aku memberi lagu ini empat bintang karena musiknya membuat hati terasa tenang.", status: "published", date: "2026-09-17" },
  { id: "seed-8", name: "Rangga Saputra", className: "6B", type: "Resensi film", title: "Belajar Berani dari Layar", body: "Film ini bercerita tentang dua sahabat yang bekerja sama mengikuti lomba sains. Mereka punya ide berbeda dan beberapa kali berselisih. Namun, mereka akhirnya belajar mendengarkan satu sama lain.\n\nAku suka karena tokohnya tidak langsung berhasil. Mereka mencoba lagi setelah gagal. Film ini mengingatkan kita bahwa bekerja sama bukan berarti selalu setuju, tetapi mau mencari jalan bersama. Ceritanya cocok ditonton bersama keluarga.", status: "published", date: "2026-09-12" }
];

let workList = document.querySelector("#work-list");
let searchInput = document.querySelector("#search-input");
let filterContainer = document.querySelector("#category-filters");
const submitModal = document.querySelector("#submit-modal");
const teacherModal = document.querySelector("#teacher-modal");
const detailModal = document.querySelector("#detail-modal");
const submissionForm = document.querySelector("#submission-form");
const toast = document.querySelector("#toast");
let selectedCategory = "Semua karya";
let adminStatus = "pending";
let toastTimer;

function loadWorks() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : initialWorks;
  } catch {
    return initialWorks;
  }
}

let works = loadWorks();

function saveWorks() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(works));
  } catch {
    showToast("Penyimpanan browser tidak tersedia. Perubahan hanya berlaku sementara.");
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${dateString}T12:00:00`));
}

function updateStats() {
  const published = works.filter((work) => work.status === "published");
  document.querySelector("#published-count").textContent = String(published.length).padStart(2, "0");
  document.querySelector("#student-count").textContent = String(new Set(published.map((work) => work.name.toLocaleLowerCase("id-ID"))).size).padStart(2, "0");
}

function renderFilters() {
  const filters = ["Semua karya", ...categories];
  filterContainer.innerHTML = filters.map((category) => `<button class="filter-button${selectedCategory === category ? " selected" : ""}" type="button" data-category="${escapeHtml(category)}" aria-pressed="${selectedCategory === category}">${escapeHtml(category)}</button>`).join("");
}

function renderPublicWorks() {
  const query = searchInput.value.trim().toLocaleLowerCase("id-ID");
  const visibleWorks = works.filter((work) => work.status === "published")
    .filter((work) => selectedCategory === "Semua karya" || work.type === selectedCategory)
    .filter((work) => `${work.title} ${work.name} ${work.type}`.toLocaleLowerCase("id-ID").includes(query))
    .sort((first, second) => second.date.localeCompare(first.date));

  workList.className = "work-list";
  if (!visibleWorks.length) {
    workList.innerHTML = '<div class="empty-state">Belum ada karya yang cocok. Coba kata kunci lain.</div>';
    return;
  }

  workList.innerHTML = visibleWorks.map((work, index) => `<article class="work-item" style="animation-delay:${index * 35}ms">
    <div class="work-meta"><span class="work-category">${escapeHtml(work.type)}</span><span class="meta-dot"></span><time datetime="${escapeHtml(work.date)}">${formatDate(work.date)}</time></div>
    <h3><button type="button" data-open-detail="${escapeHtml(work.id)}">${escapeHtml(work.title)}</button></h3>
    <p class="work-excerpt">${escapeHtml(work.body.replace(/\s+/g, " "))}</p>
    <span class="work-author">${escapeHtml(work.name)} · Kelas ${escapeHtml(work.className)}</span>
    <button class="work-open" type="button" data-open-detail="${escapeHtml(work.id)}" aria-label="Baca ${escapeHtml(work.title)}">↗</button>
  </article>`).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function openDetail(id) {
  const work = works.find((item) => item.id === id);
  if (!work) return;
  document.querySelector("#detail-meta").textContent = `${work.type} · ${formatDate(work.date)}`;
  document.querySelector("#detail-title").textContent = work.title;
  document.querySelector("#detail-byline").textContent = `${work.name} · Kelas ${work.className}`;
  document.querySelector("#detail-body").textContent = work.body;
  detailModal.showModal();
}

function setPublicView() {
  const contentMain = document.querySelector("#content-main");
  document.querySelector(".reading-aside").hidden = false;
  contentMain.className = "content-main";
  contentMain.innerHTML = `<div class="section-heading"><div><p class="eyebrow eyebrow-dark">DARI MEJA BACA</p><h2>Karya terbaru<span class="heading-period">.</span></h2></div><label class="search-box"><span class="search-icon" aria-hidden="true">⌕</span><input id="search-input" type="search" placeholder="Cari judul atau penulis" aria-label="Cari judul atau penulis" /></label></div><div class="filter-row" id="category-filters" aria-label="Filter jenis karya"></div><div class="work-list" id="work-list" aria-live="polite"></div>`;
  window.location.hash = "karya";
  bindPublicElements();
}

function renderAdmin(status = adminStatus) {
  adminStatus = status;
  const contentMain = document.querySelector("#content-main");
  document.querySelector(".reading-aside").hidden = true;
  contentMain.className = "content-main admin-view";
  const statusLabels = { pending: "Menunggu", published: "Terbit", rejected: "Ditolak" };
  const currentWorks = works.filter((work) => work.status === status).sort((first, second) => second.date.localeCompare(first.date));
  const counts = Object.fromEntries(Object.keys(statusLabels).map((key) => [key, works.filter((work) => work.status === key).length]));

  contentMain.innerHTML = `<div class="admin-top"><div><p class="eyebrow eyebrow-dark">PANEL PENDIDIK</p><h2>Antrean karya<span class="heading-period">.</span></h2><p>Periksa karya siswa sebelum tampil di ruang baca.</p></div><button class="button button-quiet admin-exit" type="button" id="admin-exit">Keluar dari ruang guru</button></div>
    <div class="admin-tabs" role="tablist" aria-label="Status karya">${Object.entries(statusLabels).map(([key, label]) => `<button class="admin-tab${status === key ? " selected" : ""}" type="button" role="tab" aria-selected="${status === key}" data-admin-status="${key}">${label} (${counts[key]})</button>`).join("")}</div>
    <div class="admin-work-list">${currentWorks.length ? currentWorks.map((work) => `<article class="admin-work"><div class="admin-work-meta">${escapeHtml(work.type)} · ${formatDate(work.date)}</div><h3>${escapeHtml(work.title)}</h3><div class="admin-work-meta">${escapeHtml(work.name)} · Kelas ${escapeHtml(work.className)}</div><p class="admin-work-excerpt">${escapeHtml(work.body.replace(/\s+/g, " "))}</p><div class="admin-work-actions"><button class="small-action" type="button" data-open-detail="${escapeHtml(work.id)}">Baca lengkap</button>${status === "pending" ? `<button class="small-action approve" type="button" data-review="published" data-id="${escapeHtml(work.id)}">Setujui</button><button class="small-action reject" type="button" data-review="rejected" data-id="${escapeHtml(work.id)}">Tolak</button>` : status === "rejected" ? `<button class="small-action approve" type="button" data-review="published" data-id="${escapeHtml(work.id)}">Terbitkan</button>` : `<button class="small-action reject" type="button" data-review="rejected" data-id="${escapeHtml(work.id)}">Tarik dari publikasi</button>`}</div></article>`).join("") : '<div class="empty-state">Tidak ada karya di bagian ini.</div>'}</div>`;
  window.location.hash = "karya";
}

function bindPublicElements() {
  workList = document.querySelector("#work-list");
  searchInput = document.querySelector("#search-input");
  filterContainer = document.querySelector("#category-filters");
  const formSelect = submissionForm.elements.type;
  formSelect.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  document.querySelector("#search-input").addEventListener("input", renderPublicWorks);
  document.querySelector("#category-filters").addEventListener("click", (event) => {
    const filter = event.target.closest("[data-category]");
    if (!filter) return;
    selectedCategory = filter.dataset.category;
    renderFilters();
    renderPublicWorks();
  });
  renderFilters();
  renderPublicWorks();
}

function isAdmin() {
  return sessionStorage.getItem("jenaka-teacher-session") === "active";
}

function closeModal(button) {
  button.closest("dialog").close();
}

bindPublicElements();
updateStats();

document.querySelector("#open-submit").addEventListener("click", () => submitModal.showModal());
document.querySelectorAll("[data-open-submit]").forEach((button) => button.addEventListener("click", () => submitModal.showModal()));
document.querySelector("#teacher-entry").addEventListener("click", () => {
  if (isAdmin()) {
    renderAdmin();
    return;
  }
  teacherModal.showModal();
});
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", () => closeModal(button)));
document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
}));

submissionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(submissionForm);
  works.unshift({
    id: `work-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: formData.get("name").trim(),
    className: formData.get("className").trim(),
    type: formData.get("type"),
    title: formData.get("title").trim(),
    body: formData.get("body").trim(),
    status: "pending",
    date: new Date().toISOString().slice(0, 10)
  });
  saveWorks();
  submissionForm.reset();
  submitModal.close();
  updateStats();
  showToast("Karyamu sudah masuk antrean tinjauan guru.");
});

document.querySelector("#teacher-login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const code = new FormData(event.currentTarget).get("accessCode").trim();
  if (code !== "GURU-JENAKA") {
    showToast("Kode akses belum tepat.");
    return;
  }
  sessionStorage.setItem("jenaka-teacher-session", "active");
  event.currentTarget.reset();
  teacherModal.close();
  renderAdmin();
});

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-open-detail]");
  if (detailButton) openDetail(detailButton.dataset.openDetail);

  const reviewButton = event.target.closest("[data-review]");
  if (reviewButton) {
    if (!isAdmin()) return;
    const work = works.find((item) => item.id === reviewButton.dataset.id);
    if (!work) return;
    work.status = reviewButton.dataset.review;
    saveWorks();
    updateStats();
    renderAdmin(adminStatus);
    showToast(work.status === "published" ? "Karya berhasil diterbitkan." : "Karya dipindahkan ke bagian ditolak.");
  }

  const statusTab = event.target.closest("[data-admin-status]");
  if (statusTab && isAdmin()) renderAdmin(statusTab.dataset.adminStatus);

  if (event.target.closest("#admin-exit")) {
    sessionStorage.removeItem("jenaka-teacher-session");
    selectedCategory = "Semua karya";
    setPublicView();
  }
});

document.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", (event) => {
  if (link.dataset.view === "public" && isAdmin()) {
    event.preventDefault();
    setPublicView();
  }
}));