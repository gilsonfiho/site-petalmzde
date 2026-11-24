import { useState, useEffect } from 'react';
import { fetchMonteItems, fetchSizes, formatBRL } from '../../lib/catalog';
import { colors } from '../../styles/theme';

const WA_NUMBER = '5585920057498';

/* Paleta de cores disponíveis para as flores */
const flowerColors = [
  { name: 'Rosa claro',     hex: '#F7A8C4' },
  { name: 'Rosa escuro',    hex: '#D6336C' },
  { name: 'Lilás',          hex: '#B39DDB' },
  { name: 'Amarelo ouro',   hex: '#F5C518' },
  { name: 'Vermelho',       hex: '#E53935' },
  { name: 'Roxo',           hex: '#7B2CBF' },
  { name: 'Verde claro',    hex: '#A5D6A7' },
  { name: 'Verde musgo',    hex: '#7A8450' },
  { name: 'Verde bandeira', hex: '#2E7D32' },
  { name: 'Branco',         hex: '#FFFFFF' },
  { name: 'Azul claro',     hex: '#90CAF9' },
  { name: 'Azul escuro',    hex: '#0D47A1' },
  { name: 'Azul médio',     hex: '#2196F3' },
  { name: 'Laranja',        hex: '#FB8C00' },
  { name: 'Bege',           hex: '#E3D5B8' },
  { name: 'Preto',          hex: '#212121' },
  { name: 'Marrom',         hex: '#8D5524' },
];

const hexOf = (name) => flowerColors.find(c => c.name === name)?.hex || '#CCC';

