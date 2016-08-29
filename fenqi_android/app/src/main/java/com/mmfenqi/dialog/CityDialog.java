package com.mmfenqi.dialog;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.hzpz.pzlibrary.data.BaseData;
import com.hzpz.pzlibrary.utils.ToolUtil;
import com.mmfenqi.Bean.CityBean;
import com.mmfenqi.Bean.Province;
import com.mmfenqi.mmfq.R;

import java.util.ArrayList;
import java.util.List;

/**
 * 城市选择
 * 
 * @author sunyl
 * 
 */
public class CityDialog extends Dialog implements AdapterView.OnItemClickListener {
	private List<CityBean> cityBeans = new ArrayList<>();
	private CityListener listener;
	private Context mContext;
	private Activity mActivity;
	private ListView listview;
	private LayoutInflater inflate;
	private ProvinceAdapter mAdapter;

	/**
	 *
	 * @param act
	 * @param cxt
	 */
	public CityDialog(Activity act, Context cxt) {
		super(cxt, R.style.MyDialog);
		this.mContext = cxt;
		this.mActivity = act;
		inflate=LayoutInflater.from(mContext);
		mAdapter=new ProvinceAdapter();
		ToolUtil.initDisplayMetrics(act);
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
		lp.width = (int) (BaseData.ScreenWidth * 7 / 10); // 设置宽度
		setContentView(LayoutInflater.from(mContext).inflate(R.layout.dialog_adress_layout, null), lp);
		initView();
	}

	/**
	 * 初始化控件
	 */
	private void initView() {


		TextView textView = (TextView) findViewById(R.id.title);
		textView.setText("城市");
		listview = (ListView) findViewById(R.id.listview);
		listview.setAdapter(mAdapter);
		listview.setOnItemClickListener(this);

	}
	/**
	 * 添加集合
	 * @param cityBeans
	 */
	public  void update(List<CityBean> cityBeans) {
		if (cityBeans != null) {
			this.cityBeans = cityBeans;
			mAdapter.notifyDataSetChanged();
		}
	}
	@Override
	public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

		listener.city(cityBeans.get(position));
	}

	public class ProvinceAdapter extends BaseAdapter{

		@Override
		public int getCount() {
			return cityBeans.size();
		}

		@Override
		public Object getItem(int position) {
			return cityBeans.get(position);
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			ViewHolder holder = null;
			if (convertView == null) {
				convertView = inflate.inflate(R.layout.child_item_layout,
						parent, false);
				holder = new ViewHolder();
				holder.child_textView = (TextView) convertView
						.findViewById(R.id.child_textView);
				convertView.setTag(holder);
			} else {
				holder = (ViewHolder) convertView.getTag();
			}
			CityBean item = (CityBean) getItem(position);
			holder.child_textView.setText(item.getCityname());
			return convertView;
		}
	}
	public class ViewHolder {
		public TextView child_textView;
	}
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			this.dismiss();
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}



	public interface CityListener {
		public void city(CityBean cityBean);
	}

	public void setListener(CityListener listener) {
		this.listener = listener;
	}

}
