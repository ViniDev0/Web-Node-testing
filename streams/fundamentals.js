import { Readable, Writable, Transform, Duplex } from 'node:stream';
import { buffer } from 'node:stream/consumers';
// Primeiro Passo - Leitura da dados.
class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
  
        const buff = Buffer.from(String(i));
        this.push(buff);
  
      }
    }, 1000)
  }
}

// Terceiro Passo - Escrita de dados.
class MultiplyByTenStream extends Writable {
  _write(chunk, encode, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// Segundo passo. - Mutação de dados.
class NegativeConverter extends Transform {
  _transform(chunk, encode, callback) {
    const transformed = Number(chunk.toString() * -1);
    const bufTransformed = Buffer.from(String(transformed));

    callback(null, bufTransformed);
  }
}

new OneToHundredStream()
  .pipe(new NegativeConverter())
  .pipe(new MultiplyByTenStream());