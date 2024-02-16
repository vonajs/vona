// roleName, leader, catalog, roleNameParent
const roles = [
  ['friend', 0, 0, 'external'],
  ['consultant', 0, 1, 'external'],
  ['study', 0, 0, 'consultant'],
  ['work', 0, 0, 'consultant'],
  ['life', 0, 0, 'consultant'],
  ['family', 0, 1, 'internal'],
  ['father', 0, 0, 'family'],
  ['mother', 1, 0, 'family'],
  ['son', 0, 0, 'family'],
  ['daughter', 0, 0, 'family'],
];

// friend->family
const roleIncs = [['friend', 'family']];

// family and friend
//   userName, roleName
const users = [
  ['Tom', 'father'],
  ['Jane', 'mother'],
  ['Tomson', 'son'],
  ['Jannie', 'daughter'],
  ['Jimmy', 'friend'],
  ['Rose', 'friend'],
  ['Smith', 'life'],
  ['Jone', 'work'],
];

// roleRights
const roleRights = [
  { roleName: 'family', action: 'create' },
  { roleName: 'family', action: 'read', scopeNames: 'family' },
  { roleName: 'authenticated', action: 'read', scopeNames: 0 },
  { roleName: 'authenticated', action: 'write', scopeNames: 0 },
  { roleName: 'authenticated', action: 'delete', scopeNames: 0 },
  { roleName: 'consultant', action: 'read', scopeNames: 'family' },
  //
  { roleName: 'RoleScopeCliDevelopment', action: 'create' },
  { roleName: 'RoleScopeCliDevelopment', action: 'read' },
  { roleName: 'RoleScopeCliDevelopment', action: 'write' },
  { roleName: 'RoleScopeCliDevelopment', action: 'delete' },
  { roleName: 'RoleScopeCliDevelopment', action: 'partyOverBulk' },
];

const roleResources = [
  //
  { roleName: 'father', atomStaticKey: 'a-baseadmin:roleManagement' },
];

const roleRightsRole = [
  // { roleName: 'father', action: 'create' },
  { roleName: 'father', action: 'read', scopeNames: 'organization' },
  { roleName: 'father', action: 'write', scopeNames: 'organization' },
  { roleName: 'father', action: 'delete', scopeNames: 'organization' },
  { roleName: 'father', action: 'clone', scopeNames: 'organization' },
  { roleName: 'father', action: 'move', scopeNames: 'organization' },
  { roleName: 'father', action: 'addChild', scopeNames: 'organization' },
  { roleName: 'father', action: 'roleUsers', scopeNames: 'organization' },
  { roleName: 'father', action: 'includes', scopeNames: 'organization' },
  { roleName: 'father', action: 'resourceAuthorizations', scopeNames: 'organization' },
  { roleName: 'father', action: 'atomAuthorizations', scopeNames: 'organization' },
];

const roleRightsUser = [
  // { roleName: 'father', action: 'create' },
  { roleName: 'father', action: 'read', scopeNames: 'organization' },
  { roleName: 'father', action: 'write', scopeNames: 'organization' },
  // { roleName: 'father', action: 'delete', scopeNames: 'organization' },
  { roleName: 'father', action: 'enable', scopeNames: 'organization' },
  { roleName: 'father', action: 'disable', scopeNames: 'organization' },
  { roleName: 'father', action: 'userRoles', scopeNames: 'organization' },
  { roleName: 'father', action: 'resourceAuthorizations', scopeNames: 'organization' },
  { roleName: 'father', action: 'atomAuthorizations', scopeNames: 'organization' },
];

export default {
  roles,
  roleIncs,
  users,
  roleRights,
  roleRightsRole,
  roleRightsUser,
  roleResources,
};
