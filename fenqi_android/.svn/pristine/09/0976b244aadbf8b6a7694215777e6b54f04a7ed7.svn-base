package com.mmfenqi.mmfq;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.hzpz.pzlibrary.utils.ToolUtil;
import com.mmfenqi.Bean.RecognizeInfo;
import com.mmfenqi.fragment.FastApproveFragment;
import com.mmfenqi.fragment.MoreLimitFragment;
import com.mmfenqi.fragment.ZMApproveFragment;
import com.mmfenqi.request.QueryRecognizeRequest;

import java.util.ArrayList;
import java.util.List;

public class CreditActivity extends BaseActivity {
    private ViewPager viewPager;
    private int curPageIndex = 0;//当前选中的坐标
    private LinearLayout cursorLinearLayout;//底下游标线性布局
    private List<Fragment> mFragments = new ArrayList<Fragment>();
    private  String realloanmoney="0";//用户额度
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_credit, true);
        initView();
    }

    /**
     * 初始化view
     */
    private void initView() {
        setTitle("我的信用");
        ivBack.setImageResource(R.mipmap.ic_back);
        cursorLinearLayout= (LinearLayout) findViewById(R.id.llCursor);



        mFragments.add(new FastApproveFragment());
        mFragments.add(new ZMApproveFragment());
        mFragments.add(new MoreLimitFragment());

        viewPager= (ViewPager) findViewById(R.id.viewPager);
        viewPager.setOffscreenPageLimit(mFragments.size());
        viewPager.setAdapter(new ViewAdapter(getSupportFragmentManager()));


        initCursor();

        viewPager.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {

            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                curPageIndex = position;
                ImageView ppage = (ImageView) cursorLinearLayout.getTag();
                if (ppage != null) {
                    ppage.setImageResource(R.mipmap.icon_point_gray);
                }
                ImageView cpage = (ImageView) cursorLinearLayout.getChildAt(position);
                cursorLinearLayout.setTag(cpage);
//                ivTitle.setImageResource(mTitleRes.get(position));
                switch (position){
                    case 0:
                        setTitle("我的信用");
                        cpage.setImageResource(R.mipmap.icon_point_red);
                        break;
                    case 1:
                        setTitle("芝麻信用授权");
                        cpage.setImageResource(R.mipmap.icon_zm_point);
                        break;
                    case 2:
                        setTitle("更高额度认证");
                        cpage.setImageResource(R.mipmap.icon_morelimit_point);
                        break;
                }
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
        viewPager.setCurrentItem(curPageIndex);
        ImageView cpage = (ImageView) cursorLinearLayout.getChildAt(curPageIndex);
        cpage.setImageResource(R.mipmap.icon_point_red);
        cursorLinearLayout.setTag(cpage);
    }


    /**
     * 初始化下游标
     */
    private void initCursor() {
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT,LinearLayout.LayoutParams.WRAP_CONTENT);
        lp.leftMargin = ToolUtil.pxTOdp(this, 3);
        lp.rightMargin = ToolUtil.pxTOdp(this, 3);
        for(int i = 0 ; i < mFragments.size() ; i++){
            ImageView pageIcon = new ImageView(this);
            pageIcon.setId(i);
            pageIcon.setImageResource(R.mipmap.icon_point_gray);
            cursorLinearLayout.addView(pageIcon, lp);
        }
    }

    private class ViewAdapter extends FragmentPagerAdapter {

        public ViewAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return mFragments.get(position);
        }

        @Override
        public int getCount() {
            return mFragments.size();
        }
    }

    public static void launchActivity(Activity act) {
        Intent intent = new Intent(act, CreditActivity.class);
        act.startActivity(intent);
    }

    /**
     * 返回用户额度
     * @return
     */
    public String getRealloanmoney(){
        return realloanmoney;
    }
    /**
     * 设置用户额度
     * @return
     */
    public void setRealloanmoney(String realloanmoney){
        this.realloanmoney=realloanmoney;
    }

}
