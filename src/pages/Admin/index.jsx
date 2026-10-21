import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  fetchAllProducts, saveProduct, deleteProduct,
  fetchAllItems, saveItem, deleteItem,
  uploadImage, formatBRL, discountPercent,
} from '../../lib/catalog';
import { colors, gradients } from '../../styles/theme';

/* ──────────────────────────────────────────────── */
/*  LOGIN                                             */
/* ──────────────────────────────────────────────── */
const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setCarregando(false);
    if (error) setErro('E-mail ou senha incorretos.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: gradients.subtle, fontFamily: '"Inter", sans-serif', padding: '20px' }}>
      <form onSubmit={entrar} style={{ background: 'white', padding: '36px 32px', borderRadius: '18px', boxShadow: '0 8px 32px rgba(91,61,143,0.15)', width: '100%', maxWidth: '380px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: colors.purple[700], margin: '0 0 6px', textAlign: 'center' }}>petalmzde</h1>
        <p style={{ fontSize: '14px', color: colors.gray[500], textAlign: 'center', margin: '0 0 24px' }}>Painel administrativo</p>
        <label style={labelStyle}>E-mail</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <label style={labelStyle}>Senha</label>
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required style={inputStyle} />
        {erro && <p style={{ color: '#D32F2F', fontSize: '13px', margin: '4px 0 0' }}>{erro}</p>}
        <button type="submit" disabled={carregando} style={{ ...btnPrimary, width: '100%', marginTop: '20px', opacity: carregando ? 0.7 : 1 }}>
          {carregando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

/* ──────────────────────────────────────────────── */
/*  FORM DE BUQUÊ                                     */
/* ──────────────────────────────────────────────── */
const emptyProduct = { name: '', image: '', price: '', promo: 0, sortOrder: 0, active: true };

const toFormProduct = (p) => ({
  id: p.id,
  name: p.name,
  image: p.image || '',
  price: p.oldPrice || p.price, // preço original
  promo: p.oldPrice ? discountPercent(p.price, p.oldPrice) : 0,
  sortOrder: p.sortOrder || 0,
  active: p.active,
});

const ProductForm = ({ initial, onSaved, onCancel }) => {
  const [form, setForm] = useState(initial || emptyProduct);
  const [enviando, setEnviando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const base = Number(form.price) || 0;
  const promo = Number(form.promo) || 0;
  const precoFinal = promo > 0 ? +(base * (1 - promo / 100)).toFixed(2) : base;

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEnviando(true);
    try {
      const url = await uploadImage(file, 'products');
      setForm(f => ({ ...f, image: url }));
    } catch (err) {
      alert('Erro ao enviar imagem: ' + err.message);
    } finally {
      setEnviando(false);
    }
  };

  const salvar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      await saveProduct({
        id: form.id,
        name: form.name,
        image: form.image,
        price: precoFinal,
        oldPrice: promo > 0 ? base : null,
        sortOrder: Number(form.sortOrder) || 0,
        active: form.active,
      });
      onSaved();
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={salvar} style={cardForm}>
      <h3 style={{ margin: '0 0 16px', color: colors.purple[700] }}>{form.id ? 'Editar buquê' : 'Novo buquê'}</h3>

      <label style={labelStyle}>Nome</label>
      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required style={inputStyle} />

      <label style={labelStyle}>Imagem</label>
      {form.image && <img src={form.image} alt="" style={{ width: '120px', height: '160px', objectFit: 'cover', borderRadius: '10px', display: 'block', marginBottom: '8px', border: `1px solid ${colors.purple[200]}` }} />}
      <input type="file" accept="image/*" onChange={onFile} style={{ marginBottom: '4px', fontSize: '13px' }} />
      {enviando && <p style={{ fontSize: '12px', color: colors.purple[500], margin: '2px 0' }}>Enviando imagem…</p>}

      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Preço original (R$)</label>
          <input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Promoção (%)</label>
          <input type="number" step="1" min="0" max="90" value={form.promo} onChange={e => setForm(f => ({ ...f, promo: e.target.value }))} style={inputStyle} />
        </div>
      </div>
      <p style={{ fontSize: '13px', color: colors.purple[600], margin: '0 0 12px' }}>
        {promo > 0
          ? <>Preço final: <b>{formatBRL(precoFinal)}</b> &nbsp;<span style={{ textDecoration: 'line-through', color: colors.gray[400] }}>{formatBRL(base)}</span> &nbsp;({promo}% OFF)</>
          : <>Sem promoção · Preço: <b>{formatBRL(base)}</b></>}
      </p>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Ordem de exibição</label>
          <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: e.target.value }))} style={inputStyle} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: colors.gray[700], marginTop: '18px' }}>
          <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
          Ativo (visível no site)
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button type="submit" disabled={salvando || enviando} style={{ ...btnPrimary, opacity: (salvando || enviando) ? 0.7 : 1 }}>
          {salvando ? 'Salvando…' : 'Salvar'}
        </button>
        <button type="button" onClick={onCancel} style={btnGhost}>Cancelar</button>
      </div>
    </form>
  );
};

