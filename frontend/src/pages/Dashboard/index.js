import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './style.css'; 

export default function Dashboard() {
  const [spots, setSpots] = useState([]); 
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user'); // Pega informação do usuário logado no banco localStorage do browser
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id },
  }), [user_id]); // Só refaz a conexão com o usuário caso o user_id tenha mudado

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([ ...requests, data]);
    })
  }, [requests, socket]);

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
  }, []); /* Troca o filtro de busca ele atualiza a busca. Porém, array vazio executa uma vez só */

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id)); // Substitui o tipo de request para filtrar apenas as que não estão aprovadas
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
            <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span> 
          </li>
        ))}
      </ul>

      <Link to="/new"> {/* Leva para tela de cadastro de novo Spot quando clicado */}
        <button className="btnnew">Cadastrar novo Spot</button>
      </Link>
    </>
  )
}
