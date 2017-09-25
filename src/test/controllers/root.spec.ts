import { Environment } from '../../config/environment';
import { assert } from 'chai';
import {
  Server,
  InjectedResponseObject
} from 'Hapi';
import * as Routes from '../../config/routes';

describe('Controllers', () => {
  describe('root', () => {
    it('responds with 200 status code and "success" payload', async () => {
      const env: Environment = new Environment();

      const server: Server = new Server();
      server.connection();
      server.route(Routes.get());

      const res: InjectedResponseObject = await server.inject({
        method: 'GET',
        url: '/'
      });

      assert.equal(res.statusCode, 200);
      assert.equal(JSON.parse(res.payload).test, 'success');
    });
  });
});
