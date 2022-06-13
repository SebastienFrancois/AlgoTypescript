/**
 * In this challenge, you have to add a list of skills to each group (based on
 * students skills in the group). Duplicates skills for one group is not permitted. Skills must be
 * sorted alphabatically. Groups order, students order and students skills order must remain
 * untouched.
 *
 * @param groups List of groups without skills, but with students
 * @returns List of groups with a new prop skills
 */

// https://tenor.com/bfGzp.gif

// ↓ uncomment bellow lines and add your response!

function SolutionSeb({ groups }: { groups: Group[] }): GroupWithSills[] {
  // you have to add a list of skills to each group(based on students skills in the group)Duplicates skills for one group is not permitted.
  let result: GroupWithSills[] = [];

  groups.forEach((group: Group) => {
    let skills: string[] = [];

    group.students.forEach((student) => {
      student.skills.forEach((skill: string) => {
        if (!skills.includes(skill)) {
          skills.push(skill);
        }
      });
    });
    // Skills must be sorted alphabatically.

    let obj: GroupWithSills = {
      ...group,
      skills: skills.sort(),
    };
    result.push(obj);
  });
  return result;
}
// Solution Nissim
export default function ({ groups }: { groups: Group[] }): GroupWithSills[] {
  const groupSorted = groups.map((group) => {
    let collectedSkills: string[] = [];
    group.students.forEach(({ skills }) => {
      collectedSkills = [...collectedSkills, ...skills];
    });
    collectedSkills = Array.from(new Set(collectedSkills));

    return { ...group, skills: collectedSkills.sort() };
  });

  return groupSorted;
}

// used interfaces, do not touch
interface Student {
  name: string;
  age: number;
  skills: string[];
}

export interface Group {
  students: Student[];
  name: string;
}

export interface GroupWithSills extends Group {
  skills: string[];
}
