import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // // create table: aDetail
      // let sql = `
      //   CREATE TABLE aDetail (
      //     id int(11) NOT NULL AUTO_INCREMENT,
      //     createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      //     updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      //     deleted int(11) DEFAULT '0',
      //     iid int(11) DEFAULT '0',
      //     atomId int(11) DEFAULT '0',
      //     atomStage int(11) DEFAULT '0',
      //     detailItemId int(11) DEFAULT '0',
      //     detailClassId int(11) DEFAULT '0',
      //     detailCodeId int(11) DEFAULT '0',
      //     detailCode varchar(255) DEFAULT NULL,
      //     detailName varchar(255) DEFAULT NULL,
      //     detailLineNo int(11) DEFAULT '0',
      //     detailStatic int(11) DEFAULT '0',
      //     detailStaticKey varchar(255) DEFAULT NULL,
      //     userIdCreated int(11) DEFAULT '0',
      //     userIdUpdated int(11) DEFAULT '0',
      //     PRIMARY KEY (id)
      //   )
      // `;
      // await this.bean.model.query(sql);
      // // create table: aDetailClass
      // sql = `
      //   CREATE TABLE aDetailClass (
      //     id int(11) NOT NULL AUTO_INCREMENT,
      //     createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      //     updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      //     deleted int(11) DEFAULT '0',
      //     iid int(11) DEFAULT '0',
      //     module varchar(255) DEFAULT NULL,
      //     detailClassName varchar(255) DEFAULT NULL,
      //     PRIMARY KEY (id)
      //   )
      // `;
      // await this.bean.model.query(sql);
    }
    if (options.version === 2) {
      // create table: aDetailBase
      await this.bean.model.createTable('aDetailBase', function (table) {
        table.basicFields();
        table.atomIdMain();
        table.atomClassIdMain();
        table.int0('atomStage');
        table.int0('detailId');
        table.int0('detailClassId');
        table.string('detailStaticKey', 255);
      });
    }
  }

  async init() {}

  async test() {}
}
