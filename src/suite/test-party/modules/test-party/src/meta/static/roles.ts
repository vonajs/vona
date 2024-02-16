const __rolesAll = [
  { atomName: 'friend', roleTypeCode: 1 },
  { atomName: 'consultant', roleTypeCode: 1 },
  { atomName: 'study', roleTypeCode: 2 },
  { atomName: 'work', roleTypeCode: 2 },
  { atomName: 'life', roleTypeCode: 2 },
  { atomName: 'family', roleTypeCode: 1 },
  { atomName: 'father', roleTypeCode: 4 },
  { atomName: 'mother', roleTypeCode: 4 },
  { atomName: 'son', roleTypeCode: 4 },
  { atomName: 'daughter', roleTypeCode: 4 },
];
const roles: any[] = [];
for (const __role of __rolesAll) {
  roles.push({
    atomName: __role.atomName,
    atomStaticKey: `role_${__role.atomName}`,
    atomRevision: 1,
    description: '',
    roleTypeCode: __role.roleTypeCode,
    resourceRoles: 'template.system',
  });
}
// ok
export default roles;
