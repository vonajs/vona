export async function locale_transform({ ast, argv, resources }) {
  const names = Object.keys(resources).concat(argv.resourceNameCapitalize);
  const nodes = ast.find('export default {$$$0}');
  for (const name of names) {
    const node = nodes.match.$$$0.find(node => {
      return (node as any).key.name === name;
    });
    if (!node) {
      const value = resources[name] ?? argv.resourceNameCapitalize;
      const code = `${name}: '${value}',`;
      ast.replace(
        'export default {$$$0}',
        `export default { $$$0, \n ${code}}`,
      );
    }
  }
  // ok
  return ast;
}
