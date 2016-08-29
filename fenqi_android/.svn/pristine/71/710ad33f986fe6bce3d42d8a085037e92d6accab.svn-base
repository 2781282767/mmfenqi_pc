package com.hzpz.pzlibrary.widget;

import android.content.Context;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.MotionEvent;

public class MyViewPager extends ViewPager
{

	private int startX;
	private int startY;
	
	public MyViewPager(Context context) {
		super(context);
	}

	public MyViewPager(Context context, AttributeSet attrs) {
		super(context, attrs);
	}

	@Override
	public boolean onInterceptTouchEvent(MotionEvent event) {
		switch (event.getAction()) {
		case MotionEvent.ACTION_DOWN:
			startX = (int) event.getRawX();
			startY = (int) event.getRawY();
			break;
		case MotionEvent.ACTION_MOVE:
			float endX = event.getRawX();
			float endY = event.getRawY();
			if (Math.abs(endX - startX) > 50 && Math.abs(endY - startY) < 20) {
				return true;
			}
			break;
		default:
			break;
		}
		return super.onInterceptTouchEvent(event);
	}
}
