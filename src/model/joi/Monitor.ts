import * as joi from 'joi';

export const monitorResponse = joi.object().keys({
  status: joi.boolean().required()
});
