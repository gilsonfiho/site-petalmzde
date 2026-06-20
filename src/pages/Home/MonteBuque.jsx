import { useState } from 'react';
import { flores, adicionais } from '../../data/monteBuque';
import { colors } from '../../styles/theme';

const WA_NUMBER = '5585920057498';

const initQty = (items) => Object.fromEntries(items.map(({ id }) => [id, 0]));

/* ── Card individual de flor / adicional ── */
const ItemCard = ({ item, qty, onInc, onDec, isMobile }) => (
  <div style={{
    background: '#F0F7F0',
    border: '1px solid #C8E6C9',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.2s',
  }}>
    <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
      <img
        src={item.image}
        alt={item.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <div style={{ padding: isMobile ? '10px' : '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <p style={{
        fontSize: isMobile ? '11px' : '13px',
        fontWeight: 600,
        color: '#2E4A2E',
        lineHeight: 1.35,
        margin: 0,
        minHeight: isMobile ? '32px' : '36px',
      }}>
        {item.name}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={onDec}
          disabled={qty === 0}
          style={{
            width: isMobile ? '28px' : '32px',
            height: isMobile ? '28px' : '32px',
            borderRadius: '50%',
            border: 'none',
            background: qty === 0 ? '#E0E0E0' : colors.purple[600],
            color: qty === 0 ? '#BDBDBD' : 'white',
            fontSize: '18px',
            fontWeight: 700,
            cursor: qty === 0 ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
          aria-label={`Diminuir ${item.name}`}
        >
          −
        </button>
        <span style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: 700,
          color: '#2E4A2E',
          minWidth: '20px',
          textAlign: 'center',
        }}>
          {qty}
        </span>
        <button
          onClick={onInc}
          style={{
            width: isMobile ? '28px' : '32px',
            height: isMobile ? '28px' : '32px',
            borderRadius: '50%',
            border: 'none',
            background: colors.purple[600],
            color: 'white',
            fontSize: '18px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
          aria-label={`Aumentar ${item.name}`}
        >
          +
        </button>
      </div>
    </div>
  </div>
);

/* ── Componente principal ── */
const MonteBuque = ({ isMobile }) => {
  const [florQty, setFlorQty]   = useState(() => initQty(flores));
  const [adicQty, setAdicQty]   = useState(() => initQty(adicionais));

  const selectedItems = [
    ...flores.map(f    => ({ ...f, qty: florQty[f.id] })),
    ...adicionais.map(a => ({ ...a, qty: adicQty[a.id] })),
  ].filter(i => i.qty > 0);

  const hasItems = selectedItems.length > 0;

  const buildMsg = () => {
    const lines = ['Olá! Gostaria de montar um buquê personalizado.\n'];
    const florSel = flores.filter(f => florQty[f.id] > 0);
    const adicSel = adicionais.filter(a => adicQty[a.id] > 0);
    if (florSel.length) {
      lines.push('*Flores:*');
      florSel.forEach(f => lines.push(`- ${f.name}: ${florQty[f.id]}x`));
    }
    if (adicSel.length) {
      lines.push('\n*Adicionais:*');
      adicSel.forEach(a => lines.push(`- ${a.name}: ${adicQty[a.id]}x`));
    }
    return encodeURIComponent(lines.join('\n'));
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? '12px' : '16px',
  };

  const SectionTitle = ({ emoji, label }) => (
    <h3 style={{
      fontSize: isMobile ? '15px' : '17px',
      fontWeight: 700,
      color: colors.purple[800],
      margin: '0 0 14px',
    }}>
      {emoji} {label}
    </h3>
  );

  /* Painel de resumo — mesmo markup para desktop (sidebar) e mobile (bottom bar) */
  const SummaryPanel = ({ mobile }) => (
    <div style={mobile ? {
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      background: 'white',
      borderTop: `2px solid ${colors.purple[200]}`,
      padding: '12px 20px 16px',
      zIndex: 600,
      boxShadow: '0 -4px 20px rgba(91,61,143,0.13)',
    } : {
      width: '260px',
      flexShrink: 0,
      position: 'sticky',
      top: '80px',
      background: 'white',
      border: `1px solid ${colors.purple[200]}`,
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(91,61,143,0.10)',
      alignSelf: 'flex-start',
    }}>
      {!mobile && (
        <h4 style={{ fontWeight: 700, fontSize: '15px', color: colors.purple[800], margin: '0 0 14px' }}>
          🛒 Resumo do pedido
        </h4>
      )}

      {hasItems ? (
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: mobile ? '0 0 10px' : '0 0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          maxHeight: mobile ? '72px' : 'none',
          overflowY: mobile ? 'auto' : 'visible',
        }}>
          {selectedItems.map(i => (
            <li key={i.id} style={{
              fontSize: mobile ? '12px' : '13px',
              color: colors.purple[800],
              display: 'flex',
              justifyContent: 'space-between',
              gap: '8px',
            }}>
              <span>{i.name}</span>
              <span style={{ fontWeight: 700, flexShrink: 0 }}>×{i.qty}</span>
            </li>
          ))}
        </ul>
      ) : !mobile && (
        <p style={{ fontSize: '13px', color: colors.gray ? colors.gray[400] : '#BDBDBD', textAlign: 'center', padding: '12px 0', margin: '0 0 16px' }}>
          Nenhum item selecionado ainda
        </p>
      )}

      <a
        href={hasItems ? `https://wa.me/${WA_NUMBER}?text=${buildMsg()}` : undefined}
        target={hasItems ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={!hasItems ? e => e.preventDefault() : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: hasItems
            ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
            : '#E0E0E0',
          color: hasItems ? 'white' : '#9E9E9E',
          fontWeight: 700,
          fontSize: mobile ? '15px' : '14px',
          padding: mobile ? '13px 16px' : '12px 16px',
          borderRadius: '10px',
          textDecoration: 'none',
          cursor: hasItems ? 'pointer' : 'not-allowed',
          pointerEvents: hasItems ? 'auto' : 'none',
          transition: 'opacity 0.2s',
          boxShadow: hasItems ? '0 4px 14px rgba(37,211,102,0.30)' : 'none',
        }}
        onMouseEnter={e => { if (hasItems) e.currentTarget.style.opacity = '0.9'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >
        💬 Finalizar pedido via WhatsApp
      </a>
    </div>
  );

  return (
    <>
      {/* Layout principal: conteúdo + painel lateral (desktop) */}
      <div style={{
        display: 'flex',
        gap: '28px',
        alignItems: 'flex-start',
        paddingBottom: isMobile ? '100px' : '0',
      }}>
        {/* Conteúdo: flores + adicionais */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionTitle emoji="🌷" label="Flores" />
          {flores.length === 0 ? (
            <p style={{ color: '#9E9E9E', fontSize: '14px' }}>Nenhum item disponível</p>
          ) : (
            <div style={gridStyle}>
              {flores.map(f => (
                <ItemCard
                  key={f.id}
                  item={f}
                  qty={florQty[f.id]}
                  isMobile={isMobile}
                  onInc={() => setFlorQty(q => ({ ...q, [f.id]: q[f.id] + 1 }))}
                  onDec={() => setFlorQty(q => ({ ...q, [f.id]: Math.max(0, q[f.id] - 1) }))}
                />
              ))}
            </div>
          )}

          <div style={{ margin: isMobile ? '28px 0 14px' : '36px 0 14px' }}>
            <SectionTitle emoji="✨" label="Adicionais" />
          </div>
          {adicionais.length === 0 ? (
            <p style={{ color: '#9E9E9E', fontSize: '14px' }}>Nenhum item disponível</p>
          ) : (
            <div style={gridStyle}>
              {adicionais.map(a => (
                <ItemCard
                  key={a.id}
                  item={a}
                  qty={adicQty[a.id]}
                  isMobile={isMobile}
                  onInc={() => setAdicQty(q => ({ ...q, [a.id]: q[a.id] + 1 }))}
                  onDec={() => setAdicQty(q => ({ ...q, [a.id]: Math.max(0, q[a.id] - 1) }))}
                />
              ))}
            </div>
          )}
        </div>

        {/* Painel de resumo — desktop sidebar */}
        {!isMobile && <SummaryPanel mobile={false} />}
      </div>

      {/* Painel de resumo — mobile fixed bottom */}
      {isMobile && <SummaryPanel mobile={true} />}
    </>
  );
};

export default MonteBuque;
