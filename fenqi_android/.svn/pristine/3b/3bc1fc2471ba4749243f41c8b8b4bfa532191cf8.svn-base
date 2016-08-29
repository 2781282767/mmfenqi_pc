package com.mmfenqi.request;

import com.hzpz.pzlibrary.http.request.MmfqAsynnClientJson;
import com.loopj.android.http.RequestParams;
import com.mmfenqi.Bean.RecognizeInfo;
import com.mmfenqi.httpdata.HttpComm;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * 查询认证接口
 */
public class QueryRecognizeRequest extends MmfqAsynnClientJson {
	private QueryRecognizeListener mListener;
	public interface QueryRecognizeListener {
		/** 成功回调方法 */
		public void success(int statusCode, RecognizeInfo recognizeInfo);

		/** 失败回调方法 */
		public void fail(int statusCode, String statusMsg);
	}
	public void goQuery(QueryRecognizeListener mListener){
		this.mListener=mListener;
		post(HttpComm.QUERY_RECOGNIZE_URL, null);
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
			RecognizeInfo recognizeInfo = null;
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
			if (data.has("creditStatus")){
				JSONObject creditStatus=(JSONObject) data.get("creditStatus");
				String creditOne = creditStatus.getString("creditOne");
				String creditTwo = creditStatus.getString("creditTwo");
				String creditThree = creditStatus.getString("creditThree");
				String creditFour = creditStatus.getString("creditFour");
				String creditFive = creditStatus.getString("creditFive");
				String creditSix = creditStatus.getString("creditSix");
				String creditSeven = creditStatus.getString("creditSeven");
				String creditEight = creditStatus.getString("creditEight");
				String creditNine = creditStatus.getString("creditNine");
				String creditTen = creditStatus.getString("creditTen");
				recognizeInfo = new RecognizeInfo();
				recognizeInfo.setCreditOne(creditOne);
				recognizeInfo.setCreditTwo(creditTwo);
				recognizeInfo.setCreditThree(creditThree);
				recognizeInfo.setCreditFour(creditFour);
				recognizeInfo.setCreditFive(creditFive);
				recognizeInfo.setCreditSix(creditSix);
				recognizeInfo.setCreditSeven(creditSeven);
				recognizeInfo.setCreditEight(creditEight);
				recognizeInfo.setCreditNine(creditNine);
				recognizeInfo.setCreditTen(creditTen);
			}
			if (data.has("realloanmoney")){
				String realloanmoney=data.getString("realloanmoney");
				recognizeInfo.setRealloanmoney(realloanmoney);
			}
			if (data.has("checkStatus")){
				String checkStatus = data.optString("checkStatus");
				if (recognizeInfo!=null){
					recognizeInfo.setCheckStatus(checkStatus);
				}
			}
			if(mListener!=null){
				mListener.success(code, recognizeInfo);
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
