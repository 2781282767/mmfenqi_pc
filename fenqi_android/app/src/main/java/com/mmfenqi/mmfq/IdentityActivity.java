package com.mmfenqi.mmfq;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.Dialog;
import android.app.FragmentTransaction;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Shader;
import android.graphics.drawable.BitmapDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.provider.ContactsContract;
import android.provider.MediaStore;
import android.text.Html;
import android.text.TextUtils;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.alibaba.fastjson.JSONObject;
import com.hzpz.pzlibrary.utils.Base64;
import com.hzpz.pzlibrary.utils.PreferenceUtil;
import com.hzpz.pzlibrary.utils.ToolUtil;
import com.loopj.android.http.RequestParams;
import com.mmfenqi.Bean.CityBean;
import com.mmfenqi.Bean.Person;
import com.mmfenqi.Bean.Province;
import com.mmfenqi.Bean.RecognizeInfo;
import com.mmfenqi.dialog.CityDialog;
import com.mmfenqi.dialog.ProvinceDialog;
import com.mmfenqi.dialog.UploadAvatarDialog;
import com.mmfenqi.fragment.MineFragment;
import com.mmfenqi.fragment.VideoFragment;
import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.httpdata.UserComm;
import com.mmfenqi.request.GetCitysRequest;
import com.mmfenqi.request.GetProvincesRequest;
import com.mmfenqi.request.NormalUpLoadRequest;
import com.mmfenqi.request.UpLoadContactsRequest;
import com.mmfenqi.request.UpLoadIdentityRequest;
import com.mmfenqi.request.UpLoadSchoolRequest;
import com.mmfenqi.utils.CheckUtils;
import com.mmfenqi.utils.Utils;
import com.mmfenqi.widget.MovieRecorderView;
import com.nineoldandroids.animation.ValueAnimator;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class IdentityActivity extends BaseActivity implements View.OnClickListener,VideoFragment.CloseMediaCallBack {
    private EditText edt_name;//姓名
    private EditText edt_idnum;//身份证号
    private EditText edt_banknum;//银行卡号

    private RelativeLayout rl_identyFront;//身份证正面布局
    private RelativeLayout rl_identyBack;//身份证反面布局

    private LinearLayout ll_identyMsg;//身份信息布局
    private LinearLayout ll_contacts;//联系方式布局
    private LinearLayout ll_studyCardMsg;//学籍信息布局
    private LinearLayout ll_o2o;//电商信息布局


    private ImageView iv_identyFrontPhoto;//身份证正面图片
    private ImageView iv_identyBackPhoto;//身份证反面图片

    private Button bt_next;//下一步

    private TextView tv_studentCardStudy;//学生证学籍页
    private TextView tv_studentCardRegister;//学生证注册页
    private TextView tv_xuexinPhoto;//学信网截图


    private TextView tv_studentCardStudyUpLoad;//学生证学籍页拍照
    private TextView tv_studentCardRegisterUpLoad;//学生证注册页拍照
    private TextView tv_xuexinUpLoad;//学信网截图上传

    private ImageView iv_studentCardStudyPhoto;
    private ImageView iv_studentCardRegister;
    private ImageView iv_xuexinPhoto;


    private EditText edt_parentsName;//父母姓名
    private EditText edt_phoneNum;//父母手机号
    private EditText edt_mateName;//同学姓名
    private EditText edt_matePhoneNum;//同学手机号

    private ImageView iv_getParentPhone;//点击获取通讯录
    private ImageView iv_getMatePhone;//点击获取通讯录


    private EditText edt_taobao;//淘宝账号
    private EditText edt_taobao_password;//淘宝密码
    private TextView tv_o2oTB;//电商信息提示输入账号密码

    private EditText edt_jingdong;//淘宝账号
    private EditText edt_jingdong_password;//淘宝密码
    private TextView tv_o2oJD;//电商信息提示输入账号密码

    private RelativeLayout rl_adress;//现住址布局
    private EditText edt_adressDetail;//现住址布局
    private TextView tv_adress;//


    private int currentPosition = 0;//记录到哪一步

    private static final int PINK_COLOR = 0xfffc3ea8;
    private static final int PLAIN_COLOR = 0xff9e9e9e;

    private static final int REQUEST_CODE_FRONT_PHOTO = 401;
    private static final int REQUEST_CODE_BACK_PHOTO = 402;
    private static final int REQUEST_CODE_STUDENT_CARD_ROLL_PHOTO = 403;
    private static final int REQUEST_CODE_STUDENT_CARD_REGISTER_PHOTO = 404;
    private static final int REQUEST_CODE_STUDENT_INFO_NET_PHOTO = 405;
    private static final int REQUEST_CODE_PHONE_CANTANCS_PARENT = 406;//跳转到系统联系人,并选择父母电话
    private static final int REQUEST_CODE_PHONE_CANTANCS_MATE = 407;//跳转到系统联系人,并选择同事电话
    String token= "";

    //用户名称key
    public static final String USER_NAME = "user_name";
    //用户身份证号key
    public static final String USER_IDENTINUM = "user_identynum";



    private RecognizeInfo recognizeInfo;//认证结果对象
    private boolean isReApprove=false;//是否是重新认证
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_identity, true);
        initView();
        initListener();
        initData();
        initVideo();
    }


    /**
     * 初始化view
     */
    private void initView() {
        tvTitle.setText("急速认证");
        //身份信息
        edt_name = (EditText) findViewById(R.id.edt_name);
        edt_idnum = (EditText) findViewById(R.id.edt_idnum);
        edt_banknum = (EditText) findViewById(R.id.edt_banknum);

        rl_identyFront = (RelativeLayout) findViewById(R.id.rl_identyFront);
        rl_identyBack = (RelativeLayout) findViewById(R.id.rl_identyBack);

        ll_identyMsg = (LinearLayout) findViewById(R.id.ll_identyMsg);

        iv_identyFrontPhoto = (ImageView) findViewById(R.id.iv_identyFrontPhoto);
        iv_identyBackPhoto = (ImageView) findViewById(R.id.iv_identyBackPhoto);

        bt_next = (Button) findViewById(R.id.bt_next);

        //学籍信息
        ll_studyCardMsg = (LinearLayout) findViewById(R.id.ll_studyCardMsg);
        tv_studentCardStudy = (TextView) findViewById(R.id.tv_studentCardStudy);
        tv_studentCardRegister = (TextView) findViewById(R.id.tv_studentCardRegister);
        tv_xuexinPhoto = (TextView) findViewById(R.id.tv_xuexinPhoto);
        tv_studentCardStudyUpLoad = (TextView) findViewById(R.id.tv_studentCardStudyUpLoad);
        tv_studentCardRegisterUpLoad = (TextView) findViewById(R.id.tv_studentCardRegisterUpLoad);
        tv_xuexinUpLoad = (TextView) findViewById(R.id.tv_xuexinUpLoad);
        iv_studentCardStudyPhoto = (ImageView) findViewById(R.id.iv_studentCardStudyPhoto);
        iv_studentCardRegister = (ImageView) findViewById(R.id.iv_studentCardRegister);
        iv_xuexinPhoto = (ImageView) findViewById(R.id.iv_xuexinPhoto);

        //联系人信息
        ll_contacts = (LinearLayout) findViewById(R.id.ll_contacts);
        edt_parentsName = (EditText) findViewById(R.id.edt_parentsName);
        edt_phoneNum = (EditText) findViewById(R.id.edt_phoneNum);
        edt_mateName = (EditText) findViewById(R.id.edt_mateName);
        edt_matePhoneNum = (EditText) findViewById(R.id.edt_matePhoneNum);
        iv_getParentPhone = (ImageView) findViewById(R.id.iv_getParentPhone);
        iv_getMatePhone = (ImageView) findViewById(R.id.iv_getMatePhone);
        rl_adress = (RelativeLayout) findViewById(R.id.rl_adress);
        tv_adress = (TextView) findViewById(R.id.tv_adress);
        edt_adressDetail = (EditText) findViewById(R.id.edt_adressDetail);

        //电商信息
        ll_o2o = (LinearLayout) findViewById(R.id.ll_o2o);
        edt_taobao = (EditText) findViewById(R.id.edt_taobao);
        edt_taobao_password = (EditText) findViewById(R.id.edt_taobao_password);
        tv_o2oTB = (TextView) findViewById(R.id.tv_o2oTB);

        edt_jingdong = (EditText) findViewById(R.id.edt_jingdong);
        edt_jingdong_password = (EditText) findViewById(R.id.edt_jingdong_password);
        tv_o2oJD = (TextView) findViewById(R.id.tv_o2oJD);

        //录制视频
        fl_video= (FrameLayout) findViewById(R.id.fl_video);

        recognizeInfo= (RecognizeInfo) getIntent().getSerializableExtra("recognizeInfo");

        if (recognizeInfo!=null){
            nextApprove(-1);
            pageStateChangeForCurrentPosition(currentPosition);
            isReApprove=true;
        }else {
            pageStateChangeForCurrentPosition(currentPosition);
            isReApprove=false;
        }
    }

    /**
     * 设置监听
     */
    private void initListener() {
        rl_identyFront.setOnClickListener(this);
        rl_identyBack.setOnClickListener(this);
        bt_next.setOnClickListener(this);

        tv_studentCardStudy.setOnClickListener(this);
        tv_studentCardRegister.setOnClickListener(this);
        tv_xuexinPhoto.setOnClickListener(this);
        tv_studentCardStudyUpLoad.setOnClickListener(this);
        tv_studentCardRegisterUpLoad.setOnClickListener(this);
        tv_xuexinUpLoad.setOnClickListener(this);

        iv_getParentPhone.setOnClickListener(this);
        iv_getMatePhone.setOnClickListener(this);
        rl_adress.setOnClickListener(this);
    }

    /**
     * 设置数据
     */
    private void initData() {
        token=PreferenceUtil.getString(this, MineFragment.TOKEN_FLAG);
        getProvinces();
    }
    private List<Province> provinces ;
    private List<CityBean> cityBeans ;

    /**
     * 获取省份列表
     */
    private void getProvinces(){
        GetProvincesRequest getProvincesRequest = new GetProvincesRequest();
        getProvincesRequest.getProvinces(new GetProvincesRequest.GetProvincesListener() {
            @Override
            public void success(List<Province> list) {
                if (list != null) {
                    provinces = list;

                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {

            }
        });
    }

    /**
     * 获取对应身份城市列表
     */
    private void getCitys(String provid){
        GetCitysRequest getCitysRequest = new GetCitysRequest();
        RequestParams params = new RequestParams();
        params.add("provId",provid);
        getCitysRequest.getCitys(params, new GetCitysRequest.GetCitysListener() {
            @Override
            public void success(List<CityBean> list) {
                if (list != null) {
                    cityBeans = list;
                    cityDialog.update(cityBeans);
                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {

            }
        });
    }

    /**
     * 确认是否可以下一步
     */
    private void checkIsCanNext(int currentPosition){
        switch (currentPosition){
            case 0:
                if (!edt_name.getText().toString().equals("") && !edt_idnum.getText().toString().equals("") && !edt_banknum.getText().toString().equals("") && iv_identyFrontPhoto.getVisibility()==View.VISIBLE&& iv_identyBackPhoto.getVisibility()==View.VISIBLE) {
                    try {
                        String result=CheckUtils.IDCardValidate(edt_idnum.getText().toString());//本地判断身份证是否正确
                        if (result.equals("")){//没问题将信息提交给服务器
                            //将用户信息存储下来
                            PreferenceUtil.putString(this,USER_NAME,edt_name.getText().toString());
                            PreferenceUtil.putString(this,USER_IDENTINUM,edt_idnum.getText().toString());
                            UserComm.USER_NAME=edt_name.getText().toString();
                            UserComm.USER_IDENTINUMBER=edt_idnum.getText().toString();
                            uploadIdentity(edt_name.getText().toString(), edt_idnum.getText().toString(), edt_banknum.getText().toString(), mEncoderBase64Front, mEncoderBase64Back);
                        }else {
                            ToolUtil.Toast(this,result);
                        }
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                } else {
                    ToolUtil.Toast(this,"请填完所有信息！");
                }
                break;
            case 1:
                if (iv_studentCardStudyPhoto.getVisibility()==View.VISIBLE&& iv_studentCardRegister.getVisibility()==View.VISIBLE&& iv_xuexinPhoto.getVisibility()==View.VISIBLE) {
                    uploadSchoolMsg(mEncoderBase64XueJi, mEncoderBase64Register, mEncoderBase64XueXin);
                } else {
                    ToolUtil.Toast(this,"请填完所有信息！");
                }
                break;
            case 2:
                if (!edt_parentsName.getText().toString().equals("") && !edt_phoneNum.getText().toString().equals("") && !edt_mateName.getText().toString().equals("") && !edt_matePhoneNum.getText().toString().equals("")&&!tv_adress.getText().toString().equals("")&&!edt_adressDetail.getText().equals("") ) {
                    boolean result1=CheckUtils.checkPhone(edt_phoneNum.getText().toString());
                    boolean result2=CheckUtils.checkPhone(edt_matePhoneNum.getText().toString());
                    if (result1&&result2){
                        uploadContactsMsg(edt_parentsName.getText().toString(),edt_phoneNum.getText().toString(),edt_mateName.getText().toString(),
                                edt_matePhoneNum.getText().toString(),currentProid,currentCityid,currentProvince,currentCity,tv_adress.getText().toString()+edt_adressDetail.getText().toString());
                    }else {
                        ToolUtil.Toast(this,"手机号填写错误");
                    }

                } else {
                    ToolUtil.Toast(this, "请填完所有信息！");
                }
                break;
            case 3:
                if (!edt_taobao.getText().toString().equals("") && !edt_taobao_password.getText().toString().equals("")&&!edt_jingdong.getText().toString().equals("") && !edt_jingdong_password.getText().toString().equals("")) {
                    uploadJDMsg(edt_taobao.getText().toString(), edt_taobao_password.getText().toString(), edt_jingdong.getText().toString(), edt_jingdong_password.getText().toString());
                } else {
                    ToolUtil.Toast(this,"请填完所有信息！");
                }
                break;
            case 4:
                this.currentPosition++;
                pageStateChangeForCurrentPosition(this.currentPosition);
                break;
        }
    }
    /**
     * 上传身份信息认证(急速认证第一步)
     */
    private void uploadIdentity(String name,String idNum,String bankNum,String idFrontPic,String idBackPic){
        showLoading();
        UpLoadIdentityRequest upLoadIdentityRequest = new UpLoadIdentityRequest();
        RequestParams params = new RequestParams();
        params.put("name",name);
        params.put("identitycode",idNum);
        params.put("bankcardcode",bankNum);
        params.put("frontIdentityPic",idFrontPic);
        params.put("backIdentityPic",idBackPic);
        params.put("token",token);
        upLoadIdentityRequest.goUpload(HttpComm.IDENTITY_RECOGNIZE_URL, params, new UpLoadIdentityRequest.UpLoadIdentityListener() {
            @Override
            public void success(int statusCode, String message) {
                cancelLoading();
                if (statusCode==0){
                    if (!isReApprove){
                        currentPosition++;
                        pageStateChangeForCurrentPosition(currentPosition);
                    }else{
                        nextApprove(currentPosition);
                        pageStateChangeForCurrentPosition(currentPosition);
                    }
                }
            }
            @Override
            public void fail(int statusCode, String statusMsg) {
                cancelLoading();
                ToolUtil.Toast(IdentityActivity.this,statusMsg);
            }
        });
    }
    /**
     * 上传学籍信息认证(急速认证第二步)
     */
    private void uploadSchoolMsg(String studentPic,String studentRegisterPic,String learningNetworkPic){
        showLoading();
        UpLoadSchoolRequest upLoadSchoolRequest = new UpLoadSchoolRequest();
        RequestParams params = new RequestParams();
        params.put("studentPic",studentPic);
        params.put("studentRegisterPic",studentRegisterPic);
        params.put("learningNetworkPic",learningNetworkPic);
        params.put("token",token);
        upLoadSchoolRequest.goUpload(HttpComm.SCHOOL_RECOGNIZE_URL, params, new UpLoadSchoolRequest.UpLoadSchoolListener() {
            @Override
            public void success(int statusCode, String message) {
                cancelLoading();
                if (!isReApprove) {
                    currentPosition++;
                    pageStateChangeForCurrentPosition(currentPosition);
                } else {
                    nextApprove(currentPosition);
                    pageStateChangeForCurrentPosition(currentPosition);
                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {
                cancelLoading();
                ToolUtil.Toast(IdentityActivity.this, statusMsg);
            }
        });
    }
    /**
     * 上传联系人信息认证(急速认证第三步)
     */
    private void uploadContactsMsg(String parentName,String parentPhone,String schoolmateName,String schoolmatePhone,int provid,int cityid,String provName,String cityName,String address){
        showLoading();
        UpLoadContactsRequest upLoadContactsRequest = new UpLoadContactsRequest();
        RequestParams params = new RequestParams();
        params.put("parentName",parentName);
        params.put("parentPhone",parentPhone);
        params.put("schoolmateName",schoolmateName);
        params.put("schoolmatePhone",schoolmatePhone);
        params.put("provid", provid);
        params.put("cityid",cityid);
        params.put("provName",provName);
        params.put("cityName",cityName);
        params.put("address",address);
        params.put("token",token);
        upLoadContactsRequest.upLoadContacts(HttpComm.CANTACTS_RECOGNIZE_URL, params, new UpLoadContactsRequest.UpLoadContactsListener() {
            @Override
            public void success(int statusCode, String message) {
                cancelLoading();
                if (!isReApprove) {
                    currentPosition++;
                    pageStateChangeForCurrentPosition(currentPosition);
                } else {
                    nextApprove(currentPosition);
                    pageStateChangeForCurrentPosition(currentPosition);
                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {
                cancelLoading();
                ToolUtil.Toast(IdentityActivity.this, statusMsg);
            }
        });
    }

    /**
     * 上传电商信息接口(急速认证第四步)
     */
    private void uploadJDMsg(String accountJD,String passwordJD, final String accountTB, final String passwordTB){
        showLoading();
        NormalUpLoadRequest normalUpLoadRequest = new NormalUpLoadRequest();
        RequestParams params = new RequestParams();
        params.put("type",0);
        params.put("account",accountJD);
        params.put("password",passwordJD);
        params.put("token",token);
        normalUpLoadRequest.upLoad(HttpComm.O2O_RECOGNIZE_URL, params, new NormalUpLoadRequest.NormalUpLoadListener() {
            @Override
            public void success(int statusCode, String message) {
                cancelLoading();
                if (statusCode == 0) {
                    if (!isReApprove){
                        currentPosition++;
                        pageStateChangeForCurrentPosition(currentPosition);
                    }else{
                        nextApprove(currentPosition);
                        pageStateChangeForCurrentPosition(currentPosition);
                    }
                }
            }
            @Override
            public void fail(int statusCode, String statusMsg) {
                cancelLoading();
                ToolUtil.Toast(IdentityActivity.this, statusMsg);
            }
        });
    }

    /**
     * 获取第一个失败的页面
     */
    private void nextApprove(int currentIndex){
        if ((recognizeInfo.getCreditOne().equals("2")||recognizeInfo.getCreditOne().equals("0"))&&currentIndex<0){
            currentPosition=0;
        }else if ((recognizeInfo.getCreditTwo().equals("2")||recognizeInfo.getCreditTwo().equals("0"))&&currentIndex<1){
            currentPosition=1;
        } else if ((recognizeInfo.getCreditThree().equals("2")||recognizeInfo.getCreditThree().equals("0"))&&currentIndex<2){
            currentPosition=2;
        }else if ((recognizeInfo.getCreditFour().equals("2")||recognizeInfo.getCreditFour().equals("0"))&&currentIndex<3){
            currentPosition=3;
        }else if ((recognizeInfo.getCreditFive().equals("2")||recognizeInfo.getCreditFive().equals("0"))&&currentIndex<4){
            currentPosition=4;
        }
    }


    /**
     * 上传淘宝账号密码
     */
    private void uploadTBMsg(String accountTB,String passwordTB ){
        NormalUpLoadRequest normalUpLoadRequest = new NormalUpLoadRequest();
        RequestParams params = new RequestParams();
        params.put("type",1);
        params.put("account", accountTB);
        params.put("password", passwordTB);
        normalUpLoadRequest.upLoad(HttpComm.O2O_RECOGNIZE_URL, params, new NormalUpLoadRequest.NormalUpLoadListener() {
            @Override
            public void success(int statusCode, String message) {
                cancelLoading();
                if (statusCode == 0) {
                    if (!isReApprove) {
                        currentPosition++;
                        pageStateChangeForCurrentPosition(currentPosition);
                    } else {
                        nextApprove(currentPosition);
                        pageStateChangeForCurrentPosition(currentPosition);
                    }
                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {
                cancelLoading();
                ToolUtil.Toast(IdentityActivity.this, statusMsg);
            }
        });
    }
    /**
     * 页面跳转
     *
     * @param act
     */
    public static void launchActivity(Activity act,RecognizeInfo recognizeInfo) {
        Intent intent = new Intent(act, IdentityActivity.class);
        intent.putExtra("recognizeInfo", recognizeInfo);
        act.startActivity(intent);
    }

    /**
     * 显示学籍、学生证图片样式对话框
     */
    public Dialog dialog;

    private void showImageDialog() {
        View dialogView = getLayoutInflater().inflate(
                R.layout.studycard_style_dialog_layout, null);

        ((ImageView) dialogView.findViewById(R.id.iv_close)).setOnClickListener(this);

        dialog = new Dialog(this, R.style.MyDialog);
        dialog.setContentView(dialogView);
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();

    }

    /**
     * 内部表单页面跳转到下一个
     */
    private void pageStateChangeForCurrentPosition(int currentPosition) {
        switch (currentPosition) {
            case 0:
                ((TextView) findViewById(R.id.fast_approve_title_identity_info_txt)).setTextColor(PINK_COLOR);
                ll_identyMsg.setVisibility(View.VISIBLE);
                bt_next.setVisibility(View.VISIBLE);
                ll_studyCardMsg.setVisibility(View.GONE);
                ll_contacts.setVisibility(View.GONE);
                ll_o2o.setVisibility(View.GONE);
                fl_video.setVisibility(View.GONE);


                break;
            case 1:
                ((TextView) findViewById(R.id.fast_approve_title_identity_info_txt)).setTextColor(PLAIN_COLOR);
                ((TextView) findViewById(R.id.fast_approve_title_studymsg_txt)).setTextColor(PINK_COLOR);
                bt_next.setVisibility(View.VISIBLE);
                ll_identyMsg.setVisibility(View.GONE);
                ll_o2o.setVisibility(View.GONE);
                ll_studyCardMsg.setVisibility(View.VISIBLE);
                ll_contacts.setVisibility(View.GONE);
                fl_video.setVisibility(View.GONE);
                break;
            case 2:
                ((TextView) findViewById(R.id.fast_approve_title_studymsg_txt)).setTextColor(PLAIN_COLOR);
                ((TextView) findViewById(R.id.fast_approve_title_contacts_txt)).setTextColor(PINK_COLOR);
                ll_studyCardMsg.setVisibility(View.GONE);
                bt_next.setVisibility(View.VISIBLE);
                ll_identyMsg.setVisibility(View.GONE);
                ll_contacts.setVisibility(View.VISIBLE);
                ll_o2o.setVisibility(View.GONE);
                fl_video.setVisibility(View.GONE);
                break;
            case 3:
                String msgTB = getResources().getString(R.string.text_jingdong);
                final String msgTxt1 = String.format(msgTB, "淘宝");
                tv_o2oTB.setText(Html.fromHtml(msgTxt1));

                String msgJD = getResources().getString(R.string.text_jingdong);
                final String msgTxt2 = String.format(msgJD, "京东");
                tv_o2oJD.setText(Html.fromHtml(msgTxt2));

                ((TextView) findViewById(R.id.fast_approve_title_contacts_txt)).setTextColor(PLAIN_COLOR);
                ((TextView) findViewById(R.id.fast_approve_title_o2o_txt)).setTextColor(PINK_COLOR);
                ll_contacts.setVisibility(View.GONE);
                bt_next.setVisibility(View.VISIBLE);
                ll_studyCardMsg.setVisibility(View.GONE);
                ll_identyMsg.setVisibility(View.GONE);
                ll_o2o.setVisibility(View.VISIBLE);
                fl_video.setVisibility(View.GONE);
                break;
            case 4:
                ((TextView) findViewById(R.id.fast_approve_title_o2o_txt)).setTextColor(PLAIN_COLOR);
                ((TextView) findViewById(R.id.fast_approve_title_identity_cognz_txt)).setTextColor(PINK_COLOR);
                fl_video.setVisibility(View.VISIBLE);
                bt_next.setVisibility(View.GONE);
                ll_contacts.setVisibility(View.GONE);
                ll_studyCardMsg.setVisibility(View.GONE);
                ll_identyMsg.setVisibility(View.GONE);
                ll_o2o.setVisibility(View.GONE);
                break;
            case 5:
                Toast.makeText(this, "验证已提交审核，请耐心等候结果", Toast.LENGTH_LONG).show();
                this.currentPosition = 0;
                finish();
                break;
            default:
                break;
        }
    }

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.rl_identyFront:
                startActivityForResult(new Intent(this, TakePhoteActivity.class), REQUEST_CODE_FRONT_PHOTO);
                break;
            case R.id.rl_identyBack:
                startActivityForResult(new Intent(this, TakePhoteActivity.class), REQUEST_CODE_BACK_PHOTO);
                break;
            case R.id.bt_next:
                checkIsCanNext(currentPosition);
                break;
            //展示图片格式Dialog
            case R.id.tv_studentCardStudy:
            case R.id.tv_studentCardRegister:
            case R.id.tv_xuexinPhoto:
                showImageDialog();
                break;
            //拍照逻辑
            case R.id.tv_studentCardStudyUpLoad:
                startActivityForResult(new Intent(this, TakePhoteActivity.class), REQUEST_CODE_STUDENT_CARD_ROLL_PHOTO);
                break;
            case R.id.tv_studentCardRegisterUpLoad:
                startActivityForResult(new Intent(this, TakePhoteActivity.class), REQUEST_CODE_STUDENT_CARD_REGISTER_PHOTO);
                break;
            case R.id.tv_xuexinUpLoad:
                startActivityForResult(new Intent(this, TakePhoteActivity.class), REQUEST_CODE_STUDENT_INFO_NET_PHOTO);
                break;

            //关闭对话框
            case R.id.iv_close:
                if (dialog != null && dialog.isShowing()) {
                    dialog.dismiss();
                }
                break;
            //获取通讯录
            case R.id.iv_getParentPhone:
                Intent intent1 = new Intent(Intent.ACTION_PICK,
                        ContactsContract.Contacts.CONTENT_URI);
                startActivityForResult(intent1, REQUEST_CODE_PHONE_CANTANCS_PARENT);
                getPhoneContacts();
                break;
            case R.id.iv_getMatePhone:
                Intent intent2 = new Intent(Intent.ACTION_PICK,
                        ContactsContract.Contacts.CONTENT_URI);
                startActivityForResult(intent2, REQUEST_CODE_PHONE_CANTANCS_MATE);
                getPhoneContacts();
                break;
            case R.id.rl_adress:
                showProvince();
            break;
            //录制视频
            case R.id.iv_cancel:
                fl_video.setVisibility(View.VISIBLE);
                mShootBtn.setVisibility(View.VISIBLE);
                iv_cancel.setVisibility(View.GONE);
                bt_commit.setVisibility(View.GONE);
                iv_play.setVisibility(View.GONE);
                mRecorderView.getmRecordFile().delete();

                break;
            case R.id.bt_commit:

                break;
            case R.id.iv_play:
                mRecorderView.setVisibility(View.GONE);
                fl_video.setVisibility(View.GONE);
                fl_play_media.setVisibility(View.VISIBLE);
                VideoFragment bigPic = VideoFragment.newInstance(path);
                bigPic.setCloseMediaCallBack(this);
                android.app.FragmentManager mFragmentManager = getFragmentManager();
                FragmentTransaction transaction = mFragmentManager.beginTransaction();
                transaction.replace(R.id.fl_play_media, bigPic);
                transaction.commit();
                break;

        }
    }
    private String mEncoderBase64Front;//身份证正面图片base64
    private String mEncoderBase64Back;//身份证正面图片base64
    private String mEncoderBase64XueJi;//学生证学籍信息图片base64
    private String mEncoderBase64Register;//学生证注册信息图片base64
    private String mEncoderBase64XueXin;//学信网信息图片base64
    private Bitmap photo;
    /**
     * 将图片保存成base64
     * @param picdata
     */
    @SuppressLint("NewApi")
    private void setPicToView(String type,Uri picdata) {
        if (picdata != null) {
            try {
                photo=MediaStore.Images.Media.getBitmap(this.getContentResolver(), picdata);
                ByteArrayOutputStream stream = new ByteArrayOutputStream();
                photo.compress(Bitmap.CompressFormat.JPEG, 60, stream);
                byte[] b = stream.toByteArray(); // 将图片流以字符串形式存储下来
//            ivHead.setImageBitmap(ToolUtil.getRoundedCornerBitmap(photo, 2));
                if (type.equals("front")) {
                    mEncoderBase64Front = Base64.encode(b);// 返回身份证正面Base64编码过的字节数组字符串
                }else if (type.equals("back")){
                    mEncoderBase64Back = Base64.encode(b);// 返回身份证反面Base64编码过的字节数组字符串
                }else  if (type.equals("xueji")){
                    mEncoderBase64XueJi = Base64.encode(b);// 返回身份证反面Base64编码过的字节数组字符串
                }else  if (type.equals("register")){
                    mEncoderBase64Register = Base64.encode(b);// 返回身份证反面Base64编码过的字节数组字符串
                }else  if (type.equals("xuexin")){
                    mEncoderBase64XueXin = Base64.encode(b);// 返回身份证反面Base64编码过的字节数组字符串
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        Bundle bundle;
        if (resultCode == RESULT_OK) {
            bundle = data.getExtras();
            //TODO
            switch (requestCode) {
                case REQUEST_CODE_FRONT_PHOTO:
                    String imgPathFront = bundle.getString("path");
                    iv_identyFrontPhoto.setImageURI(data.getData());
                    iv_identyFrontPhoto.setVisibility(View.VISIBLE);
                    setPicToView("front",data.getData());
                    break;
                case REQUEST_CODE_BACK_PHOTO:
                    String imgPathBack = bundle.getString("path");
                    iv_identyBackPhoto.setImageURI(data.getData());
                    iv_identyBackPhoto.setVisibility(View.VISIBLE);
                    setPicToView("back",data.getData());
                    break;
                case REQUEST_CODE_STUDENT_CARD_ROLL_PHOTO:
                    String imgPathRoll = bundle.getString("path");
                    iv_studentCardStudyPhoto.setImageURI(data.getData());
                    iv_studentCardStudyPhoto.setVisibility(View.VISIBLE);
                    setPicToView("xueji", data.getData());
                    break;
                case REQUEST_CODE_STUDENT_CARD_REGISTER_PHOTO:
                    iv_studentCardRegister.setImageURI(data.getData());
                    iv_studentCardRegister.setVisibility(View.VISIBLE);
                    String imgPathRegister = bundle.getString("path");
                    setPicToView("register",data.getData());
                    break;
                case REQUEST_CODE_STUDENT_INFO_NET_PHOTO:
                    String imgPathInfoNet = bundle.getString("path");
                    iv_xuexinPhoto.setImageURI(data.getData());
                    iv_xuexinPhoto.setVisibility(View.VISIBLE);
                    setPicToView("xuexin", data.getData());
                    break;
                case REQUEST_CODE_PHONE_CANTANCS_PARENT:
                    Uri contactData1 = data.getData();
                    Cursor cursor1 = managedQuery(contactData1, null, null, null,
                            null);
                    cursor1.moveToFirst();
                    String num1 = IdentityActivity.this.getContactPhone(cursor1);
                    edt_phoneNum.setText(num1);
                    break;
                case REQUEST_CODE_PHONE_CANTANCS_MATE:
                    Uri contactData2 = data.getData();
                    Cursor cursor2 = managedQuery(contactData2, null, null, null,
                            null);
                    cursor2.moveToFirst();
                    String num2 = IdentityActivity.this.getContactPhone(cursor2);
                    edt_matePhoneNum.setText(num2);
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 显示省份dialog
     */
    private ProvinceDialog provinceDialog ;
    private void showProvince() {
        if (provinceDialog == null) {
            provinceDialog = new ProvinceDialog(this, this);
        }
        provinceDialog.setListener(new SelectProvinceListener());
        if (provinces!=null){
            provinceDialog.update(provinces);
        }
        provinceDialog.show();
    }
    /**
     * 显示城市dialog
     */
    private CityDialog cityDialog ;
    private void showCity() {
        if (cityDialog == null) {
            cityDialog = new CityDialog(this, this);
        }
        cityDialog.setListener(new SelectCityListener());
        if (provinces!=null){
            cityDialog.update(cityBeans);
        }
        cityDialog.show();
    }


    /**
     * 省份dialog监听
     */
    private String currentProvince="";
    private int currentProid=0;



    public class SelectProvinceListener implements ProvinceDialog.ProvinceListener{

        @Override
        public void province(Province province) {
            currentProvince=province.getProname();
            currentProid=Integer.parseInt(province.getProid());
            getCitys(province.getProid());
            showCity();
            if (provinceDialog.isShowing()){
                provinceDialog.dismiss();
            }
        }
    }
    /**
     * 城市dialog监听
     */
    private String currentCity="";
    private int currentCityid=0;
    public class SelectCityListener implements CityDialog.CityListener{
        @Override
        public void city(CityBean cityBean) {
            currentCity=cityBean.getCityname();
            currentCityid=Integer.parseInt(cityBean.getCityid());
            tv_adress.setText(currentProvince+" "+currentCity);
            if (cityDialog.isShowing()){
                cityDialog.dismiss();
            }
        }
    }
    /**
     * 获取到选中的电话号码
     * @param cursor
     * @return
     */
    private String getContactPhone(Cursor cursor) {
        // TODO Auto-generated method stub
        int phoneColumn = cursor
                .getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER);
        int phoneNum = cursor.getInt(phoneColumn);
        String result = "";
        if (phoneNum > 0) {
            // 获得联系人的ID号
            int idColumn = cursor.getColumnIndex(ContactsContract.Contacts._ID);
            String contactId = cursor.getString(idColumn);
            // 获得联系人电话的cursor
            Cursor phone = getContentResolver().query(
                    ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                    null,
                    ContactsContract.CommonDataKinds.Phone.CONTACT_ID + "="
                            + contactId, null, null);
            if (phone.moveToFirst()) {
                for (; !phone.isAfterLast(); phone.moveToNext()) {
                    int index = phone
                            .getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);
                    int typeindex = phone
                            .getColumnIndex(ContactsContract.CommonDataKinds.Phone.TYPE);
                    int phone_type = phone.getInt(typeindex);
                    String phoneNumber = phone.getString(index);
                    result = phoneNumber;
//                  switch (phone_type) {//此处请看下方注释
//                  case 2:
//                      result = phoneNumber;
//                      break;
//
//                  default:
//                      break;
//                  }
                }
                if (!phone.isClosed()) {
                    phone.close();
                }
            }
        }
        return result;
    }
    /**
     * 获取库Phone表字段
     **/
    private static final String[] PHONES_PROJECTION = new String[]{
            ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME, ContactsContract.CommonDataKinds.Phone.NUMBER, ContactsContract.CommonDataKinds.Photo.PHOTO_ID, ContactsContract.CommonDataKinds.Phone.CONTACT_ID};

    /**
     * 联系人显示名称
     **/
    private static final int PHONES_DISPLAY_NAME_INDEX = 0;

    /**
     * 电话号码
     **/
    private static final int PHONES_NUMBER_INDEX = 1;

    /**
     * 头像ID
     **/
    private static final int PHONES_PHOTO_ID_INDEX = 2;

    /**
     * 联系人的ID
     **/
    private static final int PHONES_CONTACT_ID_INDEX = 3;

    /**
     * 联系人名称
     **/
    private ArrayList<String> mContactsName = new ArrayList<String>();

    /**
     * 联系人电话
     **/
    private ArrayList<String> mContactsNumber = new ArrayList<String>();

    /**
     * 联系人头像
     **/
    private ArrayList<Bitmap> mContactsPhonto = new ArrayList<Bitmap>();

    /**
     * 联系人
     **/
    private ArrayList<Person> persons = new ArrayList<Person>();

    /**
     * 得到手机通讯录联系人信息
     **/
    private void getPhoneContacts() {
        ContentResolver resolver = getContentResolver();

        // 获取手机联系人
        Cursor phoneCursor = resolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                PHONES_PROJECTION, null, null, null);

        if (phoneCursor != null) {
            while (phoneCursor.moveToNext()) {

                // 得到手机号码
                String phoneNumber = phoneCursor.getString(PHONES_NUMBER_INDEX);
                // 当手机号码为空的或者为空字段 跳过当前循环
                if (TextUtils.isEmpty(phoneNumber))
                    continue;

                // 得到联系人名称
                String contactName = phoneCursor
                        .getString(PHONES_DISPLAY_NAME_INDEX);

                // 得到联系人ID
                Long contactid = phoneCursor.getLong(PHONES_CONTACT_ID_INDEX);

                // 得到联系人头像ID
                Long photoid = phoneCursor.getLong(PHONES_PHOTO_ID_INDEX);

                // 得到联系人头像Bitamp
                Bitmap contactPhoto = null;

                // photoid 大于0 表示联系人有头像 如果没有给此人设置头像则给他一个默认的
                if (photoid > 0) {
                    Uri uri = ContentUris.withAppendedId(
                            ContactsContract.Contacts.CONTENT_URI, contactid);
                    InputStream input = ContactsContract.Contacts
                            .openContactPhotoInputStream(resolver, uri);
                    contactPhoto = BitmapFactory.decodeStream(input);
                } else {
                    contactPhoto = BitmapFactory.decodeResource(getResources(),
                            R.mipmap.ic_launcher);
                }
                Person person = new Person();
                person.name = contactName;
                person.number = phoneNumber;
                persons.add(person);
                mContactsName.add(contactName);
                mContactsNumber.add(phoneNumber);
                mContactsPhonto.add(contactPhoto);
            }
            phoneCursor.close();
        }
        if (persons != null && persons.size() > 0) {
            uploadContacts();
        }
    }

    /**
     * 上传联系人信息给服务端
     */
    private void uploadContacts() {
        showLoading();
        Object json = JSONObject.toJSON(persons);
        UpLoadContactsRequest request = new UpLoadContactsRequest();
        RequestParams params = new RequestParams();
        params.add("contactsBook", json.toString());
        request.upLoadContacts(HttpComm.UPLOAD_CONTACTS_URL, params, new UpLoadContactsRequest.UpLoadContactsListener() {
            @Override
            public void success(int statusCode, String message) {
                cancelLoading();
            }

            @Override
            public void fail(int statusCode, String statusMsg) {

            }
        });
    }

    /**
     * 录制视频
     */
    private MovieRecorderView mRecorderView;
    private Button mShootBtn;
    private ImageView iv_cancel;
    private Button bt_commit;
    private ImageView iv_play;
    private String path;
    private FrameLayout fl_video;
    private FrameLayout fl_play_media;


    /**
     * 初始化视频信息
     */
    private void initVideo(){
        mRecorderView = (MovieRecorderView) findViewById(R.id.movieRecorderView);
        mShootBtn = (Button) findViewById(R.id.shoot_button);
        iv_cancel = (ImageView) findViewById(R.id.iv_cancel);
        bt_commit = (Button) findViewById(R.id.bt_commit);
        iv_play = (ImageView) findViewById(R.id.iv_play);
        fl_video = (FrameLayout) findViewById(R.id.fl_video);

        fl_play_media= (FrameLayout) findViewById(R.id.fl_play_media);


        iv_cancel.setOnClickListener(this);
        bt_commit.setOnClickListener(this);
        iv_play.setOnClickListener(this);

        mShootBtn.setOnTouchListener(new View.OnTouchListener() {

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN) {
                    mRecorderView.record(new MovieRecorderView.OnRecordFinishListener() {

                        @Override
                        public void onRecordFinish() {
                            handler.sendEmptyMessage(1);
                        }
                    });
                } else if (event.getAction() == MotionEvent.ACTION_UP) {
                    if (mRecorderView.getTimeCount() <= 1){
                        if (mRecorderView.getmRecordFile() != null)
                            mRecorderView.getmRecordFile().delete();
                        mRecorderView.stop();
                        ToolUtil.Toast(IdentityActivity.this, "视频录制时间太短");
                    }else{
                        handler.sendEmptyMessage(1);
                    }
                }
                return true;
            }
        });

    }

    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            mRecorderView.stop();
            // 返回到播放页面
            path = mRecorderView.getmRecordFile().getAbsolutePath();
            Log.d("TAG", mRecorderView.getmRecordFile().getAbsolutePath());
            // 通过路径获取第一帧的缩略图并显示
            Bitmap bitmap = Utils.createVideoThumbnail(path);
            BitmapDrawable drawable = new BitmapDrawable(bitmap);
            drawable.setTileModeXY(Shader.TileMode.REPEAT, Shader.TileMode.REPEAT);
            drawable.setDither(true);
            mRecorderView.setBackgroundDrawable(drawable);
            mShootBtn.setVisibility(View.GONE);
            iv_cancel.setVisibility(View.VISIBLE);
            bt_commit.setVisibility(View.VISIBLE);
            iv_play.setVisibility(View.VISIBLE);
        }
    };

    /**
     * 播放视频结束回调
     */
    @Override
    public void call() {
        fl_play_media.setVisibility(View.GONE);
        fl_video.setVisibility(View.VISIBLE);
        mRecorderView.setVisibility(View.VISIBLE);
    }
}
