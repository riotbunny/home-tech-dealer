import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const output = fs.createWriteStream('dist.zip');
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', () => {
  console.log('Archive created successfully');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory('dist/', false);
archive.finalize();