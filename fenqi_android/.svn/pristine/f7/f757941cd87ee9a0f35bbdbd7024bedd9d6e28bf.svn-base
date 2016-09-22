package com.mmfenqi.request;

import com.hzpz.pzlibrary.http.request.MmfqAsynnClientJson;
import com.loopj.android.http.RequestParams;

import org.apache.http.Header;
import org.json.JSONObject;

public class UpLoadPicRequest extends MmfqAsynnClientJson {
	private UpLoadPicListener mListener;
	public interface UpLoadPicListener {
		/** 成功回调方法 */
		public void success(JSONObject response);

		/** 失败回调方法 */
		public void fail(int statusCode, String statusMsg);
	}
	public void upLoadPic(String url,RequestParams params,UpLoadPicListener mListener){
		this.mListener=mListener;
		post(url,params);
	}
	@Override
	public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
		super.onFailure(statusCode, headers, throwable, errorResponse);
		if (mListener != null) {
			sendEroMsg(statusCode, "失败");
		}
	}
	@Override
	public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
		// TODO Auto-generated method stub
		super.onFailure(statusCode, headers, responseString, throwable);
	}

	@Override
	public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
		super.onSuccess(statusCode, headers, response);
		if (response == null){
            sendEroMsg(statusCode, "数据加载失败");
            return;
        }
//		String str = response.toString();
		if(mListener!=null){
            mListener.success(response);
        }

	}

	/**
	 * 错误信息
	 */
	public void sendEroMsg(int code,String message){
		if (mListener != null){
			mListener.fail(code, message);
		}
	}
}
