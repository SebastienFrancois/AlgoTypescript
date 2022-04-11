/**
 * In this challenge, you should compute a week planning split in 1 hour slots
 * and including existing events. To keep it simple, don't work with Dates!
 * Be carefull with leading 0!
 *
 * Example:
 * Input: [{ day: "Monday", startTime: "09:00", endTime: "11:00", name: "First work day!" }]
 * Output: [
 *     { day: "Monday", startTime: "00:00", "endTime": "01:00"},
 *     { day: "Monday", startTime: "01:00", "endTime": "02:00"},
 *     ...,
 *     { day: "Monday", startTime: "09:00", "endTime": "10:00", event: [Object] },
 *     { day: "Monday", startTime: "10:00", "endTime": "11:00", event: [Object] },
 *     { day: "Monday", startTime: "11:00", "endTime": "12:00" },
 *     ...,
 *     { day: "Sunday", startTime: "23:00", "endTime": "00:00" },
 * ]
 *
 * @param events List of event to add on the planning
 * @returns List of planning slots, from Monday 00:00 to Sunday 00:00, 1 hour each slot
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ events }: { events: Event[] }): PlanningSlot[] {
  const planning: PlanningSlot[] = [];
  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  week.forEach((day) => {
    let startTime = 0;
    let endTime = 1;
    for (let i = 0; i < 24; i++) {
      planning.push({
        day,
        startTime: `${startTime <= 9 ? "0" : ""}${startTime}:00`,
        endTime: `${endTime <= 9 ? "0" : ""}${
          endTime >= 24 ? "00" : endTime
        }:00`,
      });
      startTime += 1;
      endTime += 1;
    }
  });

  planning.forEach((slot: PlanningSlot) => {
    events.forEach((e) => {
      if (Number(e.endTime.split(":")[0]) === 0) {
        e.endTime = "24:00";
        if (
          (slot.day === e.day && slot.startTime === e.startTime) ||
          (slot.day === e.day &&
            Number(slot.startTime.split(":")[0]) <
              Number(e.endTime.split(":")[0]) &&
            Number(slot.startTime.split(":")[0]) >=
              Number(e.startTime.split(":")[0]))
        ) {
          slot["event"] = e;
        }
        e.endTime = "00:00";
      }
      if (
        (slot.day === e.day && slot.startTime === e.startTime) ||
        (slot.day === e.day &&
          Number(slot.startTime.split(":")[0]) <
            Number(e.endTime.split(":")[0]) &&
          Number(slot.startTime.split(":")[0]) >=
            Number(e.startTime.split(":")[0]))
      ) {
        slot["event"] = e;
      }
    });
  });

  return planning;
}

// used interfaces, do not touch
export interface Event {
  day: string;
  startTime: string;
  endTime: string;
  name: string;
}

export interface PlanningSlot {
  day: string;
  startTime: string;
  endTime: string;
  event?: Event;
}
