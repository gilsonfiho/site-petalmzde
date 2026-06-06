import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo.png';
import { colors, gradients, shadows } from '../../styles/theme';
import { products } from '../../data/products';

const WA_NUMBER = '5585920057498';
const WA_MSG = encodeURIComponent('Olá! Vim pelo site e gostaria de saber mais sobre os arranjos 🌸');

const Produtos = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: colors.lavender[50], overflowX: 'hidden', fontFamily: '"Inter", sans-serif' }}>

      {/* HEADER */}
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
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={logo} alt="Petalmzde" style={{ height: isMobile ? '38px' : '46px', objectFit: 'contain', display: 'block' }} />
          </div>
          <nav style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/')}
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
              ← Início
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
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {isMobile ? '💬' : 'Orçamento 💬'}
            </a>
          </nav>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section style={{
        background: gradients.hero,
        color: 'white',
        padding: isMobile ? '48px 20px 56px' : 'clamp(52px, 8vw, 80px) 20px',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '14px' }}>
          💐 Nossos arranjos
        </p>
        <h1 style={{ fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(36px, 5vw, 52px)', fontWeight: 900, marginBottom: '14px', letterSpacing: '-0.01em' }}>
          Todos os produtos
        </h1>
        <p style={{ fontSize: isMobile ? '15px' : '18px', opacity: 0.85, lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
          Cada peça é única, feita com carinho. Clique em qualquer produto para pedir seu orçamento direto no WhatsApp.
        </p>
      </section>

      {/* GRID */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '36px 16px 64px' : 'clamp(48px, 8vw, 72px) 24px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: isMobile ? '14px' : 'clamp(18px, 3vw, 28px)',
        }}>
          {products.map(({ name, image }) => {
            const msg = encodeURIComponent(`Olá! Tenho interesse no produto: ${name} 🌸`);
            return (
              <div
                key={name}
                style={{
                  background: 'white',
                  border: `1px solid ${colors.purple[200]}`,
                  borderRadius: '18px',
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
                  <img
                    src={image}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: isMobile ? '14px 12px 16px' : '20px 20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{
                    fontSize: isMobile ? '13px' : '15px',
                    fontWeight: 600,
                    color: colors.gray[800],
                    lineHeight: 1.4,
                    marginBottom: '16px',
                    flex: 1,
                  }}>
                    {name}
                  </p>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${msg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: 'white',
                      fontSize: isMobile ? '13px' : '14px',
                      fontWeight: 700,
                      padding: isMobile ? '10px' : '12px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    💬 Pedir orçamento
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA encomenda */}
      <section style={{
        background: gradients.hero,
        color: 'white',
        textAlign: 'center',
        padding: isMobile ? '52px 20px' : 'clamp(60px, 10vw, 80px) 20px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '14px' }}>
          Não achou o que procurava?
        </p>
        <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(26px, 4vw, 36px)', fontWeight: 800, marginBottom: '12px' }}>
          Fazemos arranjos sob encomenda
        </h2>
        <p style={{ fontSize: isMobile ? '15px' : '17px', opacity: 0.85, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Fale com a gente e criamos o arranjo perfeito para o seu momento especial.
        </p>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de pedir um arranjo personalizado 🌸')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'white',
            color: colors.purple[700],
            fontWeight: 800,
            fontSize: isMobile ? '16px' : '18px',
            padding: isMobile ? '16px 32px' : '18px 44px',
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          💬 Falar no WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: gradients.dark,
        color: 'white',
        textAlign: 'center',
        padding: '36px 20px',
        fontSize: '14px',
      }}>
        <p style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.05em', marginBottom: '6px' }}>PETALMZDE</p>
        <p style={{ opacity: 0.6, marginBottom: '16px' }}>Flores artificiais personalizadas — feitas com amor 💜</p>
        <p style={{ opacity: 0.4, fontSize: '12px' }}>© {new Date().getFullYear()} PETALMZDE</p>
      </footer>
    </div>
  );
};

export default Produtos;
