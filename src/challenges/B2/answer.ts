/**
 * In this challenge, you have to get all the categories from the events. The categories
 * must be unique and sorted from A to Z.
 *
 * @param events List of events with their categories
 * @returns All existing categories sorted alphabatically without duplicates (A to Z)
 */

// ↓ uncomment bellow lines and add your response!

export default function ({
  events,
}: {
  events: EventWithCategory[];
}): string[] {
  const eventsArray: string[] = [];

  events.forEach((e) => {
    console.log("Event :", e);
    e.categories.forEach((cat) => {
      console.log("Category from event:", cat);
      if (!eventsArray.includes(cat)) eventsArray.push(cat);
    });
  });

  console.log("Resultat not sorted", eventsArray);
  console.log("Resultat sorted", eventsArray.sort());
  return eventsArray.sort();
}

// used interfaces, do not touch
export interface EventWithCategory {
  startDatetime: string;
  endDatetime: string;
  event: string;
  categories: string[];
}
