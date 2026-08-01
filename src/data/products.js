import lirios from '../../assets/Buquê dois lírios (cor por sua escolha).jpeg';
import rapunzel from '../../assets/Buquê Rapunzel com Led + Pascal.jpeg';
import encantoRose from '../../assets/Buquê Encanto Rosê.jpeg';
import blueBloom from '../../assets/Buquê Blue Bloom.jpeg';
import chaveiro from '../../assets/Chaveiro Pascal.png';
import vanGogh from '../../assets/Buquê Van Gogh.jpeg';

export const products = [
  { name: 'Buquê dois lírios', image: lirios,      price: 89.90,  oldPrice: 104.90 },
  { name: 'Buquê Rapunzel com Led + Pascal',         image: rapunzel,    price: 144.90, oldPrice: 199.90 },
  { name: 'Buquê Encanto Rosê',                       image: encantoRose, price: 179.90, oldPrice: 204.90 },
  { name: 'Buquê Blue Bloom',                         image: blueBloom,   price: 105.90, oldPrice: 149.90 },
  { name: 'Buquê Van Gogh (G)',                       image: vanGogh,     price: 204.90, oldPrice: 249.90 },
  { name: 'Chaveiro Pascal',                          image: chaveiro,    price: 34.99 },
];

export const formatBRL = (value) =>
  'R$ ' + value.toFixed(2).replace('.', ',');

export const discountPercent = (price, oldPrice) =>
  oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
