package com.mmfenqi.request;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.hzpz.pzlibrary.http.request.MmfqAsynnClientJson;
import com.mmfenqi.Bean.City;
import com.mmfenqi.Bean.CityInfos;
import com.mmfenqi.Bean.Province;
import com.mmfenqi.httpdata.HttpComm;

import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class GetProvincesRequest extends MmfqAsynnClientJson {
	private GetProvincesListener mListener;
	public interface GetProvincesListener {
		/** 成功回调方法 */
		public void success(List<Province> list);

		/** 失败回调方法 */
		public void fail(int statusCode, String statusMsg);
	}
  	public void getProvinces(GetProvincesListener anchorlistener){
		mListener=anchorlistener;
		post(HttpComm.GET_PROVINCE_URL,null);
	}

	@Override
	public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
		super.onFailure(statusCode, headers, throwable, errorResponse);
		if (mListener != null) {
			sendEroMsg(statusCode, "获取最热城市接口失败");
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
			List<Province> provinces;
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
			if (!data.has("provList")){
				sendEroMsg(code, "列表数据为空");
				return;
			}
			provinces = new Gson().fromJson(data.get("provList").toString(), new TypeToken<List<Province>>() {
			}.getType());
			if(mListener!=null){
				mListener.success(provinces);
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
