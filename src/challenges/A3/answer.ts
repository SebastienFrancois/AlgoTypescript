/**
 * In this challenge, you should sort messages by their sentAt property (oldest first) and
 * modify them by adding an "unread" property
 * (boolean meaning that the current user did not read this message) based on the lastActivityDatetime
 * input.
 *
 * @param lastActivityDatetime String representing an ISO8601 datetime. Represent the last time the user checked his messages
 * @param messages List of messages, unsorted and without unread property
 * @returns Sorted list of messages with the unread information
 */

// ↓ uncomment bellow lines and add your response!

function SolutionSeb({
  lastActivityDatetime,
  messages,
}: {
  lastActivityDatetime: string;
  messages: Message[];
}): MessageWithUnread[] {
  let result: MessageWithUnread[] = [];

  messages.forEach((message) => {
    if (message.sentAt > lastActivityDatetime) {
      result.push({
        ...message,
        unread: true,
      });
    } else {
      result.push({
        ...message,
        unread: false,
      });
    }
  });

  return result.sort((a, b) => {
    return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime();
  });
}

export default function ({
  lastActivityDatetime,
  messages,
}: {
  lastActivityDatetime: string;
  messages: Message[];
}): MessageWithUnread[] {
  const sortedMessages = messages
    .sort((m1, m2) => (m1.sentAt < m2.sentAt ? -1 : 1))
    .map((e) => {
      return {
        ...e,
        unread: lastActivityDatetime < e.sentAt,
      };
    });

  return sortedMessages;
}

// used interfaces, do not touch
export interface Message {
  author: string;
  sentAt: string;
  message: string;
}

export interface MessageWithUnread extends Message {
  unread: boolean;
}
function unread(
  arg0: (e: Message) => void,
  arg1: any,
  unread: any,
  arg3: boolean
) {
  throw new Error("Function not implemented.");
}
