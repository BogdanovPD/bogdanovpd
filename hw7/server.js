const paths = require('path');
const fs = require('fs').promises;
const commander = require('commander');

commander
  .option('-p, --path <path>', 'Path to the folder')
  .parse(process.argv);

const inputPath = commander.path;

dirNames = [];

dirNames.push(paths.relative((inputPath === '.' ? '../' : './') + inputPath, paths.resolve(inputPath, inputPath)));

async function read(path) {
    dirs = await fs.readdir(path, { withFileTypes: true });
    files = await Promise.all(dirs.map((dir) => {
        relative = inputPath === '.' ? '../' + inputPath : inputPath + '/../';
        name = paths.relative(relative, paths.resolve(path, dir.name));
        console.log(name);
        console.log(dir.isDirectory());
        if (dir.isDirectory()) {
            dirNames.push(name);
            return read(paths.resolve(path, dir.name));
        }
        return name;
    }));
    return files.flat();
}

(async () => {
    files = await read(inputPath);
    json = {files: files, dirs: dirNames};
    console.log(json);
})();
