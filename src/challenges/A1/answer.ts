/**
 * In this challenge, you must sort students by their age (younger first). If some of them have
 * the same age, then you should sort them alphabetically (A to Z)
 *
 * @param students Unsorted list of students
 * @returns Sorted list of students
 */

// ↓ uncomment bellow lines and add your response!

// inputs = tableau d'objets {name: string, age: number}
// outputs = tableau d'objets trier age -->
// Mettre dans l'ordre avec sort array.sort(a.name,b.name )

export default function ({ students }: { students: Student[] }): Student[] {
  return students.sort((a: Student, b: Student) => {
    if (a.age === b.age) {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    }
    return a.age - b.age;
  });
}
function SolutionNissim({ students }: { students: Student[] }): Student[] {
  return students.sort((st1, st2) => {
    return st1.age - st2.age
      ? st1.age === st2.age
        ? st1.name > st2.name
          ? 1
          : -1
        : 1
      : 1;
  });
}

// used interfaces, do not touch
export interface Student {
  name: string;
  age: number;
  skills: string[];
}
