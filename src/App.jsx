import { useState, useEffect } from 'react'

const WA = 'https://wa.me/6281234567890?text=Halo%20Cukur%20Rapi,%20saya%20mau%20booking%20jadwal%20cukur.'

const SERVICES = [
  { icon: 'cut', title: 'Potong Rambut', desc: 'Konsultasi gaya, potong presisi, cuci rambut, dan styling akhir sesuai karakter wajahmu.', price: 'Rp 45rb' },
  { icon: 'razor', title: 'Cukur Klasik', desc: 'Wet shave dengan pisau lipat, handuk hangat, dan pijatan ringan yang bikin rileks.', price: 'Rp 40rb' },
  { icon: 'beard', title: 'Beard Sculpting', desc: 'Bentuk dan rapikan brewok atau jenggot biar tegas, rapi, dan gampang dirawat.', price: 'Rp 35rb' },
  { icon: 'crown', title: 'Paket Sultan', desc: 'Potong rambut, cukur klasik, facial, dan pijat kepala. Keluar ruangan seperti orang baru.', price: 'Rp 120rb' },
]

const FEATURES = [
  { n: '01', title: 'Barber Berpengalaman', desc: 'Tim kami rata-rata punya pengalaman 5 tahun lebih dan rutin ikut workshop gaya rambut terbaru.' },
  { n: '02', title: 'Alat Steril Terjamin', desc: 'Setiap pisau dan sisir disterilkan sebelum dipakai. Kebersihan bukan kompromi di sini.' },
  { n: '03', title: 'Tanpa Antre Lama', desc: 'Booking via WhatsApp, datang sesuai jadwal, langsung duduk di kursi. Waktumu berharga.' },
]

const GALLERY = [
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
]

const TESTIS = [
  { name: 'Rizky Pratama', role: 'Karyawan Swasta', text: 'Potongannya rapi banget dan sesuai sama referensi yang saya bawa. Barbernya juga enak diajak ngobrol, nggak kaku.' },
  { name: 'Dimas Saputra', role: 'Mahasiswa', text: 'Paket Sultannya worth it parah. Keluar dari sini berasa fresh banget, pijat kepalanya juara.' },
  { name: 'Andi Wijaya', role: 'Wirausaha', text: 'Udah langganan 2 tahun. Nggak pernah kecewa, hasilnya konsisten rapi tiap datang. Tempatnya juga nyaman.' },
]

const PRICES = [
  { name: 'Reguler', desc: 'Buat perawatan rutin biar tetap rapi.', val: 'Rp 45rb', per: '/ kunjungan', feats: ['Potong rambut', 'Cuci + styling', 'Konsultasi gaya', 'Minuman gratis'], featured: false },
  { name: 'Sultan', desc: 'Paket lengkap paling laris di sini.', val: 'Rp 120rb', per: '/ kunjungan', feats: ['Semua layanan Reguler', 'Cukur klasik', 'Facial + pijat kepala', 'Prioritas booking'], featured: true },
  { name: 'Langganan', desc: 'Hemat buat yang cukur tiap bulan.', val: 'Rp 150rb', per: '/ bulan', feats: ['4x potong rambut', 'Bebas pilih jadwal', 'Gratis touch-up', 'Minuman gratis'], featured: false },
]

const FAQS = [
  { q: 'Apakah harus booking dulu atau bisa langsung datang?', a: 'Bisa dua-duanya. Tapi kami sangat sarankan booking via WhatsApp biar nggak antre, apalagi pas weekend yang biasanya rame.' },
  { q: 'Berapa lama sekali waktu pengerjaan?', a: 'Potong rambut sekitar 30 sampai 40 menit. Cukur klasik sekitar 25 menit. Paket Sultan totalnya sekitar 90 menit.' },
  { q: 'Apakah cocok untuk anak-anak?', a: 'Cocok. Barber kami terbiasa menangani anak-anak dengan sabar. Untuk anak di bawah 10 tahun ada harga khusus Rp 30rb.' },
  { q: 'Metode pembayaran apa saja yang diterima?', a: 'Kami menerima tunai, QRIS, dan semua e-wallet populer. Transfer bank juga bisa.' },
  { q: 'Buka jam berapa?', a: 'Senin sampai Minggu, jam 10 pagi sampai 9 malam. Hari Jumat tutup jam 11.30 sampai 13.00 untuk salat Jumat.' },
]

