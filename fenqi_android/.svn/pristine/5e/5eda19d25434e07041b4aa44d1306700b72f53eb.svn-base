package com.mmfenqi.fragment;

import android.app.Activity;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.mmfenqi.Bean.RecognizeInfo;
import com.mmfenqi.mmfq.CreditActivity;
import com.mmfenqi.mmfq.HomeActivity;
import com.mmfenqi.mmfq.IdentityActivity;
import com.mmfenqi.mmfq.R;
import com.mmfenqi.request.QueryRecognizeRequest;
import com.nineoldandroids.animation.ValueAnimator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * 急速认证fragment
 */
public class FastApproveFragment extends Fragment implements View.OnClickListener{
    private Activity mActivity;
    private View rootView;

    private RelativeLayout view;//全部视图

    private View line_approving;//审核中线条
//    private RelativeLayout rl_limitMoney;//额度
//    private TextView tv_limitmoney;//身份信息

    private LinearLayout rl_top;//审核中布局上
    private LinearLayout rl_center;//审核中布局中
    private LinearLayout rl_bottom;//审核中布局下


    private Button bt_approve;//去认证按钮
    private TextView bt_approving;//急速认证

    private TextView tv_identyMsg;//身份信息
    private TextView tv_school;//学籍信息
    private TextView tv_contancs;//联系方式
    private TextView tv_o2o;//电商认证
    private TextView tv_identySure;//身份识别

    private TextView tv_title;//顶部文字


    private TextView tv_bottom;//最底部文字

    private LinearLayout ll_toApprove;//认证5项总布局


    private TextView tv_approving;//审核中textview
    private ImageView iv_approving;//审核中imageview

    private TextView tv_approvingtext;//审核中，请耐心等候
    private TextView tv_approving24;//预计24小时内完成审核


    //身份认证是否成功
    public   String isIdentyMsgSuccess="";
    //学籍信息认证是否成功
    public   String isSchoolSuccess="";
    //联系方式认证是否成功
    public   String isContancsSuccess="";
    //电商认证是否成功
    public   String isO2OSuccess="";
    //身份识别认证是否成功
    public   String isIdentySureSuccess="";

    //认证状态
    public  String checkStatus="";

