package com.mmfenqi.request;

import com.hzpz.pzlibrary.http.request.MmfqAsynnClientJson;
import com.loopj.android.http.RequestParams;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * 上传身份证信息认证接口
 */
public class UpLoadIdentityRequest extends MmfqAsynnClientJson {
	private UpLoadIdentityListener mListener;
	public interface UpLoadIdentityListener {
		/** 成功回调方法 */
		public void success(int statusCode, String message);

		/** 失败回调方法 */
		public void fail(int statusCode, String statusMsg);
	}
	public void goUpload(String url,RequestParams params,UpLoadIdentityListener mListener){
		this.mListener=mListener;
		post(url, params);
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
		try {
			String credit="";
			String result = response.optString("result");
			int code=Integer.parseInt(result);
			String message=response.getString("msg");

			if (!result.equals("0")) {
				sendEroMsg(code, message);
				return;
			}
			if(response.isNull("data")){
				sendEroMsg(code, "列表数据为空");
				return;
			}
			JSONObject data=(JSONObject) response.get("data");
			if (data.has("credit")){
				credit=data.getString("credit");
			}
			if(mListener!=null){
				mListener.success(code, credit);
			}
		} catch (JSONException e) {
			e.printStackTrace();
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
