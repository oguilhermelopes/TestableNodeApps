import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepositories } from "../repositories/in_memory/in_memory_appointments_repositories";
import { getFutureDate } from "../test/utils/get_future_date"
import { CreateAppointment } from "./create_appointment";


describe('Create Appointment', () => {
  it('should create an appointment', () => {
    const startsAt = getFutureDate('2022-08-12')
    const endsAt = getFutureDate('2022-08-13')
    
    const appointmentsRepository = new InMemoryAppointmentsRepositories()
    const createAppointment = new CreateAppointment(appointmentsRepository)

    expect(createAppointment.execute({
      customer: 'Guilherme Lopes',
      startsAt,
      endsAt,
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-15')
    
    const appointmentsRepository = new InMemoryAppointmentsRepositories()
    const createAppointment = new CreateAppointment(appointmentsRepository)
    
    await createAppointment.execute({
      customer: 'Guilherme Lopes',
      startsAt,
      endsAt,
    })

    expect(createAppointment.execute({
      customer: 'Guilherme Lopes',
      startsAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18'),
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'Guilherme Lopes',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-12'),
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'Guilherme Lopes',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-17'),
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'Guilherme Lopes',
      startsAt: getFutureDate('2022-08-11'),
      endsAt: getFutureDate('2022-08-12'),
    })).rejects.toBeInstanceOf(Error)
  })
})