function Icon({ name }) {
  const paths = {
    cut: <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.5 6.5L20 18M15.5 4.5L4 16" />,
    razor: <path d="M4 20l7-7m2-2l5-5m2 2l-2-2m-9 9l-2 2m11-11l3 3-7 7-3-3 7-7z" />,
    beard: <path d="M12 3c-4 0-7 3-7 8v2c0 4 3 8 7 8s7-4 7-8v-2c0-5-3-8-7-8zm0 4c1.5 0 2.5 1 2.5 2.5" />,
    crown: <path d="M3 8l4 4 5-6 5 6 4-4-1.5 10h-15L3 8z" />,
    star: <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />,
    check: <path d="M4 12l5 5L20 6" />,
    clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-13v5l3 2" />,
    pin: <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
    arrow: <path d="M5 12h14m-6-6l6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    wa: <path d="M21 12a9 9 0 1 1-16.6 4.8L3 21l4.3-1.3A9 9 0 1 1 21 12zm-4.3 2.5c-.2.6-1.2 1.1-1.7 1.1-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.2z" />,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [faq, setFaq] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <div className="site">
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="logo" href="#"><span className="logo-mark"><Icon name="cut" /></span>CUKUR RAPI</a>
          <div className={`nav-links ${open ? 'show' : ''}`}>
            <a href="#layanan" onClick={() => setOpen(false)}>Layanan</a>
            <a href="#tentang" onClick={() => setOpen(false)}>Tentang</a>
            <a href="#galeri" onClick={() => setOpen(false)}>Galeri</a>
            <a href="#harga" onClick={() => setOpen(false)}>Harga</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          </div>
          <div className="nav-cta">
            <a href={WA} className="btn btn-primary">Booking Sekarang</a>
            <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu"><span /><span /><span /></button>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow reveal">Barbershop Premium · Semarang</p>
            <h1 className="reveal">Tampil Tajam,<br /><em>Percaya Diri</em> Maksimal.</h1>
            <p className="lead reveal">Potongan presisi dan cukur klasik oleh barber berpengalaman. Sekali duduk, keluar ruangan dengan versi terbaik dirimu.</p>
            <div className="hero-actions reveal">
              <a href={WA} className="btn btn-primary"><Icon name="wa" /> Booking via WhatsApp</a>
              <a href="#layanan" className="btn btn-ghost">Lihat Layanan</a>
            </div>
            <div className="hero-stats reveal">
              <div><strong>4.9</strong><span>Rating Google</span></div>
              <div><strong>8+</strong><span>Tahun Berdiri</span></div>
              <div><strong>30rb+</strong><span>Kepala Dicukur</span></div>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="hero-frame">
              <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop" alt="Barber sedang memotong rambut pelanggan" />
            </div>
            <div className="hero-badge">
              <div>
                <div className="stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <strong>4.9 dari 2.100+ ulasan</strong>
                <span>Pelanggan puas tiap minggunya</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="layanan">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow reveal">Layanan Kami</p>
            <h2 className="reveal">Pilih <em>Perawatanmu</em></h2>
            <p className="section-sub reveal">Setiap layanan dikerjakan dengan teliti, tanpa terburu-buru. Kualitas selalu nomor satu.</p>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <article key={i} className="svc-card reveal">
                <div className="svc-icon"><Icon name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-price">{s.price} <small>/ sesi</small></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="tentang">
        <div className="container feat-grid">
          <div className="feat-photo reveal">
            <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop" alt="Interior barbershop Cukur Rapi" />
          </div>
          <div>
            <p className="eyebrow reveal">Kenapa Cukur Rapi</p>
            <h2 className="reveal" style={{ fontSize: 'clamp(38px, 4.6vw, 60px)', margin: '16px 0 14px' }}>Bukan Sekadar <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>Potong Rambut</em></h2>
            <p className="section-sub reveal">Kami percaya potongan rambut yang bagus bisa mengubah harimu. Makanya setiap detail kami perhatikan.</p>
            <div className="feat-list">
              {FEATURES.map((f, i) => (
                <div key={i} className="feat-item reveal">
                  <div className="feat-num">{f.n}</div>
                  <div><h3>{f.title}</h3><p>{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="galeri">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">Galeri</p>
            <h2 className="reveal">Hasil <em>Karya Kami</em></h2>
            <p className="section-sub reveal">Intip suasana dan hasil potongan di barbershop kami.</p>
          </div>
          <div className="gal-grid">
            {GALLERY.map((g, i) => (
              <img key={i} className="reveal" src={g} alt={`Galeri barbershop ${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">Testimoni</p>
            <h2 className="reveal">Kata <em>Mereka</em></h2>
            <p className="section-sub reveal">Cerita jujur dari pelanggan yang sudah merasakan sendiri.</p>
          </div>
          <div className="testi-grid">
            {TESTIS.map((t, i) => (
              <article key={i} className="testi-card reveal">
                <div className="stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p>"{t.text}"</p>
                <div className="testi-who">
                  <div className="testi-ava">{t.name[0]}</div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="harga">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">Harga</p>
            <h2 className="reveal">Paket <em>Hemat</em></h2>
            <p className="section-sub reveal">Harga transparan, tanpa biaya tersembunyi. Pilih yang paling pas buatmu.</p>
          </div>
          <div className="price-grid">
            {PRICES.map((p, i) => (
              <article key={i} className={`price-card reveal ${p.featured ? 'featured' : ''}`}>
                {p.featured && <span className="price-flag">Paling Laris</span>}
                <h3>{p.name}</h3>
                <p className="pdesc">{p.desc}</p>
                <div className="price-val">{p.val} <small>{p.per}</small></div>
                <ul className="price-list">
                  {p.feats.map((f, j) => <li key={j}><Icon name="check" />{f}</li>)}
                </ul>
                <a href={WA} className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`} style={{ justifyContent: 'center' }}>Pilih {p.name}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="faq">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">FAQ</p>
            <h2 className="reveal">Sering <em>Ditanyakan</em></h2>
          </div>
          <div className="faq-wrap">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item reveal ${faq === i ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setFaq(faq === i ? -1 : i)}>
                  {f.q}<Icon name="plus" />
                </button>
                <div className="faq-a" style={{ maxHeight: faq === i ? '220px' : '0' }}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-box reveal">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Siap Tampil Beda?</p>
            <h2>Booking Kursimu <em>Sekarang</em></h2>
            <p>Slot weekend cepat penuh. Amankan jadwalmu hari ini via WhatsApp, gratis konsultasi gaya rambut.</p>
            <a href={WA} className="btn btn-primary"><Icon name="wa" /> Chat WhatsApp <Icon name="arrow" /></a>
            <div className="cta-meta">
              <div><Icon name="clock" /> Senin-Minggu · 10.00 - 21.00</div>
              <div><Icon name="pin" /> Jl. Pandanaran No. 88, Semarang</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <a className="logo" href="#"><span className="logo-mark"><Icon name="cut" /></span>CUKUR RAPI</a>
              <p>Barbershop premium di jantung kota Semarang. Potongan presisi, pelayanan hangat, hasil memuaskan sejak 2017.</p>
            </div>
            <div>
              <h4>Layanan</h4>
              <ul>
                <li><a href="#layanan">Potong Rambut</a></li>
                <li><a href="#layanan">Cukur Klasik</a></li>
                <li><a href="#layanan">Beard Sculpting</a></li>
                <li><a href="#harga">Paket Sultan</a></li>
              </ul>
            </div>
            <div>
              <h4>Navigasi</h4>
              <ul>
                <li><a href="#tentang">Tentang Kami</a></li>
                <li><a href="#galeri">Galeri</a></li>
                <li><a href="#harga">Harga</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Kontak</h4>
              <ul>
                <li><a href={WA}>WhatsApp</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">Google Maps</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Cukur Rapi. Seluruh hak cipta dilindungi.</span>
            <span>Semarang, Jawa Tengah</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
