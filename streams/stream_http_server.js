import http from 'node:http';
import { Transform } from 'node:stream';
import { buffer } from 'node:stream/consumers';

class NegativeConverter extends Transform {
  _transform(chunk, encode, callback) {
    const transformed = Number(chunk.toString() * -1);
    const bufTransformed = Buffer.from(String(transformed));


    console.log(transformed)

    callback(null, bufTransformed);
  }
}
// req => RedableStream;
// res => WritableStream;

const server = http.createServer(async (req, res) => {
  const buffers = [];
  // Percorre o array completo pra depois prosseguir.
  for await (const chunk of req ) {

    buffers.push(chunk)

  }

  

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);
  
  return res.end(fullStreamContent);

})

server.listen(3130)