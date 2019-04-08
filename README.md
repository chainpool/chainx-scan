## Server

### For development

1. `cd packages/server`
2. `yarn`
3. `node src/index.js`

### For production

1. `yarn add pm2 global`
2. `cd packages/server`
3. `yarn`
4. `yarn prod`

## Client

### For development

1. `cd pacakges/site`
2. `yarn`
3. `echo REACT_APP_SERVER=http://localhost:3001 > .env`
4. `yarn start`

Note: config the database in `package/server/config`

### For production

1. `cd pacakges/site`
2. `yarn`
3. `echo REACT_APP_SERVER=http://localhost:3001 > .env`
4. `yarn build`
5. Config nginx to the build directory.

Note: For step 3, change the `http://localhost:3001` to your api server endpoint.
