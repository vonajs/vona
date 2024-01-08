module.exports = [
  // atomState
  {
    method: 'post',
    path: 'atomState/getDictDynamic',
    controller: 'atomState',
    meta: { right: { type: 'atomClass' } },
  },
];
