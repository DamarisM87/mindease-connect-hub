// api/appointments.ts
import { Appointment } from "./types";

const mockAppointments: Appointment[] = [];

export const bookAppointment = async (
  appointment: Omit<Appointment, "id" | "status">
): Promise<Appointment> => {
  const newAppointment: Appointment = {
    id: (mockAppointments.length + 1).toString(),
    status: "booked",
    ...appointment,
  };
  mockAppointments.push(newAppointment);
  return newAppointment;
};

export const cancelAppointment = async (id: string): Promise<boolean> => {
  const appointment = mockAppointments.find((a) => a.id === id);
  if (appointment) {
    appointment.status = "canceled";
    return true;
  }
  return false;
};

export const getUserAppointments = async (
  userId: string
): Promise<Appointment[]> => {
  return mockAppointments.filter((a) => a.userId === userId);
};
