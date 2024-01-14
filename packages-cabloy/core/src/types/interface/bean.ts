// export class AtomUser {
//   getName() {
//     return 2;
//   }
// }
// export class AtomUser2 {
//   getName() {
//     return 2;
//   }
// }
export interface IBeanRecord {
  // 'a-base.atom.user': AtomUser;
  // 'a-base.atom.user2': AtomUser2;
}

export type TypeBeanRecord = { [property in keyof IBeanRecord]: IBeanRecord[property] };