    //认证信息对象
    public  RecognizeInfo recognizeInfo;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mActivity=getActivity();
        getApproveState();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_fast_approve, null);
        // Inflate the layout for this fragment
        return rootView;
    }

    /**
     * 初始化布局
     */
    private void initView() {
//        rl_limitMoney= (RelativeLayout) rootView.findViewById(R.id.rl_limitMoney);
//        tv_limitmoney= (TextView) rootView.findViewById(R.id.tv_limitmoney);

        view= (RelativeLayout) rootView.findViewById(R.id.view);

        rl_top= (LinearLayout) rootView.findViewById(R.id.rl_top);
        rl_center= (LinearLayout) rootView.findViewById(R.id.rl_center);


        bt_approve= (Button) rootView.findViewById(R.id.bt_approve);
        bt_approving= (TextView) rootView.findViewById(R.id.bt_approving);

        tv_identyMsg= (TextView) rootView.findViewById(R.id.tv_identyMsg);
        tv_school= (TextView) rootView.findViewById(R.id.tv_school);
        tv_contancs= (TextView) rootView.findViewById(R.id.tv_contancs);
        tv_o2o= (TextView) rootView.findViewById(R.id.tv_o2o);
        tv_identySure= (TextView) rootView.findViewById(R.id.tv_identySure);

        tv_title= (TextView) rootView.findViewById(R.id.tv_title);

        tv_bottom= (TextView) rootView.findViewById(R.id.tv_bottom);

        ll_toApprove= (LinearLayout) rootView.findViewById(R.id.ll_toApprove);
        rl_bottom= (LinearLayout) rootView.findViewById(R.id.rl_bottom);

        line_approving=rootView.findViewById(R.id.line_approving);

        tv_approving= (TextView) rootView.findViewById(R.id.tv_approving);
        iv_approving= (ImageView) rootView.findViewById(R.id.iv_approving);

        tv_approvingtext= (TextView) rootView.findViewById(R.id.tv_approvingtext);
        tv_approving24= (TextView) rootView.findViewById(R.id.tv_approving24);

        if (!checkStatus.equals("")){
            switch (Integer.parseInt(checkStatus)) {
                case 11://准备审核
                    /*准备审核显示的布局*/
                    ll_toApprove.setVisibility(View.VISIBLE);
                    bt_approve.setVisibility(View.VISIBLE);
                    tv_bottom.setVisibility(View.VISIBLE);


                    /*审核中的布局不显示*/
//                    rl_limitMoney.setVisibility(View.GONE);
                    rl_top.setVisibility(View.GONE);
                    rl_center.setVisibility(View.GONE);
//                    rl_limitMoney.setVisibility(View.GONE);
                    bt_approving.setVisibility(View.GONE);
                    line_approving.setVisibility(View.GONE);


                    bt_approve.setText("急速认证");

                    tv_title.setText("极速审核，最快3分钟获取额度");
                    tv_title.setTextColor(getResources().getColor(R.color.black_gray_text));
                    tv_title.setTextSize(20);

                    break;
                case 14://审核中
                    rl_top.setVisibility(View.VISIBLE);
                    rl_center.setVisibility(View.VISIBLE);
                    tv_bottom.setVisibility(View.VISIBLE);
                    line_approving.setVisibility(View.VISIBLE);

                    tv_approving.setText("审核中");
                    iv_approving.setImageResource(R.mipmap.icon_approving);
                    tv_approvingtext.setText("审核中，请耐心等候");
                    tv_approvingtext.setTextSize(20);
                    tv_approving24.setText("预计24小时内完成审核");

                    bt_approving.setVisibility(View.GONE);
                    bt_approve.setVisibility(View.GONE);
                    ll_toApprove.setVisibility(View.GONE);
//                  rl_limitMoney.setVisibility(View.GONE);

                    tv_title.setText("极速审核，最快3分钟获取额度");
                    tv_title.setTextColor(getResources().getColor(R.color.black_gray_text));
                    tv_title.setTextSize(20);
                    break;
                case 13://审核失败
                    ll_toApprove.setVisibility(View.VISIBLE);
                    bt_approve.setVisibility(View.VISIBLE);
                    /*审核中的布局不显示*/
//                    rl_limitMoney.setVisibility(View.GONE);
                    rl_top.setVisibility(View.GONE);
                    rl_center.setVisibility(View.GONE);
                    line_approving.setVisibility(View.GONE);
                    bt_approving.setVisibility(View.GONE);

                    bt_approve.setText("重新认证");

                    tv_title.setText("认证未通过");
                    tv_title.setTextColor(getResources().getColor(R.color.approve_fail_color));
                    tv_title.setTextSize(28);

                    //身份认证信息
                    if (isIdentyMsgSuccess.equals("1")){
                        setRightPic(tv_identyMsg, true);
                    }else if (isIdentyMsgSuccess.equals("2")){
                        setRightPic(tv_identyMsg, false);
                    }
                    //学籍认证信息
                    if (isSchoolSuccess.equals("1")){
                        setRightPic(tv_school, true);
                    }else if (isIdentyMsgSuccess.equals("2")){
                        setRightPic(tv_school, false);
                    }
                    //联系人认证信息
                    if (isContancsSuccess.equals("1")){
                        setRightPic(tv_contancs, true);
                    }else if (isIdentyMsgSuccess.equals("2")){
                        setRightPic(tv_contancs, false);
                    }
                    if (isO2OSuccess.equals("1")){
                        setRightPic(tv_o2o, true);
                    }else if (isIdentyMsgSuccess.equals("2")){
                        setRightPic(tv_o2o, false);
                    }
                    if (isIdentySureSuccess.equals("1")){
                        setRightPic(tv_identySure, true);
                    }else if (isIdentyMsgSuccess.equals("2")){
                        setRightPic(tv_identySure, false);
                    }
                    break;
                case 21://审核成功
                case 22://审核成功
                case 31://审核成功
                case 32://审核成功
                case 33://审核成功
                case 12://审核成功
//                    rl_limitMoney.setVisibility(View.VISIBLE);

                    bt_approving.setVisibility(View.VISIBLE);
                    rl_top.setVisibility(View.VISIBLE);
                    rl_center.setVisibility(View.VISIBLE);
                    line_approving.setVisibility(View.VISIBLE);

                    bt_approve.setVisibility(View.GONE);
                    ll_toApprove.setVisibility(View.GONE);
                    tv_bottom.setVisibility(View.GONE);


                    tv_approving.setText("审核通过");
                    iv_approving.setImageResource(R.mipmap.ic_fastapproved);

                    //                  tv_approvingtext.setText("3000");

                    setIntChangeAnimation(0,Float.parseFloat(((CreditActivity) mActivity).getRealloanmoney()), tv_approvingtext);//设置数字增长动画

                    tv_approvingtext.setTextSize(40);
                    tv_approving24.setText("当前额度");

//                    else {
//                        ll_toApprove.setVisibility(View.VISIBLE);
//
//                        bt_reApprove.setVisibility(View.GONE);
//                        /*审核中的布局不显示*/
//                        rl_top.setVisibility(View.GONE);
//                        rl_center.setVisibility(View.GONE);
//                        line_approving.setVisibility(View.GONE);
//
//                        setRightPic(tv_identyMsg, true);
//                        setRightPic(tv_contancs, true);
//                        setRightPic(tv_identySure, true);
//                        setRightPic(tv_school, true);
//                        setRightPic(tv_o2o, true);
//                    }
                    break;
            }
        }
    }

    /**
     * 设置数字增长动画
     * @param startValue
     * @param endValue
     * @param textView
     */
    private void setIntChangeAnimation(float startValue, float endValue, final TextView textView) {
        final ValueAnimator animator = ValueAnimator.ofFloat(startValue, endValue);
        animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator valueAnimator) {
                textView.setText(((Float) valueAnimator.getAnimatedValue()) + "");
            }
        });
        animator.setDuration(2000);
        animator.start();
    }

    /**
     * 设置textview右边的图片
     */
    private void setRightPic(TextView view,boolean isSuccess){
        if (isSuccess){
            Drawable xingdrawable=getResources().getDrawable(R.mipmap.icon_approve_success);
            /// 这一步必须要做,否则不会显示.
            xingdrawable.setBounds(0, 0, xingdrawable.getMinimumWidth(), xingdrawable.getMinimumHeight());
            view.setCompoundDrawables(null, null, xingdrawable, null);
        }else{
            Drawable xingdrawable=getResources().getDrawable(R.mipmap.icon_approve_fail);
            /// 这一步必须要做,否则不会显示.
            xingdrawable.setBounds(0, 0, xingdrawable.getMinimumWidth(), xingdrawable.getMinimumHeight());
            view.setCompoundDrawables(null, null, xingdrawable, null);
        }
    }

    /**
     * 设置监听
     */
    private void initListener() {
        bt_approve.setOnClickListener(this);
    }
    /**
     * 设置数据
     */
    private void initData() {

    }


    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.bt_approve:
                IdentityActivity.launchActivity(mActivity,recognizeInfo);
                break;
        }
    }

    /**
     * 查询认证状态
     */
    private void getApproveState(){
        ((CreditActivity)mActivity).showLoading();
        QueryRecognizeRequest queryRecognizeRequest = new QueryRecognizeRequest();
        queryRecognizeRequest.goQuery(new QueryRecognizeRequest.QueryRecognizeListener() {

            @Override
            public void success(int statusCode, RecognizeInfo recognizeInfo) {
                ((CreditActivity)mActivity).cancelLoading();
                if (statusCode == 0 && recognizeInfo != null) {
                    FastApproveFragment.this.recognizeInfo = recognizeInfo;
                    checkStatus = recognizeInfo.getCheckStatus();
                    isIdentyMsgSuccess = recognizeInfo.getCreditOne();
                    isSchoolSuccess = recognizeInfo.getCreditTwo();
                    isContancsSuccess = recognizeInfo.getCreditThree();
                    isO2OSuccess = recognizeInfo.getCreditFour();
                    isIdentySureSuccess = recognizeInfo.getCreditFive();
                    ((CreditActivity)mActivity).setRealloanmoney(recognizeInfo.getRealloanmoney());
                    initView();
                    initListener();
                    initData();
                    view.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {
                ((CreditActivity)mActivity).cancelLoading();
                if (statusMsg!=null){
                    checkStatus="11";
                    initView();
                    initListener();
                    initData();
                    view.setVisibility(View.VISIBLE);
                }
            }
        });
    }
}
