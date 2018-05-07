import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { BaseGateway } from './BaseGateway';
import { logger } from '../../lib/Logger';
import { ExtendedError, Rethrow } from '../../lib/ExtendedError';

export abstract class HttpGateway extends BaseGateway {
  protected instance: HttpInstance;
  constructor(httpOpts: HttpRequestConfig | undefined) {
    super();
    if (httpOpts) {
      logger.debug('[HTTPGateway] Instance Options:');
      logger.debug(httpOpts);
      this.instance = axios.create(httpOpts);
    } else {
      this.instance = axios.create(httpOpts);
    }
  }

  protected async httpGet(url: string, config?: HttpRequestConfig): Promise<HttpResponse> {
    this.logRequest('GET', url, null, config);
    let response: HttpResponse;
    try {
      response = await this.instance.get(url, config);
    } catch (e) {
      this.logError(e);
      throw e;
    }
    this.logResponse(response);
    return response;
  }

  protected async httpPost(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse> {
    this.logRequest('POST', url, data, config);
    let response: HttpResponse;
    try {
      response = await this.instance.post(url, data, config);
    } catch (e) {
      this.logError(e);
      throw e;
    }
    this.logResponse(response);
    return response;
  }

  protected async httpPut(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse> {
    this.logRequest('PUT', url, data, config);
    let response: HttpResponse;
    try {
      response = await this.instance.put(url, data, config);
    } catch (e) {
      this.logError(e);
      throw e;
    }
    this.logResponse(response);
    return response;
  }

  protected async httpPatch(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse> {
    this.logRequest('PATCH', url, data, config);
    let response: HttpResponse;
    try {
      response = await this.instance.patch(url, data, config);
    } catch (e) {
      this.logError(e);
      throw e;
    }
    this.logResponse(response);
    return response;
  }

  protected async httpDelete(url: string, config?: HttpRequestConfig): Promise<HttpResponse> {
    this.logRequest('DELETE', url, null, config);
    let response: HttpResponse;
    try {
      response = await this.instance.delete(url, config);
    } catch (e) {
      this.logError(e);
      throw e;
    }
    this.logResponse(response);
    return response;
  }

  private logRequest(method: string, url: string, data: any, config: HttpRequestConfig | undefined): void {
    if (this.instance.defaults.baseURL) {
      logger.debug(`[HTTPGateway] BEGIN ${method.toUpperCase()} ${this.instance.defaults.baseURL}${url}`);
    } else {
      logger.debug(`[HTTPGateway] BEGIN ${method.toUpperCase()} ${url}`);
    }

    if (this.instance.defaults.headers || (config && config.headers)) {
      logger.debug('[HttpGateway] Request Headers:');
      logger.debug(Object.assign(this.instance.defaults.headers ? this.instance.defaults.headers : {}, config!.headers ? config!.headers : {}));
    }

    if (data) {
      logger.debug('[HttpGateway] Request Payload:');
      logger.debug(data);
    }

    if (this.instance.defaults.params || (config && config.params)) {
      logger.debug('[HttpGateway] Request Query Parameters:');
      logger.debug(Object.assign(this.instance.defaults.params ? this.instance.defaults.params : {}, config!.params ? config!.params : {}));
    }
  }

  private logResponse(response: HttpResponse): void {
    logger.trace('[HttpGateway] Full Response Object:');
    logger.trace(response);

    if (response.headers) {
      logger.debug('[HttpGateway] Response Headers:');
      logger.debug(response.headers);
    }

    if (response.data) {
      logger.debug('[HttpGateway] Response Payload:');
      logger.debug(response.data);
    }

    if (response.status) {
      logger.debug('[HttpGateway] Status Code:');
      logger.debug(response.status);
    }

    logger.debug(`[HTTPGateway] END ${response.config.method!.toUpperCase()} ${response.config.url}`);
  }

  private logError(error: any) {
    logger.trace('[HttpGateway] Full Error Object:');
    logger.trace(error);
    if (error.response) {
      logger.error('[HttpGateway] Endpoint responded with a status code that falls out of the range of 2xx');
      logger.trace('[HttpGateway] Full Error Response Object');
      logger.trace(error.response);
      if (error.response.status) {
        logger.error('[HttpGateway] Error Response Status Code:');
        logger.error(error.response.status);
      }
      if (error.response.headers) {
        logger.error('[HttpGateway] Error Response Headers:');
        logger.error(error.response.headers);
      }
      if (error.response.data) {
        logger.error('[HttpGateway] Error Response Payload:');
        logger.error(error.response.data);
      }
    } else if (error.request) {
      logger.error('[HttpGateway] Something happened in setting up the request that triggered an Error');
      logger.trace('[HttpGateway] Full Error Request Object');
      logger.trace(error.request);
    } else {
      logger.error('[HttpGateway] Generic error occurred');
    }
    logger.debug('[HttpGateway] Error Config:');
    logger.debug(error.config);
  }
}

export interface HttpInstance extends AxiosInstance { }

export interface HttpResponse extends AxiosResponse { }

export interface HttpRequestConfig extends AxiosRequestConfig { }
