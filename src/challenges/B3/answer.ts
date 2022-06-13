/**
 * In this challenge, you must find and attach to each group the group (or groups)
 * with which the current group has the most skills in common.
 * Attached groups must be sorted by their name (A to Z).
 * You must not change the order of the main list of groups.
 *
 * @param groups List of groups without closestGroups
 * @returns The same list but with a new closestGroups prop on each
 */

import { group } from "console";
import { copyFileSync } from "fs";
import { indexOf } from "lodash";
import { stringify } from "querystring";

// ↓ uncomment bellow lines and add your response!
// LISTOFGROUPS => boucle sur chaque GROUP =>( E ) boucle sur les autres GROUP => (G.SKILLS) => 1ER GROUP.skills.includes(g.skills[i])
// => push dans un arrayGROUPNUMBER => quel arrayGROUPNUMBER à la plus grande length ?

type groupToCompare = {
  group: GroupWithSills;
  sameSkills: string[];
  closestGroups: GroupWithSills[];
};

export default function ({
  groups,
}: {
  groups: any[];
}): GroupWithSillsAndClosestGroups[] {
  groups.forEach((g) => {
    // filtre la liste de groupes
    const filteredList = groups.filter((e) => e !== g);
    const compareArr: any[] = [];
    filteredList.forEach((og) => {
      // sur chaque element de liste tu compares les skills avec celles du groupe courant
      const commonSkills: any[] = [];
      g.skills.forEach((gSkill) => {
        const filtering = og.skills.filter((skill) => skill === gSkill);
        filtering.forEach((s) => commonSkills.push(s));
      });
      compareArr.push({ name: og.name, commonSkills: commonSkills.length });
    });
    // Verifier la length commonSkills de chaque élément
    const getHighestValues = (array) => {
      const highest = array.reduce((a, b) =>
        a.commonSkills > b.commonSkills ? a : b
      );
      const result: GroupWithSills[] = [];
      array.forEach((element) => {
        if (element.commonSkills >= highest.commonSkills) {
          const closeGroup = [
            ...filteredList.filter((e) => e.name === element.name),
          ];
          closeGroup.forEach((e) =>
            result.push({ name: e.name, skills: e.skills })
          );
        }
      });

      return result;
    };
    g["closestGroups"] = getHighestValues(compareArr);
  });

  return groups;
}

// used interfaces, do not touch
export interface GroupWithSills {
  name: string;
  skills: string[];
}

export interface GroupWithSillsAndClosestGroups extends GroupWithSills {
  closestGroups: GroupWithSills[];
}
