
import { createRuntime, askProcessEvent, ErrorTypeEnum, QPQConfig } from 'quidproquo-core';

import { ExpressEvent, ExpressEventResponse } from "../ExpressEvent";

const qpqConfig: QPQConfig = [];

// TODO: Make this a util or something based on server time or something..
const getDateNow = () => new Date().toISOString();

const ErrorTypeHttpResponseMap = {
  [ErrorTypeEnum.BadRequest]: 400,
  [ErrorTypeEnum.Unauthorized]: 401,
  [ErrorTypeEnum.PaymentRequired]: 402,
  [ErrorTypeEnum.Forbidden]: 403,
  [ErrorTypeEnum.NotFound]: 404,
  [ErrorTypeEnum.TimeOut]: 408,
  [ErrorTypeEnum.Conflict]: 409,
  [ErrorTypeEnum.UnsupportedMediaType]: 415,
  [ErrorTypeEnum.OutOfResources]: 500,
  [ErrorTypeEnum.GenericError]: 500,
  [ErrorTypeEnum.NotImplemented]: 501,
  [ErrorTypeEnum.NoContent]: 204,
  [ErrorTypeEnum.Invalid]: 422,
};

 export const route = async (expressEvent: ExpressEvent): Promise<ExpressEventResponse> => {

    // Build a processor for the session and stuff
    // Remove the non route ones ~ let the story execute action add them
    const storyActionProcessor = {
    };

    const logger = async (result: any) => {};

    const resolveStory = createRuntime(
      {},
      storyActionProcessor,
      getDateNow,
      logger,
      () => "1234",
    );

    const result = await resolveStory(askProcessEvent, [expressEvent]);

    // Run the callback
    if (!result.error) {
      const response = {
        statusCode: result.result.statusCode,
        body: result.result.body,
        headers: result.result.headers,
        isBase64Encoded: result.result.isBase64Encoded,
      };

      console.log('Response: ', response);
      return response;
    }

    const code = ErrorTypeHttpResponseMap[result.error.errorType];
    return {
      statusCode: code || 500,
      body: JSON.stringify(result.error),
      headers: {},
      isBase64Encoded: false
    };
  };

