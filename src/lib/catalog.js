import { supabase } from './supabase';

/* ───────── Helpers de formatação ───────── */
export const formatBRL = (value) =>
  'R$ ' + Number(value).toFixed(2).replace('.', ',');

export const discountPercent = (price, oldPrice) =>
  oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

/* ───────── Normalização (DB → formato usado na UI) ───────── */
const mapProduct = (p) => ({
  id: p.id,
  name: p.name,
  image: p.image_url,
  price: Number(p.price),
  oldPrice: p.old_price != null ? Number(p.old_price) : null,
  sortOrder: p.sort_order,
  active: p.active,
});

const mapItem = (i) => ({
  id: i.id,
  name: i.name,
  image: i.image_url,
  category: i.category,
  fixedColor: i.fixed_color,
  sortOrder: i.sort_order,
  active: i.active,
});

/* ───────── Leitura pública ───────── */
export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data.map(mapProduct);
}

export async function fetchMonteItems() {
  const { data, error } = await supabase
    .from('monte_buque_items')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  const items = data.map(mapItem);
  return {
    flores: items.filter((i) => i.category === 'flor'),
    adicionais: items.filter((i) => i.category === 'adicional'),
  };
}

/* ───────── Admin: leitura completa (inclui inativos) ───────── */
export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data.map(mapProduct);
}

export async function fetchAllItems() {
  const { data, error } = await supabase
    .from('monte_buque_items')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data.map(mapItem);
}

/* ───────── Admin: upload de imagem para o Storage ───────── */
export async function uploadImage(file, folder = 'uploads') {
  const ext = file.name.split('.').pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('catalog').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('catalog').getPublicUrl(path);
  return data.publicUrl;
}

/* ───────── Admin: CRUD de produtos ───────── */
export async function saveProduct(product) {
  const row = {
    name: product.name,
    image_url: product.image,
    price: product.price,
    old_price: product.oldPrice || null,
    sort_order: product.sortOrder ?? 0,
    active: product.active ?? true,
  };
  if (product.id) {
    const { error } = await supabase.from('products').update(row).eq('id', product.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('products').insert(row);
    if (error) throw error;
  }
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

/* ───────── Admin: CRUD de itens do Monte seu Buquê ───────── */
export async function saveItem(item) {
  const row = {
    name: item.name,
    image_url: item.image,
    category: item.category,
    fixed_color: item.fixedColor ?? false,
    sort_order: item.sortOrder ?? 0,
    active: item.active ?? true,
  };
  if (item.id) {
    const { error } = await supabase.from('monte_buque_items').update(row).eq('id', item.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('monte_buque_items').insert(row);
    if (error) throw error;
  }
}

export async function deleteItem(id) {
  const { error } = await supabase.from('monte_buque_items').delete().eq('id', id);
  if (error) throw error;
}
