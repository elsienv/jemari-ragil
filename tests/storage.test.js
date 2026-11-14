import test from 'node:test';
import assert from 'node:assert/strict';
import { readStorage, writeStorage } from '../src/shared/lib/storage.js';
test('penyimpanan rusak atau dibatasi tidak merusak render awal', () => {
  assert.deepEqual(readStorage('cart', [], { getItem: () => '{broken' }), []);
  assert.deepEqual(
    readStorage('cart', [], {
      getItem: () => {
        throw new Error('blocked');
      },
    }),
    [],
  );
  assert.deepEqual(readStorage('cart', [], { getItem: () => null }), []);
});
test('kegagalan menyimpan diteruskan agar checkout tidak mengaku sukses', () => {
  assert.throws(
    () =>
      writeStorage(
        'order',
        { id: 'demo' },
        {
          setItem: () => {
            throw new Error('quota');
          },
        },
      ),
    /quota/,
  );
});
test('data ditulis sebagai JSON dan bisa dibaca kembali', () => {
  const data = new Map();
  const storage = {
    setItem: (key, value) => data.set(key, value),
    getItem: (key) => data.get(key) ?? null,
  };
  assert.equal(writeStorage('cart', [{ id: 1, quantity: 2 }], storage), true);
  assert.deepEqual(readStorage('cart', [], storage), [{ id: 1, quantity: 2 }]);
});
