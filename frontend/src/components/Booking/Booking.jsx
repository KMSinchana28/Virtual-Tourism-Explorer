import React, { useState, useContext, useEffect } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Booking = ({ tour, avgRating }) => {
   const { price, reviews, title } = tour
   const navigate = useNavigate()

   const { user } = useContext(AuthContext)

   const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourId: tour._id,
      tourName: title,
      fullName: '',
      phone: '',
      guestSize: 1,
      bookAt: ''
   })
   
   const [availableSeats, setAvailableSeats] = useState(null);
   const [availabilityLoading, setAvailabilityLoading] = useState(false);

   useEffect(() => {
      if (!booking.bookAt) {
         setAvailableSeats(null);
         return;
      }

      const checkAvailability = async () => {
         setAvailabilityLoading(true);

         try {
            const res = await fetch(
               `${BASE_URL}/booking/availability/${tour._id}?date=${booking.bookAt}`
            );

            const result = await res.json();

            if (!res.ok) {
               throw new Error(result.message || 'Could not check seats');
            }

            setAvailableSeats(result.data.availableSeats);
         } catch (error) {
            setAvailableSeats(null);
            alert(error.message);
         } finally {
            setAvailabilityLoading(false);
         }
      };

      checkAvailability();
   }, [booking.bookAt, tour._id]);

      const handleChange = e => {
         setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
      }

      const serviceFee = 10
      const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

   const handleClick = async e => {
      e.preventDefault()
      console.log(booking)

      try {
         if (!user || user === undefined || user === null) {
            return alert('Please sign in')
         }

         const res = await fetch(`${BASE_URL}/booking`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(booking)
         })

         const result = await res.json()

         if(!res.ok) {
            return alert(result.message)
         }
         navigate('/thank-you')
      } catch (error) {
         alert(error.message)
      }   
   }

   return (
      <div className='booking'>
         <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>${price} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
               <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
               {avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
         </div>

         {/* =============== BOOKING FORM START ============== */}
         <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
               <FormGroup>
                  <input type="text" placeholder='Full Name' id='fullName' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <input type="tel" placeholder='Phone' id='phone' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup className='d-flex align-items-center gap-3'>
               <input
                  type="date"
                  id="bookAt"
                  min={new Date().toLocaleDateString('en-CA')}
                  required
                  onChange={handleChange}
               />

               <input
                  type="number"
                  placeholder="Guests"
                  id="guestSize"
                  min="1"
                  max={availableSeats === null ? tour.maxGroupSize : availableSeats}
                  required
                  onChange={handleChange}
               />
            </FormGroup>

            {booking.bookAt && (
               <p>
                  {availabilityLoading
                     ? 'Checking available seats...'
                     : availableSeats !== null
                        ? `${availableSeats} seats available for this date`
                        : 'Availability could not be checked'}
               </p>
            )}
            </Form>
         </div>
         {/* =============== BOOKING FORM END ================ */}


         {/* =============== BOOKING BOTTOM ================ */}
         <div className="booking__bottom">
            <ListGroup>
               <ListGroupItem className='border-0 px-0'>
                  <h5 className='d-flex align-items-center gap-1'>
                     ${price} × {booking.guestSize} people
                  </h5>
                  <span>
                     ${Number(price) * Number(booking.guestSize)}
                  </span>
               </ListGroupItem>

               <ListGroupItem className='border-0 px-0'>
                  <h5>Service charge</h5>
                  <span>${serviceFee}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0 total'>
                  <h5>Total</h5>
                  <span>${totalAmount}</span>
               </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
         </div>
      </div>
   )
}

export default Booking