/* ──────────────────────────────────────────────── */
/*  FORM DE ITEM (Monte seu Buquê)                   */
/* ──────────────────────────────────────────────── */
const emptyItem = { name: '', image: '', category: 'flor', fixedColor: false, sortOrder: 0, active: true };

const ItemForm = ({ initial, onSaved, onCancel }) => {
  const [form, setForm] = useState(initial || emptyItem);
  const [enviando, setEnviando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEnviando(true);
    try {
      const url = await uploadImage(file, 'monte');
      setForm(f => ({ ...f, image: url }));
    } catch (err) {
      alert('Erro ao enviar imagem: ' + err.message);
    } finally {
      setEnviando(false);
    }
  };

  const salvar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      await saveItem({
        id: form.id,
        name: form.name,
        image: form.image,
        category: form.category,
        fixedColor: form.category === 'flor' ? form.fixedColor : false,
        sortOrder: Number(form.sortOrder) || 0,
        active: form.active,
      });
      onSaved();
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={salvar} style={cardForm}>
      <h3 style={{ margin: '0 0 16px', color: colors.purple[700] }}>{form.id ? 'Editar item' : 'Novo item'}</h3>

      <label style={labelStyle}>Nome</label>
      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required style={inputStyle} />

      <label style={labelStyle}>Imagem</label>
      {form.image && <img src={form.image} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px', display: 'block', marginBottom: '8px', border: `1px solid ${colors.purple[200]}` }} />}
      <input type="file" accept="image/*" onChange={onFile} style={{ marginBottom: '4px', fontSize: '13px' }} />
      {enviando && <p style={{ fontSize: '12px', color: colors.purple[500], margin: '2px 0' }}>Enviando imagem…</p>}

      <label style={labelStyle}>Categoria</label>
      <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
        <option value="flor">Flor</option>
        <option value="adicional">Adicional</option>
      </select>

      {form.category === 'flor' && (
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: colors.gray[700], margin: '4px 0 12px' }}>
          <input type="checkbox" checked={form.fixedColor} onChange={e => setForm(f => ({ ...f, fixedColor: e.target.checked }))} />
          Cor fixa (não mostra a opção "Escolha a cor")
        </label>
      )}

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Ordem de exibição</label>
          <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: e.target.value }))} style={inputStyle} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: colors.gray[700], marginTop: '18px' }}>
          <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
          Ativo
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button type="submit" disabled={salvando || enviando} style={{ ...btnPrimary, opacity: (salvando || enviando) ? 0.7 : 1 }}>
          {salvando ? 'Salvando…' : 'Salvar'}
        </button>
        <button type="button" onClick={onCancel} style={btnGhost}>Cancelar</button>
      </div>
    </form>
  );
};

