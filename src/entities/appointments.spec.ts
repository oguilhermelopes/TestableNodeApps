import { expect, test } from 'vitest'
import { getFutureDate } from '../test/utils/get_future_date'
import { Appointment } from './appointment'

test('create an appointment', () => {
  const startsAt = getFutureDate('2022-08-12')
  const endsAt = getFutureDate('2022-08-13')


  const appointment = new Appointment ({
    customer: 'Guilherme Lopes',
    startsAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('Guilherme Lopes')
})

test('cannot create an appointmentwith end date before start date', () => {
  const startsAt = getFutureDate('2022-08-12')
  const endsAt = getFutureDate('2022-08-11')

  expect(() => {
    return new Appointment({
      customer: 'Guilherme Lopes',
      startsAt,
      endsAt
    })
  }).toThrow()
})

test('cannot create an appointmentwith start date before now', () => {
  const startsAt = new Date()
  const endsAt = new Date()
  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'Guilherme Lopes',
      startsAt,
      endsAt
    })
  }).toThrow()
})