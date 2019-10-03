import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './style.css'; /* Importado arquivo .css criado na pasta Dashboard */

export default function Dashboard() {
  const [spots, setSpots] = useState([]); /* Criado estado(Sintaxe): Nome do spots e função para atualizar estado */
                /* IMPORTANTE: useState - Colchetes vazios pois vai ser o formato esperado dos spots para receberem as informações */
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []); /* Toda vez que o usuário trocar o filtro de busca ele atualiza a busca. Porém, array vazio executa uma vez só */

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span> {/* Se existe preço no Spot mostra, senão mostra a mensagem GRATUITO */ }
          </li>
        ))}
      </ul>

      <Link to="/new"> {/* Leva para tela de cadastro de novo Spot quando clicado */}
        <button className="btnnew">Cadastrar novo Spot</button>
      </Link>
    </>
  )
}
