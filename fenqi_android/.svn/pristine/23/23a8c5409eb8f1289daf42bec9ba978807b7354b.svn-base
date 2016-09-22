package com.mmfenqi.request;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.hzpz.pzlibrary.http.request.MmfqAsynnClientJson;
import com.loopj.android.http.RequestParams;
import com.mmfenqi.Bean.CityBean;
import com.mmfenqi.Bean.Province;
import com.mmfenqi.httpdata.HttpComm;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class GetCitysRequest extends MmfqAsynnClientJson {
	private GetCitysListener mListener;
	public interface GetCitysListener {
		/** 成功回调方法 */
		public void success(List<CityBean> list);

		/** 失败回调方法 */
		public void fail(int statusCode, String statusMsg);
	}
  	public void getCitys(RequestParams params,GetCitysListener anchorlistener){
		mListener=anchorlistener;
		post(HttpComm.GET_CITY_URL,params);
	}

	@Override
	public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
		super.onFailure(statusCode, headers, throwable, errorResponse);
		if (mListener != null) {
			sendEroMsg(statusCode, "获取城市列表失败");
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
		try {
			if (response == null){
				sendEroMsg(statusCode, "数据加载失败");
				return;
			}
			List<CityBean> cityBeans;
			String result = response.optString("result");
			int code=Integer.parseInt(result);
//			String message=obj.getString("ret_message");
			if (!result.equals("0")) {
				sendEroMsg(code, "");
				return;
			}
			if(response.isNull("data")){
				sendEroMsg(code, "列表数据为空");
				return;
			}

			JSONObject data=(JSONObject) response.get("data");
			if (!data.has("cityList")){
				sendEroMsg(code, "列表数据为空");
			}
			cityBeans = new Gson().fromJson(data.get("cityList").toString(), new TypeToken<List<CityBean>>() {
			}.getType());
			if(mListener!=null){
				mListener.success(cityBeans);
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
