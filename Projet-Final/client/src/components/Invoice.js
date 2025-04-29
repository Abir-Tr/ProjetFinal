import React from 'react';
import { useSelector } from 'react-redux';


const Invoice = () => {
    const { reservations, total } = useSelector((state) => state.reservation);

    if (reservations.length === 0) {
        return <div>Aucune réservation trouvée.</div>;
    }

    const reservation = reservations[0]; // Pour l'exemple, on prend la première réservation

    return (
        <div>
            <h2>Facture</h2>
            <p>Nom du client: {reservation.customerName}</p>
            <p>Chambre: {reservation.type}</p>
            <p>Date d'entrée: {reservation.checkIn}</p>
            <p>Date de sortie: {reservation.checkOut}</p>
            <p>Status: {reservation.status}</p>
            <h3>Total à payer: {total} TND</h3>
        </div>
    );
};

export default Invoice;