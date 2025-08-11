import React, { useState, useEffect } from 'react';
import type { Reservation, ReservationFormData, Location, Room } from '../types';

interface Props {
  onSave: (data: ReservationFormData) => void;
  onCancel: () => void;
  initialData?: Reservation | null;
  locations: Location[];
  rooms: Room[];
}

const ReservationForm: React.FC<Props> = ({ onSave, onCancel, initialData, locations, rooms }) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    locationId: '',
    roomId: '',
    startTime: '',
    endTime: '',
    responsible: '',
    hasCoffee: false,
    numberOfPeopleForCoffee: undefined,
    description: '',
  });

  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  // Lógica de preenchimento para edição, agora muito mais simples
  useEffect(() => {
    if (initialData) {
      setFormData({
        locationId: initialData.room.locationId,
        roomId: initialData.roomId,
        // Apenas cortamos a string para remover os segundos, se houver.
        // Ex: "2025-08-10T14:00:00" vira "2025-08-10T14:00"
        startTime: initialData.startTime.slice(0, 16),
        endTime: initialData.endTime.slice(0, 16),
        responsible: initialData.responsible,
        hasCoffee: initialData.hasCoffee,
        numberOfPeopleForCoffee: initialData.numberOfPeopleForCoffee,
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  
  useEffect(() => {
    if (formData.locationId) {
      setFilteredRooms(rooms.filter(room => room.locationId === Number(formData.locationId)));
    } else {
      setFilteredRooms([]);
    }
  }, [formData.locationId, rooms]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
      ...(!checked && { numberOfPeopleForCoffee: undefined })
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roomId || !formData.startTime || !formData.endTime || !formData.responsible) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content form-modal">
        <h2>{initialData ? 'Editar Reserva' : 'Nova Reserva'}</h2>
        <form onSubmit={handleSubmit}>
           {/* O formulário HTML não muda */}
           <div className="form-group">
            <label>Local/Filial *</label>
            <select name="locationId" value={formData.locationId} onChange={handleChange} required>
              <option value="">Selecione um local</option>
              {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Sala *</label>
            <select name="roomId" value={formData.roomId} onChange={handleChange} required disabled={!formData.locationId}>
              <option value="">Selecione uma sala</option>
              {filteredRooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Início *</label>
            <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Fim *</label>
            <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Responsável *</label>
            <input type="text" name="responsible" value={formData.responsible} onChange={handleChange} required />
          </div>
          <div className="form-group-checkbox">
            <label>
              <input type="checkbox" name="hasCoffee" checked={formData.hasCoffee} onChange={handleCheckboxChange} />
              Incluir Café
            </label>
          </div>
          {formData.hasCoffee && (
            <div className="form-group">
              <label>Quantidade de Pessoas (café) *</label>
              <input type="number" name="numberOfPeopleForCoffee" value={formData.numberOfPeopleForCoffee || ''} onChange={handleChange} required min="1" />
            </div>
          )}
          <div className="form-group">
            <label>Descrição</label>
            <textarea name="description" value={formData.description || ''} onChange={handleChange} />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;