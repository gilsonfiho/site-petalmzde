import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo.png';
import { colors, gradients, shadows } from '../../styles/theme';
import { products } from '../../data/products';

const WA_NUMBER = '5585920057498';
const WA_MSG = encodeURIComponent('Olá! Vim pelo site e gostaria de saber mais sobre os arranjos 🌸');

const socialLinks = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`,
    bg: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
    glow: 'rgba(37,211,102,0.40)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    label: 'Shopee',
    href: 'https://shopee.com.br/petalmzde',
    bg: 'linear-gradient(135deg, #EE4D2D 0%, #FF6B35 100%)',
    glow: 'rgba(238,77,45,0.38)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C8.96 0 6.5 2.69 6.5 6H4L2 22h20L20 6h-2.5C17.5 2.69 15.04 0 12 0zm0 2c1.93 0 3.5 1.79 3.5 4h-7C8.5 3.79 10.07 2 12 2zm0 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/petalmzde',
    bg: 'linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)',
    glow: 'rgba(221,42,123,0.38)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@petalmzde',
    bg: 'linear-gradient(135deg, #010101 0%, #2B2B2B 100%)',
    glow: 'rgba(0,0,0,0.35)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
  },
];

const whyUs = [
  { icon: '🌸', title: 'Nunca murcham', desc: 'Beleza permanente, sem água ou cuidados especiais.' },
  { icon: '✨', title: 'Totalmente personalizadas', desc: 'Cada peça criada sob medida para o seu gosto e ocasião.' },
  { icon: '🎁', title: 'Presente inesquecível', desc: 'Ideal para aniversários, casamentos e datas especiais.' },
];

const Home = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: colors.lavender[50], overflowX: 'hidden', fontFamily: '"Inter", sans-serif' }}>

      {/* ── HEADER ── */}
      <header style={{
        background: 'white',
        boxShadow: '0 2px 16px rgba(91,61,143,0.10)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '12px 20px' : '14px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Brand — só logo */}
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={logo} alt="Petalmzde" style={{ height: isMobile ? '38px' : '46px', objectFit: 'contain', display: 'block' }} />
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/produtos')}
              style={{
                background: colors.purple[100],
                border: 'none',
                color: colors.purple[700],
                fontWeight: 600,
                fontSize: isMobile ? '14px' : '15px',
                padding: isMobile ? '8px 14px' : '9px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = colors.purple[200]}
              onMouseLeave={e => e.currentTarget.style.background = colors.purple[100]}
            >
              Produtos
            </button>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: gradients.button,
                color: 'white',
                fontWeight: 700,
                fontSize: isMobile ? '14px' : '15px',
                padding: isMobile ? '8px 14px' : '9px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {!isMobile && 'Orçamento '}💬
            </a>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        background: gradients.hero,
        color: 'white',
        padding: isMobile ? '60px 20px 70px' : 'clamp(70px, 10vw, 110px) 20px',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: isMobile ? 'clamp(48px, 14vw, 72px)' : 'clamp(64px, 9vw, 100px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '20px',
          }}>
            petalmzde
          </h1>

          <p style={{
            fontSize: isMobile ? '16px' : 'clamp(17px, 2.5vw, 20px)',
            opacity: 0.9,
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 48px',
          }}>
            💜💐✨ Eternizando momentos especiais
          </p>

          {/* Social buttons */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '12px' : '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {socialLinks.map(({ label, icon, href, bg, glow }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: bg,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: isMobile ? '15px' : '17px',
                  padding: isMobile ? '14px 24px' : '17px 36px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: `0 8px 28px ${glow}`,
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  minWidth: isMobile ? '140px' : '170px',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${glow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 28px ${glow}`; }}
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUTOS EM DESTAQUE ── */}
      <section style={{
        background: 'white',
        padding: isMobile ? '50px 20px' : 'clamp(60px, 10vw, 80px) 20px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? '32px' : 'clamp(36px, 6vw, 52px)' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: colors.purple[600], letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                🌸 Nossos arranjos
              </p>
              <h2 style={{ fontSize: isMobile ? '26px' : 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: colors.gray[900], margin: 0 }}>
                Produtos em destaque
              </h2>
            </div>
            <button
              onClick={() => navigate('/produtos')}
              style={{
                background: gradients.button,
                color: 'white',
                border: 'none',
                fontWeight: 700,
                fontSize: isMobile ? '13px' : '15px',
                padding: isMobile ? '10px 18px' : '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                boxShadow: shadows.md,
                flexShrink: 0,
              }}
            >
              Ver todos →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: isMobile ? '14px' : 'clamp(18px, 3vw, 28px)',
            width: '100%',
          }}>
            {products.map(({ name, image }) => (
              <ProductCard key={name} name={name} image={image} waNumber={WA_NUMBER} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUE NÓS ── */}
      <section style={{
        background: gradients.subtle,
        borderTop: `1px solid ${colors.purple[200]}`,
        borderBottom: `1px solid ${colors.purple[200]}`,
        padding: isMobile ? '50px 20px' : 'clamp(60px, 10vw, 80px) 20px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '26px' : 'clamp(28px, 4vw, 36px)',
            fontWeight: 800,
            color: colors.gray[900],
            textAlign: 'center',
            marginBottom: isMobile ? '36px' : 'clamp(40px, 6vw, 56px)',
          }}>
            Por que escolher a <span style={{ color: colors.purple[600] }}>petalmzde</span>?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '16px' : 'clamp(18px, 3vw, 28px)',
          }}>
            {whyUs.map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: 'white',
                  border: `1px solid ${colors.purple[200]}`,
                  borderRadius: '18px',
                  padding: isMobile ? '28px 22px' : 'clamp(28px, 4vw, 40px)',
                  textAlign: 'center',
                  boxShadow: shadows.card,
                  transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = shadows.glow;
                  e.currentTarget.style.borderColor = colors.purple[400];
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = shadows.card;
                  e.currentTarget.style.borderColor = colors.purple[200];
                }}
              >
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.purple[100]}, ${colors.purple[200]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: '32px',
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 700, color: colors.gray[900], marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '15px', color: colors.gray[500], lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: colors.purple[100],
        color: colors.purple[900],
        padding: isMobile ? '48px 20px' : 'clamp(52px, 8vw, 72px) 20px',
        width: '100%',
        boxSizing: 'border-box',
        borderTop: `1px solid ${colors.purple[200]}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '36px' : 'clamp(32px, 5vw, 48px)',
        }}>
          {/* Brand */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <img src={logo} alt="Petalmzde" style={{ height: '44px', objectFit: 'contain' }} />
            </div>
            <p style={{ color: colors.purple[700], lineHeight: 1.7, fontSize: '15px', maxWidth: '260px', margin: isMobile ? '0 auto' : '0' }}>
              Flores personalizadas feitas com amor para eternizar seus momentos especiais.
            </p>
          </div>

          {/* Links */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '16px', color: colors.purple[900] }}>Links rápidos</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: isMobile ? 'center' : 'flex-start' }}>
              {[
                { label: 'Início', href: '/' },
                { label: 'Produtos', href: '/produtos' },
                { label: 'Loja Shopee', href: 'https://shopee.com.br/petalmzde' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={{ color: colors.purple[700], textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = colors.purple[900]}
                    onMouseLeave={e => e.currentTarget.style.color = colors.purple[700]}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '16px', color: colors.purple[900] }}>Contato</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: isMobile ? 'center' : 'flex-start' }}>
              {socialLinks.filter(({ label }) => label !== 'Shopee').map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: colors.purple[700], textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = colors.purple[900]}
                  onMouseLeave={e => e.currentTarget.style.color = colors.purple[700]}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: `1px solid ${colors.purple[200]}`,
          marginTop: isMobile ? '40px' : '52px',
          paddingTop: '28px',
          textAlign: 'center',
          color: colors.purple[600],
          fontSize: '13px',
        }}>
          © {new Date().getFullYear()} petalmzde. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

const ProductCard = ({ name, image, waNumber, isMobile }) => {
  const msg = encodeURIComponent(`Olá! Tenho interesse no produto: ${name} 🌸`);
  return (
    <div
      style={{
        background: 'white',
        border: `1px solid ${colors.purple[200]}`,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: shadows.card,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = `0 20px 40px ${colors.purple[600]}25`;
        e.currentTarget.style.borderColor = colors.purple[400];
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = shadows.card;
        e.currentTarget.style.borderColor = colors.purple[200];
      }}
    >
      <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: colors.lavender[200] }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: isMobile ? '14px 12px 16px' : '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{
          fontSize: isMobile ? '13px' : '15px',
          fontWeight: 600,
          color: colors.gray[800],
          lineHeight: 1.4,
          marginBottom: '14px',
          flex: 1,
        }}>
          {name}
        </p>
        <a
          href={`https://wa.me/${waNumber}?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            background: gradients.button,
            color: 'white',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: 700,
            padding: '11px',
            borderRadius: '10px',
            textDecoration: 'none',
            boxShadow: shadows.sm,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Pedir orçamento
        </a>
      </div>
    </div>
  );
};

export default Home;
