## Usage

### first

```bash
npm install -g jspm
```

### install

```bash
mkdir /var/www/html/test

## copy all contants to `test`

cd /var/www/html/test

jspm install
```

### view

http://localhost/test

## How made it?

```bash
/var/www/html/test$ jspm init

warn Running jspm globally, it is advisable to locally install jspm via npm install jspm --save-dev.

Package.json file does not exist, create it? [yes]:
Would you like jspm to prefix the jspm package.json properties under jspm? [yes]:
Enter server baseURL (public folder path) [./]:
Enter jspm packages folder [./jspm_packages]:
Enter config file path [./config.js]:
Configuration file config.js doesn't exist, create it? [yes]:
Enter client baseURL (public folder URL) [/]:/test
Do you wish to use a transpiler? [yes]:
Which ES6 transpiler would you like to use, Babel, TypeScript or Traceur? [babel]:
ok   Verified package.json at package.json
     Verified config file at config.js
     Looking up loader files...
       system.js.map
       system-csp-production.js
       system-csp-production.src.js
       system-csp-production.js.map
       system.src.js
       system-polyfills.js.map
       system.js
       system-polyfills.src.js
       system-polyfills.js

     Using loader versions:
       systemjs@0.19.40
     Looking up npm:babel-core
     Looking up npm:babel-runtime
     Looking up npm:core-js
     Updating registry cache...
     Looking up github:jspm/nodelibs-process
     Looking up github:jspm/nodelibs-fs
     Looking up github:jspm/nodelibs-path
     Looking up github:systemjs/plugin-json
ok   Installed babel as npm:babel-core@^5.8.24 (5.8.38)
     Looking up npm:process
ok   Installed github:jspm/nodelibs-fs@^0.1.0 (0.1.2)
ok   Installed github:jspm/nodelibs-process@^0.1.0 (0.1.2)
ok   Installed npm:process@^0.11.0 (0.11.9)
     Looking up github:jspm/nodelibs-vm
     Looking up npm:path-browserify
ok   Installed github:jspm/nodelibs-path@^0.1.0 (0.1.0)
     Looking up github:jspm/nodelibs-assert
ok   Installed github:systemjs/plugin-json@^0.1.0 (0.1.2)
ok   Installed npm:path-browserify@0.0.0 (0.0.0)
     Looking up npm:vm-browserify
ok   Installed github:jspm/nodelibs-vm@^0.1.0 (0.1.0)
     Looking up npm:indexof
ok   Installed npm:vm-browserify@0.0.4 (0.0.4)
     Looking up npm:assert
ok   Installed github:jspm/nodelibs-assert@^0.1.0 (0.1.0)
ok   Installed npm:indexof@0.0.1 (0.0.1)
     Looking up npm:util
ok   Installed npm:assert@^1.3.0 (1.4.1)
     Looking up npm:inherits
ok   Installed npm:util@0.10.3 (0.10.3)
ok   Installed npm:inherits@2.0.1 (2.0.1)
     Looking up github:jspm/nodelibs-buffer
     Looking up github:jspm/nodelibs-util
     Looking up npm:buffer
ok   Installed github:jspm/nodelibs-buffer@^0.1.0 (0.1.0)
     Looking up npm:base64-js
     Looking up npm:ieee754
     Looking up npm:isarray
ok   Installed npm:buffer@^3.0.1 (3.6.0)
ok   Installed github:jspm/nodelibs-util@^0.1.0 (0.1.0)
ok   Installed npm:ieee754@^1.1.4 (1.1.8)
ok   Installed npm:base64-js@0.0.8 (0.0.8)
ok   Installed npm:isarray@^1.0.0 (1.0.0)
     Looking up github:jspm/nodelibs-child_process
ok   Installed github:jspm/nodelibs-child_process@^0.1.0 (0.1.0)
ok   Installed core-js as npm:core-js@^1.1.4 (1.2.7)
ok   Installed babel-runtime as npm:babel-runtime@^5.8.24 (5.8.38)
ok   Loader files downloaded successfully

/var/www/html/test$ jspm install jquery

warn Running jspm globally, it is advisable to locally install jspm via npm install jspm --save-dev.
     Updating registry cache...
     Looking up npm:jquery
ok   Installed jquery as npm:jquery@^3.1.1 (3.1.1)
ok   Install tree has no forks.

ok   Install complete.
```
