import React, { useState, useEffect, useCallback } from 'react';
import * as api from './services/api';
import type { Reservation, ReservationFormData, Location, Room } from './types';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';
import ConfirmationModal from './components/ConfirmationModal';
import './App.css'; 
function App() {
const [reservations, setReservations] = useState<Reservation[]>([]);
const [locations, setLocations] = useState<Location[]>([]);
const [rooms, setRooms] = useState<Room[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [isFormOpen, setIsFormOpen] = useState(false);
const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [reservationToDelete, setReservationToDelete] = useState<Reservation | null>(null);
const fetchData = useCallback(async () => {
setIsLoading(true);
setError(null);
try {
const [resResponse, locResponse, roomResponse] = await Promise.all([
api.getReservations(),
api.getLocations(),
api.getRooms()
]);
// Ordena as reservas pela data de início mais recente
const sortedReservations = resResponse.data.sort((a, b) =>
new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
);
setReservations(sortedReservations);
setLocations(locResponse.data);
setRooms(roomResponse.data);
} catch (err) {
setError('Falha ao carregar dados. Verifique a conexão com o backend e a configuração do CORS.');
console.error(err);
} finally {
setIsLoading(false);
}
}, []);
useEffect(() => {
fetchData();
}, [fetchData]);

const handleOpenForm = (reservation: Reservation | null = null) => {
setEditingReservation(reservation);
setIsFormOpen(true);
};

const handleCloseForm = () => {
setIsFormOpen(false);
setEditingReservation(null);
};
const handleSave = async (data: ReservationFormData) => {
    
    // Enviamos os dados exatamente como vêm do formulário.
    try {
      if (editingReservation) {
        await api.updateReservation(editingReservation.id, data);
      } else {
        await api.createReservation(data);
      }
      fetchData();
      handleCloseForm();
    } catch (err: any) {
      if (err.response && (err.response.status === 409 || err.response.status === 400)) {
        alert(`Erro do Servidor: ${err.response.data}`);
      } else {
        alert('Ocorreu um erro ao salvar a reserva.');
        console.error(err);
      }
    }
  };
const handleOpenDeleteModal = (reservation: Reservation) => {
setReservationToDelete(reservation);
setIsDeleteModalOpen(true);
};
const handleCloseDeleteModal = () => {
setReservationToDelete(null);
setIsDeleteModalOpen(false);
};
const handleConfirmDelete = async () => {
if (!reservationToDelete) return;
try {
await api.deleteReservation(reservationToDelete.id);
fetchData(); // Recarrega os dados após excluir
handleCloseDeleteModal();
} catch (err) {
alert('Ocorreu um erro ao excluir a reserva.');
console.error(err);
}
};
return (
<div className="app-container">
<header className="app-header">
<h1>Sistema de Reserva de Salas</h1>
<div className="header-actions">
{/* BOTÃO DE ATUALIZAR/CONSULTAR */}
<button onClick={fetchData} className="btn btn-secondary" disabled={isLoading}>
Atualizar Lista
</button>
<button onClick={() => handleOpenForm()} className="btn btn-primary" disabled={isLoading}>
+ Cadastrar Reserva
</button>
</div>
</header>
  <main className="app-main">
    {isLoading && <div className="loading-indicator">Carregando reservas...</div>}
    {error && <div className="error-banner">{error}</div>}
    {!isLoading && !error && (
      <ReservationList
        reservations={reservations}
        onEdit={handleOpenForm}
        onDelete={handleOpenDeleteModal}
      />
    )}
  </main>

  {isFormOpen && (
    <ReservationForm
      onSave={handleSave}
      onCancel={handleCloseForm}
      initialData={editingReservation}
      locations={locations}
      rooms={rooms}
    />
  )}

  {isDeleteModalOpen && (
    <ConfirmationModal
      isOpen={isDeleteModalOpen}
      title="Confirmar Exclusão"
      message={`Você tem certeza que deseja excluir a reserva para a sala "${reservationToDelete?.room?.name}"? Esta ação não pode ser desfeita.`}
      onConfirm={handleConfirmDelete}
      onCancel={handleCloseDeleteModal}
    />
  )}
</div>
);
}

export default App;