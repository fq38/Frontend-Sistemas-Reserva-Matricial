import React from 'react';
import type { Reservation } from '../types';

interface Props {
  reservations: Reservation[];
  onEdit: (reservation: Reservation) => void;
  onDelete: (reservation: Reservation) => void;
}

const ReservationList: React.FC<Props> = ({ reservations, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
    });
  };

  if (reservations.length === 0) {
    return <div className="no-data-message">Nenhuma reserva encontrada. Que tal cadastrar a primeira?</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Responsável</th>
            <th>Local / Sala</th>
            <th>Período</th>
            <th>Descrição</th>
            <th>Café</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.responsible}</td>
              <td><strong>{res.room?.location?.name || 'N/A'}</strong> / {res.room?.name || 'N/A'}</td>
              <td>{`${formatDate(res.startTime)} - ${formatDate(res.endTime)}`}</td>
              <td>{res.description || '-'}</td>
              <td>{res.hasCoffee ? `Sim (${res.numberOfPeopleForCoffee} pessoas)` : 'Não'}</td>
              <td>
                <div className="action-buttons">
                  {/* BOTÕES DE ATUALIZAR (EDITAR) E EXCLUIR COM ÍCONES */}
                  <button onClick={() => onEdit(res)} className="btn-icon btn-edit" title="Editar Reserva">
                    ✏️
                  </button>
                  <button onClick={() => onDelete(res)} className="btn-icon btn-danger" title="Excluir Reserva">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;