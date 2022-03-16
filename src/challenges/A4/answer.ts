/**
 * In this challenge, you have to regroup messages into an array of day based on their
 * sentAt property.
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ...
 * instead of setHouts, setMinutes, ... to avoid timezone offsets!
 *
 * Example:
 * Input: [{ message: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" }, { message: "Hello", sentAt: "2020-11-17T11:45:01.721Z" }, { message: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" }]
 * Output: [
 *      {
 *          day: "2020-11-17T00:00:00.000Z",
 *          messages: [
 *              { message: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" },
 *              { message: "Hello", sentAt: "2020-11-17T11:45:01.721Z" },
 *          ]
 *      },
 *      {
 *          day: "2020-11-18T00:00:00.000Z",
 *          messages: [
 *              { message: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" },
 *          ]
 *      },
 * ]
 *
 * @param messages List of messages, unsorted and not grouped in days
 * @returns Sorted list of days (only days with messages!) with a list of sorted messages of the day
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ messages }: { messages: Message[] }): DayMessages[] {
  const messagesLog: DayMessages[] = [];
  const days: string[] = [];

  const dateToUtc0 = (date) => {
    const utc0 = new Date(date);
    utc0.setUTCHours(0, 0, 0, 0);
    return utc0;
  };

  // Get DayMessages structured objects without date duplicates
  messages.forEach((message) => {
    const dayToIsoString = dateToUtc0(message.sentAt).toISOString();
    if (!days.includes(dayToIsoString)) {
      days.push(dayToIsoString);
      messagesLog.push({ day: dayToIsoString, messages: [] });
    }
  });

  // Includes messages in the right log
  messagesLog.forEach((log) => {
    const dayToIsoString = dateToUtc0(log.day).toISOString();
    messages.forEach((message) => {
      const messageDate = dateToUtc0(message.sentAt).toISOString();
      if (dayToIsoString === messageDate) {
        log.messages.push(message);
      }
    });
    // Sort messages in each log by sentAt proprety
    log.messages.sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    );
  });

  // Sort messagesLog by day proprety
  messagesLog.sort(
    (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
  );

  return messagesLog;
}

// used interfaces, do not touch
export interface Message {
  author: string;
  sentAt: string;
  message: string;
}

export interface DayMessages {
  day: string;
  messages: Message[];
}
