import assert from 'node:assert';
import { Blob } from 'node:buffer';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { $apiPath } from 'vona-module-a-web';

describe.only('upload.test.ts', () => {
  it('action:upload:fields', async () => {
    await app.bean.executor.mockCtx(async () => {
      const formData = new FormData();
      formData.append('name', 'zhennann');
      const url = app.util.getAbsoluteUrlByApiPath($apiPath('/vona/test/upload/fields'));
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      assert.equal(data.data.fields.find(item => item.name === 'name')?.value, 'zhennann');
    });
  });
  it('action:upload:file', async () => {
    await app.bean.executor.mockCtx(async () => {
      const formData = new FormData();
      formData.append('welcome', new (Blob as any)(['hello world!']), 'file-test.txt');
      const url = app.util.getAbsoluteUrlByApiPath($apiPath('/vona/test/upload/fields'));
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      assert.equal(data.data.files.find(item => item.name === 'welcome')?.info.filename, 'file-test.txt');
    });
  });
});
