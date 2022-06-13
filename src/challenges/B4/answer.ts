/**
 * In this challenge, you have to regroup submissions by the month they got submitted
 * The result should be an array containing one object for each month. These objects
 * must be sorted chronoligically (oldest first) based on their month property (ISO8601 datetime).
 * Please note that the date of a month will be the first day of this month at midnigth (ISO8601)
 * For instance, the datetime of novembre is: "2020-11-01T00:00:00.000Z"
 *
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ...
 * instead of setHours, setMinutes, ... to avoid timezone offsets!
 *
 * Example:
 * Input: [
 *      { name: "Quest NodeJS", submittedAt: "2020-11-17T11:45:01.721Z" },
 *      { name: "Quest GraphQL", submittedAt: "2020-03-12T13:45:01.721Z" },
 *      { name: "Quest ReactJS", submittedAt: "2020-03-10T07:45:47.721Z" },
 *      { name: "Quest Angular", submittedAt: "2020-01-21T21:25:47.721Z" },
 *      { name: "Quest MySQL", submittedAt: "2020-06-16T21:25:47.721Z" },
 * ]
 * Output: [
 *      {
 *          month: "2020-01-01T00:00:00.000Z",
 *          submissions: [
 *              { name: "Quest Angular", submittedAt: "2020-01-21T21:25:47.721Z" }
 *          ]
 *      },
 *      {
 *          month: "2020-03-01T00:00:00.000Z",
 *          submissions: [
 *              { name: "Quest GraphQL", submittedAt: "2020-03-12T13:45:01.721Z" },
 *              { name: "Quest ReactJS", submittedAt: "2020-03-10T07:45:47.721Z" },
 *          ]
 *      },
 *      {
 *          month: "2020-06-01T00:00:00.000Z",
 *          submissions: [
 *              { name: "Quest MySQL", submittedAt: "2020-06-16T21:25:47.721Z" },
 *          ]
 *      },
 *      {
 *          month: "2020-11-01T00:00:00.000Z",
 *          submissions: [
 *              { name: "Quest NodeJS", submittedAt: "2020-11-17T11:45:01.721Z" },
 *          ]
 *      },
 * ]
 *
 * @param submissions A list of test submissions with their name and submission datetime
 * @returns A list of objects. Each object must contain a month and its associated submissions. The list must be sorted chronoligically
 */

// ↓ uncomment bellow lines and add your response!

export default function ({
  submissions,
}: {
  submissions: Submission[];
}): MonthSubmission[] {
  let output: MonthSubmission[] = [];
  let submissionArray: string[] = [];
  submissions.forEach((submission) => {
    const Y = new Date(submission.submittedAt).getFullYear();
    const M = new Date(submission.submittedAt).getMonth();
    let FIRST_DAY: string | number = new Date(Y, M, 2).setUTCHours(0, 0, 0, 0);
    FIRST_DAY = new Date(FIRST_DAY).toISOString();
    if (submissionArray.includes(FIRST_DAY)) {
      return;
    }
    let newobject: MonthSubmission = {
      month: FIRST_DAY,
      submissions: [],
    };
    submissionArray.push(FIRST_DAY);
    output.push(newobject);
  });
  submissions.forEach((submission) => {
    let month = new Date(submission.submittedAt).getMonth();
    let index;
    for (let i = 0; i < output.length; i++) {
      if (month === new Date(output[i].month).getMonth()) {
        index = i;
      }
    }
    output[index].submissions.push(submission);
    output[index].submissions.sort((a, b) => {
      return a.submittedAt.localeCompare(b.submittedAt);
    });
  });

  return output.sort((a, b) => a.month.localeCompare(b.month));
}

// used interfaces, do not touch
export interface Submission {
  name: string;
  submittedAt: string;
}

export interface MonthSubmission {
  month: string;
  submissions: Submission[];
}
