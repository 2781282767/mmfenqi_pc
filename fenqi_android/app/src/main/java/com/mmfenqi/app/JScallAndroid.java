package com.mmfenqi.app;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.hzpz.pzlibrary.utils.ToolUtil;
import com.mmfenqi.alipay.AlipayComm;
import com.mmfenqi.alipay.AlipayListener;
import com.mmfenqi.alipay.AlipayTool;
import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.mmfq.WebviewActivity;
import com.mmfenqi.wxapi.Constants;
import com.mmfenqi.wxapi.WechatPayTool;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hp on 2016/3/2.
 * JS调用安卓方法类
 */
public class JScallAndroid {
    /**
     * JS将下个跳转地址传给app
     * @param jsonObj
     */
    private Activity activity;
    private Fragment mFragment;
    private JSCallPhoneListener jsCallPhoneListener;
    private JSCallShareListener jsCallShareListener;
//    private JSCallPayListener jsCallPayListener;
    public JScallAndroid(Activity activity){
        this.activity=activity;
    }
    @JavascriptInterface
    public void sendUrlRecordAndr(String jsonObj){
        try {
            String notifyUrl="";
            String title="";
            String token="";
            Log.e("CCCCCCCCCCC", jsonObj);
//            ToolUtil.Toast(activity,jsonObj);
            JSONObject obj=new JSONObject(jsonObj);
            String type=obj.optString("operationType");
            String sendUrl=obj.optString("sendUrl");

            //分享参数
            String kLinkTitle="";
            String kLinkDescription="";
            String kLinkImg="";
            String kLinkURL="";

            //拨打客服电话参数
            String phoneNumber = "";

            if (obj.getString("dataInfo").equals("")){
                notifyUrl=obj.optString("notifyUrl");
                title=obj.optString("title");
            }else{
                if (type.equals("9")){
                    //拨打客服电话参数
                    phoneNumber=obj.getString("dataInfo");
                }else{
                    JSONObject dataInfo=new JSONObject(obj.getString("dataInfo"));
                    notifyUrl=dataInfo.optString("notifyUrl");
                    title=dataInfo.optString("title");
                    token=dataInfo.optString("APP_TOKEN");

                    //支付宝支付参数
                    AlipayComm.out_trade_no=dataInfo.optString("out_trade_no");
                    AlipayComm.subject=dataInfo.optString("subject");
                    AlipayComm.total_fee=dataInfo.optString("total_fee");
                    AlipayComm.notify_url=dataInfo.optString("notify_url");
                    AlipayComm.send_url=dataInfo.optString("send_url");



                    //微信支付参数
                    Constants.APPID=dataInfo.optString("appid");
                    Constants.NONCESTR=dataInfo.optString("noncestr");
                    Constants.PACKAGE=dataInfo.optString("package");
                    Constants.PARTNERID=dataInfo.optString("partnerid");
                    Constants.PREPAYID=dataInfo.optString("prepayid");
                    Constants.SIGN=dataInfo.optString("sign");
                    Constants.TIMESTAMP=dataInfo.optString("timestamp");
                    Constants.SENDURL=dataInfo.optString("sendUrl");

                    //分享参数
                    kLinkTitle=dataInfo.optString("kLinkTitle");
                    kLinkDescription=dataInfo.optString("kLinkDescription");
                    kLinkImg=dataInfo.optString("kLinkImg");
                    kLinkURL=dataInfo.optString("kLinkURL");
                }


            }

            switch (Integer.parseInt(type)){
                case 0://网址跳转
                    WebviewActivity.launchActivity(activity, HttpComm.HOST+sendUrl, title);
                    break;
                case 1://微信支付
                    wechatPay();
                    break;
                case 2://分享
                    if (jsCallShareListener!=null){
                        jsCallShareListener.call(kLinkTitle,kLinkDescription,kLinkImg,kLinkURL);
                    }
                    break;
                case 3://上传头像
                    if (jsCallPhoneListener!=null){
                        jsCallPhoneListener.call("3",notifyUrl!=null?notifyUrl:"");
                    }
                    break;
                case 4://保存token值
                    if (jsCallPhoneListener!=null){
                        jsCallPhoneListener.call("4",token!=null?token:"");
                    }
                    break;
                case 5:
                    break;
                case 6://退出登录
                    if (jsCallPhoneListener!=null){
                        jsCallPhoneListener.call("6",sendUrl);
                    }
                    break;
                case 7:
                    break;
                case 8://支付宝支付
                    aliPay();
                    break;
                case 9://调用电话
                    callServicePhone(phoneNumber);
                    break;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }


    /**
     * 照片监听回调
     */
    public interface JSCallPhoneListener {
        void call(String type,String message);
    }
    public void setPhoneListener(JSCallPhoneListener jsCallPhoneListener){
        this.jsCallPhoneListener=jsCallPhoneListener;
    }

    /**
     * 分享监听回调
     */
    public interface JSCallShareListener {
        void call(String kLinkTitle,String kLinkDescription,String kLinkImg,String kLinkURL);
    }
    public void setShareListener(JSCallShareListener jsCallShareListener){
        this.jsCallShareListener=jsCallShareListener;
    }

    /**
     * 支付回调接口
     */
//    public interface JSCallPayListener {
//        void call(String type,List<String> params);
//    }
//    public void setPayListener(JSCallPayListener jsCallPayListener){
//        this.jsCallPayListener=jsCallPayListener;
//    }




    /**
     * 调用支付宝支付
     */
    private void aliPay() {
        AlipayTool alipayTool = new AlipayTool(activity);
        alipayTool.pay(AlipayComm.out_trade_no, AlipayComm.subject, AlipayComm.subject, AlipayComm.total_fee, new AlipayListener() {
            @Override
            public void payFinish(String resultCode, String resultMessge) {
                //9000成功
                //8000结果等待确认中
                //6002网络连接错误
                if ("9000".equals(resultCode)) {
                    ToolUtil.Toast(activity, "充值成功!");
                    WebviewActivity.launchActivity(activity, AlipayComm.send_url, "");
                } else if ("8000".equals(resultCode)) {
                    ToolUtil.Toast(activity, "结果正在确认中...");
                } else if ("6002".equals(resultCode)) {
                    ToolUtil.Toast(activity, "网络连接失败!");
                }
            }
        });
    }
    /**
     * 调用微信支付
     */
    private void wechatPay(){
        WechatPayTool.getInstance().init(activity);
        WechatPayTool.getInstance().pay();
    }

    /**
     * 拨打客服电话
     */
    private void callServicePhone(String phoneNumber) {
        Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + phoneNumber));
        if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        activity.startActivity(intent);
    }
}
