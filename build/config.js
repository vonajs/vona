/** @module project/build/config */

/** backend
 * @property {object} backend
 * @property {string} backend.hostname='0.0.0.0'
 * @property {number} backend.port=7102
 */
const backend = {
  port: 7102,
  hostname: '0.0.0.0',
  // maintenance: false,
  maintenance: true,
};

module.exports = {
  backend,
};