/* ── Card individual de item (flor / ornamentação / adicional) ── */
const ItemCard = ({ item, qty, onInc, onDec, isMobile, showColorTag, selectedColor, onSelectColor, incDisabled, priceLabel }) => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
  <div style={{
    background: '#F0F7F0',
    border: '1px solid #C8E6C9',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    opacity: incDisabled && qty === 0 ? 0.55 : 1,
    transition: 'opacity 0.2s',
  }}>
    <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
    <div style={{ padding: isMobile ? '10px' : '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', minHeight: isMobile ? '32px' : '36px' }}>
        <p style={{ fontSize: isMobile ? '11px' : '13px', fontWeight: 600, color: '#2E4A2E', lineHeight: 1.35, margin: 0 }}>
          {item.name}
        </p>
        {priceLabel && (
          <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: 700, color: colors.purple[700] }}>{priceLabel}</span>
        )}
        {showColorTag && (
          <>
            <button
              type="button"
              onClick={() => setPaletteOpen(o => !o)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                background: selectedColor ? colors.purple[600] : colors.purple[100],
                color: selectedColor ? 'white' : colors.purple[700],
                fontSize: isMobile ? '10px' : '11px', fontWeight: 700,
                padding: '3px 9px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {selectedColor ? (
                <>
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: hexOf(selectedColor), border: '1px solid rgba(255,255,255,0.7)', flexShrink: 0 }} />
                  {selectedColor}
                </>
              ) : '🎨 Escolha a cor'}
            </button>
            {paletteOpen && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px', background: 'white', borderRadius: '10px', border: `1px solid ${colors.purple[200]}`, width: '100%', boxSizing: 'border-box' }}>
                {flowerColors.map(c => {
                  const active = selectedColor === c.name;
                  return (
                    <button
                      key={c.name} type="button" title={c.name}
                      onClick={() => { onSelectColor(active ? null : c.name); setPaletteOpen(false); }}
                      style={{
                        width: '22px', height: '22px', borderRadius: '50%', background: c.hex,
                        border: c.name === 'Branco' ? '1px solid #CCC' : '1px solid rgba(0,0,0,0.1)',
                        outline: active ? `2px solid ${colors.purple[600]}` : 'none', outlineOffset: '1px',
                        cursor: 'pointer', padding: 0, flexShrink: 0,
                      }}
                      aria-label={c.name}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={onDec}
          disabled={qty === 0}
          style={{
            width: isMobile ? '28px' : '32px', height: isMobile ? '28px' : '32px', borderRadius: '50%', border: 'none',
            background: qty === 0 ? '#E0E0E0' : colors.purple[600], color: qty === 0 ? '#BDBDBD' : 'white',
            fontSize: '18px', fontWeight: 700, cursor: qty === 0 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, flexShrink: 0,
          }}
          aria-label={`Diminuir ${item.name}`}
        >
          −
        </button>
        <span style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, color: '#2E4A2E', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
        <button
          onClick={onInc}
          disabled={incDisabled}
          title={incDisabled ? 'Limite atingido' : undefined}
          style={{
            width: isMobile ? '28px' : '32px', height: isMobile ? '28px' : '32px', borderRadius: '50%', border: 'none',
            background: incDisabled ? '#E0E0E0' : colors.purple[600], color: incDisabled ? '#BDBDBD' : 'white',
            fontSize: '18px', fontWeight: 700, cursor: incDisabled ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, flexShrink: 0,
          }}
          aria-label={`Aumentar ${item.name}`}
        >
          +
        </button>
      </div>
    </div>
  </div>
  );
};

/* ── Componente principal ── */
const MonteBuque = ({ isMobile }) => {
  const [sizes, setSizes]             = useState([]);
  const [flores, setFlores]           = useState([]);
  const [ornamentacoes, setOrnamentacoes] = useState([]);
  const [adicionais, setAdicionais]   = useState([]);
  const [loading, setLoading]         = useState(true);

  const [sizeId, setSizeId]           = useState(null);
  const [florQty, setFlorQty]         = useState({});
  const [ornQty, setOrnQty]           = useState({});
  const [adicQty, setAdicQty]         = useState({});
  const [florColor, setFlorColor]     = useState({});

  useEffect(() => {
    Promise.all([fetchMonteItems(), fetchSizes()])
      .then(([{ flores, ornamentacoes, adicionais }, sizes]) => {
        setFlores(flores); setOrnamentacoes(ornamentacoes); setAdicionais(adicionais); setSizes(sizes);
      })
      .catch((e) => console.error('Erro ao carregar Monte seu Buquê:', e))
      .finally(() => setLoading(false));
  }, []);

  const size = sizes.find(s => s.id === sizeId) || null;
  const capacity = size ? size.flowers : 0;
  const ornamentMax = size ? size.ornamentMax : 0;
  const totalFlowers = Object.values(florQty).reduce((a, b) => a + b, 0);
  const flowersLeft = capacity - totalFlowers;
  const totalOrnaments = Object.values(ornQty).reduce((a, b) => a + b, 0);
  const ornamentsLeft = ornamentMax - totalOrnaments;

  // Trocar de tamanho reinicia flores e ornamentações (evita estado inválido)
  const selectSize = (id) => {
    setSizeId(id);
    setFlorQty({});
    setOrnQty({});
    setFlorColor({});
  };

  const adicionaisTotal = adicionais.reduce((sum, a) => sum + (a.price || 0) * (adicQty[a.id] || 0), 0);
  const total = (size ? size.price : 0) + adicionaisTotal;

  const selFlores = flores.filter(f => florQty[f.id] > 0);
  const selOrn = ornamentacoes.filter(o => ornQty[o.id] > 0);
  const selAdic = adicionais.filter(a => adicQty[a.id] > 0);
  const canFinalize = !!size;

  const buildMsg = () => {
    const lines = ['Olá! Gostaria de montar um buquê personalizado.\n'];
    if (size) lines.push(`*Tamanho:* ${size.label} (${size.flowers} flores) — ${formatBRL(size.price)}`);
    if (selFlores.length) {
      lines.push('\n*Flores:*');
      selFlores.forEach(f => {
        const color = !f.fixedColor && florColor[f.id] ? ` (cor: ${florColor[f.id]})` : '';
        lines.push(`- ${f.name}${color}: ${florQty[f.id]}x`);
      });
    }
    if (selOrn.length) {
      lines.push('\n*Ornamentações:*');
      selOrn.forEach(o => lines.push(`- ${o.name}: ${ornQty[o.id]}x`));
    }
    if (selAdic.length) {
      lines.push('\n*Adicionais:*');
      selAdic.forEach(a => lines.push(`- ${a.name}: ${adicQty[a.id]}x (${formatBRL(a.price || 0)})`));
    }
    lines.push(`\n*Total: ${formatBRL(total)}*`);
    return encodeURIComponent(lines.join('\n'));
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? '12px' : '16px',
  };

  const SectionTitle = ({ emoji, label, hint }) => (
    <div style={{ margin: '0 0 14px' }}>
      <h3 style={{ fontSize: isMobile ? '15px' : '17px', fontWeight: 700, color: colors.purple[800], margin: 0 }}>
        {emoji} {label}
      </h3>
      {hint && <p style={{ fontSize: '12px', color: colors.purple[500], margin: '2px 0 0' }}>{hint}</p>}
    </div>
  );

  /* Painel de resumo */
  const SummaryPanel = ({ mobile }) => (
    <div style={mobile ? {
      position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white',
      borderTop: `2px solid ${colors.purple[200]}`, padding: '12px 20px 16px', zIndex: 600, boxShadow: '0 -4px 20px rgba(91,61,143,0.13)',
    } : {
      width: '270px', flexShrink: 0, position: 'sticky', top: '80px', background: 'white',
      border: `1px solid ${colors.purple[200]}`, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(91,61,143,0.10)', alignSelf: 'flex-start',
    }}>
      {!mobile && <h4 style={{ fontWeight: 700, fontSize: '15px', color: colors.purple[800], margin: '0 0 14px' }}>🛒 Resumo do pedido</h4>}

      {!size ? (
        !mobile && <p style={{ fontSize: '13px', color: '#BDBDBD', textAlign: 'center', padding: '12px 0', margin: '0 0 16px' }}>Escolha o tamanho do buquê para começar.</p>
      ) : (
        <div style={{ margin: mobile ? '0 0 8px' : '0 0 14px', maxHeight: mobile ? '90px' : 'none', overflowY: mobile ? 'auto' : 'visible' }}>
          <div style={{ fontSize: mobile ? '12px' : '13px', color: colors.purple[800], fontWeight: 700 }}>
            {size.label} · {size.flowers} flores
          </div>
          <div style={{ fontSize: '12px', color: colors.purple[500], marginBottom: '6px' }}>
            {totalFlowers}/{capacity} flores selecionadas
          </div>
          {selFlores.map(f => (
            <div key={f.id} style={{ fontSize: '12px', color: colors.purple[800], display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {florColor[f.id] && <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: hexOf(florColor[f.id]), border: '1px solid rgba(0,0,0,0.15)' }} />}
                {f.name}{florColor[f.id] ? ` · ${florColor[f.id]}` : ''}
              </span>
              <span style={{ fontWeight: 700 }}>×{florQty[f.id]}</span>
            </div>
          ))}
          {selOrn.map(o => (
            <div key={o.id} style={{ fontSize: '12px', color: colors.purple[700], display: 'flex', justifyContent: 'space-between' }}>
              <span>✦ {o.name}</span><span style={{ fontWeight: 700 }}>×{ornQty[o.id]}</span>
            </div>
          ))}
          {selAdic.map(a => (
            <div key={a.id} style={{ fontSize: '12px', color: colors.purple[700], display: 'flex', justifyContent: 'space-between' }}>
              <span>+ {a.name}</span><span style={{ fontWeight: 700 }}>×{adicQty[a.id]}</span>
            </div>
          ))}
        </div>
      )}

      {size && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `1px solid ${colors.purple[200]}`, paddingTop: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: colors.gray[600] }}>Total</span>
          <strong style={{ fontSize: mobile ? '18px' : '20px', color: colors.purple[700] }}>{formatBRL(total)}</strong>
        </div>
      )}

      <a
        href={canFinalize ? `https://wa.me/${WA_NUMBER}?text=${buildMsg()}` : undefined}
        target={canFinalize ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={!canFinalize ? e => e.preventDefault() : undefined}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          background: canFinalize ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' : '#E0E0E0',
          color: canFinalize ? 'white' : '#9E9E9E', fontWeight: 700, fontSize: mobile ? '15px' : '14px',
          padding: mobile ? '13px 16px' : '12px 16px', borderRadius: '10px', textDecoration: 'none',
          cursor: canFinalize ? 'pointer' : 'not-allowed', pointerEvents: canFinalize ? 'auto' : 'none',
          boxShadow: canFinalize ? '0 4px 14px rgba(37,211,102,0.30)' : 'none',
        }}
      >
        💬 Finalizar pedido via WhatsApp
      </a>
    </div>
  );

  return (
    <>
      <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', paddingBottom: isMobile ? '120px' : '0' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <p style={{ color: colors.purple[400], fontSize: '14px', padding: '20px 0' }}>Carregando…</p>
          ) : (
          <>
            {/* ── SELETOR DE TAMANHO ── */}
            <SectionTitle emoji="📏" label="1. Escolha o tamanho do buquê" hint="O tamanho define o preço e quantas flores você pode escolher." />
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: isMobile ? '10px' : '12px',
              marginBottom: isMobile ? '28px' : '36px',
            }}>
              {sizes.map(s => {
                const active = s.id === sizeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectSize(s.id)}
                    style={{
                      textAlign: 'center',
                      background: active ? colors.purple[600] : 'white',
                      color: active ? 'white' : colors.purple[700],
                      border: `2px solid ${active ? colors.purple[600] : colors.purple[200]}`,
                      borderRadius: '12px', padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 800 }}>{s.flowers} flores</div>
                    <div style={{ fontSize: '11px', opacity: 0.85, margin: '1px 0 4px' }}>{s.label}</div>
                    <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 800 }}>{formatBRL(s.price)}</div>
                  </button>
                );
              })}
            </div>

            {/* ── FLORES ── */}
            <SectionTitle
              emoji="🌷"
              label="2. Escolha as flores"
              hint={size ? `${totalFlowers}/${capacity} selecionadas${flowersLeft === 0 ? ' · limite atingido' : ` · faltam ${flowersLeft}`}` : 'Escolha um tamanho primeiro.'}
            />
            {flores.length === 0 ? (
              <p style={{ color: '#9E9E9E', fontSize: '14px' }}>Nenhuma flor disponível</p>
            ) : (
              <div style={gridStyle}>
                {flores.map(f => (
                  <ItemCard
                    key={f.id}
                    item={f}
                    qty={florQty[f.id] || 0}
                    isMobile={isMobile}
                    showColorTag={!f.fixedColor}
                    selectedColor={florColor[f.id] || null}
                    onSelectColor={(c) => setFlorColor(prev => ({ ...prev, [f.id]: c }))}
                    incDisabled={!size || flowersLeft <= 0}
                    onInc={() => { if (size && flowersLeft > 0) setFlorQty(q => ({ ...q, [f.id]: (q[f.id] || 0) + 1 })); }}
                    onDec={() => setFlorQty(q => ({ ...q, [f.id]: Math.max(0, (q[f.id] || 0) - 1) }))}
                  />
                ))}
              </div>
            )}

            {/* ── ORNAMENTAÇÕES ── */}
            {ornamentacoes.length > 0 && (
              <>
                <div style={{ margin: isMobile ? '28px 0 0' : '36px 0 0' }}>
                  <SectionTitle
                    emoji="🌿"
                    label="3. Ornamentações"
                    hint={size ? `${totalOrnaments}/${ornamentMax} no total${ornamentsLeft <= 0 ? ' · limite atingido' : ` · faltam ${ornamentsLeft}`}` : 'Escolha um tamanho primeiro.'}
                  />
                </div>
                <div style={gridStyle}>
                  {ornamentacoes.map(o => (
                    <ItemCard
                      key={o.id}
                      item={o}
                      qty={ornQty[o.id] || 0}
                      isMobile={isMobile}
                      incDisabled={!size || ornamentsLeft <= 0}
                      onInc={() => { if (size && ornamentsLeft > 0) setOrnQty(q => ({ ...q, [o.id]: (q[o.id] || 0) + 1 })); }}
                      onDec={() => setOrnQty(q => ({ ...q, [o.id]: Math.max(0, (q[o.id] || 0) - 1) }))}
                    />
                  ))}
                </div>
              </>
            )}

            {/* ── ADICIONAIS ── */}
            <div style={{ margin: isMobile ? '28px 0 0' : '36px 0 0' }}>
              <SectionTitle emoji="✨" label="4. Adicionais" hint={size ? 'Itens extras com valor por unidade.' : 'Escolha um tamanho primeiro.'} />
            </div>
            {adicionais.length === 0 ? (
              <p style={{ color: '#9E9E9E', fontSize: '14px' }}>Nenhum adicional disponível</p>
            ) : (
              <div style={gridStyle}>
                {adicionais.map(a => (
                  <ItemCard
                    key={a.id}
                    item={a}
                    qty={adicQty[a.id] || 0}
                    isMobile={isMobile}
                    priceLabel={formatBRL(a.price || 0)}
                    incDisabled={!size}
                    onInc={() => { if (size) setAdicQty(q => ({ ...q, [a.id]: (q[a.id] || 0) + 1 })); }}
                    onDec={() => setAdicQty(q => ({ ...q, [a.id]: Math.max(0, (q[a.id] || 0) - 1) }))}
                  />
                ))}
              </div>
            )}
          </>
          )}
        </div>

        {!isMobile && <SummaryPanel mobile={false} />}
      </div>

      {isMobile && <SummaryPanel mobile={true} />}
    </>
  );
};

export default MonteBuque;
