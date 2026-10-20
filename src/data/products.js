import lirios from '../../assets/Buquê dois lírios (cor por sua escolha).jpeg';
import rapunzel from '../../assets/Buquê Rapunzel com Led + Pascal.jpeg';
import encantoRose from '../../assets/Buquê Encanto Rosê.jpeg';
import blueBloom from '../../assets/Buquê Blue Bloom.jpeg';
import chaveiro from '../../assets/Chaveiro Pascal.png';
import vanGogh from '../../assets/Buquê Van Gogh.jpeg';
import zoro from '../../assets/Buquê Zoro One Piece.jpeg';
import liriosAzuis from '../../assets/Buquê Lírios Azuis.jpeg';
import homemAranha from '../../assets/Buquê Homem Aranha Pelúcia.jpeg';
import snoopy from '../../assets/Buquê Snoopy.jpeg';
import rosasVermelhas from '../../assets/Buquê Rosas Vermelhas.jpeg';

export const products = [
  { name: 'Buquê dois lírios', image: lirios,      price: 89.90,  oldPrice: 104.90 },
  { name: 'Buquê Rapunzel com Led + Pascal',         image: rapunzel,    price: 144.90, oldPrice: 199.90 },
  { name: 'Buquê Encanto Rosê',                       image: encantoRose, price: 184.99, oldPrice: 204.90 },
  { name: 'Buquê Blue Bloom',                         image: blueBloom,   price: 109.99, oldPrice: 149.90 },
  { name: 'Buquê Van Gogh (G)',                       image: vanGogh,     price: 204.90, oldPrice: 249.90 },
  { name: 'Buquê Zoro One Piece',                     image: zoro,        price: 159.99, oldPrice: 169.90 },
  { name: 'Buquê Lírios Azuis (Personalizável)',      image: liriosAzuis, price: 159.99 },
  { name: 'Buquê Homem Aranha Pelúcia (Personalizável)', image: homemAranha, price: 149.99 },
  { name: 'Buquê Snoopy (Personalizável)',            image: snoopy,      price: 189.99 },
  { name: 'Buquê Rosas Vermelhas',                    image: rosasVermelhas, price: 260.00, oldPrice: 300.00 },
  { name: 'Chaveiro Pascal',                          image: chaveiro,    price: 25.00 },
];

export const formatBRL = (value) =>
  'R$ ' + value.toFixed(2).replace('.', ',');

export const discountPercent = (price, oldPrice) =>
  oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
