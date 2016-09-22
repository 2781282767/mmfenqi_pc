package com.hzpz.pzlibrary.widget;

import android.widget.GridView;

/**
 * ScrollView中嵌入GridView,让GridView全显示出来
 * 
 * @author reyo
 * 
 */
public class MyGridView extends GridView {

	public MyGridView(android.content.Context context, android.util.AttributeSet attrs) {
		super(context, attrs);
	}
	/**
	 * 设置不滚动
	 */
	public void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
		int expandSpec = MeasureSpec.makeMeasureSpec(Integer.MAX_VALUE >> 2, MeasureSpec.AT_MOST);
		super.onMeasure(widthMeasureSpec, expandSpec);
	}
}
