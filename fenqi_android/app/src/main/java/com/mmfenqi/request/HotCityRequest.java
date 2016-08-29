package com.mmfenqi.request;

import com.google.gson.Gson;
import com.hzpz.pzlibrary.http.request.MmfqAsynnClientJson;
import com.mmfenqi.Bean.City;
import com.mmfenqi.Bean.CityInfos;
import com.mmfenqi.httpdata.HttpComm;

import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class HotCityRequest extends MmfqAsynnClientJson {
	private HotCityListener mListener;
	public interface HotCityListener {
		/** 成功回调方法 */
		public void success(List<CityInfos> list);

		/** 失败回调方法 */
		public void fail(int statusCode, String statusMsg);
	}
  	public void getHotCitys(HotCityListener anchorlistener){
		mListener=anchorlistener;
		post(HttpComm.HOT_CITY_URL,null);
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
			if (!data.has("cityVOList")){
				sendEroMsg(code, "列表数据为空");
			}
			JSONArray arry=(JSONArray) data.get("cityVOList");
			List<CityInfos> fm=new ArrayList<CityInfos>();
			for (int i = 0; i < arry.length(); i++) {
				JSONObject jsonObject= (JSONObject) arry.get(i);

				CityInfos cityInfo=new Gson().fromJson(jsonObject.toString(),CityInfos.class);
				City city=new Gson().fromJson(jsonObject.getString("city"),City.class);
				cityInfo.setCitys(city);
				fm.add(cityInfo);
			}
			if(mListener!=null){
				mListener.success(fm);
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
