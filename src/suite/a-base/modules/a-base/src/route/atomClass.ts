import { IModuleRoute } from '@cabloy/core';

const routes: IModuleRoute[] = [
  // atomClass
  { method: 'post', path: 'atomClass/validatorSearch', controller: 'atomClass' },
  { method: 'post', path: 'atomClass/checkRightCreate', controller: 'atomClass' },
  { method: 'post', path: 'atomClass/atomClass', controller: 'atomClass' },
  { method: 'post', path: 'atomClass/atomClassesUser', controller: 'atomClass' },
  { method: 'post', path: 'atomClass/actionsUser', controller: 'atomClass' },
];

export default routes;
