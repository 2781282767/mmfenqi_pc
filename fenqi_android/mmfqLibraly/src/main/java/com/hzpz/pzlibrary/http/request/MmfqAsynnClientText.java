package com.hzpz.pzlibrary.http.request;

import com.hzpz.pzlibrary.http.ApiHttpClient;
import com.loopj.android.http.RequestHandle;
import com.loopj.android.http.RequestParams;
import com.loopj.android.http.TextHttpResponseHandler;

public abstract class MmfqAsynnClientText extends TextHttpResponseHandler {

	/**
	 * Perform a HTTP GET request, without any parameters.
	 *
	 * @param url
	 *            the URL to send the request to.
	 * @param responseHandler
	 *            the response handler instance that should handle the response.
	 * @return RequestHandle of future request process
	 */
	public RequestHandle get(String url) {
		return ApiHttpClient.getInstance().get(url, null, this);
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
	public RequestHandle get(String url, RequestParams params) {
		return ApiHttpClient.getInstance().get(url, params, this);
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
	public RequestHandle post(String url, RequestParams params) {
		return ApiHttpClient.getInstance().post(url, params, this);
	}

}
