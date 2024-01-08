const ExcelJS = require('exceljs');

// const moduleInfo = module.info;
module.exports = class AtomBase {
  async exportBulk({ atomClass, options, fields, user }) {
    // select
    const items = await this.ctx.bean.atom.select({ atomClass, options, user, pageForce: false });
    // workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'CabloyJS';
    workbook.created = new Date();
    // worksheet
    const worksheet = workbook.addWorksheet('Sheet');
    // columns
    const columns = [];
    for (const field of fields) {
      columns.push({
        header: this.ctx.text(field.title),
        key: field.name,
      });
    }
    worksheet.columns = columns;
    // rows
    const rows = [];
    for (const item of items) {
      const row = {};
      for (const field of fields) {
        row[field.name] = item[field.name];
      }
      rows.push(row);
    }
    worksheet.addRows(rows);
    // write
    const buffer = await workbook.xlsx.writeBuffer();
    // meta
    const meta = {
      filename: `${this.ctx.bean.util.now()}.xlsx`,
      encoding: '7bit',
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fields: {
        mode: 2,
        flag: 'atom-bulk-export',
      },
    };
    // ok
    return { type: 'buffer', data: buffer, meta };
  }
};
