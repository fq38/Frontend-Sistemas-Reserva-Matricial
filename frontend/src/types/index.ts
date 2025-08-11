export interface Location {
  id: number;
  name: string;
}

export interface Room {
  id: number;
  name:string;
  locationId: number;
  location: Location;
}

export interface Reservation {
  id: number;
  roomId: number;
  startTime: string; // Usamos string para facilitar a transferência via JSON
  endTime: string;   // e o input datetime-local
  responsible: string;
  hasCoffee: boolean;
  numberOfPeopleForCoffee?: number;
  description?: string;
  room: Room; // Objeto aninhado para exibição na lista
}

// Tipo para o formulário, pois não teremos o objeto 'room' completo ao criar/editar
export type ReservationFormData = Omit<Reservation, 'id' | 'room'> & {
  locationId: number | ''; // Adicionamos locationId para o select
};