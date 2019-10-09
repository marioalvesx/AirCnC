const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = false;

        await booking.save();

        return res.json(booking);   
        /* POSSIVEIS ADIÇÕES: 
        - Só o dono do spot pode aprovar solicitações para aquele spot.
        - Depois de aprovado o Booking ele não poderia ser rejeitado;
        */
    }
};