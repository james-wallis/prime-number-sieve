const { spawn } = require('child_process');

const create = (command, parameters, directory, showLogs = true) => {
  return new Promise((resolve, reject) => {
    const client = spawn(command, parameters, { cwd: directory });
    client.stdout.on('data', (data) => {
      if (showLogs) console.log(`stdout: ${data}\n`);
    });

    client.stderr.on('data', (data) => {
      if (showLogs) console.log(`stderr: ${data}\n`);
      reject();
    });

    client.on('close', (code) => {
      if (showLogs) console.log(`child process exited with code ${code}\n`);
      resolve();
    });
  })
}

module.exports = create;