/* ──────────────────────────────────────────────── */
/*  DASHBOARD                                         */
/* ──────────────────────────────────────────────── */
const Dashboard = ({ session }) => {
  const navigate = useNavigate();
  const [aba, setAba] = useState('buques');
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(null); // {tipo, data} ou null

  const recarregar = async () => {
    setCarregando(true);
    try {
      const [p, i] = await Promise.all([fetchAllProducts(), fetchAllItems()]);
      setProdutos(p);
      setItens(i);
    } catch (e) {
      console.error(e);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { recarregar(); }, []);

  const sair = async () => { await supabase.auth.signOut(); };

  const excluirProduto = async (p) => {
    if (!confirm(`Excluir "${p.name}"?`)) return;
    await deleteProduct(p.id);
    recarregar();
  };
  const excluirItem = async (i) => {
    if (!confirm(`Excluir "${i.name}"?`)) return;
    await deleteItem(i.id);
    recarregar();
  };

  const fecharForm = () => setEditando(null);
  const aposSalvar = () => { setEditando(null); recarregar(); };

  return (
    <div style={{ minHeight: '100vh', background: colors.lavender[50], fontFamily: '"Inter", sans-serif' }}>
      {/* Header */}
      <header style={{ background: 'white', boxShadow: '0 2px 12px rgba(91,61,143,0.08)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <strong style={{ color: colors.purple[700], fontSize: '18px' }}>petalmzde · admin</strong>
          <span style={{ color: colors.gray[400], fontSize: '13px', marginLeft: '10px' }}>{session.user.email}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/')} style={btnGhost}>Ver site</button>
          <button onClick={sair} style={btnGhost}>Sair</button>
        </div>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 20px 60px' }}>
        {/* Abas */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button onClick={() => { setAba('buques'); setEditando(null); }} style={aba === 'buques' ? tabActive : tabInactive}>Buquês ({produtos.length})</button>
          <button onClick={() => { setAba('monte'); setEditando(null); }} style={aba === 'monte' ? tabActive : tabInactive}>Monte seu Buquê ({itens.length})</button>
        </div>

        {editando ? (
          editando.tipo === 'produto'
            ? <ProductForm initial={editando.data} onSaved={aposSalvar} onCancel={fecharForm} />
            : <ItemForm initial={editando.data} onSaved={aposSalvar} onCancel={fecharForm} />
        ) : (
          <>
            <button
              onClick={() => setEditando({ tipo: aba === 'buques' ? 'produto' : 'item', data: null })}
              style={{ ...btnPrimary, marginBottom: '18px' }}
            >
              + {aba === 'buques' ? 'Novo buquê' : 'Novo item'}
            </button>

            {carregando ? (
              <p style={{ color: colors.purple[400] }}>Carregando…</p>
            ) : aba === 'buques' ? (
              <div style={{ display: 'grid', gap: '10px' }}>
                {produtos.map(p => (
                  <div key={p.id} style={rowCard}>
                    <img src={p.image} alt="" style={thumb} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ color: colors.gray[800], fontSize: '14px' }}>{p.name}</strong>
                      <div style={{ fontSize: '13px', color: colors.purple[600] }}>
                        {formatBRL(p.price)}
                        {p.oldPrice && <span style={{ color: colors.gray[400], textDecoration: 'line-through', marginLeft: '6px' }}>{formatBRL(p.oldPrice)}</span>}
                        {p.oldPrice && <span style={{ marginLeft: '6px', color: '#2E9E4F', fontWeight: 700 }}>{discountPercent(p.price, p.oldPrice)}% OFF</span>}
                      </div>
                      {!p.active && <span style={badgeOff}>inativo</span>}
                    </div>
                    <button onClick={() => setEditando({ tipo: 'produto', data: toFormProduct(p) })} style={btnSmall}>Editar</button>
                    <button onClick={() => excluirProduto(p)} style={btnDanger}>Excluir</button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '10px' }}>
                {itens.map(i => (
                  <div key={i.id} style={rowCard}>
                    <img src={i.image} alt="" style={{ ...thumb, width: '48px', height: '48px' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ color: colors.gray[800], fontSize: '14px' }}>{i.name}</strong>
                      <div style={{ fontSize: '12px', color: colors.gray[500] }}>
                        {i.category === 'flor' ? 'Flor' : 'Adicional'}
                        {i.category === 'flor' && i.fixedColor && ' · cor fixa'}
                      </div>
                      {!i.active && <span style={badgeOff}>inativo</span>}
                    </div>
                    <button onClick={() => setEditando({ tipo: 'item', data: i })} style={btnSmall}>Editar</button>
                    <button onClick={() => excluirItem(i)} style={btnDanger}>Excluir</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────── */
/*  RAIZ                                              */
/* ──────────────────────────────────────────────── */
const Admin = () => {
  const [session, setSession] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setCarregando(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (carregando) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.purple[400], fontFamily: '"Inter", sans-serif' }}>Carregando…</div>;
  return session ? <Dashboard session={session} /> : <Login />;
};

export default Admin;

/* ──────────────────────────────────────────────── */
/*  ESTILOS                                           */
/* ──────────────────────────────────────────────── */
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: colors.gray[700], margin: '10px 0 4px' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${colors.purple[200]}`, fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: 'white' };
const btnPrimary = { background: gradients.button, color: 'white', border: 'none', fontWeight: 700, fontSize: '14px', padding: '10px 18px', borderRadius: '9px', cursor: 'pointer', fontFamily: 'inherit' };
const btnGhost = { background: colors.purple[100], color: colors.purple[700], border: 'none', fontWeight: 600, fontSize: '13px', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' };
const btnSmall = { background: colors.purple[100], color: colors.purple[700], border: 'none', fontWeight: 600, fontSize: '13px', padding: '7px 12px', borderRadius: '7px', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 };
const btnDanger = { background: '#FDE8E8', color: '#D32F2F', border: 'none', fontWeight: 600, fontSize: '13px', padding: '7px 12px', borderRadius: '7px', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 };
const cardForm = { background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 20px rgba(91,61,143,0.10)', maxWidth: '520px' };
const rowCard = { display: 'flex', alignItems: 'center', gap: '12px', background: 'white', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 2px 10px rgba(91,61,143,0.07)' };
const thumb = { width: '54px', height: '72px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, background: colors.lavender[200] };
const badgeOff = { display: 'inline-block', marginTop: '4px', fontSize: '11px', fontWeight: 700, color: '#9E9E9E', background: '#EEE', padding: '2px 8px', borderRadius: '6px' };
const tabActive = { background: gradients.button, color: 'white', border: 'none', fontWeight: 700, fontSize: '14px', padding: '9px 18px', borderRadius: '9px', cursor: 'pointer', fontFamily: 'inherit' };
const tabInactive = { background: 'white', color: colors.purple[600], border: `1px solid ${colors.purple[200]}`, fontWeight: 600, fontSize: '14px', padding: '9px 18px', borderRadius: '9px', cursor: 'pointer', fontFamily: 'inherit' };
