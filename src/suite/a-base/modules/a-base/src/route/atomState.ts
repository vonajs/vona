import { IModuleRoute } from 'vona';

const routes: IModuleRoute[] = [
  // atomState
  {
    method: 'post',
    path: 'atomState/getDictDynamic',
    controller: 'atomState',
    meta: { right: { type: 'atomClass' } },
  },
];

export default routes;
