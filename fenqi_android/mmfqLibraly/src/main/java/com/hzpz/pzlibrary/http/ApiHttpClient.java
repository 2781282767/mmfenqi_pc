package com.hzpz.pzlibrary.http;

import com.hzpz.pzlibrary.App;
import com.hzpz.pzlibrary.core.AppContext;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.RequestHandle;
import com.loopj.android.http.RequestParams;
import com.loopj.android.http.ResponseHandlerInterface;

import android.content.Context;

public class ApiHttpClient {
	public static final String APIHTTPCLIENT_SERVICE = "Service.ApiHttpClient";
	private AsyncHttpClient mHttpClient;
	
	public interface InitListener {
		/**
		 * 初始化HttpClient
		 * @param apiHttpClient
		 * @param httpClient
		 */
		abstract void onInit(ApiHttpClient apiHttpClient, AsyncHttpClient httpClient);
	}

	private ApiHttpClient(Context ctx) {
		mHttpClient = new AsyncHttpClient();
	}

	public static ApiHttpClient getInstance() {
		App app = AppContext.getInstance().getAppContext();
		ApiHttpClient client = (ApiHttpClient) app.getSystemService(APIHTTPCLIENT_SERVICE);
		if (client == null)
			client = (ApiHttpClient) app.getApplicationContext().getSystemService(APIHTTPCLIENT_SERVICE);
		if (client == null) {
			client = new ApiHttpClient(app);
			app.onInit(client, client.mHttpClient);
		}
		return client;
	}

	/**
	 * Perform a HTTP GET request, without any parameters.
	 *
	 * @param url
	 *            the URL to send the request to.
	 * @param responseHandler
	 *            the response handler instance that should handle the response.
	 * @return RequestHandle of future request process
	 */
	public RequestHandle get(String url, ResponseHandlerInterface responseHandler) {
		return mHttpClient.get(null, url, null, responseHandler);
	}

	/**
	 * Perform a HTTP GET request with parameters.
	 *
	 * @param url
	 *            the URL to send the request to.
	 * @param params
	 *            additional GET parameters to send with the request.
	 * @param responseHandler
	 *            the response handler instance that should handle the response.
	 * @return RequestHandle of future request process
	 */
	public RequestHandle get(String url, RequestParams params, ResponseHandlerInterface responseHandler) {
		return mHttpClient.get(null, url, params, responseHandler);
	}

	/**
	 * Perform a HTTP GET request with parameters.
	 *
	 * @param url
	 *            the URL to send the request to.
	 * @param params
	 *            additional GET parameters to send with the request.
	 * @param responseHandler
	 *            the response handler instance that should handle the response.
	 * @return RequestHandle of future request process
	 */
	public RequestHandle post(String url, RequestParams params, ResponseHandlerInterface responseHandler) {
		return mHttpClient.post(url, params, responseHandler);
	}

}
