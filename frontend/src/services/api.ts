import axios from 'axios';
import type { Location, Reservation, ReservationFormData, Room } from '../types';

// O servidor .NET está rodando em https://localhost:7036
// A baseURL deve terminar em /api, e não em /api/reservations
const apiClient = axios.create({
  // Remova o "/reservations" do final da baseURL
  baseURL: 'https://localhost:7036/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


// A chamada apiClient.get('/reservations') resultará em https://localhost:7036/api/reservations
export const getReservations = () => apiClient.get<Reservation[]>('/reservations');
export const createReservation = (data: ReservationFormData) => apiClient.post<Reservation>('/reservations', data);
export const updateReservation = (id: number, data: ReservationFormData) => apiClient.put<void>(`/reservations/${id}`, data);
export const deleteReservation = (id: number) => apiClient.delete<void>(`/reservations/${id}`);


// A chamada apiClient.get('/locations') resultará em https://localhost:7036/api/locations
export const getLocations = () => apiClient.get<Location[]>('/locations');
export const getRooms = () => apiClient.get<Room[]>('/rooms');