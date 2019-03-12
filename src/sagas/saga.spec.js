//Unittest for sagas
import { test } from 'tape';

test('timing test', t => {
  t.plan(2);
  t.equal(typeof Date.now, 'function');
  let start = Date.now();

  setTimeout(() => {
    t.equal(Date.now() - start, 900);
  }, 100);
});
